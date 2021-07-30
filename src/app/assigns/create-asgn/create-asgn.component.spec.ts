import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAsgnComponent } from './create-asgn.component';

describe('CreateAsgnComponent', () => {
  let component: CreateAsgnComponent;
  let fixture: ComponentFixture<CreateAsgnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAsgnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAsgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
