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

let imtxti = 0;
let imtxt = `Nayague:`; /* The text */
let speed = 50; /* The speed/duration of the effect in milliseconds */

const typeWriterIm = () => {
  if (imtxti < imtxt.length) {
    document.getElementById("im").innerHTML += imtxt.charAt(imtxti);
    imtxti++;
    setTimeout(typeWriterIm, speed);
  } else {
    typeWriterFS();
  }
}

typeWriterIm();

let fltxti = 0;
let fltxt = 'Crafting Exceptional'
const typeWriterFS = () => {
  if (fltxti < fltxt.length) {
    document.getElementById("fullstack").innerHTML += fltxt.charAt(fltxti);
    fltxti++;
    setTimeout(typeWriterFS, speed);
  } else {
    typeWriterSE()
  }
}

let setxti = 0;
let setxt = ' Web and Mobile Experiences'
const typeWriterSE = () => {
  if (setxti < setxt.length) {
    document.getElementById("se").innerHTML += setxt.charAt(setxti);
    setxti++;
    setTimeout(typeWriterFS, speed);
  }
}
