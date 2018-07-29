import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as qrcode from 'qrcode';

@Component({
  selector: 'osmi-qr-code',
  templateUrl: 'qr-code.component.html',
  styleUrls: ['qr-code.component.scss']
})

export class QrCodeComponent implements OnInit {
  qrCodeSvg: SafeResourceUrl;

  constructor(private readonly domSanitizer: DomSanitizer) { }

  ngOnInit() {
    const options = {
      color: {
        dark: '#3f51b548',
        light: '#fafafa'
      }
    };

    qrcode.toString(window.location.href, options, (err, svgString) => {
      if (err) {
        console.log(err);
        return;
      }
      this.qrCodeSvg = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;charset=utf-8,' + svgString);
    });
  }
}
