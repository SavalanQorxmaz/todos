

const data =  `
<div class="login-register">
<form id="login_register_form" action="" method="post">
    <input onkeyup="getInputValue('username')"  class="login-register" type="text" name="username" id="username" placeholder="UserName">
    <p id="username_message" class="message hidden">Min 5 char</p>
    <input onkeyup="getInputValue('password')" class="login-register" type="password" name="password" id="password" placeholder="Password">
    <p id="password_message" class="message hidden">Min 5 char</p>
    <input onkeyup="getInputValue('password_again')"  class="register " type="password" name="password_again" id="password_again" placeholder="Password Again">
    <p id="password_again_message" class="message hidden"> different</p>
    <input  type="submit" value="Send Data" disabled>
</form>
<button id="register" onclick="register2()">Register</button>
</div>`

export default async function  login2() {
    try {
        const res_1 = await new Promise((res, rej) => {
            res(data)
            rej('data not defined')
        })
        document.querySelector('#root').innerHTML = res_1
    } catch (err) {
        document.querySelector('#root').innerHTML = err
    }
  }