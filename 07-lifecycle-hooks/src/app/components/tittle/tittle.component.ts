import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tittle',
  imports: [],
  templateUrl: './tittle.component.html',
})
export class TittleComponent implements OnChanges{

  title = input.required<string>()

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    for (const inputName in changes) {
      const inputValues = changes[inputName];
      console.log(`Previous ${inputName} == ${inputValues.previousValue}`);
      console.log(`Current ${inputName} == ${inputValues.currentValue}`);
      console.log(`Is first ${inputName} change == ${inputValues.firstChange}`);
    }
  }
}
