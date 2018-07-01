import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ToolbarService } from './toolbar/toolbar.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';
import { routerTransition } from 'src/app/router-transistion.animation';
import * as qrcode from 'qrcode';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'osmi-todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  isMobile = false;
  sidenavMode = 'side';
  toolbarTitle: Observable<string>;
  qrCodeSvg: SafeResourceUrl;

  constructor(
    public readonly media: ObservableMedia,
    private readonly toolbarService: ToolbarService,
    private readonly domSanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.toolbarTitle = this.toolbarService.title;

    this.media.subscribe(x => {
      this.isMobile = x.mqAlias === 'xs' || x.mqAlias === 'sm';
      this.sidenavMode = this.isMobile ? 'over' : 'side';
    });

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

  closeSidenav(): void {
    if (!this.isMobile) {
      return;
    }

    this.sidenav.close();
  }

  getState(outlet) {
    return new Date().getMilliseconds().toString();
    //return outlet.activatedRouteData.state;
  }
}
