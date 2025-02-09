import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  public heroes: string[] = ['ironman', 'Spiderman', 'Thor', 'Hulk', 'Black Widow', 'Captain America', 'Doctor Strange', 'Black Panther', 'Antman', 'Wasp'];
  public deletedHero?: string;
  removeLastHero(): void {
    this.deletedHero = this.heroes.pop();
  }
}
