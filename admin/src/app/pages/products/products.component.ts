import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AlertsService } from '../../services/alerts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild('tBody', { static: true }) tBody!: ElementRef;
  
  public productoFilter: any;

  public query: any = {
    limit: 10,
    offset: 0,
    sort: 'DESC',
  };

  public count = 0;

  public products: any = [  ];
  
  constructor(
    private api: ApiService,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  search() {
    console.log('search');
  }

  editProduct(product: any){
    this.router.navigateByUrl('/productos/crear/' + product);
  }

  deleteProduct(product: any){
    this.alerts.ask('Eliminar producto', '¿Estás seguro de eliminar este producto?', (result: any) => {
      console.log(result);
      if (result) {
        this.api.eliminarRecurso('products', product).subscribe(
          (data: any) => {
            this.cargarProductos();
          }
        );
      }
    });
  }

  changeStatus(element: any){
    element.status = element.status == 0 ? 1 : 0;
    this.api.activateRecurso('products', element.id, element).subscribe(
      (data: any) => {
      }
    );
  }

  getProductos(){
    this.api.mostrarRecursosPorPartes("products/partial", this.query).subscribe(
      (data: any) => {
        console.log(data);
        this.products = data.data;
      }
    );

    this.api.mostrarRecursos('products/count').subscribe(
      (data: any) => {
        this.count = data.data;
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
    this.query.offset = this.count - this.query.limit;
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

  prevPage() {
    if (this.query.offset > 0 && this.query.offset >= this.query.limit) {
      this.query.offset -= this.query.limit;
    } else {
      this.query.offset = 0;
    }

    this.cargarProductos();
  }

  nextPage() {
    if (this.query.offset < this.count - this.query.limit) {
      this.query.offset += this.query.limit;
      this.cargarProductos();
    }
  }

  get productosFilter() {
    const regex = new RegExp(this.productoFilter, 'i');
    return this.products.filter((producto: any) => {
      return (this.productoFilter == '' ? true : regex.test(producto.name));
    });
  }

}
