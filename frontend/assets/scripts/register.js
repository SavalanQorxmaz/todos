import { setCookie, getCookie, handleCurrentUser, rootElement } from "./index.js"
import { login } from "./loginRegister.js"
// const rootElement = document.querySelector('#root')
const registerFormData = new FormData()

const isRegisterDataReady = ()=> {
    const userName = registerFormData.get('register-username')
    const password = registerFormData.get('register-password')
    const password_again = registerFormData.get('register-password_again')
    // console.log(userName, password, password_again)
  if(document.querySelector('input[id="register-submit"]')){
    if(userName && password && password_again && userName.length > 4 && password.length > 4 && password == password_again){
        document.querySelector('input[id="register-submit"]').disabled = false
    }
else {
    document.querySelector('input[id="register-submit"]').disabled = true
}
}
  }

const handleRegisterChange = (data) => {
    for(const [k, v] of data){
        const cls = rootElement.querySelector(`p[id="${k}_message"]`).classList

        if(k != 'register-password_again'){
            v.length > 4 ? cls.add('hidden') : cls.remove('hidden')
        }
        else{
            v.length > 4 && rootElement.querySelector(`input[name="register-password"]`).value == v ? cls.add('hidden') : cls.remove('hidden')
        }
    }

}



const setRegisterData = (data, name, currentValue) => {
    data.set(name, currentValue)
    handleRegisterChange(registerFormData)
}

document.addEventListener('keyup', (e)=>{
    const inputNames = ['register-username', 'register-password', 'register-password_again']
    // console.log(e.target.name)
   for (let x of inputNames){
    if(e.target.name  == x){
        setRegisterData(registerFormData, x, e.target.value)
    }
   }
   isRegisterDataReady()
})


document.addEventListener('submit', (e)=>{
    if(e.target.id == "register-form"){
        e.preventDefault()
        const userName = registerFormData.get('register-username')
        const password = registerFormData.get('register-password')
        const passwordAgain = registerFormData.get('register-password_again')
        let data = {
            email: userName,
            password: password,
            password_again: passwordAgain
        }
        // console.log(userNameLogin, passwordLogin)
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            "Content-Type": "application/json",
          };
        fetch('http://127.0.0.1:8000/register/',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        })
        .then(res=>{
            login()
            document?.querySelector('#login-register-page').remove()
            return res
        })
        .then(res=>console.log(res))
    }
})


