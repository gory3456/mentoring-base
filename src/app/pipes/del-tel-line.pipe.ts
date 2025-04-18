import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'delTelLine',
  standalone: true
})
export class DelTelLinePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, '');
  }
}
