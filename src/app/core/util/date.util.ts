import { Injectable } from '@angular/core';
import { DateFormatEnum } from '@belisada-seller/core/enum';

export interface IMyDate {
  year: number;
  month: number;
  day: number;
}

@Injectable({
  providedIn: 'root',
})
export class DateUtil {

  public formatMyDate(iMyDate: IMyDate, dateFormatEnum: DateFormatEnum) {
    let formattedDate = '';
    switch (dateFormatEnum) {
      case DateFormatEnum.DDMMYYYY_WITH_SLASH:
        formattedDate = iMyDate.day + '/' + iMyDate.month + '/' + iMyDate.year;
        break;

      case DateFormatEnum.DDMMYYYY_WITH_DASH:
        formattedDate = iMyDate.day + '-' + iMyDate.month + '-' + iMyDate.year;
        break;

      case DateFormatEnum.MMDDYYYY_WITH_SLASH:
        formattedDate = iMyDate.month + '/' + iMyDate.day + '/' + iMyDate.year;
        break;

      case DateFormatEnum.MMDDYYYY_WITH_DASH:
        formattedDate = iMyDate.month + '-' + iMyDate.day + '-' + iMyDate.year;
        break;

      default:
        formattedDate = iMyDate.day + '/' + iMyDate.month + '/' + iMyDate.year;
        break;
    }
    return formattedDate;
  }

  public fromDDMMYYYYtoMMDDYYY(date: string, separator: string = '/') {
    const arrDate = date.replace(separator, '/');
    return arrDate;
    // return [ arrDate[1], arrDate[0], arrDate[2] ].join('/');
  }
}
