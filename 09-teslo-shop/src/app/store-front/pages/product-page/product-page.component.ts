import { Component, inject, input } from '@angular/core';
import { ProductsService } from '@products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from "../../../products/components/product-carousel/product-carousel.component";


@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  ActivatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  productIdSlug: string = this.ActivatedRoute.snapshot.params['idSlug'];

  ProductResource = rxResource({
    request: () => ({idSlug: this.productIdSlug}),
    loader:({ request }) => {
      return this.productsService.getProductByIdSlug(
        request.idSlug
      );
    }
  })
}
