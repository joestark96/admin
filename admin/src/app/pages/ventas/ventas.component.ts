import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faAdd, faTrash, faEdit, faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AlertsService } from 'src/app/services/alerts.service';
import { ApiService } from 'src/app/services/api.service';
import { DateService } from 'src/app/services/date.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  @ViewChild('tBodyVentas', { static: true }) tBody!: ElementRef;
  
  public searchText: any;

  public query: any = {
    limit: 10,
    offset: 0,
    sort: 'ASC',
    date: this.dateService.getToday().split('T')[0]
  };

  public count = 0;
  public faAdd = faAdd;
  public faTrash = faTrash;
  public faEdit = faEdit;
  public faX = faX;
  public faCheck = faCheck;
  public ventas: any = [  ];
  
  constructor(
    private api: ApiService,
    private router: Router,
    private dateService: DateService,
    private alerts: AlertsService
  ) { }

  ngOnInit(): void {
    console.log(this.query);
    this.getVentas();
  }

  search() {
    console.log('search');
  }

  editVenta(venta: any){
    this.router.navigateByUrl('/ventas/create/' + venta);
  }

  deleteVenta(venta: any){
    this.alerts.ask('Cancelar venta', '¿Estás seguro de cancelar esta venta?', (result: any) => {
      console.log(result);
      if (result) {
        // this.api.eliminarRecurso('ventas', venta).subscribe(
        //   (data: any) => {
        //     this.cargarVentas();
        //   }
        // );

        venta.status = 'CANCELADA';
        this.api.actualizarRecurso('ventas', venta.id, venta).subscribe((data: any) => {
          console.log(data);
        });
      }
    });
  }

  getVentas(){
    this.api.mostrarRecursosPorPartes("ventas/partial",this.query).subscribe(
      (data: any) => {
        this.ventas = data.data;
        console.log(data);
        // data.data.forEach((element: any) => {
        //   var tr = `
        //       <tr>
  
        //           <td>${element.folio}</td>
        //           <td>${element.name || '-'}</td>
        //           <td>$${element.total || 0}</td>
        //           <td>${element.status}</td>
        //           <td>
        //               <button class="btn btn-primary m-1 editVenta" data-id="${element.id}">Editar</button>
        //               <button class="btn btn-danger m-1 deleteVenta" data-id="${element.id}">Eliminar</button>
        //           </td>
        //       </tr>
        //   `;
        //   this.tBody.nativeElement.innerHTML += tr;
        // });

        // document.querySelectorAll('.editVenta').forEach((element: any) => {
        //   element.addEventListener('click', (e: any) => {
        //     this.editVenta(e.target.dataset.id);
        //   });
        // });

        // document.querySelectorAll('.deleteVenta').forEach((element: any) => {
        //   element.addEventListener('click', (e: any) => {
        //     this.deleteVenta(e.target.dataset.id);
        //   });
        // });
      }
    );

    this.api.mostrarRecursos('ventas/count').subscribe(
      (data: any) => {
        this.count = data.data.total;
      }
    );
  }

  cargarVentas(){
    // this.tBody.nativeElement.innerHTML = '';
    this.getVentas();
  }

  startPage() {
    this.query.offset = 0;
    this.cargarVentas();
  }

  endPage() {
    this.query.offset = this.count - this.query.limit;
    this.cargarVentas();
  }

  changeLimit(event: any) {
    this.query.limit = parseInt(event.target.value);
    this.query.offset = 0;
    console.log(this.query.limit);
    this.cargarVentas();
  }

  changeSort(value: any) {
    this.query.sort = value.target.value;
    // this.cargarVentas();
  }

  changeDate(value: any){
    this.query.date = value.target.value;
    this.cargarVentas();
  }

  prevPage() {
    if (this.query.offset > 0 && this.query.offset >= this.query.limit) {
      this.query.offset -= this.query.limit;
    } else {
      this.query.offset = 0;
    }

    this.cargarVentas();
  }

  nextPage() {
    if (this.query.offset < this.count - this.query.limit) {
      this.query.offset += this.query.limit;
      this.cargarVentas();
    }
  }

  crearVenta(){
    const venta = {
      user: 1,
      status: 'ABIERTA', 
    };

    this.api.crearRecurso('ventas', venta).subscribe(
      (data: any) => {
        console.log(data);
        this.router.navigateByUrl('/ventas/create/' + data.data.result );
      }
    );
  }

  closeVenta(venta: any){
    console.log(venta);
    this.alerts.ask("Terminar venta", "Desea terminar esta venta?", (res: any) => {
      console.log(res);
      
      if(res){
        venta.status = 'CERRADA';
        this.api.actualizarRecurso("ventas", venta.id, venta).subscribe((data: any) => {
          // console.log(data);
        });
      }
    });
  }

  public get total() {
    var total = 0;

    this.ventas.forEach((element: any) => {
      if(element.status != 'CANCELADA') total += element.total;
    });
    return total;
  }

  public type = 'TODAS';

  public get ventasSort(){
    return this.ventas.filter(( element: any )=> {
      if(this.type == 'TODAS') return true;
      else return this.type == element.status ? true : false; 
    });
  }
}
