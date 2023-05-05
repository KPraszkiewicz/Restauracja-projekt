import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    login!: FormControl
    haslo!: FormControl
    myform !: FormGroup

    constructor(private router: Router,
        private auth: AuthService) {
        auth.zalogowanoObs$.subscribe(user =>{
            router.navigate(['/'])
        })
     }


    ngOnInit() {
        this.createFormControls();
        this.createForm();

    }

    createFormControls() {
        this.login = new FormControl('', [Validators.required]);
        this.haslo = new FormControl('', [Validators.required]);
    }
    createForm() {
        this.myform = new FormGroup({
            login: this.login,
            haslo: this.haslo,
        });
    }

    onlogin() {
        const val = this.myform.value;

        if (val.login && val.haslo) {
            this.auth.zaloguj(val.login, val.haslo)   
        }
        else {
            alert("Wprowadź wszystkie dane!")
        }
    }
}
