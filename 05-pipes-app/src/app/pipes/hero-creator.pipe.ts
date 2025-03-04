import { Pipe, type PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator',
})
export class HeroCreatorPipe implements PipeTransform {

  transform(value: Creator): string {
      // Esta es una forma de hacer el pipe
      // return Creator[value];
      return value === Creator.DC ? 'DC' : 'Marvel';
    }

}
