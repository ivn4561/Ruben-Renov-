# Plantilla Transit

App web gratuita para medir una **Ford Transit Custom V362** (o cualquier vehículo escaneado) en 3D
y sacar plantillas a escala para diseñar la rotulación en vinilo.

La app está en [`app/index.html`](app/index.html). Es un solo archivo y no hay que instalar nada:
se abre en el navegador del iPhone o del computador.

## Qué hace

- **Muestra el carro en 3D**: una van de ejemplo con carrocería curva y las medidas de fábrica de la
  Transit Custom (L2 o L1), un auto real de código abierto con curvas (para probar cómo se pega el diseño),
  o tu propio escaneo (`.glb`, `.gltf`, `.obj`, `.ply`).
- **Mide de un punto a otro**: tocas el punto A y luego el punto B, y la app muestra la distancia en cm.
  Los puntos se pueden arrastrar para ajustarlos.
- **«Línea recta»**: endereza la línea para que mida solo el largo, el alto o el ancho, sin diagonales.
- **Calibra la escala**: mides una distancia con cinta en el carro real (por ejemplo, entre ejes),
  la escribes, y la app corrige todas las demás medidas.
- **Vistas planas**: izquierda, derecha, frente, atrás y techo, sin perspectiva.
- **Exporta la plantilla en SVG** para cada lado, en escala 1:1, 1:5, 1:10 o 1:20. Incluye:
  - la silueta del carro;
  - las cotas de largo y alto;
  - el sobrante de corte;
  - tus medidas;
  - una barra de 1 m para comprobar la escala;
  - la capa «Diseño», con tus imágenes ya colocadas a escala.
- **Importa tu diseño** (PNG, JPG o SVG) y lo pone sobre la carrocería. En modo **Diseño**, desde una vista plana:
  - arrastras la imagen para moverla;
  - las esquinas la agrandan sin deformarla;
  - los puntos de los lados la estiran solo a lo ancho o a lo alto;
  - el punto de arriba la gira (se ajusta solo a 0°, 15°, 30°…).
- **Pega el diseño a la carrocería**: la imagen sigue las curvas de la chapa (techo, esquinas, guardabarros),
  como quedaría el vinilo. Se puede apagar con «Pegar a la carrocería» para verla como lámina plana.
- **Te da las medidas del diseño**: ancho y alto en cm, distancia al frente y al piso, márgenes,
  tamaño con sobrante y m² de vinilo aproximados. También se pueden escribir los valores a mano.
- **«Copiar al otro lado»**: pone el mismo diseño en el lado derecho, a la misma distancia del frente.
- **Exporta las medidas en CSV** (se abre en Excel), con las medidas y la posición de cada diseño.

## Paso a paso

1. **Escanea la van** con [Scaniverse](https://scaniverse.com/), que es gratis. El iPhone 15 Pro Max
   tiene LiDAR, así que usa el modo LiDAR.
   - Escanea con buena luz de día, sin sol directo y sin lluvia. Evita que el carro esté mojado o muy brillante.
   - Camina despacio alrededor de la van, a 1–1,5 m. Para el techo, levanta el teléfono
     o súbete a una escalera.
   - Exporta el modelo en **GLB** y pásalo al computador o déjalo en Archivos del iPhone.
2. **Abre la app** y toca «Cargar escaneo 3D».
3. **Oriéntalo**: el frente debe apuntar a la flecha **FRENTE** y las ruedas deben quedar en el piso.
   - Si quedó acostado o al revés, usa los botones «Girar 90°».
   - Si quedó girado en un ángulo cualquiera (lo normal en un escaneo), pulsa **«Enderezar con 2 puntos»**
     y toca el centro de la rueda delantera y luego el de la trasera del mismo lado.
   - Haz esto **antes** de colocar diseños: los diseños se pegan a la cara (izquierda, derecha…), no a la chapa.
4. **Calibra**: mide la distancia entre los centros de las ruedas con cinta métrica. Márcala en la app,
   escribe el valor real y pulsa «Calibrar escala». Esto corrige el pequeño error del escaneo (1–3 %).
5. **Mide las zonas que vas a rotular**: puertas, panel lateral, puertas traseras y capó.
6. **Descarga la plantilla SVG** de cada lado y ábrela en [Inkscape](https://inkscape.org/) (gratis)
   o en Illustrator. Pon el diseño en la capa «Diseño». La capa «Referencia» es solo guía y no se imprime.

## Medidas de referencia: Transit Custom V362 (2012–2023)

| Versión | Largo | Ancho sin espejos | Ancho con espejos | Alto (H1) | Entre ejes |
|---|---|---|---|---|---|
| L1 (corta) | 4972 mm | 1986 mm | 2272 mm | ~1990 mm | 2933 mm |
| L2 (larga) | 5339 mm | 1986 mm | 2272 mm | ~1990 mm | 3300 mm |

Para saber si tu van es L1 o L2, mide la distancia entre ejes: unos **2,93 m** es L1 y unos **3,30 m** es L2.
El alto cambia un poco según la versión y los neumáticos; confírmalo con cinta.
Estas son medidas públicas de catálogo; verifícalas siempre en el vehículo antes de imprimir.

## Sobre el vinilo (la «película plástica»)

- El vinilo de rotulación es **autoadhesivo**: el pegamento ya viene en la película y se activa por presión.
  **No se activa con jabón.**
- Para forrar una van se usa **vinilo fundido (cast) imprimible con canales de aire** («air release»),
  más un **laminado** protector. Ejemplos: 3M IJ180mC con laminado 8518, o Avery MPI 1105 con DOL 1460.
  Se instala **en seco** con espátula y pistola de calor.
- El agua con jabón («aplicación en húmedo») solo se usa para letras o logos pequeños de vinilo sin canales
  de aire. No se usa en un forrado completo.
- Deja siempre **5–10 cm de sobrante** en cada borde. En zonas curvas (frente, esquinas, paragolpes)
  deja 10 cm o más. El instalador recorta el sobrante sobre el carro.
- Antes de imprimir, confirma con cinta 2 o 3 medidas clave de cada panel.
- Evita poner textos o logos importantes sobre manijas, juntas de puertas o la línea de la puerta corredera.

## Cómo funciona el diseño por dentro

- Cada imagen se guarda con su **cara del carro** (izquierda, derecha, atrás, frente o techo),
  su **posición**, su **tamaño** y su **giro**, en las mismas unidades que el modelo 3D.
  Por eso, al calibrar la escala, las medidas del diseño en cm también se corrigen.
- En 3D, la imagen se **proyecta sobre la carrocería** como una calcomanía (técnica «decal», con
  `DecalGeometry` de Three.js): la app toma los triángulos de la chapa que quedan detrás de la imagen,
  los recorta al tamaño del diseño y les pega la imagen. Mientras arrastras se ve como lámina plana (es más
  rápido) y al soltar se vuelve a pegar sobre las curvas.
- La proyección se hace desde la vista de esa cara (lado, frente, atrás o techo). Por eso la plantilla SVG,
  que es esa misma vista plana, coincide con lo que ves pegado en 3D.
- El recuadro con puntos es HTML encima del visor. Al arrastrar, la app convierte los píxeles de la pantalla
  a centímetros reales según el zoom de la vista plana. El lado opuesto al punto que arrastras queda fijo.
- Al exportar, la misma posición y el mismo tamaño se escriben en el SVG en milímetros a la escala elegida.
  Por eso lo que ves en la app coincide con la plantilla.
- En curvas muy cerradas (esquinas del paragolpes, pasos de rueda) el vinilo real se estira un poco;
  el instalador lo ajusta con calor y el sobrante.

## Modelo de código abierto incluido

`app/models/carconcept.glb` es el «Car Concept» de Khronos (CC BY 4.0, Eric Chadwick / Darmstadt Graphics
Group). Ver [app/models/CREDITS.md](app/models/CREDITS.md).

## Uso técnico

- La app usa Three.js 0.147 desde jsDelivr. Hace falta internet la primera vez que se abre.
- Para probarla en local: `npx serve app` y abre `http://localhost:3000`.
