import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnsTabComponent } from './dns-tab.component';

describe('DnsTabComponent', () => {
  let component: DnsTabComponent;
  let fixture: ComponentFixture<DnsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnsTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
