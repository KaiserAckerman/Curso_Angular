import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { ProductCardComponent } from '@store-front/components/product-card/product-card.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  paginationService = inject(PaginationService)
  productsService = inject(ProductsService);
  route = inject(ActivatedRoute);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  )

  productsResource = rxResource({
    request: () => ({gender: this.gender(), page:this.paginationService.currentPage() -1}),
    loader:({ request }) => {
      return this.productsService.getProducts({
        limit: 12,
        offset: request.page * 12,
        gender: request.gender
      });
    }
  })

}
