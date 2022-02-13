import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss']
})
export class CentrosComponent implements OnInit {
  public isLoading: boolean;
  public message: string;
  public error: boolean;
  public centros: any;

  constructor(
    private appService: AppService
  ) {
    this.isLoading = true;
    this.message = 'Cargando...';
    this.error = false;
    this.centros = [];
  }

  ngOnInit(): void {
    this.getCentrosDeTrabajo();
  }


  getCentrosDeTrabajo(){
    this.appService.getCentrosDeTrabajo().subscribe({
      next: (response)=>{
        this.isLoading = false;
        if(response.status){
          this.error = false;
          this.message = response.message;
          this.centros = response.centros_de_trabajo;
        }else{
          this.error = true;
          this.message = response.message;
          this.centros = [];
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = true;
        this.message = 'No se pudo cargar la información de los centros de trabajo';
        console.log(error);
      }
    });

  }

}
