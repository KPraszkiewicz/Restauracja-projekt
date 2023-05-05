import { Component } from '@angular/core';
import { Danie } from 'src/assets/dane';
import { DaniaService } from '../dania.service';

export class Filtry {
    cena_od?: number
    cena_do?: number
    typ?: string
    kat?: string
    gw?: number[]
}

@Component({
    selector: 'filtry',
    templateUrl: './filtry.component.html',
    styleUrls: ['./filtry.component.css']
})
export class FiltryComponent {
    cena_od_lim = Infinity
    cena_do_lim = 0
    typy: Set<string> = new Set<string>()
    kategorie: Set<string> = new Set<string>()
    gwiazdki = [false, false, false, false, false, false]
    filtry: Filtry = new Filtry()
    dania!: Danie[]

    constructor(private dania_serwis: DaniaService) {
        //this.init()
        dania_serwis.pobrano_dania_obs$.subscribe(()=>{
            this.dania = dania_serwis.dania
            for (let d of this.dania) {
                if (this.cena_od_lim > d.cena)
                    this.cena_od_lim = d.cena
                if (this.cena_do_lim < d.cena)
                    this.cena_do_lim = d.cena
                this.typy.add(d.typ)
                this.kategorie.add(d.kategoria)
            }
        })
    }
    wyslij_zmiany() {
        this.dania_serwis.dodaj_filtr(this.filtry)
    }
    init() {
        this.dania_serwis.pobierz_dania().subscribe(dania => {
            this.dania = dania
            for (let d of dania) {
                if (this.cena_od_lim > d.cena)
                    this.cena_od_lim = d.cena
                if (this.cena_do_lim < d.cena)
                    this.cena_do_lim = d.cena
                this.typy.add(d.typ)
                this.kategorie.add(d.kategoria)
            }
        })
    }
    zm_cena_od(event: any) {
        let cena = Number(event.target.value)
        if (!Number.isNaN(cena)) {
            if (cena < this.cena_od_lim) {
                cena = this.cena_od_lim
                event.target.value = cena
                this.filtry.cena_od = undefined
            }
            else {
                this.filtry.cena_od = cena
            }
        }
        else {
            event.target.value = this.cena_od_lim
        }
        this.wyslij_zmiany()

    }
    zm_cena_do(event: any) {
        let cena = Number(event.target.value)
        if (!Number.isNaN(cena)) {
            if (cena > this.cena_do_lim) {
                cena = this.cena_do_lim
                event.target.value = cena
                this.filtry.cena_do = undefined
            }
            else {
                this.filtry.cena_do = cena
            }
        }
        else {
            event.target.value = this.cena_do_lim
        }
        this.wyslij_zmiany()
    }
    zm_typ(event: any) {
        let typ = event.target.value
        if (typ != "") {
            this.filtry.typ = typ
        }
        else {
            this.filtry.typ = undefined
        }
        this.wyslij_zmiany()
    }
    zm_kategoria(event: any) {
        let kat = event.target.value
        if (kat != "") {
            this.filtry.kat = kat
        }
        else {
            this.filtry.kat = undefined
        }
        this.wyslij_zmiany()
    }

    zm_gwiazdki() {
        if (this.gwiazdki[0]
            || this.gwiazdki[1]
            || this.gwiazdki[2]
            || this.gwiazdki[3]
            || this.gwiazdki[4]
            || this.gwiazdki[5]
        ) {
            let gw: number[] = []
            for (let i = 0; i < this.gwiazdki.length; ++i) {
                if (this.gwiazdki[i]) {
                    gw.push(i)
                }
            }
            this.filtry.gw = gw
        }
        else {
            this.filtry.gw = undefined
        }
        this.wyslij_zmiany()
    }
    zm_gwiazdki_0(event: any) {
        this.gwiazdki[0] = event.target.checked
        this.zm_gwiazdki()
    }
    zm_gwiazdki_1(event: any) {
        this.gwiazdki[1] = event.target.checked
        this.zm_gwiazdki()
    }
    zm_gwiazdki_2(event: any) {
        this.gwiazdki[2] = event.target.checked
        this.zm_gwiazdki()
    }
    zm_gwiazdki_3(event: any) {
        this.gwiazdki[3] = event.target.checked
        this.zm_gwiazdki()
    }
    zm_gwiazdki_4(event: any) {
        this.gwiazdki[4] = event.target.checked
        this.zm_gwiazdki()
    }
    zm_gwiazdki_5(event: any) {
        this.gwiazdki[5] = event.target.checked
        this.zm_gwiazdki()
    }
}
