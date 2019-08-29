import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
  pure: false
})
export class FilterContentPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string): any {
    if (!value.length || !filterString) return value;
    const resultArray = [];
    for (const item of value) {
      if (item[propName].toLowerCase().includes(filterString.toLowerCase())) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }
}
