import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'form',
  standalone: false,
})
export class FormPipe implements PipeTransform {

  transform(value: FormGroup, ...args: unknown[]): any[] {
    // console.log(Object.keys(value.controls))
    return Object.keys(value.controls)
  }

}
