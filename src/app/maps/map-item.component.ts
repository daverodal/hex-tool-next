import { Component, OnInit, Input } from '@angular/core';
import { MapInfo } from './map-info';
@Component({
  selector: 'htn-map-item',
  templateUrl: 'map-item.component.html',
  styleUrls: ['./map-item.component.scss']
})
export class MapItemComponent implements OnInit {

  @Input() mapInfo: MapInfo;
  constructor() { }

  ngOnInit() {
  }

}
