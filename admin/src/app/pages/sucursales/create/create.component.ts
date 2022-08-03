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

  @Input() branch: any;
  @ViewChild('image') fileInput!: ElementRef;

  public faArrowCircleLeft = faArrowAltCircleLeft;
  public branchForm!: FormGroup;

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

    this.branchForm = this.fb.group({
      name: [null, Validators.required],
      telephone: [null],
      address: [null],
    });

    // this.branchForm.patchValue({
    //   name: 'branch 1',
    //   price: 100,
    //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
    //   category: 'Category 1'
    // });

    if (this.id != null) {
      console.log(this.id);
      this.api.mostrarRecursoPorId('branchs', parseInt(this.id)).subscribe(
        (res: any) => {
          console.log(res);
          this.branchForm.patchValue({
            name: res.data.name,
            telephone: res.data.telephone,
            address: res.data.address
          });

        }
      );
    }
  }

  saveBranch() {
    if (!this.branchForm.valid) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese los datos de la sucursal',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });

      return;
    }

    if(this.id != undefined) {
      this.api.actualizarRecurso('branchs/', this.id, this.branchForm.value).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Actualizado',
            text: 'La sucursal se actualizo correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.router.navigate(['/sucursales']);
          });
        }
      );
    }
    else{
      this.api.crearRecurso('branchs', this.branchForm.value).subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire({
            title: 'Sucursal guardada',
            text: 'La sucursal se ha guardado correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              // this.branchForm.reset();
              this.router.navigate(['/sucursales']);
            }
          });
        },
        (err: any) => {
          console.log(err);

          var error = '';

          if(err.error.error.errno == 1062) error = ": Nombre de la sucursal ya existe"
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar la sucursal' + error,
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
