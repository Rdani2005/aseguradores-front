import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuredViewComponent } from './insured-view.component';

describe('InsuredViewComponent', () => {
  let component: InsuredViewComponent;
  let fixture: ComponentFixture<InsuredViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsuredViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsuredViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
