

const loginRegisterForm = document.querySelector('#login_register_form')
const submitter = loginRegisterForm.querySelector('input[type="submit"]')
const formData = new FormData()

const isDataReady = ()=> {
    userName = formData.get('username')
    password = formData.get('password')
    password_again = formData.get('password_again')

        if(userName && password && password_again && userName.length > 4 && password.length > 4 && password == password_again){
            submitter.disabled = false
        }
    }

const handleChange = (data) => {
    for(const [k, v] of data){
        cls = loginRegisterForm.querySelector(`p[id="${k}_message"]`).classList

        if(k != 'password_again'){
            console.log(`${k}_message`)
            v.length > 4 ? cls.add('hidden') : cls.remove('hidden')
        }
        else{
            v.length > 4 && loginRegisterForm.querySelector(`input[name="password"]`).value == v ? cls.add('hidden') : cls.remove('hidden')
        }
    }

    isDataReady()
}



const setData = (data, name, currentValue) => {
    data.set(name, currentValue)
    handleChange(formData)
}

const getInputValue = (name) =>{
    currentValue = document.querySelector(`input[name=${name}]`).value
    setData(formData, name, currentValue)
}

const currentData =(e, func, data) => {
    data.set(func(e))
}

loginRegisterForm.addEventListener('submit', submitData)
function submitData(e){
    e.preventDefault()
    userName = formData.get('username')
    password = formData.get('password')
    password_again = formData.get('password_again')
    console.log(userName, password, password_again)
}




