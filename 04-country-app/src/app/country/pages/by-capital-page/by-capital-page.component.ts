import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../../shared/components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../../shared/components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  CountryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource ({
    request: () => ({ query: this.query() }),
    loader: ({request}) => {
      if(!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {queryParams: {query: request.query}})
      return this.CountryService.serachByCapital(request.query)
    }
  })

  // countryResource = resource({
  //   request: () => ({ query: this.query() }),
  //   loader: async({request}) => {
  //     if(!request.query) return [];

  //     return await firstValueFrom(
  //       this.CountryService.serachByCapital(request.query)
  //     )


  //   }
  // })


  // isLoading = signal(false)
  // isError = signal<string|null>(null)
  // countries = signal<Country[]>([])

  // onSearch(query:string){
  //   if(this.isLoading()) return;

  //   this.isLoading.set(true)
  //   this.isError.set(null);

  //  this.CountryService.serachByCapital(query)
  //   .subscribe({
  //     next: (countries) => {
  //         this.isLoading.set(false)
  //         this.countries.set(countries)
  //     },
  //     error: (err) => {
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(`No se encontro un pais con esa capital: ${query}`)
  //     }
  //   })
  // }
 }
