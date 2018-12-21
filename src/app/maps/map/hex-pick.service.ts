import { Injectable } from '@angular/core';
import {HexPartService} from "./hex-part.service";
import {MapInfo} from "../map-info";

@Injectable()
export class HexPickService {
  originX: number = 0;
  originY: number = 0;
  topHeight: number = 0;
  bottomHeight: number = 0;
  hexsideWidth: number = 0;
  centerWidth: number = 0;
  hexagonWidth: number = 0;
  hexagonHeight: number = 0;
  halfHexagonHeight: number = 0;
  halfHexagonWidth: number = 0;
  oneFourthHexagonHeight: number = 0;
  leftMapEdge: number = 0;
  hexagonX: number = 0;
  hexagonY: number = 0;
  x : number = 0;
  y : number = 0;

  // pixel info from screen
  mapGridX: number = 0;
  mapGridY: number =  0;
  distanceFromLeftEdgeOfHexagon: number = 0;
  distanceFromTopEdgeOfHexagon: number = 0;
  column: number = 0;
  row: number = 0;
  number: number =  0;

  // hexagon and it's hexpart
  hexagon: any = 0;
  hexpart: any = 0;
  constructor(private hexPartService: HexPartService) {
  }

  getX(){
    return this.hexPartService.x;
  }

  getY(){
    return this.hexPartService.y;
  }

  myInit(mapData: MapInfo)
  {
  var b = <number>mapData.b - 0;
  var a = <number>mapData.a - 0;
  var c = <number>mapData.c - 0;

  var xOff = (a + c) * 2 - (c/2 + a);
  this.originX =  xOff - mapData.x ;
  this.originY =  3 * b -  mapData.y;
  this.topHeight =  b;
  this.bottomHeight =  b;
  this.hexsideWidth =  a;
  this.centerWidth =  c;

  this.hexagonHeight =  this.topHeight + this.bottomHeight;
  this.hexagonWidth =  this.hexsideWidth + this.centerWidth;
  this.halfHexagonHeight =  this.hexagonHeight / 2;
  this.halfHexagonWidth =  this.hexagonWidth / 2;
  this.oneFourthHexagonHeight =  this.hexagonHeight / 4;
  this.leftMapEdge =  -(this.hexsideWidth + (this.centerWidth / 2));

//    this.hexagon = new Hexagon();
}

  setPixels(pixelX, pixelY)
{

  this.calculateHexpartFromPixels(pixelX, pixelY);
  this.calculateHexagonFromPixels();
  this.calculateHexagonNumber();
}

  setHexagonXY(x, y)
{

  this.hexagonX = x;
  this.hexagonY = y;
}

  setHexpartXY(x, y)
{
  this.mapGridX = (this.halfHexagonWidth * x) - this.originX;
  this.mapGridY = (this.oneFourthHexagonHeight * y) - this.originY;
  this.hexPartService.setXY(x, y);
}

  calculateHexpartFromPixels(pixelX, pixelY)
{

  var hexpartX, hexpartY;

  // adjust for hexagonGrid origin
  this.mapGridX = pixelX + this.originX;
  this.mapGridY = pixelY + this.originY;

  this.column =  Math.floor((this.mapGridX - this.leftMapEdge) / this.hexagonWidth);
  this.distanceFromLeftEdgeOfHexagon =  (this.mapGridX - this.leftMapEdge) - (this.column * this.hexagonWidth);

  if (this.distanceFromLeftEdgeOfHexagon < this.hexsideWidth) {

    //  it's a / or \ hexside
    hexpartX = (2 * this.column) - 1;
    this.row =  Math.floor(this.mapGridY / this.halfHexagonHeight);
    hexpartY = (2 * this.row) + 1;
    this.distanceFromTopEdgeOfHexagon =  this.mapGridY - (this.row * this.topHeight);
  }
  else
  {

    // it's a center or lower hexside
    hexpartX = 2 * (this.column);
    this.mapGridY =  this.mapGridY + this.oneFourthHexagonHeight;
    this.row =  Math.floor(this.mapGridY / this.halfHexagonHeight);
    hexpartY = (2 * this.row);
    this.distanceFromTopEdgeOfHexagon =  this.mapGridY - (this.row * this.topHeight);
  }
  this.hexPartService.setXY(hexpartX, hexpartY);
}

  calculateHexagonNumber()
{
  var x, y;
  var $minX = 4;
  var $minY = 8;
  var $evenColumnShiftDown = true;
  x = ( (this.hexagonX -$minX ) / 2 ) + 1;

  if($evenColumnShiftDown === true)
  {
    y = Math.floor(((this.hexagonY - $minY) / 4) + 1);
  } else {
    y = Math.floor(((this.hexagonY - $minY + 2) / 4) + 1);
  }
  this.number =  x * 100 + y;
}
  getHexpartType(){
    return this.hexPartService.getHexpartType();
  }
  calculateHexagonFromPixels()
{

  var hexpartX, hexpartY, hexpartType;

  hexpartX = this.hexPartService.x;
  hexpartY = this.hexPartService.y;
  hexpartType = this.hexPartService.getHexpartType();
  switch (hexpartType)
  {
    case 1:
      this.setHexagonXY(hexpartX, hexpartY);
      break;

    case 2:
      if (this.distanceFromTopEdgeOfHexagon < this.oneFourthHexagonHeight) {
        this.setHexagonXY(hexpartX, hexpartY - 2);
      }
      else
      {
        this.setHexagonXY(hexpartX, hexpartY - 2);
//          this.setHexagonXY(hexpartX, hexpartY + 2);
      }
      break;

    case 3:
      // check the tangent of the hexside line with tangent of the mappoint
      //
      // the hexside line tangent is opposite / adjacent = this.hexsideWidth / this.topHeight
      // the mappoint tangent is opposite / adjacent =  this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon
      //
      // is mappoint tangent <  line tangent ?
      // (this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon) < (this.hexsideWidth / this.topHeight)
      //
      // multiply both sides by this.topHeight
      // (this.distanceFromLeftEdgeOfHexagon / this.distanceFromTopEdgeOfHexagon) * this.topHeight  < (this.hexsideWidth )
      //
      // multiply both sides by this.distanceFromTopEdgeOfHexagon
      // (this.distanceFromLeftEdgeOfHexagon * this.topHeight ) < (this.distanceFromTopEdgeOfHexagon * this.hexsideWidth)
      //

      if (this.distanceFromLeftEdgeOfHexagon * this.topHeight < this.distanceFromTopEdgeOfHexagon * this.hexsideWidth) {
        //  ______
        //  |\ |  |
        //  | \|  |
        //  |* |\ |
        //  |__|_\|
        //
//          this.setHexagonXY(hexpartX - 1, hexpartY + 1);
        this.setHexagonXY(hexpartX + 1, hexpartY - 1);
      }
      else
      {
        //  ______
        //  |\ |  |
        //  | \|* |
        //  |  |\ |
        //  |__|_\|
        //
        this.setHexagonXY(hexpartX + 1, hexpartY - 1);
      }
      break;

    case 4:
      // check the tangent of the hexside line with tangent of the mappoint
      //
      // see above
      //

      if (this.distanceFromLeftEdgeOfHexagon * this.topHeight < this.distanceFromTopEdgeOfHexagon * this.hexsideWidth) {
        //  ______
        //  |  | /|
        //  |* |/ |
        //  | /|  |
        //  |/_|_ |
        //
//          this.setHexagonXY(hexpartX - 1, hexpartY - 1);
        this.setHexagonXY(hexpartX + 1, hexpartY + 1);
      }
      else
      {
        //  ______
        //  |  | /|
        //  |  |/ |
        //  | /|* |
        //  |/_|_ |
        //
        this.setHexagonXY(hexpartX + 1, hexpartY + 1);
      }
      break;
  }
}

  getHexpart()
{
  return this.hexpart;
}

  getHexagon()
{
  return this.hexagon;
}

  getPixelX()
{
  return this.mapGridX;
}

  getPixelY()
{
  return this.mapGridY;
}

}

