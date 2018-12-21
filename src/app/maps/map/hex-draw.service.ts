import { Injectable } from '@angular/core';
import { MapInfo } from '../map-info';
@Injectable()
export class HexDrawService {

  mapInfo : MapInfo = null;

  resize(){
    var canv : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-id');
    if(!canv){
      return;
    }
    var map : HTMLImageElement = <HTMLImageElement>document.getElementById('map-image');
    canv.width = map.width;
    canv.height = map.height;
  }

  constructor() {
  }

  setMap(mapInfo: MapInfo){
    this.mapInfo = mapInfo;
  }
  draw (x, y, color) {
  var A, B, C;
  A = this.mapInfo.a - 0;
  B = this.mapInfo.b - 0;
  C = this.mapInfo.c - 0;

  var trueCols = !this.mapInfo.trueRows;
  trueCols = true;/* weld that shut */
    var canv : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-id');
    if(!canv){
      return;
    }
  if (canv.getContext) {
    var ctx = canv.getContext('2d');

    ctx.fillStyle = color;
    ctx.strokeStyle = "#ff0000";

    if (trueCols) {
      y *= B * 2;
      if (x & 1) {
        y += B;
      }
      x *= A + C;

    } else {
      x *= B * 2;
      if (y & 1) {
        x += B;
      }
      y *= A + C;
    }


    ctx.beginPath();

    if (trueCols) {
      ctx.moveTo(x + 0, y + B);
      ctx.lineTo(x + A, y + 0);
      ctx.lineTo(x + A + C, y + 0);
      ctx.lineTo(x + A + A + C, y + B);
      ctx.lineTo(x + A + C, y + 2 * B);
      ctx.lineTo(x + A, y + (2 * B));
      ctx.lineTo(x + 0, y + B);
    } else {
      ctx.moveTo(x + 0, y + A + C);
      ctx.lineTo(x + 0, y + A);
      ctx.lineTo(x + B, y + 0);
      ctx.lineTo(x + 2 * B, y + A);
      ctx.lineTo(x + 2 * B, y + A + C);
      ctx.lineTo(x + B, y + 2 * C);
      ctx.lineTo(x + 0, y + A + C);
    }


    ctx.stroke();

  }
}
  doDraw (maxX, maxY) {

  this.clear();
  var x, y;
  for (x = 0; x < maxX; x++) {
    for (y = 0; y < maxY; y++) {
      this.draw(x, y, "#ffffff");
    }
  }
}
  clear() {
    var canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas-id');

    if (!canvas) {
      return;
    }
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}


}
