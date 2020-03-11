import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsesorAcademicoComponent } from './asesor-academico.component';

describe('AsesorAcademicoComponent', () => {
  let component: AsesorAcademicoComponent;
  let fixture: ComponentFixture<AsesorAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsesorAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesorAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
