import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  @Output() optionSelectedTrigger = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    console.log('Inicio componente');
  }

  optionChanges(indice: string){
    this.optionSelectedTrigger.emit(indice);
  }

}
