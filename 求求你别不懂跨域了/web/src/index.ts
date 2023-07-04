import axios, { isCancel, AxiosError } from 'axios';

// axios.get("http://127.0.0.1:8080", {
//     params:{
//         id:"get"
//     }
// })

axios.defaults.withCredentials=true
axios.post("http://127.0.0.1:8080", {
    id: "post"
},{
    headers:{
        "Token":222
    }
}).then((res => {
    console.log(res)
})).catch((err) => {
    console.log(err)
})

// axios.delete("http://127.0.0.1:8080/delete", {
//     params:{
//         id:"delete"
//     }
// })

// axios.put("http://127.0.0.1:8080", {
//     id: "put"
// }).then((res => {
//     console.log(res)
// })).catch((err) => {
//     console.log(err)
// })