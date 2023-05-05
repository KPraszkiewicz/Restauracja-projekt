import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {  Danie } from 'src/assets/dane';

@Injectable({
    providedIn: 'root'
})
export class KoszykService {
    // Observable string sources
    private ddaniaSource = new Subject<Danie>();
    private udaniaSource = new Subject<string>();

    // Observable string streams
    ddaniaObs$ = this.ddaniaSource.asObservable();
    udaniaObs$ = this.udaniaSource.asObservable();

    constructor() { }

    dania!:Danie[]
    dodajDanie(danie: Danie) {
        console.log(danie)
        this.ddaniaSource.next(danie)
    }
    usunDanie(id:string) {
        this.udaniaSource.next(id)
    }
}
