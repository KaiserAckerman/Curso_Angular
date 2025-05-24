import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from '@store-front/components/product-card/product-card.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  productsResource = rxResource({
    request: () => ({gender: this.gender()}),
    loader:({ request }) => {
      return this.productsService.getProducts({
        limit: 16,
        offset: 0,
        gender: this.gender()
      });
    }
  })

}
