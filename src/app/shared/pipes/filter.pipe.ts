import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: string): any[] {
    // console.log('pipe:', items, key);
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    return items.filter( x => {
      return x[key].toLowerCase().includes(searchText);
    });
  }
}
