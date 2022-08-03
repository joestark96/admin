import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faCheck, faEdit, faTrash, faX, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';
import { AlertsService } from '../../services/alerts.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.scss']
})
export class GastosComponent implements OnInit {

  @ViewChild('tBody', { static: true }) tBody!: ElementRef;
  
  public faAdd = faAdd;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public faX = faX;
  public faCheck = faCheck;
  public faCalendar = faCalendar;

  public productoFilter: any;
  public monthSelect: any = this.date.getCurrentMonthYear();
  public query: any = {
    limit: 10,
    offset: 0,
    sort: 'DESC',
    count: 0,
    date: this.date.getCurrentMonthYear()
  };

  public count = 0;

  public bills: any = [  ];
  
  constructor(
    private api: ApiService,
    private router: Router,
    private alerts: AlertsService,
    private date: DateService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  search() {
    console.log('search');
  }

  editBill(product: any){
    this.router.navigateByUrl('/gastos/crear/' + product);
  }

  deleteBill(product: any){
    this.alerts.ask('Eliminar Gasto', '¿Estás seguro de eliminar este gasto?', (result: any) => {
      console.log(result);
      if (result) {
        this.api.eliminarRecurso('bills', product.id).subscribe(
          (data: any) => {
            this.cargarProductos();
          }
        );
      }
    });
  }

  changeStatus(element: any){
    element.status = element.status == 0 ? 1 : 0;
    this.api.activateRecurso('bills', element.id, element).subscribe(
      (data: any) => {
      }
    );
  }

  getProductos(){

    // this.api.mostrarRecursos("bills").subscribe(
    //   (data: any) => {
    //     this.bills = data.data;
    //     console.log(this.bills);
    //   }
    // );
    this.api.mostrarRecursosPorPartes("bills/partial", this.query).subscribe(
      (data: any) => {
        console.log(data);
        this.bills = data.data;
      }
    );

    this.api.mostrarRecursos('bills/count').subscribe(
      (data: any) => {
        this.query.count = data.data.total;
      }
    );
  }

  cargarProductos(){
    this.getProductos();
  }

  startPage() {
    this.query.offset = 0;
    this.cargarProductos();
  }

  endPage() {
    this.query.offset = this.query.count - this.query.limit;
    this.cargarProductos();
  }

  changeLimit(event: any) {
    this.query.limit = parseInt(event.target.value);
    this.query.offset = 0;
    console.log(this.query.limit);
    this.cargarProductos();
  }

  changeSort(value: any) {
    this.query.sort = value.target.value;
    this.cargarProductos();
  }

  changeMonth(){
    this.cargarProductos();
  }
  prevPage() {
    if (this.query.offset > 0 && this.query.offset >= this.query.limit) {
      this.query.offset -= this.query.limit;
    } else {
      this.query.offset = 0;
    }

    this.cargarProductos();
  }

  nextPage() {
    if (this.query.offset < this.query.count - this.query.limit) {
      this.query.offset += this.query.limit;
      this.cargarProductos();
    }
  }

  get productosFilter() {
    const regex = new RegExp(this.productoFilter, 'i');
    return this.bills.filter((producto: any) => {
      return (this.productoFilter == '' ? true : regex.test(producto.concept));
    });
  }

  public dateFormat(datetime: string){
    const date = datetime.split('T')[0].split('-');

    return date[2] + "-" + date[1] + "-" + date[0];
  }

  
  changeDate(){
    
  }
}
