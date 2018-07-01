import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'moment' })
export class MomentPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return moment(value).format('dddd, MMMM Do YYYY');
  }
}

@Pipe({ name: 'momentFromNow' })
export class MomentFromNowPipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return moment(value).fromNow().toLocaleString();
  }
}
