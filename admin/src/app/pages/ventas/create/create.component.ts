import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../services/api.service';
import { faTrash, faSave, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { DateService } from 'src/app/services/date.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public id = this.activeRouter.snapshot.paramMap.get('id');
  public venta: any = {};
  @ViewChild('productos') productos!: ElementRef;

  public faArrowCircleLeft = faArrowAltCircleLeft;
  public products: any = [];
  public categorias: any = [];

  public cart: any = [];
  public faTrash = faTrash;

  public categoriaFilter: string = '';
  public productoFilter: any = '';
  public name: any = '';

  public faSave = faSave;
  public faCheck = faCheck;
  ventaForm!: FormGroup;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private alerts: AlertsService,
    private router: Router,
    private alert: AlertController
  ) { }

  async ngOnInit(): Promise<void> {

    this.ventaForm = this.fb.group({
      name: [null],
      total: [null],
      subtotal: [null],
      iva: [null],
      user: [1],
      status: ["ABIERTA", Validators.required],
      notes: [null]
    });

    this.cargarProductos();
    this.cargarVenta();

    const alert = await this.alert.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK']
    });

    await alert.present();
  }

  cargarProductos() {
    this.api.mostrarRecursosPorPartes('products/active', { limit: -1, offset: -1, sort: 'DESC' }).subscribe(
      (data: any) => {
        data.data.forEach((producto: any) => {
          if (producto.image != null) {
            this.api.mostrarRecursoPorId('uploads', producto.image).subscribe(
              (data: any) => {
                producto.image = data.data;
                this.products.push(producto);
              });
          } else {
            this.products.push(producto);
          }

          if (this.categorias.indexOf(producto.category) == -1) {
            this.categorias.push(producto.category);
          }
        });
      }
    );
  }

  cargarVenta() {
    if (this.id != null) {
      this.api.mostrarRecursoPorId('ventas', parseInt(this.id)).subscribe(
        (data: any) => {
          this.venta = data.data.venta;

          this.ventaForm.patchValue({
            name: this.venta.name != null ? this.venta.name : "",
            notes: this.venta.notes != null ? this.venta.notes : "",
            total: this.venta.total,
            subtotal: this.venta.subtotal,
            iva: this.venta.iva,
            user: this.venta.user,
            status: this.venta.status
          });

          data.data.productos.forEach((producto: any) => {
            this.cart.push(producto);
          });
        });
      }
    }
    

  addProducto(producto: any) {
    //verificar si el producto ya esta en el carrito
    let existe = false;
    this.cart.forEach((productoCart: any) => {
      if (productoCart.producto == producto.id) {
        productoCart.quantity++;
        this.actualizarProducto(productoCart);
        existe = true;
        this.createVenta();
      }
    });

    if (!existe) {
      producto.quantity = 1;
      let product = {
        id: null,
        venta: this.venta.id,
        producto: producto.id,
        quantity: producto.quantity,
        name: producto.name,
        price: producto.price,
      };

      
      this.api.crearRecurso('ventas/producto', product).subscribe(
        (data: any) => {
          product.id = data.data.insertId;
          this.cart.push(product);
          this.createVenta();
        }
      ); 
    }

    this.createVenta();
  }

  getURL(producto: any) {
    return 'url("' + this.api.getUrl() + '/' + producto.image.path + '")';
  }

  actualizarProducto(producto: any) {
    this.api.actualizarRecurso('ventas/producto', producto.id, producto).subscribe(
      (data: any) => {
        this.createVenta();
      }
    ); 
  } 

  borrarProducto(producto: any) {
    this.api.eliminarRecurso('ventas/producto', producto.id).subscribe(
      (data: any) => {
        this.cart.splice(this.cart.indexOf(producto), 1);
      }
    );
  }
  addCantidad(producto: any) {
    this.cart[producto].quantity++;
    this.actualizarProducto(this.cart[producto]);
  }

  minusCantidad(producto: any) {
    this.cart[producto].quantity--;
    this.actualizarProducto(this.cart[producto]);

    if (this.cart[producto].quantity <= 0) {
      this.borrarProducto(this.cart[producto]);
    }
  }

  get total() {
    var total = 0;
    this.cart.forEach((producto: any) => {
      total += (producto.price || 0) * producto.quantity;
    });

    return total;
  }

  get subtotal() {
    var subtotal = (this.total * 84 / 100).toFixed(2);
    return subtotal;
  }

  get iva() {
    var iva = (this.total * 16 / 100).toFixed(2);
    return iva;
  }

  get productosFilter() {
    const regex = new RegExp(this.productoFilter, 'i');
    return this.products.filter((producto: any) => {
      return (this.categoriaFilter == '' ? true : producto.category == this.categoriaFilter) && (this.productoFilter == '' ? true : regex.test(producto.name));
    });
  }

  createVenta() {
    this.ventaForm.patchValue({
      total: this.total,
      subtotal: this.subtotal,
      iva: this.iva,
    });

    if (!this.ventaForm.valid) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese los datos del producto',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });

      return;
    }

    console.log(this.venta);
    console.log(this.ventaForm.value);
    this.api.actualizarRecurso('ventas', this.venta.id, this.ventaForm.value).subscribe(async (data: any) => { 
      const alert = await this.alert.create({
          header: 'Alert',
          subHeader: 'Important message',
          message: 'This is an alert!',
          buttons: ['OK']
        });

        await alert.present();

      });

  }

  closeVenta(venta: any){
    console.log(venta);
    this.alerts.ask("Terminar venta", "Desea terminar esta venta?", (res: any) => {
      console.log(res);
      
      if(res){
        venta.status = 'CERRADA';
        this.api.actualizarRecurso("ventas", venta.id, venta).subscribe((data: any) => {
          // console.log(data);
          this.router.navigateByUrl('/ventas');
        });
      }
    });
  }

}
