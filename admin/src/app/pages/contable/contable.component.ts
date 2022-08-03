import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-contable',
  templateUrl: './contable.component.html',
  styleUrls: ['./contable.component.scss']
})
export class ContableComponent implements OnInit {

  constructor(
    public dateService: DateService,
    private api: ApiService
  ) { }

  public date = this.dateService.getCurrentMonthYear();
  
  public ventas: any = [];
  public bills: any = [];
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.api.mostrarRecursosPorDate("ventas/date",this.date).subscribe(
      (data: any) => {
        console.log(data);
        this.ventas = data.data;
    });

    this.api.mostrarRecursosPorDate("bills/date",this.date).subscribe(
      (data: any) => {
        console.log(data);
        this.bills = data.data;
    });
  }

  get billsTotal(){
    var total = 0;

    this.bills.forEach((element: any) => {
      total += element.amount;
    });

    return total;
  }

  get ventasTotal(){
    var total = 0;

    this.ventas.forEach((element: any) => {
      total += element.total;
    });
    return total;
  }

  get ventasSubtotal(){
    var total = 0;

    this.ventas.forEach((element: any) => {
      total += element.subtotal;
    });
    return total;
  }

  get contable(){
    return this.ventasTotal - this.billsTotal;
  }
}
