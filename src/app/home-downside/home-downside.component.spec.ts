import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDownsideComponent } from './home-downside.component';

describe('HomeDownsideComponent', () => {
  let component: HomeDownsideComponent;
  let fixture: ComponentFixture<HomeDownsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDownsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDownsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
