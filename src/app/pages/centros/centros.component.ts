import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.scss']
})
export class CentrosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Centros component');
  }

}
