import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanieMiniComponent } from './danie-mini.component';

describe('DanieMiniComponent', () => {
  let component: DanieMiniComponent;
  let fixture: ComponentFixture<DanieMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanieMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanieMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
