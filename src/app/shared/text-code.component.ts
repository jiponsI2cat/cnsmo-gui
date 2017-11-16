import { NotificationService } from '../core/notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-text-code',
  templateUrl: './text-code.component.html',
  styleUrls: ['./text-code.component.scss']
})
export class TextCodeComponent implements OnInit {

  @Input() title;
  @Input() fileContent;
  @Input() fileName;

  private fileUrl: SafeUrl;

  constructor(private _sanitizer: DomSanitizer, private notification: NotificationService,
  ) { }

  ngOnInit() {
  }

  /**
   * Create downloadable file through the url
   */
  downloadableTextCodeUrl(fileContent) {
    const base64content = btoa(fileContent);
    const url = `data:application/octet-stream;charset=utf-8;base64,${base64content}`;
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Just create a dummy element for copy, append
   * it to your DOM, copy it and remove it from DOM
   */
  copyText(text, title?) {
    const copyElement = document.createElement('textarea');
    copyElement.style.position = 'fixed';
    copyElement.style.opacity = '0';
    copyElement.textContent = this.fileContent;
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(copyElement);
    copyElement.select();
    document.execCommand('copy');
    body.removeChild(copyElement);
    if (title) {
      const notiMsg = `Content of ${title} is copied to clipboard`;
      this.notification.push('info', notiMsg, 2000);
    }
  }

}
