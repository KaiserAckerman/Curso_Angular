import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

 countryResource = rxResource ({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-country'], {queryParams: {query: request.query}})
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
