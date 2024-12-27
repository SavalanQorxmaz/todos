

const rootElement = document.querySelector('#root')
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

rootElement.addEventListener('keyup', (e)=>{
    const inputNames = ['login-username', 'login-password']
   for (let x of inputNames){
    if(e.target.name  == x){
        const currentValue = document.querySelector(`input[name=${x}]`).value
        setData(formData, x, currentValue)
    }
   }
   isDataReady()
})

rootElement.addEventListener('submit', (e)=>{
    if(e.target.id == "login-form"){
        e.preventDefault()
        
        const userNameLogin = formData.get('login-username')
        const passwordLogin = formData.get('login-password')
        console.log(userNameLogin, passwordLogin)
    }
})




