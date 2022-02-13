import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { MainComponent } from './components/main/main.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { CentrosComponent } from './pages/centros/centros.component';
import { CalificacionesComponent } from './pages/calificaciones/calificaciones.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    InicioComponent,
    CentrosComponent,
    CalificacionesComponent,
    AlumnosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatTabsModule,
    HttpClientModule
    ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
