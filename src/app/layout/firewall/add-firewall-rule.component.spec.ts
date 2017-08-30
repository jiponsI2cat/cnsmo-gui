import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFirewallRuleComponent } from './add-firewall-rule.component';

describe('AddFirewallRuleComponent', () => {
  let component: AddFirewallRuleComponent;
  let fixture: ComponentFixture<AddFirewallRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFirewallRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFirewallRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
