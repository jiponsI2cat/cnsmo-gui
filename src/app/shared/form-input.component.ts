// based on the works of http://almerosteyn.com/2016/03/angular2-form-validation-component
import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit, OnChanges {
  @Input() labelText: string = '';
  @Input() fieldCss: string = '';
  @Input() labelCss: string = '';
  @Input() control: any;
  @Input() errorDefs: any;

  private errorMessage: string = '';
  private validationMessages = { required: 'Required field' };
  constructor() { }

  ngOnInit() {
    if (!this.control) {
      return false;
    }

    this.control.valueChanges.subscribe(value => {
      if (this.control.dirty && !this.control.valid) {
        this.errorDefs.some(key => {
          if (this.control.errors[key]) {
            this.errorMessage = this.validationMessages[key];
            return true;
          }
        });
      } else {
        this.errorMessage = '';
      }
    });
  }

  ngOnChanges(changes: any) {
  }
}
