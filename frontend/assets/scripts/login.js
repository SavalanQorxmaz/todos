import { setCookie, getCookie, handleCurrentUser, rootElement } from "./index.js"

const formData = new FormData()

const isDataReady = ()=> {
    const userNameLogin = formData.get('login-username')
    const passwordLogin = formData.get('login-password')
if(document.querySelector('input[id="login-submit"]')){
        if(userNameLogin && passwordLogin  && userNameLogin.length > 0 && passwordLogin.length > 0){
           document.querySelector('input[id="login-submit"]').disabled = false
        }
        else {
            document.querySelector('input[id="login-submit"]').disabled =  true
        }
    }
}
const setData = (data, name, currentValue) => {
    data.set(name, currentValue)
}

document.addEventListener('keyup', (e)=>{
        const inputNames = ['login-username', 'login-password']
   for (let x of inputNames){
    if(e.target.name  == x){
        const currentValue = document.querySelector(`input[name=${x}]`).value
        setData(formData, x, currentValue)
    }
   }
   isDataReady()
})

document.addEventListener('submit', (e)=>{
    if(e.target.id == "login-form"){
        e.preventDefault()
        
        const userNameLogin = formData.get('login-username')
        const passwordLogin = formData.get('login-password')
        let data = {
            email: userNameLogin,
            password: passwordLogin
        }
        // console.log(userNameLogin, passwordLogin)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
            'Access-Control-Allow-Methods': '*',
            "Content-Type": "application/json",
            "Autorization": `${getCookie().get('access')}`
          };
        fetch('http://127.0.0.1:8000/login/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(res=>{
            return res.json()
            console.log(res)
        })
        .then(res=>{
            console.log(decodeURIComponent(res.tokens.access))
            setCookie('access', 'Bearer '+ res.tokens.access)
            setCookie('refresh', res.tokens.refresh)
            setCookie('user', res.email)
            // document.cookie = `${res.email};'Bearer ' + ${res.tokens.access}`
            handleCurrentUser()
            return res

        })
        .then(res=> {
            getCookie()
        })
    }
})




