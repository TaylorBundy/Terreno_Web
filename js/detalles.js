async function cargarDetalle() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")) - 1;

  const respuesta = await fetch("data/terrenos.json");
  const terrenos = await respuesta.json();

  if (!terrenos[id]) {
    document.getElementById("modal").innerHTML =
      "<h2>Error: terreno no encontrado</h2>";
    return;
  }

  const t = terrenos[id];

  // ------ Obtener carpeta de imágenes exactamente como tu script ------
  const coords = extraerCoordenadas(t.ubicacion);
  let imagenes = [];

  if (coords) {
    const carpetaLat = String(coords.lat).replace(".", "-");
    const basePath = `terrenos/${carpetaLat}/`;

    let index = 1;
    let sigue = true;

    while (sigue) {
      const ruta = `${basePath}${index}.avif`;
      const resp = await fetch(ruta);
      if (resp.ok) {
        imagenes.push(ruta);
        index++;
      } else {
        sigue = false;
      }
    }
  }

  if (imagenes.length === 0) {
    imagenes = ["img/noimage.jpg"];
  }

  // ------ Armar modal ------
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <h2>${t.titulo}</h2>
        <p><b>Medida:</b> ${t.medida}</p>
        <p><b>Descripción:</b><br>${t.detalle}</p>
        <p><a href="${
          t.ubicacion
        }" target="_blank" style="color:#4af;">Ver ubicación en Google Maps</a></p>

        <h3>Imágenes</h3>
        <div class="imagenes">
            ${imagenes.map((img) => `<img src="${img}">`).join("")}
        </div>
    `;
}

// REUTILIZAMOS EXACTAMENTE TU FUNCIÓN:
function extraerCoordenadas(url) {
  if (!url) return null;

  const regexDecimal = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const matchDecimal = url.match(regexDecimal);

  if (matchDecimal) {
    const latStr1 = matchDecimal[1].replace("-", "");
    const lngStr1 = matchDecimal[2].replace("-", "");
    const latStr = latStr1.replace(".", "-");
    const lngStr = lngStr1.replace(".", "-");

    return {lat: latStr, lng: lngStr};
  }

  return null;
}

document.addEventListener("DOMContentLoaded", cargarDetalle);
