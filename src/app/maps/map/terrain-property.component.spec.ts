import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrainPropertyComponent } from './terrain-property.component';

describe('TerrainPropertyComponent', () => {
  let component: TerrainPropertyComponent;
  let fixture: ComponentFixture<TerrainPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrainPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrainPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
