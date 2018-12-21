import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHexesComponent } from './map-hexes.component';

describe('MapHexesComponent', () => {
  let component: MapHexesComponent;
  let fixture: ComponentFixture<MapHexesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapHexesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapHexesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
