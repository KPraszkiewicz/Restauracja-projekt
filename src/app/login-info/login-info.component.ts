import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Uzytkownik } from 'src/assets/dane';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login-info',
    templateUrl: './login-info.component.html',
    styleUrls: ['./login-info.component.css']
})
export class LoginInfoComponent {

    uzytkownik !: Uzytkownik
    nazwa = ''
    constructor(private router: Router,
        public auth: AuthService) {
        auth.zalogowanoObs$.subscribe(id => {
            auth.pobierz_uzytkownika(id).subscribe(u => {
                this.uzytkownik = u
                auth.uzytkownik = u
                this.nazwa = this.uzytkownik.nazwa
            })
        })
    }

    ngOnInit() {
        if (this.auth.jest_zalogowany())
            this.auth.pobierz_zalogowanego().subscribe(u => {
                this.uzytkownik = u
                this.auth.uzytkownik = u
                this.nazwa = this.uzytkownik.nazwa
            })
    }

    wyloguj() {
        this.uzytkownik = new Uzytkownik()
        this.auth.wyloguj()
        this.router.navigate(['/'])
    }
}
