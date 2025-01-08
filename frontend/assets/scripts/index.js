
import {login, register} from './loginRegister.js'
import { taskLoader } from './taskLoader.js'
import { tasksDefault } from './tasks.js'
export const rootElement = document?.querySelector('#root')
const dispatcher = document?.querySelector('#dispatcher')
import { logoutPageCreaterF, logoutF} from './logout.js'

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


export function handleCurrentUser(){
  const currentUser = document.querySelector('#current-user')
  let c = getCookie()
  c.get('user') ? currentUser.innerHTML =  c.get('user') : currentUser.innerHTML = 'Guest'
  document.querySelector('#header').appendChild(currentUser)
  return c.get('user') ? c.get('user') :'Guest'
}


addEventListener('load', function() {
  const currentUser = handleCurrentUser()
  currentUser == 'Guest' ? login() : taskLoader()
  document.querySelector('#current-user').innerHTML = currentUser
})
  



document.addEventListener('click',(e)=>{
  if (e.target.id =='register'){
    register()
  }
  else if(e.target.id == 'login'){login()}
})

function acceptCancelLogoutF(){
    if(dispatcher?.querySelector('input[name="dispatch-logout"]').textContent == 'accept'){
logoutF()
document.querySelector('#logout-page').remove()
login()
    }
    else if(dispatcher?.querySelector('input[name="dispatch-logout"]').textContent == 'cancel'){
      document.querySelector('#logout-page').remove()
      taskLoader()
      tasksDefault()
    }
}



document.addEventListener('click', async (e)=>{
  
  
  if (e.target.id == 'current-user'){
  const currentUser = handleCurrentUser()
  currentUser == 'Guest' ? login() : logoutPageCreaterF()
  }
  
  if (document.querySelector('#logout-page')){
    if(e.target.name == 'logout-accept'){
      console.log('accept')
       dispatcher.querySelector('input[name="dispatch-logout"]').innerHTML = 'accept'
       
    acceptCancelLogoutF()
    }
    else if(e.target.name == 'logout-cancel'){
      console.log('cancel')
      dispatcher.querySelector('input[name="dispatch-logout"]').innerHTML = 'cancel'
      
    acceptCancelLogoutF()
    }
    else {
      document.querySelector('input[name="dispatch-logout"]').innerHTML = ''
    }
  }

   
  
})
