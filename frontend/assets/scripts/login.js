

const handleChange = (e, data) => {
    // e = loginRegisterForm.querySelector(`input[name="${e}"]`)
    
    const situation = {
        username: 'empty',
        password: 'empty',
        password_again: 'empty'
    }
    switch (e.target.getAttribute('name')) {


        case 'username': {
            data.set('username', e.target.value)
            return e.target.value.length > 4 ?  'username-ready' : (e.target.value.length==0? 'password-empty' : 'username-incorrect')

        }
        case 'password': {
            data.set('password', e.target.value)
            return e.target.value.length > 4 ?  'password-ready' : (e.target.value.length==0? 'password-empty' : 'password-incorrect')
        }
        case 'password_again': {
            data.set('password_again', e.target.value)
            return e.target.value == e.target.parentNode.querySelector('input[name="password"]').value ?  'password_again-ready' : 'password_again-incorrect'
        }
    }
}


const formData = new FormData()

// const getInputValue = (name) =>{
//     currentValue = document.querySelector(`input[name=${name}]`).value
//     const data = {}
//     data[name] = currentValue
//     // data.set(name, currentValue)
//     console.log(data)
//     return data
// }

const currentData =(e, func, data) => {
    data.set(func(e))
}


const loginRegisterForm = document.querySelector('#login_register_form')
const submitter = loginRegisterForm.querySelector('input[type="submit"]')


loginRegisterForm.addEventListener('keyup',(e)=>{
    result = handleChange(e, formData)
    const [elem, situation] = result.split('-')
    console.log(elem, situation)
    
    switch(elem){
        case 'username': {
            cls = loginRegisterForm.querySelector('p[id="username_message"]').classList
            console.log(loginRegisterForm.querySelector('p[id="username_message"]'))
           situation == 'incorrect'? cls.remove('hidden') :  (situation == 'ready'? cls.add('hidden') : cls.remove('hidden'))
        }
        case 'password': {
            cls = loginRegisterForm.querySelector('p[id="password_message"]').classList
            console.log(loginRegisterForm.querySelector('p[id="password_message"]'))
            situation == 'incorrect'? cls.remove('hidden') :  (situation == 'ready'? cls.add('hidden') : cls.remove('hidden'))
        }
        case 'password_again': {
            cls = loginRegisterForm.querySelector('p[id="password_again_message"]').classList
            console.log(loginRegisterForm.querySelector('p[id="password_again_message"]'))
            situation == 'incorrect'? cls.remove('hidden') :   cls.add('hidden') 
        }
        // default: cls.add('hidden')
    }
    console.log()
    // for (const [key, value] of formData) {
    //     console.log(`${key}: ${value}\n`)
    //   }
    console.log(formData.get('username'))
})

