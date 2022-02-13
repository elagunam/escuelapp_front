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

}
