# Buscador de Terrenos con Imágenes por Coordenadas

Este proyecto consiste en una página web que carga y muestra terrenos
provenientes de un archivo **JSON**, detectando automáticamente sus
coordenadas, imágenes asociadas y precios (con conversión automática de
dólares a pesos).

## Características

-   Lectura dinámica desde `data/terrenos.json`.
-   Detección de coordenadas desde texto y carga automática de imágenes
    según carpeta.
-   Soporte para múltiples imágenes por terreno.
-   Detección automática de:
    -   Precio contado.
    -   Financiación.
    -   Tipo de moneda (Pesos / Dólares).
-   Conversión automática de USD → ARS mediante API.
-   Interfaz limpia y adaptable a distintos dispositivos.

## Estructura del Proyecto

    /
    ├── index.html
    ├── contacto.html
    ├── css/
    │   └── estilos.css
    ├── js/
    │   ├── funciones.js
    │   ├── cargarTerrenos.js
    │   └── utilidades.js
    ├── data/
    │   └── terrenos.json
    ├── terrenos/
    │   └── <latitud-carpetas>/1.jpg, 2.jpg, ...
    └── img/
        └── noimage.jpg

## Uso

1.  Colocar las carpetas de terrenos dentro de `/terrenos/` respetando
    el formato:
    -   `latitud` → reemplazando el punto por un guion.\
        Ejemplo: `38.880071` → `38-880071`.
2.  Agregar en `terrenos.json` objetos con:
    -   `titulo`
    -   `medida`
    -   `detalle` (contiene precios, coordenadas, etc.)
    -   `ubicacion` (Google Maps)
3.  Abrir `index.html` en cualquier navegador.

## Requisitos

-   Navegador moderno con soporte para `fetch` y `async/await`.
-   Servidor local recomendado (Live Server, XAMPP, Python HTTP server,
    etc.)

## Licencia

Proyecto de uso libre para fines educativos y personales.

------------------------------------------------------------------------

Desarrollado por Taylor Bundy.
