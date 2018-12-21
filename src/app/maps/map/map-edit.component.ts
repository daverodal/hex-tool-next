import { Component, OnInit, ViewChild, OnChanges, DoCheck} from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router"
import { MapsService } from "../../maps.service";
import { MapInfo } from "../map-info";
import {HexMapComponent} from "./hex-map.component";


@Component({
  selector: 'htn-map-edit',
  templateUrl: './map-edit.component.html',
  styles: []
})
export class MapEditComponent implements OnInit, OnChanges, DoCheck {
  SIN  = Math.sin(Math.PI / 3);


  keyEvent(event, name){
    if(event.key === "ArrowUp"){
      this.map[name]++;
      return false;

    }
    if(event.key === "ArrowDown"){
      this.map[name]--;
      return false;

    }
    return true;
  }
  @ViewChild(HexMapComponent) hexMap: HexMapComponent;

  mapId :string ;
  savedMap : MapInfo = null;
  map: MapInfo;
  loaded: boolean = false;
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
    this.map = new MapInfo();
  }

  ngDoCheck(){

    if(this.map){
      if(this.map.perfectHexes){
        let hexside = this.map.c;
        this.map.a =  hexside / 2;
        this.map.b =  hexside * this.SIN;
      }
    }
    this.hexMap.refresh(this.map);
  }

  ngOnChanges(arg){
  }

  ngOnInit() {
    this.maps.fetchData((maps)=>{
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.savedMap = Object.assign({}, this.map);
        this.hexMap.refresh(this.map);
      }
    );
  }
  save() {
    this.map.x = this.map.x - 0;
    this.map.y = this.map.y - 0;
    this.map.a = this.map.a - 0;
    this.map.b = this.map.b - 0;
    this.map.c = this.map.c - 0;
    this.map.numX = this.map.numX - 0;
    this.map.numY = this.map.numY - 0;


    this.maps.saveData(this.mapId, {map: this.map}, maps =>{
      Object.assign(this.savedMap, this.map);
      this.router.navigateByUrl('/maps/'+this.mapId);
    });


  }

  cancel(){
    Object.assign(this.map, this.savedMap);
    this.router.navigateByUrl('/maps/'+this.mapId);
  }

}
