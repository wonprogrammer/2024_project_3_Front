console.log("api loading suceess")

window.onload = () => {
    handleSignin()
    handleLogin()
}

async function handleSignin(){
    console.log("signup 동작 확인")
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/signup/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify({
            'email':email,
            'password':password
        })
    })
    console.log(response)
}

async function handleLogin(){
    console.log("login 동작 확인")
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    console.log(email, password)

    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers:{
            'content-type':'application/json',
        },
        method:'POST',
        body:JSON.stringify({
            'email':email,
            'password':password
        })
    })

    const response_json = await response.json()

    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    console.log(response)
    console.log(response_json)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);
}
