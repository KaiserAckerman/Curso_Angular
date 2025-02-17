import { Component, Input } from '@angular/core';
import { Gif } from '../../Interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  standalone: false,
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input()
  public gifs: Gif[] = [];
}
