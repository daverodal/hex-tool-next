


import { Component, OnInit } from '@angular/core';
import {MapInfo} from './map-info';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
import { MapsService } from '../maps.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'htn-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  maps: MapInfo[] = [
  ];
  constructor(  private router: Router, private http: Http, private mapService: MapsService) {
    console.log('just one word, maps');
  }

  newMap(){
    console.log('called NewMap')
    this.mapService.newData((arg) => {
      console.log('returned from newmap ' + arg.map.id);
      this.maps.push(arg.map);
      this.router.navigate(['/maps/',arg.map.id]);
    });
  }
  ngOnInit() {
    console.log("this is on init");
    this.mapService.fetchData((mS)=>{this.maps = mS.maps;});

  }

}
