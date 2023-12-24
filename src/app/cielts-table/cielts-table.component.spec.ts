import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CieltsTableComponent } from './cielts-table.component';

describe('CieltsTableComponent', () => {
  let component: CieltsTableComponent;
  let fixture: ComponentFixture<CieltsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CieltsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CieltsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
