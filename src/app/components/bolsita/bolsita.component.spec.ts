import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BolsitaComponent } from './bolsita.component';

describe('BolsitaComponent', () => {
  let component: BolsitaComponent;
  let fixture: ComponentFixture<BolsitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BolsitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BolsitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
