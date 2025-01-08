import { getCookie } from "./index.js";

export async function tasksDefault(e){
    if(document.querySelector('#tasks')){
        return new Promise((res, rej)=>{
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
                'Access-Control-Allow-Methods': '*',
                "Content-Type": "application/json",
                "Authorization": `${getCookie().get('access')}`
              };
            fetch('http://127.0.0.1:8000/',{
                method: 'GET',
                headers: headers,
            })
            .then(res=>{
                return res.json()
            })
            .then(res=>console.log(res))
           
        })
    }
}