import { Component } from '@angular/core';
import { Danie } from "../../assets/dane";
import { DaniaService } from '../dania.service';
import { Filtry } from '../filtry/filtry.component';
import { KoszykService } from '../koszyk.service';


@Component({
    selector: 'lista-dan',
    templateUrl: './lista-dan.component.html',
    styleUrls: ['./lista-dan.component.css']
})
export class ListaDanComponent {
    dania: Danie[] = []
    filtry?: Filtry
    max_cena = 0
    min_cena = Infinity
    strona = 0
    podzial_strony = 4
    ilosc_stron = 1

    private sub

    constructor(private koszyk_serwis: KoszykService,
        private dania_serwis: DaniaService) {
        koszyk_serwis.udaniaObs$.subscribe(
            id => {
                let d = this.dania.find(el => el.id == id)
                if (d)
                    d.ilosc = 0
            }
        )
        dania_serwis.usun_daniaObs$.subscribe(
            id => {
                this.dania = this.dania.filter(el => el.id != id)
                this.dania_init_mini()
            }
        )
        this.sub = dania_serwis.dodaj_filtr_obs$.subscribe(
            filtry => {
                this.filtry = filtry
                this.dania_init()
            }
        )
        dania_serwis.pobrano_dania_obs$.subscribe(() => {
            this.dania = dania_serwis.dania
            this.dania_init_mini()
        })
    }
    dania_init() {
        this.dania_serwis.pobierz_dania(this.strona, this.podzial_strony, this.filtry)
            .subscribe(dane => {

                this.dania = dane.map(danie => new Danie(danie))
                this.dania_init_mini()
            })

    }
    dania_init_mini() {
        this.max_cena = 0
        this.min_cena = Infinity
        for (let d of this.dania) {
            if (this.max_cena < d.cena)
                this.max_cena = d.cena
            if (this.min_cena > d.cena)
                this.min_cena = d.cena
        }
    }
    ngOnInit() {
        this.dania_serwis.get_info().subscribe(dane => {
            if (dane.ilosc_dan) {
                this.strona = 0
                this.ilosc_stron = Math.ceil(dane.ilosc_dan / this.podzial_strony)
                this.dania_serwis.pobierz_dania_test(this.strona, this.podzial_strony, this.filtry)
            }
        })
        //this.dania_serwis.pobierz_dania_test(this.strona, this.podzial_strony, this.filtry)

    }
    nast_strona() {
        if (this.strona + 1 < this.ilosc_stron)
            this.strona += 1;
        this.dania_serwis.pobierz_dania_test(this.strona, this.podzial_strony, this.filtry)
    }
    pop_strona() {
        if (this.strona > 0)
            this.strona -= 1;
        this.dania_serwis.pobierz_dania_test(this.strona, this.podzial_strony, this.filtry)
    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }
}
