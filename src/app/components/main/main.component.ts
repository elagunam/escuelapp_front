import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('tabs') private tabs?: MatTabGroup;

  constructor() { }

  ngOnInit(): void {
  }

  changeTab(event: string){
    console.log(event);

  }

}
