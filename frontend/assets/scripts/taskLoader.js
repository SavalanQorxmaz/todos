

export function  taskLoader() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.querySelector('#root').innerHTML =
      this.responseText;
    }
    xhttp.open("GET", "../tasks.html");
    xhttp.send();
  }