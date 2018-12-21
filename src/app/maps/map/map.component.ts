import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { MapsService } from '../../maps.service';
import { MapInfo } from '../map-info';
import {HexDrawService} from './hex-draw.service';
import {HexMapComponent} from './hex-map.component';
@Component({
  selector: 'htn-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  @ViewChild(HexMapComponent) hexMap: HexMapComponent;

  mapId: string;
  map: MapInfo;
  savedMap: MapInfo = null;
  loaded = false;
  publishing = false;
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
    this.map = new MapInfo();

  }

  cloneMe(){
    let pubUrl = '/rest/cloneFile/' + this.map.id;
    this.publishing = true;
    this.maps.publish(pubUrl, (arg) => {
      debugger;
      this.publishing = false;
      this.router.navigate(['/maps/', arg.mapId]);

    });
  }
  publishMe(){
    let pubUrl = '';
    let map = this.map;
    pubUrl = '/wargame/terrainInit/'+map.gameName + "/" + map.scenarioName + "/" + map.hexStr;
    this.publishing = true;
    this.maps.publish(pubUrl, (arg) => {
      this.publishing = false;
    });
  }

  deleteMe() {
    var txt;
    var ret = confirm("really, really delete");

    if (!ret) {
      return;
    }
    debugger;
    const hexStr = this.map.hexStr;
    this.maps.deleteHexData(hexStr, () => {
      this.maps.deleteMapData(this.map.id, () => {

        this.router.navigate(['/maps/']);

        debugger;
      });
      debugger;
    });
  }

  ngOnInit() {
    console.log("On Init Dude ");
    this.maps.fetchData((maps) => {
        this.map = maps.getMap(this.mapId);
        this.loaded = true;
        this.hexMap.refresh(this.map);
      },
    );
  }


}
