
import {login, register} from './loginRegister.js'
export const rootElement = document?.querySelector('#root')

import './login.js'
import './register.js'

export function setCookie(cname,cvalue,exdays) {
    document.cookie = `${cname}=${cvalue};path=/`;
    // console.log(document.cookie)
  }
  
  export  function getCookie() {
    // const res = await new Promise((res, rej)=>{

    //   let rest = document.cookie.split(';')
    //   res(rest)
    // })
    // .then(res=>{

    // })
    const result = new Map
    let rest = document.cookie.split(';')
    rest.forEach(c=>{
      const [cname, cvalue] = c.split('=')
      // console.log(cname, "-----", cvalue)
      if(cname.includes('user') || cname.includes('refresh') || cname.includes('access')){
        result.set(cname.trim(), cvalue.trim())
      }
    })
    
    return result 
  }
  
  function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
       }
    }
  }

// document.addEventListener('loadeddata', (e)=> {
//     getCookie()
//     console.log('salam')
//   })

export function handleCurrentUser(){
  const currentUser = document.querySelector('#current-user')
  let c = getCookie()
  c.get('user') ? currentUser.innerHTML =  c.get('user') : currentUser.innerHTML = 'Guest'
  document.querySelector('#header').appendChild(currentUser)
}


window.addEventListener('load', handleCurrentUser)
  

document.getElementById('load')?.addEventListener('click', login)


document.addEventListener('click',(e)=>{
  if (e.target.id =='register'){
    register()
  }
  else if(e.target.id == 'login'){login()}
})

async function  logout(){
  return new Promise((res, rej)=>{

    function createF(){
      const cover =  document.createElement('div')
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        cover.innerHTML =
         this.responseText;
      }
      xhttp.open("GET", "../logout.html");
      xhttp.send();
          document.body.appendChild(cover)
          return cover
    }
    
    
  res(createF())

  })
  .then(res=>{
      return document.addEventListener('click',(e)=>{
          if(e.target.name == 'logout-accept'){
            return 'accept'
          }
          else if(e.target.name == 'logout-cancel'){
            console.log('cancel')
            return 'cancel'
          }
          else {
            return undefined
          }
        
      })
  })
  .then(res=>{

    console.log(res)
    const cover = res
  })
  .then(res=>{
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
            handleCurrentUser()
          })
            return res.data
            // console.log(res)
        })
        // .then(res=>{
        //     console.log(decodeURIComponent(res.tokens.access))
        //     setCookie(res.email, res.tokens.access)
        //     // document.cookie = `${res.email};'Bearer ' + ${res.tokens.access}`
        //     handleCurrentUser()
        //     return res

        // })
        // .then(res=> {
        //     getCookie()
        // })
  })
  // return result
}

document.querySelector('#current-user').addEventListener('click', logout)


