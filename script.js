const copyToClipBoard = (copyText) => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);
  showToast({ msg: `Successfully copied ${copyText}`, type: `success` })
}

function showToast(copyText) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  const label = document.querySelector("#snackbar > span").innerText = copyText.msg;
  label.innerText = copyText.msg;

  // Add the "show" class to DIV
  x.className = `show alert alert-${copyText.type} d-flex align-items-center`;

  // After 3 seconds, remove the show class from DIV
  setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r119/build/three.module.js";

let posX;
let posY;

let mouseDown = false;

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.autoClearColor = false;

  posX = renderer.domElement.clientWidth / 2;
  posY = renderer.domElement.clientHeight / 2;

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();
  const oRadius = 4;
  const oDetail = 2;
  const geometry = new THREE.OctahedronGeometry(oRadius, oDetail);
  const plane = new THREE.PlaneBufferGeometry(2, 2);

  const fragmentShader = `
            #include <common>

            uniform vec3 iResolution;
            uniform float iTime;
            uniform vec4 iMouse;

            uniform sampler2D iChannel0;


            vec2 arrangeCoords(vec2 p) {
                vec2 q = p.xy/iResolution.xy;
                vec2 r = -1.0+2.0*q;
              r.x *= iResolution.x/iResolution.y;
                return r;
            }

            void mainImage( out vec4 fragColor, in vec2 fragCoord ){
              float speed = .1;
              float scale = 0.002;
              vec2 p = arrangeCoords(fragCoord);
              for(int i=1; i<10; i++){
                  p.x+=0.3/float(i)*sin(float(i)*3.*p.y+iTime*speed)+iMouse.x/1000.;
                  p.y+=0.3/float(i)*cos(float(i)*3.*p.x+iTime*speed)+iMouse.y/1000.;
              }
              float r=cos(p.x+p.y+1.)*.5+.5;
              float g=sin(p.x+p.y+1.)*.5+.5;
              float b=(sin(p.x+p.y)+cos(p.x+p.y))*.5+.5;
              vec3 color = vec3(r,g,b);
              fragColor = vec4(color,1);
            }

            varying vec2 vUv;

          void main() {
            mainImage(gl_FragColor, gl_FragCoord.xy);
          }
      `;

  const vertexShader = `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `;

  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    "https://threejsfundamentals.org/threejs/resources/images/bayer.png"
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  canvas.addEventListener("mousedown", (e) => {
    mouseDown = true;
  });

  canvas.addEventListener("mouseup", (e) => {
    mouseDown = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (mouseDown) {
      posX = e.layerX;
      posY = e.layerY;
    }
    console.log(posX, posY);
  });

  const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
    iMouse: { value: new THREE.Vector2() }
  };
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms
  });

  const bgMaterial = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms
  });

  material.side = THREE.BackSide;

  function makeInstance(geometry, x) {
    const threeDObject = new THREE.Mesh(geometry, material);
    scene.add(threeDObject);

    threeDObject.position.x = x;

    return threeDObject;
  }

  const threeDObjects = [makeInstance(geometry, 0)];

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // convert to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    threeDObjects.forEach((threeDObject, ndx) => {
      const speed = 1 + ndx * 0.1;
      const rot = (time * speed) / 2;
      threeDObject.rotation.x = rot;
      threeDObject.rotation.y = rot;
    });

    const canvas = renderer.domElement;
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
    uniforms.iTime.value = time;
    uniforms.iMouse.value.set(posX, posY);

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
