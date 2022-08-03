import { Component, HostListener, ViewChildren, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SessionService } from './services/session.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( 
    public session: SessionService, 
    public router: Router
    ){}

}
