Dokumentacja API

</br></br>
** USER **
</br></br>
POST /user -> tworzenie nowego użytkownika, body: json {login(unique),password(minlength: 7)}, </br>
powodzenie ->> status 201, {user(_id, login), token} </br>
niepowodzenie ->> staus 400 >> ERROR (res.message(opis błedu)) >> głównie zajęty login / problemy z serwerem -> status 500 </br> </br>
POST /user/login -> logowanie, body: json {login,password}</br>
powodzenie ->> {user(_id, login), token}</br>
niepowodzenie ->> status 400</br>

POST /user/logout -> wylogowywanie, header Authorization ('Bearer token')</br>
powodzenie  ->></br>
niepowodzenie ->> 500</br>
</br>
PATCH /user -> zmiana hasła, header Authorization ('Bearer token'), body: json {password}</br>
powodzenie -> </br>
niepowodzenie -> status 400</br>
</br>
DELETE /user -> usuń konto, header Authorization ('Bearer token')</br>
powodzenie -></br>
niepowodzenie -> status 500</br>