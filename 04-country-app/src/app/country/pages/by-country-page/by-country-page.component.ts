import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {

  CountryService = inject(CountryService);
    query = signal('');

 countryResource = rxResource ({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);
      return this.CountryService.serachByCountry(request.query)
    }
  })

    // countryResource = resource({
    //   request: () => ({ query: this.query() }),
    //   loader: async({request}) => {
    //     if(!request.query) return [];

    //     return await firstValueFrom(
    //       this.CountryService.serachByCountry(request.query)
    //     )
    //   }
    // })

}
