import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})
export class AlumnosComponent implements OnInit {
  public isLoading: boolean;
  public message: string;
  public error: boolean;
  public alumnos: any;
  public paginaActual: number;
  public totalPaginas: number;
  public items: number;
  public prevPagina= 0;
  public nextPagina = 0;
  form: FormGroup;

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
  ) {
    this.isLoading = true;
    this.message = 'Cargando...';
    this.error = false;
    this.alumnos = [];
    this.paginaActual = 0;
    this.totalPaginas = 0;
    this.items = 50;
    this.form = this.fb.group({
      items: [50, []],
      buscar: ['', []]
    });
  }

  get formControl() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.getAlumnos(1);
  }

  getAlumnos(pagina: number){
    this.appService.getAlumnos(this.formControl['items'].value, pagina, this.formControl['buscar'].value).subscribe({
      next: (response)=> {
        this.isLoading = false;
        this.error = false;
        this.alumnos = response.data;
        this.totalPaginas = response.last_page;
        this.paginaActual = response.current_page;
        this.prevPagina = response.current_page - 1;
        this.nextPagina = response.current_page +1;
        window.scrollTo(0,0);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        this.error = true;
        this.message = 'No se pudo cargar la información de los centros de trabajo';
      }
    });

  }

  changePage(pagina: number){
    this.getAlumnos(pagina);
  }

}

