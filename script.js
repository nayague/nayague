const copyToClipBoard = (copyText) => {
  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText);
  showToast({msg: `Successfully copied ${copyText}`, type: `success`})
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