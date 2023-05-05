import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Danie } from 'src/assets/dane';
import { DaniaService } from '../dania.service';
//https://codecraft.tv/courses/angular/forms/submitting-and-resetting/
@Component({
    selector: 'app-dodaj-danie',
    templateUrl: './dodaj-danie.component.html',
    styleUrls: ['./dodaj-danie.component.css']
})
export class DodajDanieComponent {
    myform!: FormGroup;
    public nazwa!: FormControl
    public opis!: FormControl
    public cena!: FormControl
    public obrazy!: FormControl
    public typ!: FormControl
    public kategoria!: FormControl
    public skladniki!: FormControl
    public dostepnosc!: FormControl

    constructor(private dania_serwis: DaniaService) {

    }

    ngOnInit() {
        this.createFormControls();
        this.createForm();

    }

    createFormControls() {
        this.nazwa = new FormControl("", Validators.required);
        this.opis = new FormControl('', Validators.required);
        this.cena = new FormControl('', [
            Validators.required,
            Validators.min(0)
        ]);
        this.obrazy = new FormControl('', [
            Validators.required,
        ]);
        this.typ = new FormControl('', Validators.required);
        this.kategoria = new FormControl('', Validators.required);
        this.skladniki = new FormControl('', Validators.required);
        this.dostepnosc = new FormControl('', [
            Validators.required,
            Validators.min(0),
            Validators.pattern("[0-9]*")
        ]);
    }

    createForm() {
        this.myform = new FormGroup({
            nazwa: this.nazwa,
            opis: this.opis,
            cena: this.cena,
            obrazy: this.obrazy,
            typ: this.typ,
            kategoria: this.kategoria,
            skladniki: this.skladniki,
            dostepnosc: this.dostepnosc,
        });
    }
    onSubmit() {
        if (this.myform.valid) {
            console.log("Form Submitted!");
            
            let danie = this.myform.value
            if(typeof(danie.obrazy) == 'string') danie.obrazy = danie.obrazy.split("\n")
            if(typeof(danie.skladniki) == 'string') danie.skladniki = danie.skladniki.split("\n")


            // TODO: wysłanie na serwer
            this.dania_serwis.dodaj_danie(this.myform.value)
                .subscribe(dane => {
                    if(dane.ok)
                    {
                        alert("Dodano danie!")
                    }
                    else{
                        alert("Nie dodano dania!")
                    }
                })
                console.log(danie);
        }
        
    }
    reset() {
        this.myform.reset();
    }
}
