import { Component } from '@angular/core';
import {ServiceService } from '../../src/app/Services/service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'angular8';

  constructor( private generalservices:ServiceService) {



}
}
