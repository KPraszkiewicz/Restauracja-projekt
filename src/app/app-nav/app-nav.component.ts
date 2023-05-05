import { Component } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent {
    isMenuCollapsed = true;

    constructor(public auth: AuthService) {
        
    }

    menu_click()
    {
        this.isMenuCollapsed = true
    }
}
