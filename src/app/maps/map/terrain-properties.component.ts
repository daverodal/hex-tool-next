import {Component, OnInit, ViewChild} from '@angular/core';
import {MapsService} from '../../maps.service';
import {MapInfo} from '../map-info';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {HexMapComponent} from './hex-map.component';
import {TerrainPropertyComponent} from './terrain-property.component';

@Component({
  selector: 'htn-terrain-properties',
  templateUrl: './terrain-properties.component.html',
  styleUrls: ['./terrain-properties.component.scss']
})

export class TerrainPropertiesComponent implements OnInit {
  @ViewChild(TerrainPropertyComponent) propEditor: TerrainPropertyComponent;

  fetching = false;
  mapId: string ;
  savedMap: MapInfo = null;
  map: MapInfo;
  loaded = false;
  terrain: any[] = [];
  constructor(private router: Router,  private activatedRoute: ActivatedRoute, private maps: MapsService) {
    this.mapId = activatedRoute.snapshot.params['id'];
  }
  properties;

  addProperty(prop){
    this.properties = {  ...this.properties, ...prop}
    debugger;
  }

  editProperty(prop){
    this.propEditor.property.name = prop.key;
    this.propEditor.property.color = prop.value.color;
    this.propEditor.property.disp = prop.value.disp;
  }

  killProperty(property){

    delete(this.properties[name]);
    this.properties = { ...this.properties};

  }
  addRevolt(){
    const revProps = {


      EGC: {
        color: 'black',
        disp: 'C'
      },
      EGR: {
        color: 'black',
        disp: 'R'
      },
      EGM: {
        color: 'black',
        disp: 'M'
      },


      POC: {
        color: 'black',
        disp: 'C'
      },
      POR: {
        color: 'black',
        disp: 'R'
      },
      POM: {
        color: 'black',
        disp: 'M'
      },


      CZC: {
        color: 'black',
        disp: 'C'
      },
      CZR: {
        color: 'black',
        disp: 'R'
      },
      CZM: {
        color: 'black',
        disp: 'M'
      },


      HUC: {
        color: 'black',
        disp: 'C'
      },
      HUR: {
        color: 'black',
        disp: 'R'
      },
      HUM: {
        color: 'black',
        disp: 'M'
      },



      RMC: {
        color: 'black',
        disp: 'C'
      },
      RMR: {
        color: 'black',
        disp: 'R'
      },
      RMM: {
        color: 'black',
        disp: 'M'
      },



      BUC: {
        color: 'black',
        disp: 'C'
      },
      BUR: {
        color: 'black',
        disp: 'R'
      },
      BUM: {
        color: 'black',
        disp: 'M'
      },


      NAC: {
        color: 'black',
        disp: 'C'
      },
      NAR: {
        color: 'black',
        disp: 'R'
      },
      NAM: {
        color: 'black',
        disp: 'M'
      },


      SVC: {
        color: 'black',
        disp: 'C'
      },
      SVR: {
        color: 'black',
        disp: 'R'
      },
      SVM: {
        color: 'black',
        disp: 'M'
      }
    }

      this.properties = { ...this.properties, ...revProps};
  }
  ngOnInit() {
    console.log("NgOnInit");
    this.fetching = true;
    this.maps.fetchData((maps) => {
      debugger;
        this.loaded = true;
      this.map = maps.getMap(this.mapId);

      this.maps.fetchHexData(this.map.hexStr, (arg, arg2) => {
        this.fetching = false;
          console.log("RefetchData");
          // terrainProperty.mapper.Country = {color: 'red', disp: 'C'};
          this.properties = arg2.hexStr.customProperty;
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



  saveHex(){

    this.maps.saveHexData(this.map.hexStr, {hexStr: {map: this.mapId, hexEncodedStr: JSON.stringify(this.terrain), customProperty: this.properties}}, (arg) => {
      this.router.navigate(['/maps/' + this.mapId]);
    });
  }

  cancelHex() {
    this.router.navigate(['/maps/' + this.mapId]);
  }

}
