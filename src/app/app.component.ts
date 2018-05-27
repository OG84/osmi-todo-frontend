import { Component, OnInit, ViewChild } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ToolbarService } from './toolbar/toolbar.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'osmi-todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav')
  sidenav: MatSidenav;

  isMobile = false;
  sidenavMode = 'side';
  toolbarTitle: Observable<string>;

  constructor(
    public readonly media: ObservableMedia,
    private readonly toolbarService: ToolbarService) {

  }

  ngOnInit(): void {
    this.toolbarTitle = this.toolbarService.title;

    this.media.subscribe(x => {
      this.isMobile = x.mqAlias === 'xs' || x.mqAlias === 'sm';
      this.sidenavMode = this.isMobile ? 'over' : 'side';
    });
  }

  closeSidenav(): void {
    if (!this.isMobile) {
      return;
    }

    this.sidenav.close();
  }
}
