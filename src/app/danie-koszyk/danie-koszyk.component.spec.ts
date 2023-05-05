import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanieKoszykComponent } from './danie-koszyk.component';

describe('DanieKoszykComponent', () => {
  let component: DanieKoszykComponent;
  let fixture: ComponentFixture<DanieKoszykComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanieKoszykComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanieKoszykComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
