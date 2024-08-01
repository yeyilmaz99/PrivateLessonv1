import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayName',
  standalone: true
})
export class DayNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): any {
    switch (value) {
      case 1:
      return "Pazartesi"
        break;
      case 2:
      return "Salı"
      break;
      case  3:
      return "Çarşamba"
        break;
      case 4:
      return "Perşembe"
      break;
      case  5:
      return "Cuma"
        break;
      case 6:
      return "Cumartesi"
      break;

      default:
        break;
    }
  }

}
