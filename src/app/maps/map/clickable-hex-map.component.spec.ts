import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickableHexMapComponent } from './clickable-hex-map.component';

describe('ClickableHexMapComponent', () => {
  let component: ClickableHexMapComponent;
  let fixture: ComponentFixture<ClickableHexMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickableHexMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickableHexMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
