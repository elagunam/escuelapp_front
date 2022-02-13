import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.scss']
})
export class CalificacionesComponent implements OnInit {
  public isLoading: boolean;
  public message: string;
  public error: boolean;
  public alumno: any;
  public materias: any;
  form: FormGroup;
  public id_alumno = 3;
  public lockForm = false;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.isLoading = true;
    this.message = 'Cargando...';
    this.error = false;
    this.alumno = false;
    this.materias = false;
    this.form = this.fb.group({
      id_alumno: [null, [Validators.required]],
      calificaciones: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCalificaciones();
  }

  getCalificaciones(){
    this.isLoading = true;
    this.appService.getCalificacionesAlumno(this.id_alumno).subscribe({
      next: (response)=>{
        this.isLoading = false;
        if(response.status){
          this.error = false;
          this.alumno = response.alumno;
          this.materias = response.calificaciones;
          this.form.get('id_alumno')?.setValue(response.alumno.id);
          this.generateCampos(response.calificaciones);
        }else{
          this.error = true;
          this.message = response.message;
        }
      },
      error: (error)=> {
        console.log(error);
        this.isLoading = false;
        this.error = true;
        this.message = 'No se pudo cargar la información de los centros de trabajo';
      }
    });
  }

  get calificaciones() {
    return this.form.get('calificaciones') as FormArray;
  }

  promedio(indice: number){
    const p1 = this.calificaciones.at(indice).get('calificacion_p1')?.value | 0;
    const p2 = this.calificaciones.at(indice).get('calificacion_p2')?.value | 0;
    const p3 = this.calificaciones.at(indice).get('calificacion_p3')?.value | 0;
    const promedio = ((p1+p2+p3)/3).toFixed(2);
    return promedio;
  }

  disableForm(){
    this.lockForm = true;
    this.form.disable();
  }

  generateCampos(calificaciones: any[]){
    calificaciones.forEach((materia, index)=>{
      const formGroup = this.fb.group({
        id_materia: [materia.id, [Validators.required]],
        calificacion_p1: [materia.calificacion_p1, [Validators.required]],
        calificacion_p2: [materia.calificacion_p2, [Validators.required]],
        calificacion_p3: [materia.calificacion_p3, [Validators.required]],
      });
      this.calificaciones.push(formGroup);
      if(materia.calificacion_p1 || materia.calificacion_p2 || materia.calificacion_p3){
        this.disableForm();
      }
    });
  }

  guardarCalificaciones(){
    this.form.disable();
    this.appService.saveCalificacionesAlumno(this.form.value).subscribe({
      next: (response) => {
        if(response.status){
          this.lockForm = true;
          this.getCalificaciones();
          this.snackBar.open(response.message, '', {
            duration: 2000,
            panelClass: ['bg-success', 'text-white']
          });
        }else{
          this.form.enable();
          this.snackBar.open(response.message, '', {
            duration: 2000,
            panelClass: ['bg-danger', 'text-white']
          });
        }
      },
      error: (error)=> {
        this.form.enable();
        this.snackBar.open('No se puedo procesar su petición en este momento, intente más tarde', '', {
          duration: 2000,
          panelClass: ['bg-danger', 'text-white']
        });
      }
    });
  }

}
