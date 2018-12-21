import { Injectable } from '@angular/core';
import {HexPickService} from "./hex-pick.service";

@Injectable()
export class HexPartService {

  x:number = 0;
  y:number = 0;
  refHexpartX:number = 0;
  refHexpartY:number = 0;
  hexpartType:any;
  name:string = '';
  prefix:string = '';

//   hexpartInit(){
// // HexPart(name)
//   if ( HexPart.arguments.length === 1 )
//   {
//     this.name = HexPart.arguments[0];
//     this.calculateHexpart();
//   }
//
// // HexPart(x,y)
//   if ( HexPart.arguments.length === 2 )
//   {
//     this.x = HexPart.arguments[0];
//     this.y = HexPart.arguments[1];
//
//     this.calculateHexpartType();
//     this.calculateHexpartName();
//   }
// }

  setXY(x, y)
{
  this.x = x;
  this.y = y;

  this.calculateHexpartType();
//    this.calculateHexpartName();
}

//   setName( hexpartName )
// {
//   this.name = hexpartName;
//
//   this.calculateHexpart();
// }

  calculateHexpartType() {

  // center = 1, lower = 2, lower left = 3, upper left = 4
  this.hexpartType =  0;

  // 8 cases
  switch ( this.x % 4 ) {
    case 0:
      switch ( this.y % 4 ) {
        case 0:
          this.hexpartType =  1;
          break;
        case 2:
          this.hexpartType =  2;
          break;
      }
      break;

    case 1:
      switch ( this.y % 4 ) {
        case 1:
          this.hexpartType =  4;
          break;
        case 3:
          this.hexpartType =  3;
          break;
      }
      break;

    case 2:
      switch ( this.y % 4 ) {
        case 0:
          this.hexpartType =  2;
          break;
        case 2:
          this.hexpartType =  1;
          break;
      }
      break;

    case 3:
      switch ( this.y % 4 ) {
        case 1:
          this.hexpartType =  3;
          break;
        case 3:
          this.hexpartType =  4;
          break;
      }
      break;

    default:
      this.hexpartType =  0;
  }
}


  equals(hexpart)
{
  var isEqual;
  isEqual = false;

  if ( this.x === hexpart.getX() && this.y === hexpart.getY() )
  {
    isEqual = true;
  }

  return isEqual;
}

  getName()
{
  return this.name;
}

  getX()
{
  return this.x;
}

  getY() {

  return this.y;
}

  getHexpartType()
{
  return this.hexpartType;
}

  getHexpartTypeName() {

  var hexpartTypeName = new Array("", "center", "lower", "lowerLeft", "lowerRight");

  return hexpartTypeName[this.hexpartType];
}
  constructor() {

  }

}
