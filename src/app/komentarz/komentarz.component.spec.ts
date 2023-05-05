import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KomentarzComponent } from './komentarz.component';

describe('KomentarzComponent', () => {
  let component: KomentarzComponent;
  let fixture: ComponentFixture<KomentarzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KomentarzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KomentarzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
