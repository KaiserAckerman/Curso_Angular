import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../../shared/components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../../shared/components/country-list/country-list.component';
import { Region } from '../../../interfaces/region.type';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase();
  const validRegions : Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  }

  return validRegions[queryParam] ?? 'Americas';

}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {

  CountryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  activatedRoute = inject(ActivatedRoute);
    router = inject(Router);
    queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';

  selectedRegion = linkedSignal<Region|null>(() => validateQueryParam(this.queryParam));

  countryResource = rxResource ({
      request: () => ({ region: this.selectedRegion() }),
      loader: ({request}) => {
        if(!request.region) return of([]);
        this.router.navigate(['/country/by-region'], {queryParams: {region: request.region}})
        return this.CountryService.serachByRegion(request.region)
      }
    })

 }
