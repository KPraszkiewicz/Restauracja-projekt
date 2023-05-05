import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRDanieComponent } from './app-r-danie.component';

describe('AppRDanieComponent', () => {
  let component: AppRDanieComponent;
  let fixture: ComponentFixture<AppRDanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRDanieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRDanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
