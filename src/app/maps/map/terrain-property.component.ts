import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'htn-terrain-property',
  templateUrl: './terrain-property.component.html',
  styleUrls: ['./terrain-property.component.scss']
})
export class TerrainPropertyComponent implements OnInit {

  property: any  = {};
  @Output() propertyCreated = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onClick(){
    debugger;
    const obj = {};
    obj[this.property.name] = {color: this.property.color, disp: this.property.disp}
    this.propertyCreated.emit(obj);
  }
}
