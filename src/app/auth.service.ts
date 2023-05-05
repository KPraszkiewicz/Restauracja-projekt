import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { config } from 'src/assets/config';
import { Uzytkownik } from 'src/assets/dane';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    url = config.serwer_url
    uzytkownik: Uzytkownik | null = null


    private zalogowano_src = new Subject<string>();

    zalogowanoObs$ = this.zalogowano_src.asObservable();

    constructor(private http: HttpClient) 
    { }

    zaloguj(login: string, haslo: string) {
        let sub = this.http.post<any>(this.url + 'login', { login, haslo })
            .subscribe(dane => {
                this.setSession(dane)
                this.zalogowano_src.next(dane.user._id)
                this.uzytkownik = dane.user
                console.log(this.uzytkownik)
                sub.unsubscribe()
            })
    }
    zarejestruj(login: string, haslo: string) {
        return this.http.post<any>(this.url + "users", { login, haslo })
    }

    pobierz_uzytkownika(id: string) {
        return this.http.get<Uzytkownik>(this.url + "users/" + id)
    }

    pobierz_zalogowanego() {
        let id = localStorage.getItem("id_user")
        return this.http.get<Uzytkownik>(this.url + "users/" + id)
    }

    sprawdz_role(rola:string)
    {
        if(!this.jest_zalogowany())
            return false
            
        let role = localStorage.getItem("role")
        if(role)
            return role.includes(rola)
        return false
    }

    pobierz_login()
    {
        let log = localStorage.getItem('login');    
        if(log)
        {
            return log
        }
        return ""
    }

    czas() {

        return new Date().getTime() / 1000
    }



    refreshToken(refToken:string)
    {
        return this.http.post<any>(this.url + "refreshToken", {refreshToken: refToken})
    }
    getRefToken()
    {
        let refToken = localStorage.getItem("id_token_ref")
        if(refToken)
            return refToken
        return ''
    }

    setAccToken(token:string)
    {
        localStorage.setItem('id_token', token);
    }
    setSession(res: any) {
        const expiresAt = this.czas() + res.expiresIn

        localStorage.setItem('id_token', res.accessToken);
        localStorage.setItem('id_token_ref', res.refreshToken);
        localStorage.setItem('id_user', res.user._id);
        localStorage.setItem('role', res.user.role);
        localStorage.setItem('login', res.user.nazwa);
        localStorage.setItem("expires_at", expiresAt);
    }

    wyloguj() {
        this.uzytkownik = null
        localStorage.removeItem("id_token");
        localStorage.removeItem("id_token_ref");
        localStorage.removeItem("id_user");
        localStorage.removeItem("role");
        localStorage.removeItem("login");
        localStorage.removeItem("expires_at");
    }

    jest_zalogowany() {
        if(this.uzytkownik)
            return true;
        let id = localStorage.getItem('id_user');    
        if(id)
        {
            return true
        }
        return false

    }

    getExpiration() {
        return Number(localStorage.getItem("expires_at"));
    }
}
