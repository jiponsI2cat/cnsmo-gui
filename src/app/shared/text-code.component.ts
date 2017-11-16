/**
 * @author William Friscina
 * @description This component creates a code text-box by passing from Input
 * the fileContent and the fileName and allow to copy to clipboard the content
 * or to download the created file
 */

import { NotificationService } from '../core/notification/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-text-code',
  templateUrl: './text-code.component.html',
  styleUrls: ['./text-code.component.scss']
})

export class TextCodeComponent implements OnInit {

  @Input() title: string;
  @Input() fileContent: string;
  @Input() fileName: string;

  constructor(
    private _sanitizer: DomSanitizer,
    private notification: NotificationService,
  ) { }

  ngOnInit() {
  }

  /**
   * Create downloadable file SafeUrl through the composed
   * url from file content
   *
   * @param fileContent {string} the content of the file
   * that will be downloadable
   */
  downloadableTextCodeUrl(fileContent: string): SafeUrl {
    const base64content = btoa(fileContent);
    const prefixUrl = 'data:application/octet-stream;charset=utf-8;base64';
    const url = `${prefixUrl},${base64content}`;
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  /**
   * Just create a dummy element for copy, append
   * it to your DOM, copy it to clipboard and remove it
   * from DOM
   *
   * @param text {string} text to copy to clipboard
   * @param title {string} title of text to show in
   * notification snack bar
   */
  copyText(text: string, title?: string) {
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
