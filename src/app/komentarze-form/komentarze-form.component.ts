import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Komentarz } from 'src/assets/dane';
import { AuthService } from '../auth.service';
import { DaniaService } from '../dania.service';
import { KomentarzeService } from '../komentarze.service';

@Component({
  selector: 'komentarze-form',
  templateUrl: './komentarze-form.component.html',
  styleUrls: ['./komentarze-form.component.css']
})
export class KomentarzeFormComponent {
    @Input() idd = ''
    myform!: FormGroup;
    public nick!: FormControl
    public tytul!: FormControl
    public opis!: FormControl
    public data!: FormControl

    constructor(private auth:AuthService,
        private dania_serwis: DaniaService,
        private kom_serwis: KomentarzeService)
        {}

    ngOnInit() {
        this.createFormControls();
        this.createForm();
        console.log(this.myform)
    }

    createFormControls() {
        this.nick = new FormControl("", Validators.required);
        this.tytul = new FormControl('', Validators.required);
        this.opis = new FormControl('', Validators.required);
        this.data = new FormControl('');

    }

    createForm() {
        this.myform = new FormGroup({
            nick: this.nick,
            tytul: this.tytul,
            opis: this.opis,
            data: this.data,
        });
    }
    onSubmit() {
        if (this.myform.valid && this.auth.uzytkownik) {
            console.log("Form Submitted!");
            let kom = new Komentarz()
            kom.nick = this.myform.value.nick
            kom.tytul = this.myform.value.tytul
            kom.opis = this.myform.value.opis
            kom.data = this.myform.value.data
            kom.idu = this.auth.uzytkownik._id
            kom.idd = this.idd

            this.kom_serwis.dodaj_komentarz(this.idd, kom).subscribe(dane => {
                console.log(dane)
            })
            console.log(this.myform.value)

        }
        
    }
    reset() {
        this.myform.reset();
    }
}
