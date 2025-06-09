
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

### 31. Creación del módulo `shared` para paginación

- Se crea el componente `pagination` dentro de `shared/components/pagination`.
- Se modifica el selector del componente para personalizarlo.

### 32. Integración del selector en `home-page`

- Se añade el selector del componente de paginación en el HTML del `home-page`, al inicio por conveniencia visual.

### 33. Maquetación visual con DaisyUI

- Se utiliza un componente de paginación de DaisyUI.
- Se ajustan estilos con Tailwind para centrar la paginación.

### 34. Lógica básica de paginación

- Se agregan dos `@Input()`:
  - `currentPage` (valor por defecto: 1).
  - `pages` (cantidad total de páginas).
- Se crea una variable computada para obtener la lista de páginas usando `Array.from`.
- Se renderizan los botones con `@for` sobre `getPagesList`.
- Cada botón incluye:
  - Estilo condicional: `[class.btn-primary]="page === currentPage()"`.
  - Texto con `{{ page }}`.
- En `home-page`, se pasa `[pages]` al componente, usando `productResource()?.totalPages ?? 0`.

### 35. Mejora de navegación con `RouterLink` y `queryParams`

- Se importa `RouterLink` en el componente.
- Cada botón se configura con:
  ```html
  [routerLink]="[]" 
  [queryParams]="{ page: page }"
  ```
  Esto permite URLs como: `http://localhost:4200/?page=2`.

### 36. Manejo de estado de página activo

- Se crea una nueva señal (`activePage`) basada en `currentPage`, para poder modificar su valor.
- En el `click` del botón, se usa `activePage.set(page)` para cambiar la página activa.
- Se actualiza el botón activo con `activePage() === page`.
- Se reemplaza `signal()` por `linkedSignal()` para mantener sincronización con el padre.

### 37. Lectura de parámetros de URL con `ActivatedRoute`

- Se inyecta `ActivatedRoute` en el componente.
- Se crea una señal `currentPage` con `toSignal`, leyendo `queryParamMap`:
  ```ts
  this.activatedRoute.queryParamMap.pipe(
    map(params => +params.get('page')! || 1),
    map(page => isNaN(page) ? 1 : page)
  )
  ```
- Se establece un valor inicial con `{ initialValue: 1 }`.

### 38. Paginación dinámica en el request del `RxResource`

- Se pasa `currentPage` en el request:
  ```ts
  { page: this.currentPage() - 1 }
  ```
- Se calcula `offset` usando:  
  `offset = request.page * limit`.

### 39. Refactor: trasladar lógica a un servicio

- Se crea `pagination.service.ts` en el componente `pagination`.
- Se extrae:
  - `ActivatedRoute`
  - señal `currentPage`
- Se inyecta el servicio en `home-page`.
- Se actualizan las referencias:
  - En TS: `this.paginationService.currentPage()`
  - En HTML: `paginationService.currentPage()`
- Se reutiliza el servicio en `gender-page` y se posiciona la paginación al final del contenido.

### 40. Implementación de cache de productos

- Se crea `productsCache` usando un `Map<string, ProductResponse>`.
- La clave es una combinación de parámetros relevantes (ej: filtros + página).
- Se almacena la respuesta de la API para cada combinación.
