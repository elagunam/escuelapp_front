import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient,
  ) { }

  getCentrosDeTrabajo(): Observable<any> {
    return this.http.get(environment.api+'get/centros');
  }

  getAlumnos(itemsPerPage = 50, pagina = 1, buscar = ''): Observable<any> {
    return this.http.get(environment.api+'get/alumnos/'+itemsPerPage+'?page='+pagina+'&buscar='+buscar);
  }

  getCalificacionesAlumno(id_alumno = 1): Observable<any> {
    return this.http.get(environment.api+'get/calificaciones/alumno/'+id_alumno);
  }

  saveCalificacionesAlumno(parametros: any): Observable<any> {
    return this.http.post(environment.api+'set/calificaciones/alumno', parametros);
  }

}
