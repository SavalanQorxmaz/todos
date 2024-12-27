

const rootElement = document.querySelector('#root')
const formData = new FormData()

const isDataReady = ()=> {
    const userName = formData.get('register-username')
    const password = formData.get('register-password')
    const password_again = formData.get('register-password_again')
    console.log(userName, password, password_again)
    if(userName && password && password_again && userName.length > 4 && password.length > 4 && password == password_again){
            document.querySelector('input[type="submit"]').disabled = false
        }
    }

const handleChange = (data) => {
    for(const [k, v] of data){
        const cls = rootElement.querySelector(`p[id="${k}_message"]`).classList

        if(k != 'password_again'){
            v.length > 4 ? cls.add('hidden') : cls.remove('hidden')
        }
        else{
            v.length > 4 && rootElement.querySelector(`input[name="register-password"]`).value == v ? cls.add('hidden') : cls.remove('hidden')
        }
    }

}



const setData = (data, name, currentValue) => {
    data.set(name, currentValue)
    handleChange(formData)
}

rootElement.addEventListener('keyup', (e)=>{
    const inputNames = ['register-username', 'register-password', 'register-password_again']
    console.log(e.target.name)
   for (let x of inputNames){
    if(e.target.name  == x){
        setData(formData, x, e.target.value)
    }
   }
   isDataReady()
})


rootElement.addEventListener('submit', (e)=>{
    if(e.target.id == "register-form"){
        e.preventDefault()
        const userName = formData.get('register-username')
        const password = formData.get('register-password')
        const password_again = formData.get('register-password_again')
        console.log(userName, password, password_again)
    }
})


