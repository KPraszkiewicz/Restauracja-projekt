import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Danie } from 'src/assets/dane';
import { KoszykService } from '../koszyk.service';
import { Router } from '@angular/router';
import { DaniaService } from '../dania.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'danie-mini',
  templateUrl: './danie-mini.component.html',
  styleUrls: ['./danie-mini.component.css']
})
export class DanieMiniComponent {
    @Input() danie!: Danie;
    @Input() max_cena = Infinity
    @Input() min_cena = 0
    @Input() index = 0

    constructor(
        private koszyk_serwis: KoszykService,
        private dania_serwis :DaniaService,
        private router: Router,
        public auth:AuthService
        ) {}

    gwiazdki1: number[] = []
    gwiazdki2: number[] = []
    ocena_zapis = 0
    oceniono = false
    ngOnInit()
    {
        let ocena = (this.ocena_zapis == 0)? Math.round(this.danie.ocena) : this.ocena_zapis
        this.gwiazdki1 = Array(ocena).fill(1).map((x,i)=>i);
        this.gwiazdki2 = Array(5 - ocena).fill(1).map((x,i)=>ocena + i);
    }
    usun()
    {
        this.dania_serwis.usun_danie(this.danie.id)
    }
    bDodaj()
    {
        if(this.danie.dostepnosc > this.danie.ilosc)
        {
            this.danie.ilosc += 1
            this.bZamow()
        }
        
    }
    bOdejmij()
    {
        if(this.danie.ilosc > 0)
        {
            this.danie.ilosc += -1
            this.bZamow()
        }
        
    }
    bZamow()
    {
        this.koszyk_serwis.dodajDanie(this.danie)
    }

    pokaz_szczegoly()
    {
        this.router.navigate(['/danie',  this.danie.id ]);
    }
}
