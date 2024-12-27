

const rootElement = document.querySelector('#root')
const registerFormData = new FormData()

const isRegisterDataReady = ()=> {
    const userName = registerFormData.get('register-username')
    const password = registerFormData.get('register-password')
    const password_again = registerFormData.get('register-password_again')
    console.log(userName, password, password_again)
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

rootElement.addEventListener('keyup', (e)=>{
    const inputNames = ['register-username', 'register-password', 'register-password_again']
    console.log(e.target.name)
   for (let x of inputNames){
    if(e.target.name  == x){
        setRegisterData(registerFormData, x, e.target.value)
    }
   }
   isRegisterDataReady()
})


rootElement.addEventListener('submit', (e)=>{
    if(e.target.id == "register-form"){
        e.preventDefault()
        const userName = registerFormData.get('register-username')
        const password = registerFormData.get('register-password')
        const password_again = registerFormData.get('register-password_again')
        console.log(userName, password, password_again)
    }
})


