import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-r-danie',
    templateUrl: './app-r-danie.component.html',
    styleUrls: ['./app-r-danie.component.css']
})
export class AppRDanieComponent {
    constructor(private route: ActivatedRoute) { }
    id :string = ""
    ngOnInit() {
        if(this.route.snapshot.paramMap.get('id'))
            this.id = this.route.snapshot.paramMap.get('id')!
    }
    
}
