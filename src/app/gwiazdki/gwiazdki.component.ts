import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'gwiazdki',
    templateUrl: './gwiazdki.component.html',
    styleUrls: ['./gwiazdki.component.css']
})
export class GwiazdkiComponent {
    @Input() ocena = 0
    @Input() ilosc_ocen = 0
    @Input() ocenianie = false
    @Input() pokaz_tekst = true
    @Input() male = false
    @Output() ocen = new EventEmitter<number>();

    ocena_zapis = 0
    gwiazdki1: number[] = []
    gwiazdki2: number[] = []

    ngOnInit() {
        let ocena = (this.ocena_zapis == 0) ? Math.round(this.ocena) : this.ocena_zapis
        this.gwiazdki1 = Array(ocena).fill(1).map((x, i) => i);
        this.gwiazdki2 = Array(5 - ocena).fill(1).map((x, i) => ocena + i);
    }

    gw_click(i:number)
    {
        this.ocena = i
        this.ocen.emit(i)
    }
    gw_mouseover(i:number)
    {
        this.ocena_zapis = i
        this.ngOnInit()
    }
    gw_mouseout()
    {
        this.ocena_zapis = 0
        this.ngOnInit()
    }
}
