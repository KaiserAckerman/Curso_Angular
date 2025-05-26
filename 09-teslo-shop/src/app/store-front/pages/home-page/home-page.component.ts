import { Component, inject  } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { ProductCardComponent } from '@store-front/components/product-card/product-card.component';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);

  productsResource = rxResource({
    request: () => ({}),
    loader:({ request }) => {
      return this.productsService.getProducts({
        limit: 12,
        offset: 0,
        gender: 'kid'
      });
    }
  })

 }
