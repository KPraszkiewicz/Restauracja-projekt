import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-rejestracja',
    templateUrl: './rejestracja.component.html',
    styleUrls: ['./rejestracja.component.css']
})
export class RejestracjaComponent {
    login!: FormControl
    haslo!: FormControl
    haslo2!: FormControl
    myform !: FormGroup

    constructor(private router: Router,
        private auth: AuthService) { }


    ngOnInit() {
        this.createFormControls();
        this.createForm();

    }

    createFormControls() {
        this.login = new FormControl('', [Validators.required]);
        this.haslo = new FormControl('', [Validators.required]);
        this.haslo2 = new FormControl('', [Validators.required]);
    }
    createForm() {
        this.myform = new FormGroup({
            login: this.login,
            haslo: this.haslo,
            haslo2: this.haslo2,
        });
    }

    onlogin() {
        const val = this.myform.value;

        if (val.login && val.haslo && val.haslo2) {
            if (val.haslo == val.haslo2) {
                this.auth.zarejestruj(val.login, val.haslo).subscribe(dane => {
                    if (dane.ok) {
                        alert("Utworzono konto.")
                    }
                    else {
                        alert("Nie utworzono konta!")
                    }
                })
            }
            else {
                alert("Hasła muszą być takie same!")
            }
        }
        else {
            alert("Wprowadź wszystkie dane!")
        }
    }
}
