  function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.body.innerHTML =
      this.responseText;
    }
    xhttp.open("GET", "../login1.html");
    xhttp.send();
  }


  export  {loadDoc};