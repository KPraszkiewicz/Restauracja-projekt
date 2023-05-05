import { Component } from '@angular/core';
import { Danie } from 'src/assets/dane';
import { DaniaService } from '../dania.service';
import { KoszykService } from '../koszyk.service';

@Component({
    selector: 'app-koszyk',
    templateUrl: './koszyk.component.html',
    styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent {
    isMenuCollapsed = true;
    menu_click() {
        this.isMenuCollapsed = true
    }

    dania: Danie[] = []

    constructor(private koszyk_serwis: KoszykService,
        private dania_serwis: DaniaService) {
        koszyk_serwis.ddaniaObs$.subscribe(
            danie => {
                let d = this.dania.find(el => el.id == danie.id)
                if(d)
                {
                    if(d.ilosc == 0)
                        this.usun_danie(d.id)
                    //d.ilosc += danie.ilosc
                }
                else
                {
                    this.dania.push(danie)
                }
                
            }
        )
        dania_serwis.usun_daniaObs$.subscribe(
            id => {
                this.usun_danie(id)
            }
        )
        
    }

    policz_ilosc() {
        return this.dania.reduce((suma,el) => {
            suma.ilosc += el.ilosc
            return suma
        }, new Danie()).ilosc
    }

    policz_cene() {
        let wynik = this.dania.reduce((suma,el) => {
            suma.cena += el.cena * el.ilosc
            return suma
        }, new Danie())
        return wynik.cena
    }

    usun_danie(id:string)
    {
        this.dania = this.dania.filter( el => el.id != id)
    }
}
