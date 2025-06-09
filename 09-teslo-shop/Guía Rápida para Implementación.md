
# Guía de Desarrollo - Angular + Backend

## 1. Estructuración de la Página
Se crearán todas las carpetas necesarias para construir la arquitectura de la aplicación. Se definirá cómo estará compuesta, incluyendo aspectos, servicios, componentes, rutas y utilidades.

## 2. Definir Rutas
Se deben establecer las rutas y crear el archivo `.routes` para cada componente o aspecto de la aplicación:
- Rutas para el frontend
- Rutas para el dashboard
- Rutas generales

## 3. Crear Componentes y Rutas Hijas

## 4. Agregar Rutas al Layout
En el layout se coloca el `router-outlet` y se añade un `navbar` en la parte superior.

## 5. Importar Rutas en el Navbar
Se importan las rutas y se definen en los `a` con `routerLink`. Configurar tanto la vista responsive como de escritorio del navbar de DaisyUI.

## 6. Cambiar Fuente
Crear carpeta en `public/assets/fonts` y colocar el archivo de la fuente deseada.

## 7. Agregar Cards
Crear componente de card y añadirlo a la interfaz.

## 8. Agregar Animaciones `fadeIn`
En `styles.css` se configuran animaciones `fadeIn` con degradado visual.

## 9. Configurar Paths
Evitar rutas relativas innecesarias (`./././auth`) configurando `paths` en `tsconfig.json`.

## 10. Levantar el Backend
1. Abrir Docker Desktop  
2. `npm install`  
3. Clonar `.env.template` y renombrarlo a `.env`  
4. Ejecutar `docker-compose up -d`  
5. Ejecutar `npm run start:dev`  
6. Probar en Postman: `localhost:3000/api/seed`

## 11. Petición HTTP para Productos
`GET localhost:3000/api/products`

## 12. Crear Interfaz `ProductResponse`
1. Copiar respuesta de Postman
2. Generar código con "JSON as code"
3. Crear `product.interface.ts` en carpeta `products`

## 13. Ajustar Interfaces
Modificar propiedades según necesidades del proyecto.

## 14. Mover Interfaces de Auth
Ubicar en `src/app/auth/interfaces/user.interface.ts`.

## 15. Agregar `provideHttpClient`
Agregar `withFetch` para habilitar peticiones con Observables.

## 16. Crear Servicio de Productos
Crear en `services`, inyectar `HttpClient`.

## 17. Método para Obtener Productos
Usar `http.get()` con `Observable<ProductsResponse>`.

## 18. Inyectar Servicio en HomePage

## 19. Usar `rxResource` en HomePage
Obtener productos de forma reactiva.

## 20. Variables de Entorno y Parametrización
- `ng g environments`
- Configurar baseURL (ej: `'https://localhost:3000/api'`)
- Crear constante con baseURL
- Reemplazar en el servicio
- Crear interfaz de parámetros (`limit`, `offset`, `gender`)
- Establecer valores por defecto
- Actualizar argumentos en los lugares donde se utiliza el método

## 21. Mostrar Productos en `product-card`
- Usar `@Input({ required: true })`
- Mostrar título y descripción con señales
- `routerLink` con `product().slug`
- `*ngFor` para iterar productos
- Pasar producto a `product-card`
- Cambiar fuente del título

## 22. Manejo de Imágenes con Placeholder
- Crear pipe en `products/pipes`
- Agregar imagen de placeholder en `public/assets/images`

## 23. Configurar Pipe
- Usar `baseURL` de entorno
- Mostrar imagen o placeholder si no hay imágenes

## 24. Mostrar Imagen con Pipe
```html
<img [src]="product().images | imagePipe" />
```

## 25. Probar Placeholder
Usar arreglo vacío como `images: []`.

## 26. Acceso al Producto desde Título e Imagen
Usar `routerLink` en ambos elementos.

## 27. Configurar `ProductPage`
- Método en servicio para `idSlug`
- Usar interfaz `Product`
- Obtener `idSlug` con `ActivatedRoute`
- Usar `rxResource` para la petición

## 28. Mostrar Información del Producto
- Verificar estado de `productResource`
- Mostrar título y descripción
- Aplicar animaciones y estilos con Tailwind y DaisyUI

## 29. Agregar Carousel de Imágenes
1. Crear componente en `products/components`
2. Instalar Swiper: `npm install swiper`
3. Importar librerías necesarias
4. Agregar componente en `ProductPage`
5. Pasar imágenes por `@Input()`
6. Usar `ViewChild` y `ngAfterViewInit`
7. Inicializar Swiper con `ElementRef`
8. Iterar imágenes con `@for` y pipe de imágenes
9. Estilos con Tailwind (`object-cover`, tamaños, etc.)

## 30. Agregar Página por Género
- Inyectar servicio y `ActivatedRoute`
- Crear señal `gender` leyendo parámetro de URL
- Reutilizar lógica del HomePage
- Filtrar productos por género
- Mostrar género en `h1`

## Paginación Compartida y Manejo del Estado de Página

### 31. Creamos el módulo `shared` para colocar la paginación
- Colocamos el componente `pagination` dentro de la ruta `shared/components/pagination`.
- Modificamos el selector para personalizarlo.

### 32. Agregamos el selector en el HTML del `homepage`
- De momento lo colocamos al inicio para poder visualizarlo fácilmente sin hacer scroll.

### 33. Buscamos en DaisyUI una paginación para agregarla en el HTML
- Le cambiamos algunos estilos con Tailwind para centrarla.

### 34. Agregamos atributos al componente de paginación
- Creamos un `@Input()` llamado `currentPage` con valor por defecto 1.
- Otro `@Input()` para establecer el número de páginas.
- Creamos una variable que guarde la cantidad de páginas como arreglo usando `computed`, `Array.from` y sumando 1 para evitar empezar en 0.
- Usamos `*ngFor` con `getPagesList()` para generar los botones de página.
- Dentro del `*ngFor`, colocamos botones con estilos de Tailwind y lógica para resaltar la página actual: `[class.btn-primary]="page === currentPage()"`.
- El valor del botón será `{{ page }}`.
- En `homepage`, pasamos las páginas con `[pages]` usando `productResource?.totalPages ?? 0` para manejar valores nulos.

### 34 (parte 2). Modificamos el componente de paginación
- Importamos `RouterLink` en el archivo `.ts`.
- En el HTML, usamos `routerLink="[]"` dentro del botón para mantenernos en la misma página.
- Agregamos `queryParams` al `routerLink` con `{ page: page }`, lo que genera URLs como `http://localhost:4200/?page=2`.
- Creamos una nueva señal que copie el valor de `currentPage` y sea modificable (ya que `inputSignal` es solo de lectura).
- Creamos una función `click` que actualice el valor de esta nueva señal con `.set(page)`.
- Actualizamos la lógica de resaltar el botón activo para usar esta nueva señal.
- Reemplazamos `signal()` por `linkedSignal()` en `activePage` para mantener la sincronización con el componente padre.
- En `homepage`, asignamos valor al `currentPage`.

### 35. Inyectamos `ActivatedRoute` en el archivo `.ts`

### 36. Creamos la señal `currentPage` con validaciones
- Usamos `toSignal()` con `this.activatedRoute.queryParamMap` como observable.
- Transformamos con `.pipe()` y dos `.map()`:
  - El primero extrae el parámetro `page`, lo convierte en número (usando `+`) o usa 1 por defecto.
  - El segundo valida si es un número con `isNaN`; si no lo es, usa 1.
- Establecemos `{ initialValue: 1 }` en el `toSignal`.

### 37. Usamos `currentPage` en la petición HTTP de `RxResource`
- Lo colocamos en la request: `{ page: this.currentPage() - 1 }`.
- Esto permite establecer correctamente el `offset`: `request.page * limit`.
- Restamos 1 al `currentPage` para evitar una página de más.

### 38. Movemos la lógica de paginación a un servicio
- Creamos `pagination.service.ts` dentro del componente `pagination`.
- Reutilizamos lógica de `ActivatedRoute` y `currentPage` dentro del servicio.
- Inyectamos el servicio en `homepage` y limpiamos imports viejos.
- En `RxResource`, usamos `this.paginationService.currentPage()`.
- Actualizamos referencias a `currentPage()` en HTML.
- Reutilizamos la paginación también en `GenderPage` (copiar/pegar).
- Finalmente, colocamos la paginación al final de la página.

### 39. Agregamos caché para productos (peticiones paginadas)
- Creamos `productsCache: Map<string, ProductResponse>`.
- La clave es `${limit}-${offset}-${gender}`.
- Si la key existe en el cache, devolvemos `of(this.productsCache.get(key)!)`.
- Si no, continuamos la petición y al final usamos `tap((resp) => this.productsCache.set(key, resp))`.

### 40. Agregamos caché para productos individuales (por `slug`)
- Creamos `productCache: Map<string, Product>`.
- En `getProductByIdSlug(slug)`, verificamos si existe `slug` en el `Map`.
- Si existe, devolvemos `of(this.productCache.get(slug)!)`.
- Si no, en la respuesta de la petición, usamos `tap((product) => this.productCache.set(slug, product))`.