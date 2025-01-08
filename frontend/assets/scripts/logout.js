import { getCookie, handleCurrentUser } from "./index.js";

export async function  logoutPageCreaterF(){
    const logoutPage = document.createElement('div')
    logoutPage.id = 'logout-page'
    return new Promise((res, rej)=>{
  
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
          logoutPage.innerHTML =  this.responseText;
        }
        xhttp.open("GET", "../logout.html");
        xhttp.send();
            document.body.appendChild(logoutPage)
    res(document.querySelector('#root'))
  
    })
  }


export async function logoutF(){
    const headers = {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
          'Access-Control-Allow-Methods': '*',
          "Content-Type": "application/json",
          "Authorization": `${getCookie().get('access')}`
        };
        fetch('http://127.0.0.1:8000/logout/',{
                method: 'POST',
                headers: headers,
                body: JSON.stringify({refresh: getCookie().get('refresh')})
            })
            .then(res=>{
              document.cookie.split(';').forEach((c)=>{
                document.cookie +=';Max-Age=0'
                document.querySelector('#current-user').innerHTML = 'Guest'
              })
              
                return res.data
            })
  }
  