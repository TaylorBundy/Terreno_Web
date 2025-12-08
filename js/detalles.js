const plataforma = navigator.userAgent;
let textoBtnUbicacion;
const whatsapp = document.querySelector("#imagen-flotante");
const numero = "+5492995933317";
const url = `https://wa.me/${encodeURIComponent(numero)}`;
let num;
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

  // if (coords) {
  //   const carpetaLat = String(coords.lat).replace(".", "-");
  //   const basePath = `terrenos/${carpetaLat}/`;

  //   let index = 1;
  //   let sigue = true;

  //   while (sigue) {
  //     const lolo = index - 1;

  //     const ruta = `${basePath}${index}.avif`;
  //     const resp = await fetch(ruta);
  //     //console.log(resp);
  //     if (resp.ok) {
  //       imagenes.push(ruta);
  //       //index += 1;
  //       index++;
  //       //index = index - 1;
  //     } else {
  //       // index = index - 1;
  //       // console.log(index);
  //       sigue = false;
  //     }
  //   }
  // }
  if (coords) {
    const carpetaLat = String(coords.lat).replace(".", "-");
    const basePath = `terrenos/${carpetaLat}/`;
    const indexData = await fetch(`${basePath}index.json`).then((r) =>
      r.json()
    );
    const cantidad = indexData.cantidad;
    //console.log(cantidad);
    for (let i = 1; i <= cantidad; i++) {
      imagenes.push(`${basePath}${i}.avif`);
    }

    //let index = 1;
    //let numeros;

    // while (true) {
    //   const ruta = `${basePath}${index}.avif`;
    //   try {
    //     const resp = await fetch(ruta, {method: "HEAD"}); // más rápido que GET

    //     if (resp.ok) {
    //       imagenes.push(ruta);
    //       numeros = index;
    //       index++;
    //       //console.log(numeros);
    //       //console.log(index);
    //       if (numeros === index - 1) {
    //         console.log("ya");
    //         //break;
    //       }
    //     } else {
    //       break; // no hay más → cortar
    //     }
    //   } catch (e) {
    //     break; // cortar sin mostrar error
    //   }
    // }

    // while (true) {
    //   const ruta = `${basePath}${index}.avif`;

    //   try {
    //     const resp = await fetch(ruta, {method: "HEAD"});

    //     if (!resp.ok) break; // si no existe → cortar

    //     imagenes.push(ruta); // agregar imagen válida
    //     console.log(index - 1);
    //     index++;
    //   } catch (e) {
    //     break; // cortar sin mostrar error
    //   }
    // }
  }

  if (imagenes.length === 0) {
    imagenes = ["img/noimage.jpg"];
  }
  //console.log(window.location.href.split("="));
  num = window.location.href.split("=")[1];
  console.log(num);

  // ------ Armar modal ------
  const modal = document.getElementById("modal");
  modal.innerHTML = `
        <h2>${t.titulo}</h2>
        <p><b>Medida:</b> ${t.medida}</p>
        <p><b>Descripción:</b><br>${t.detalle}</p>
        <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
              <img src="images/ubicacion2.avif">
              <p title="Click para ver la ubicación" class="textoUbicacion">${textoBtnUbicacion}</p>
          </a>
          <div class="imgFlotante">
          <a href="${url}?text=${encodeURIComponent(
    "Quiero más información sobre: " +
      t.titulo +
      "\nVer más: " +
      window.location.host +
      "/Terreno_Web/index.html?id=" +
      num +
      "#item-" +
      num
  )}" target="_blank"><img id="imagen-flotante" src="${imgInfo}" ></a>
  <p title="Click para ver la ubicación" class="textoUbicacion">Contactar Vendedor</p>
  </div>
        <!-- <p><a href="${
          t.ubicacion
        }" target="_blank" style="color:#4af;">Ver ubicación en Google Maps</a></p> -->

        <h3>Imágenes</h3>
        <div class="imagen2">
        <div class="TextoImagen2">
            ${imagenes.map((img) => `<img src="${img}">`).join("")}
            <!-- <p class="titulo-zoom2">${t.titulo.toLowerCase()}</p> -->
            </div>
        </div>
    `;
}

//document.addEventListener("DOMContentLoaded", () => {
// window.onload = function () {
//   const todos = document.querySelectorAll(".TextoImagen2 img");
//   console.log(todos);
// };

window.onload = () => {
  cargarDetalle();
  if (plataforma.includes("Android")) {
    //creaTop();
    //}
    //setTimeout(() => {
    //const elemento = document.querySelector(".TextoImagen2");
    //const imagenzoom = document.querySelector(".img-zoom2");
    //const textoUbicacion = document.querySelector(".textoUbicacion");
    // textoUbicacion.style.display = "none";
    //imagenzoom.style.width = "75%";
    //console.log("Página lista y elemento encontrado");
    //console.log(elemento);
    //}, 1500);
    textoBtnUbicacion = "Ver ubicación";
    imgInfo = "images/whatsapp.avif";
  } else if (plataforma.includes("Win")) {
    //creaTop();
    textoBtnUbicacion = "Ver ubicación";
    imgInfo = "images/left.avif";
    imgInfo2 = "images/whatsapp.avif";
  }
};

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

//document.addEventListener("DOMContentLoaded", cargarDetalle);

document.addEventListener("click", function (e) {
  // Solo si clickeaste una imagen dentro de un terreno
  if (e.target.tagName === "IMG" && e.target.closest(".imagen2")) {
    const img = e.target;
    const contenedor = img.closest(".imagen2"); // 📌 Contenedor de la imagen
    //const texto = contenedor.querySelector("p");
    //console.log(texto);

    // Si NO está en zoom → activarlo
    if (!img.classList.contains("img-zoom2")) {
      img.classList.add("img-zoom2");
      img.style.cursor = "zoom-out";
      if (plataforma.includes("Android")) {
        img.style.width = "40vw";
        img.style.height = "20vh";
      } else {
        img.style.width = "400px";
        img.style.height = "300px";
      }
      //texto.classList.add("active2");
    } else {
      // Si ya está en zoom → salir
      img.classList.remove("img-zoom2");
      img.style.cursor = "zoom-in";
      img.style.width = "300px";
      img.style.height = "200px";
      //texto.classList.remove("active2");
    }
  }
});
