import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'osmi-todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isMobile = false;
  sidenavMode = 'side';

  constructor(public readonly media: ObservableMedia) {

  }

  ngOnInit(): void {
    this.media.subscribe(x => {
      this.isMobile = x.mqAlias === 'xs' || x.mqAlias === 'sm';
      this.sidenavMode = this.isMobile ? 'over' : 'side';
    });
  }
}
