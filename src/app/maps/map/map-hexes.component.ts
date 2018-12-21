import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import {HexMapComponent} from './hex-map.component';
import {MapInfo} from '../map-info';
import {MapsService} from '../../maps.service';
import {ClickableHexMapComponent} from './clickable-hex-map.component';
import * as _ from 'lodash';

@Component({
  selector: 'htn-map-hexes',
  templateUrl: './map-hexes.component.html',
  styles: []
})
export class MapHexesComponent implements OnInit {
  SIN  = Math.sin(Math.PI / 3);



  @ViewChild(ClickableHexMapComponent) hexMap: ClickableHexMapComponent;

  terrain =  [];
  saveTerrain = [];

  mapId: string ;
  savedMap: MapInfo = null;
  map: MapInfo;
  loaded = false;
  terrainProperty = null;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
    this.map = new MapInfo();
  }

  onPropertyCreated(property){
    _.each(property, (value, key) => {
      this.hexMap.addProperty(key, value);
    });
    debugger;
  }

  ngOnInit() {
    console.log("NgOnInit");
    const terrainProperty = this.hexMap.terrainProperty;
    this.maps.fetchData((maps) => {
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.savedMap = Object.assign({}, this.map);
        this.maps.fetchHexData(this.map.hexStr, (arg, arg2) => {
          console.log("RefetchData");
          // terrainProperty.mapper.Country = {color: 'red', disp: 'C'};
          const customProps = arg2.hexStr.customProperty;
          this.hexMap.addCustomProperties(customProps);
          // _.each(customProps, (value, key) => {
          //     this.hexMap.addProperty(key, value);
          // });
          // this.hexMap.addProperty('TownAnd', {color: 'red', disp: 'C'});
          debugger;
          this.terrain = arg;
        });
        // this.hexMap.refresh(this.map);
      }
    );
  }
}
