import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Input() product: any;
  @ViewChild('image') fileInput!: ElementRef;

  public faArrowCircleLeft = faArrowAltCircleLeft;
  public productForm!: FormGroup;
  public file: any = {
    archivo: null,
    url: null,
    change: false
  };

  public id: any = this.activeRouter.snapshot.paramMap.get('id');
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {

    var id = this.activeRouter.snapshot.paramMap.get('id'); 

    this.productForm = this.fb.group({
      name: [null, Validators.required],
      price: [null, Validators.required],
      image: [null],
      description: [null],
      status: [0],
      category: [null, Validators.required],
      sku: [null, Validators.required],
      user: [1]
    });

    // this.productForm.patchValue({
    //   name: 'Product 1',
    //   price: 100,
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
    //   category: 'Category 1'
    // });

    if (this.id != null) {

      this.api.mostrarRecursoPorId('products', parseInt(this.id)).subscribe(
        (res: any) => {
          console.log(res);
          this.productForm.patchValue({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
            status: res.data.status,
            sku: res.data.sku,
            category: res.data.category
          });

          if(res.data.image != null){
            this.file.archivo = res.data.image;
            this.file.url = `${this.api.getUrl()}/${res.data.image.path}`;
          }
        }
      );
    }
  }

  fileUpload(event: any) {
    this.file.archivo = event.target.files[0];
    this.file.change = true;
    this.file.url = this.imageService.satanizer(this.file.archivo);
  }
  
  deletePhoto(){
    this.file.archivo = null;
    this.file.change = false;
    this.file.url = null;
    this.fileInput.nativeElement.value = '';
  }

  saveProduct() {
    if (!this.productForm.valid) {
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

    var formData = new FormData();
    formData.append('data', JSON.stringify(this.productForm.value));

    formData.append('files.imagen', this.file.archivo);

    if(this.id != undefined) {
      this.api.actualizarRecurso('products/', this.id, formData).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El producto se actualizo correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.router.navigate(['/productos']);
          });
        }
      );
    }
    else{
      this.api.crearRecurso('products', formData).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Producto guardado',
            text: 'El producto se ha guardado correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              // this.productForm.reset();
              this.router.navigate(['/productos']);
            }
          });
        },
        (err: any) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar el producto',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          });
        }
      );
    }

  }

}
