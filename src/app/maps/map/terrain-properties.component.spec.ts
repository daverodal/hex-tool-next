import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainPropertiesComponent } from './terrain-properties.component';

describe('TerrainPropertiesComponent', () => {
  let component: TerrainPropertiesComponent;
  let fixture: ComponentFixture<TerrainPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrainPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
