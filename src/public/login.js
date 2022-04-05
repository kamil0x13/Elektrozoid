const API_URL = "https://elektrozoid.herokuapp.com/"
// const API_URL = "http://localhost:3001/"
registerUser = async ()=> {
    event.preventDefault();
    const response = document.getElementById('Response')



    const name = signup.elements["name"].value;
    const lastName = signup.elements["lastName"].value;
    const login = signup.elements["login"].value;
    const password = signup.elements["password"].value;

    try {
        const res = await fetch(`${API_URL}user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, lastName, login, password })
        })
        const result = await res.json()
        if (result.code && result.code === 11000) {
            response.innerHTML = 'Login nie dostępny!'
            //cb(11000)
        } else if (res.status === 201) {
            response.innerHTML = 'Utworzono urzytkownika: <br>Imie: ' + result.user.name + '<br>Nazwisko: '  + result.user.lastName + '<br>Token: ' + result.token
            localStorage.setItem('authenticated', true)
            localStorage.setItem('userName', result.user.name)
            localStorage.setItem('userLastName', result.user.lastName)
            localStorage.setItem('token', result.token)
            //cb()
        } else {
            response.innerHTML = 'Złe dane!'
            //cb(400)
        }
    } catch {
        response.innerHTML = 'Błąd serwera'
        //cb('Błąd serwera')
    }
}

loginUser = async ()=> {
    event.preventDefault();
    const response = document.getElementById('Response')

    const login = sigin.elements["login"].value;
    const password = sigin.elements["password"].value;

    const options = {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    }

    try {
        let res = await fetch(`${API_URL}user/login`, options)

        if (res.status === 200) {
            res = await res.json()
            localStorage.setItem('authenticated', true)
            localStorage.setItem('userName', res.user.name)
            localStorage.setItem('userLastName', res.user.lastName)
            localStorage.setItem('token', res.token)
            response.innerHTML = 'Zalogowano <br>userName ' + res.user.name + '<br>userLastName ' + res.user.lastName
        } else {
            response.innerHTML = 'Złe dane!'
        }
    } catch (e) {
        console.log(e)
        response.innerHTML = 'Błąd serwera'
    }
}

