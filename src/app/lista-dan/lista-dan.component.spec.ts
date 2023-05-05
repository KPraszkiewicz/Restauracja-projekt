import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDanComponent } from './lista-dan.component';

describe('ListaDanComponent', () => {
  let component: ListaDanComponent;
  let fixture: ComponentFixture<ListaDanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
