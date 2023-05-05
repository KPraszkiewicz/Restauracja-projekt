import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajDanieComponent } from './dodaj-danie.component';

describe('DodajDanieComponent', () => {
  let component: DodajDanieComponent;
  let fixture: ComponentFixture<DodajDanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajDanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajDanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
