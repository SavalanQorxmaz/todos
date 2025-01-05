function  login() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.querySelector('#root').innerHTML =
      this.responseText;
    }
    xhttp.open("GET", "../login.html");
    xhttp.send();
  }

  function register() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      document.querySelector('#root').innerHTML =
      this.responseText;
    }
    xhttp.open("GET", "../register.html");
    xhttp.send();
  }

  export {login, register}