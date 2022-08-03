import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  public links = [
    {
      name: 'Inicio',
      url: '/inicio',
    },
    {
      name: 'Productos',
      url: '/productos',
    },
    {
      name: 'Ventas',
      url: '/ventas',
    },
    {
      name: 'Contable',
      url: '/contable',
    }
  ]

  ngOnInit(): void {
  }

}
