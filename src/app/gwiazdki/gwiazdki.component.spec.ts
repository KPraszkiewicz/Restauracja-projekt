import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GwiazdkiComponent } from './gwiazdki.component';

describe('GwiazdkiComponent', () => {
  let component: GwiazdkiComponent;
  let fixture: ComponentFixture<GwiazdkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GwiazdkiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GwiazdkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
