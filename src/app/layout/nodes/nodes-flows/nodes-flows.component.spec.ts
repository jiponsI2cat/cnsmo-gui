import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodesFlowsComponent } from './nodes-flows.component';

describe('NodesFlowsComponent', () => {
  let component: NodesFlowsComponent;
  let fixture: ComponentFixture<NodesFlowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodesFlowsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodesFlowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
