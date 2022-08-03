import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faBars, faAppleAlt, faHome, faChartColumn, faBagShopping, faPowerOff, faClose, faStoreAlt, faScissors } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('lateralNavbar') lateralNavbar!: ElementRef;
  @ViewChild('navbarFullscreen') navbarFullscreen!: ElementRef;

  constructor(
    private session: SessionService
  ) { }

  //// Icons ////
  public barChart = faBars;
  public apple = faAppleAlt;
  public home = faHome;
  public char = faChartColumn;
  public shopping = faBagShopping;
  public powerOff = faPowerOff;
  public faClose = faClose;

  /// variables ///

  public navbarIsOpen = false;

  public links = [
    {
      name: 'Inicio',
      url: '/inicio',
      icon: faHome
    },
    {
      name: 'Productos',
      url: '/productos',
      icon: faAppleAlt
    },
    {
      name: 'Ventas',
      url: '/ventas',
      icon: faBagShopping
    },
    {
      name: 'Contable',
      url: '/contable',
      icon: faChartColumn
    },
    // {
    //   name: 'Sucursales',
    //   url: '/sucursales',
    //   icon: faStoreAlt
    // },
    {
      name: 'Gastos',
      url: '/gastos',
      icon: faScissors
    }
  ]
  //// Functions ////

  ngOnInit(): void {
  }
  
  compressNavbar(): void {
    this.navbarIsOpen = !this.navbarIsOpen;

    if(this.navbarIsOpen) {
      this.lateralNavbar.nativeElement.classList.remove('compress-navbar');
      this.navbarFullscreen.nativeElement.classList.remove('d-none');
    }else{
      this.lateralNavbar.nativeElement.classList.add('compress-navbar');
      this.navbarFullscreen.nativeElement.classList.add('d-none');

    }
  }
}
