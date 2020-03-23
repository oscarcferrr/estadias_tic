import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorIndustrialComponent } from './asesor-industrial.component';

describe('AsesorIndustrialComponent', () => {
  let component: AsesorIndustrialComponent;
  let fixture: ComponentFixture<AsesorIndustrialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesorIndustrialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorIndustrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
