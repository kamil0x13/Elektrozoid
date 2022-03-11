Dokumentacja API

POST /user -> tworzenie nowego użytkownika, body: json {login(unique),password(minlength: 7)}, 
powodzenie ->> status 201, {user(_id, login), token}
niepowodzenie ->> staus 400 >> ERROR (res.message(opis błedu)) >> głównie zajęty login / problemy z serwerem -> status 500

POST /user/login -> logowanie, body: json {login,password}
powodzenie ->> {user(_id, login), token}
niepowodzenie ->> status 400

POST /user/logout -> wylogowywanie, header Authorization ('Bearer token')
powodzenie  ->>
niepowodzenie ->> 500

PATCH /user -> zmiana hasła, header Authorization ('Bearer token'), body: json {password}
powodzenie -> 
niepowodzenie -> status 400

DELETE /user -> usuń konto, header Authorization ('Bearer token')
powodzenie ->
niepowodzenie -> status 500