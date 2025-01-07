import { setCookie, getCookie, handleCurrentUser} from "./index.js"

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
function getCookie1(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener('submit', (e)=>{
    if(e.target.id == "login-form"){
        e.preventDefault()
        
        const userNameLogin = formData.get('login-username')
        const passwordLogin = formData.get('login-password')
        let data = {
            email: userNameLogin,
            password: passwordLogin
        }
        
        const csrftoken = getCookie1('csrftoken');
        // console.log(userNameLogin, passwordLogin)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Credentials': true,
            'X-CSRFToken': csrftoken,
            // 'mode': 'same-origin',
            // "Autorization": `${getCookie().get('access')}`
          };
        fetch('http://127.0.0.1:8000/login/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(res=>{
            return res.json()
        })
        .then(res=>{
            console.log(decodeURIComponent(res.tokens.access))
            setCookie('access', 'Bearer '+ res.tokens.access)
            setCookie('refresh', res.tokens.refresh)
            setCookie('user', res.email)
            // document.cookie = `${res.email};'Bearer ' + ${res.tokens.access}`
            handleCurrentUser()
            document?.querySelector('#login-register-page').remove()
            return res

        })
        .then(res=> {
            getCookie()
        })
    }
})




