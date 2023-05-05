import { Component, Input } from '@angular/core';
import { Danie, Komentarz } from 'src/assets/dane';
import { AuthService } from '../auth.service';
import { DaniaService } from '../dania.service';
import { KomentarzeService } from '../komentarze.service';
import { KoszykService } from '../koszyk.service';


@Component({
    selector: 'app-danie',
    templateUrl: './danie.component.html',
    styleUrls: ['./danie.component.css']
})
export class DanieComponent {
    danie!: Danie
    komentarze !: Komentarz[]
    modal = false
    @Input() id: string = ""

    constructor(private koszyk_serwis: KoszykService,
        private dania_serwis: DaniaService,
        public auth: AuthService,
        public kom_serwis: KomentarzeService) {

    }

    ngOnInit() {
        this.dania_serwis.pobierz_danie(this.id).subscribe(
            {
                next: dane => {
                    this.danie = dane

                    console.log(this.danie)
                },
                error: err => {
                    console.log("nie udało się pobrać dania: " + this.id)
                }
            })
        this.kom_serwis.pobierz_komentarze(this.id).subscribe(dane => {
            this.komentarze = dane
        })
        console.log(this.danie)
    }

    click_modal(e: any, i: number) {
        if (i == 0) {
            this.modal = false
        }
        else if (i == 1) {
            this.modal = true
        }
        else // tło
        {
            this.modal = !this.modal
        }
        e.stopPropagation()
    }
    ocen(ocena: number) {
        let idu = this.auth.uzytkownik?._id
        if (idu) {
            this.dania_serwis.ocen_danie(this.id, idu, ocena).subscribe(
                {
                    next: dane => {
                        if (dane.ok) {
                            alert("Oceniono danie.")
                        }
                        console.log(dane)
                    },
                    error: err => {
                        console.log(err)
                    }
                }
            )

            console.log(ocena)
        }

    }
}
