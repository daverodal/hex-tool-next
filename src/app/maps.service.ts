import {Injectable} from '@angular/core';
import {MapInfo} from './maps/map-info';
import {Http, Response, Headers} from '@angular/http';
import {HttpErrorResponse} from '@angular/common/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import { map } from 'rxjs/operators';

var x;

@Injectable()
export class MapsService {

  isFetched = false;
  maps: MapInfo[] = [];

  constructor(private http: Http, private _flashMessagesService: FlashMessagesService) {

  }

  setData(maps: MapInfo[]) {
    this.maps = maps;
  }

  saveData(id, data, callback) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    const jsonData = JSON.stringify(data);
    return this.http.put('/rest/maps/' + id, jsonData, {headers: headers})
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (fetchedData: any) => {
          callback(fetchedData);
        }
      );
  }

  newData(callback) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');

    const myObj = {
      map: {
        a: 16,
        b: 27.5,
        c: 32,
        gameName: null,
        hexSize: null,
        hexStr: null,
        hexes: null,
        isDefault: true,
        mapHeight: null,
        mapUrl: 'http://davidrodal.com/battle-maps/MCW.png',
        mapWidth: 'width:auto',
        myAttr: null,
        numX: 20,
        numY: 10,
        perfectHexes: false,
        scenarioName: null,
        trueRows: false,
        x: 8,
        y: 0,
      }
    };


    const jsonData = JSON.stringify(myObj);
    return this.http.post('/rest/maps', jsonData, {headers: headers})
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          const myHexstr = {hexStr: {hexEncodedStr: [], map: data.map.id}};
          this.http.post('/rest/hexStrs', JSON.stringify(myHexstr), {headers: headers})
            .pipe(map((response: Response) => response.json()))
            .subscribe(
              (hData: any) => {
                myObj.map.hexStr = hData.hexStr.id;
                this.http.put('/rest/maps/' + data.map.id, JSON.stringify(myObj), {headers: headers})
                  .pipe(map((response: Response) => response.json()))
                  .subscribe((arg) => {
                    callback(arg);
                  });
              });
        }
      );
  }

  fetchData(callback) {
    this.maps = [];
    // if (this.isFetched === true) {
    //   callback(this);
    //   return;
    // }
    // this.isFetched = true;
    console.log('Fetching ');
    return this.http.get('/rest/maps')
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          this._flashMessagesService.show('Data Fetched', {cssClass: 'alert-success', timeout: 1000});

          console.log('Data ');
          for (const i in data.maps) {
            const map = data.maps[i];
            this.maps.push(new MapInfo(
              map.a,
              map.b,
              map.c,
              map.gameName,
              map.hexSize,
              map.hexStr,
              map.hexes,
              map.id,
              map.isDefault,
              map.mapHeight,
              map.mapUrl,
              map.mapWidth,
              map.myAttr,
              map.numX,
              map.numY,
              map.perfectHexes,
              map.scenarioName,
              map.trueRows,
              map.x,
              map.y)
            );
          }
          callback(this);
        },
        (error: HttpErrorResponse) => {
          this._flashMessagesService.show('ERROR: ' + error.url + ' ' + error.statusText, {
            cssClass: 'alert-danger',
            timeout: 5000
          });

          console.log('whoops');
          console.log(error);
        }
      );
  }

  getData() {
    return this.maps;
  }

  getMap(mapId: string) {
    for (const i in this.maps) {
      if (mapId === this.maps[i].id) {
        return this.maps[i];
      }
    }
  }

  fetchHexData(hexstr, callback) {

    return this.http.get('/rest/hexStrs/' + hexstr)
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          callback(JSON.parse(data.hexStr.hexEncodedStr), data);
        }
      );
  }


  deleteHexData(hexstr, callback) {

    return this.http.delete('/rest/hexStrs/' + hexstr)
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          callback(data);
        },
        (data: any) => {
          callback(data);
        }
      );
  }

  deleteMapData(hexstr, callback) {

    return this.http.delete('/rest/maps/' + hexstr)
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          callback(data);
        },
        (data: any) => {
          callback(data);
        }
      );
  }
  saveHexData(id, data, callback) {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    const jsonData = JSON.stringify(data);
    return this.http.put('/rest/hexStrs/' + id, jsonData, {headers: headers})
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (fetchedData: any) => {
          callback(fetchedData);
        }
      );
  }

  publish(url, callback) {
    return this.http.get(url)
      .pipe(map((response: Response) => response.json()))
      .subscribe(
        (data: any) => {
          this._flashMessagesService.show('Published', {cssClass: 'alert-success flashy', timeout: 3000});
          callback(data);
        },
        (error: HttpErrorResponse) => {
          this._flashMessagesService.show('ERROR: ' + error.url + ' ' + error.statusText, {
            cssClass: 'alert-danger',
            timeout: 5000
          });
          callback({})
          console.log(error);
        }
      );
  }

}
