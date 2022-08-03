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
  public billForm!: FormGroup;


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

    this.billForm = this.fb.group({
      concept: [null, Validators.required],
      amount: [null, Validators.required],
      notes: [null]
    });

    // this.billForm.patchValue({
    //   concept: 'lorem ipsum',
    //   amount: 123,
    //   notes: 'dolor sit ameth'
    // });

    if (this.id != null) {

      this.api.mostrarRecursoPorId('bills', parseInt(this.id)).subscribe(
        (res: any) => {
          console.log(res);
          this.billForm.patchValue({
            concept: res.data.concept,
            amount: res.data.amount,
            notes: res.data.notes
          });

        }
      );
    }
  }

  saveProduct() {
    if (!this.billForm.valid) {
      Swal.fire({
        title: 'Error',
        text: 'Ingrese los datos del gasto',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
      });

      return;
    }

    if(this.id != undefined) {
      this.api.actualizarRecurso('bills/', this.id, this.billForm.value).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El gasto se actualizo correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            this.router.navigate(['/gastos']);
          });
        }
      );
    }
    else{
      this.api.crearRecurso('bills',  this.billForm.value).subscribe(
        (res: any) => {
          Swal.fire({
            title: 'Gasto guardado',
            text: 'El gasto se ha guardado correctamente',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              // this.billForm.reset();
              this.router.navigate(['/gastos']);
            }
          });
        },
        (err: any) => {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar el gasto',
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
