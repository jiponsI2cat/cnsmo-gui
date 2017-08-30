import { FirewallService } from 'app/layout/firewall/shared/firewall.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Rule } from 'app/layout/firewall/shared/rule';

@Component({
  selector: 'app-add-firewall-rule',
  templateUrl: './add-firewall-rule.component.html',
  styleUrls: ['./add-firewall-rule.component.scss']
})
export class AddFirewallRuleComponent implements OnInit {
  fwRuleForm: FormGroup;
  private loginForm: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private servicesService: FirewallService
  ) { }

  ngOnInit() {
    this.fwRuleForm = this.formBuilder.group({
      direction: ['', Validators.required],
      protocol: ['', Validators.required],
      dst_port: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(65535)
        ]
      ],
      dst_src: ['', Validators.required],
      ip_range: ['', Validators.required],
      action: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.servicesService.addRule(new Rule(this.fwRuleForm.value)).subscribe(() => {
      this.loading = false;
    });
  }

}
