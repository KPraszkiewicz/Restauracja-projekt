import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Danie } from 'src/assets/dane';
import { KoszykService } from '../koszyk.service';

@Component({
  selector: 'danie-koszyk',
  templateUrl: './danie-koszyk.component.html',
  styleUrls: ['./danie-koszyk.component.css']
})
export class DanieKoszykComponent {
    @Input() index :number = 0
    @Input() danie!:Danie
    @Output() usuwany = new EventEmitter<string>()
    
    constructor(private koszyk_serwis: KoszykService)
    {
        
    }
    usun()
    {
        this.usuwany.emit(this.danie.id);
        this.koszyk_serwis.usunDanie(this.danie.id)
    }
}
