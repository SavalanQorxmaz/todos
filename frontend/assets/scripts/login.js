

const rootElement = document.querySelector('#root')
const formData = new FormData()

const isDataReady = ()=> {
    const userName = formData.get('login-username')
    const password = formData.get('login-password')

        if(userName && password  && userName.length > 0 && password.length > 0){
            document.querySelector('input[type="submit"]').disabled = false
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
        
        const userName = formData.get('login-username')
        const password = formData.get('login-password')
        console.log(userName, password)
    }
})




