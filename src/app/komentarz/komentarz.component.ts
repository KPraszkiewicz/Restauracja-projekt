import { Component, Input } from '@angular/core';
import { Komentarz } from 'src/assets/dane';

@Component({
  selector: 'komentarz',
  templateUrl: './komentarz.component.html',
  styleUrls: ['./komentarz.component.css']
})
export class KomentarzComponent {
    @Input() kom!: Komentarz
    data = ''

    ngOnInit()
    {
        //this.data = this.kom.data.toLocaleDateString()
    }
}
