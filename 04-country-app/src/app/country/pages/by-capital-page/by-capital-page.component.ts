import { Component } from '@angular/core';
import { CountrySearchInputComponent } from "../../../shared/components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../../shared/components/country-list/country-list.component";

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {

 }
