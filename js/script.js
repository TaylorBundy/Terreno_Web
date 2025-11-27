const plataforma = navigator.userAgent;
let num = 0;
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

let texto;
let importePesos;
let htmlImagenes = "";
let estupido;
let textoBtnUbicacion;
let imgInfo;

window.onload = function () {
  console.log(plataforma);
  if (plataforma.includes("Android")) {
    textoBtnUbicacion = "hhh ";
    const imagen = document.querySelector(".imgFlotante"); //.style.display = "none";
    console.log(imagen);
    imgInfo = "images/info.avif";
    // Logo.forEach(logo => {
    //   logo.setAttribute('src', 'favicon.ico');
    // });
    // PorcentajeCosto.style.display = 'table-row';
    //porcentaje = document.getElementById('porcentajeCostoInput')?.value || 60;
  } else if (plataforma.includes("Win")) {
    textoBtnUbicacion = "Ver ubicación";
    imgInfo = "images/left.avif";
  }
};

// Cargar dinámicamente los terrenos desde terrenos.json
async function cargarTerrenos() {
  try {
    const respuesta = await fetch("data/terrenos.json");
    const terrenos = await respuesta.json();

    const contenedor = document.getElementById("lista-terrenos");
    contenedor.innerHTML = ""; // Limpiar lista

    //terrenos.forEach((t) => {
    for (const t of terrenos) {
      const coords = extraerCoordenadas(t.ubicacion);
      //console.log("Coordenadas detectadas:", coords);

      const item = document.createElement("div");
      item.classList.add("item");
      num++;
      // Si detectamos coordenadas → generar carpeta dinámica
      let rutaImagen = "img/noimage.jpg"; // fallback
      if (coords) {
        // Convertir LAT decimal a formato carpeta: 38.880071 → 38-880071
        const carpetaLat = String(coords.lat).replace(".", "-");
        // Ruta dinámica
        rutaImagen = `terrenos/${carpetaLat}/1.avif`;
      }
      const financiamiento = obtenerFinanciacion(t.detalle);
      const contado = obtenerPrecioContado(t.detalle);
      //console.log(financiamiento);
      //console.log(contado);
      let texto = "";
      let esDolar = false;
      let esPesos = false;
      const lower = t.detalle.toLowerCase();
      if (contado) {
        // Detecta por el texto completo del terreno
        const esPesos = /(peso|pesos|ars|\$\s*\d)/i.test(lower);
        const esDolar = /(u\$d|usd|u\$|dolar|dólar)/i.test(lower);

        if (esDolar && !esPesos) {
          // Dólares → convertir a pesos
          const puto = contado.dolares;
          const monto = puto.replace("U$D ", ""); //contado; //contado.replace(/u\$d/i, "").trim();
          const montoPesos = await ConvertirApesos(monto);
          //console.log(montoPesos);

          texto = `
            <!-- Precio Contado en Dólares:<br>${contado.dolares}<br> -->
            Precio Contado en Dólares:<br>${t.precio}<br>
            Precio Contado en Pesos (convertido):<br>$ ${montoPesos.toLocaleString()}
          `;
        } else if (esPesos && !esDolar) {
          //console.log(contado.pesos);
          texto = `
            Precio Contado en Pesos:<br>${t.precio}
          `;
        } else if (esDolar && esPesos) {
          if (esDolar) {
            const puto = contado.dolares;
            const monto = puto.replace("U$D ", ""); //contado; //contado.replace(/u\$d/i, "").trim();
            valorDolares = await ConvertirApesos(monto);
          }

          texto = `
            Precio Contado en Pesos:<br>${contado.pesos}<br>
            Precio Contado en Dólares:<br>${contado.dolares}<br>
            Precio Contado en Pesos (convertido):<br>$ ${valorDolares.toLocaleString()}
          `;
        }

        // Insertar en el HTML
        // item.querySelector(".content ul").innerHTML += `
        //   <li><p>${texto}</p></li>
        // `;
      }

      //else if (esPesos) {
      //(contado.includes("U$D") && contado.includes("$")) {
      //console.log("incluye ambos");
      //}

      // item.innerHTML = `
      //   <img src="${rutaImagen}" alt="Terreno" />

      //   <div>
      //       <h4>${t.titulo.toLowerCase()}</h4>
      //       <p>${t.medida.toLowerCase()}</p>
      //       <p>${t.detalle.toLowerCase()}</p>

      //       ${
      //         coords
      //           ? `<p><b>Lat:</b> ${coords.lat} <b>Lng:</b> ${coords.lng}</p>`
      //           : `<p style="color:red;">No se detectaron coordenadas</p>`
      //       }

      //       <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
      //           Ver ubicación
      //       </a>
      //   </div>
      // `;
      //console.log(texto);
      item.innerHTML = `
        <div class="tituloImg">
          <div class="titulo" title="Haga click en el título para más información">
            <h4>
              <a href="detalles.html?id=${num}" target="_blank">${t.titulo.toLowerCase()}</a>
            </h4>
          </div>
          <div class="imagen">
            <img src="${rutaImagen}" alt="Terreno" />
          </div>
          <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
              <img src="images/ubicacion2.avif">
              <p class="textoUbicacion">${textoBtnUbicacion}</p>
          </a>
      </div>
      <div class="content">
          <!-- <h4>${t.titulo}</h4> -->
          <div class="imgFlotante">
            <img id="imagen-flotante" src="${imgInfo}" >
            <span class="texto-flotante">Haga click en el título para más información</span>
          </div>
          

          <ul>
            <li><p>Medida:<br>${t.medida.toLowerCase()}</p></li>

            <li><p>Descripción:<br>${t.detalle.toLowerCase()}</p></li>

            ${
              financiamiento
                ? `<li><p>Financiación:<br>${financiamiento
                    .replace(/\n/g, "<br>")
                    .toLowerCase()}</p></li>`
                : ""
            }

            <li><p>${texto}</p></li>
          </ul>

          <!-- <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
              <img src="images/ubicacion2.avif">
              <p>${textoBtnUbicacion}</p>
          </a> -->
      </div>
    `;

      contenedor.appendChild(item);
      //});
    }
  } catch (err) {
    console.error("Error al cargar terrenos:", err);
  }
}

// async function cargarTerrenosl() {
//   try {
//     const respuesta = await fetch("data/terrenos.json");
//     const terrenos = await respuesta.json();

//     const contenedor = document.getElementById("lista-terrenos");
//     contenedor.innerHTML = ""; // Limpiar lista

//     //let num = 0;
//     for (const t of terrenos) {
//       const coords = extraerCoordenadas(t.ubicacion);

//       const item = document.createElement("div");
//       num++;
//       item.classList.add(`item`);
//       item.id = `item-${num}`;
//       //item.style.display = "flex";
//       //console.log(num);

//       // ------------------------------------------------------
//       // Cargar imágenes desde carpeta de coordenadas
//       // ------------------------------------------------------
//       let imagenes = [];
//       //let htmlImagenes = "";
//       let index1 = 0;
//       // if (coords) {
//       //   const carpetaLat = String(coords.lat).replace(".", "-");
//       //   const basePath = `terrenos/${carpetaLat}/`;

//       //   let index = 1;
//       //   let sigue = true;

//       //   while (sigue) {
//       //     const ruta = `${basePath}${index}.avif`;
//       //     try {
//       //       const resp = await fetch(ruta);
//       //       if (resp.ok) {
//       //         htmlImagenes += `<img src="${ruta}" class="foto-terreno" alt="Terreno">`;
//       //         imagenes.push(ruta);
//       //         index++;
//       //       } else {
//       //         sigue = false;
//       //       }
//       //     } catch (e) {
//       //       sigue = false;
//       //     }
//       //   }
//       // }
//       if (coords) {
//         // Convertir LAT decimal a formato carpeta: 38.880071 → 38-880071
//         const carpetaLat = String(coords.lat).replace(".", "-");

//         // Ruta dinámica
//         rutaImagen = `terrenos/${carpetaLat}/1.avif`;
//       }
//       //index1 = imagenes.length;

//       const filas = [...document.querySelectorAll(".item .imagen")];
//       //if (imagenes.length === 0) {
//       //htmlImagenes = `<img src="img/noimage.jpg" class="foto-terreno" alt="Terreno">`;
//       //console.log(filas);
//       //} else {
//       //htmlImagenes += `<img src="${imagenes}" class="foto-terreno" alt="Terreno">`;
//       htmlImagenes = `<img src="${rutaImagen}" alt="Terreno" />`;
//       //htmlImagenes = `<img src="img/noimage.jpg" class="foto-terreno" alt="Terreno">`;
//       // htmlImagenes = imagenes
//       //   .map(
//       //     (img, idx) =>
//       //       `<img src="${img}" class="foto-terreno-${idx}" alt="Terreno">`
//       //   )
//       //   .join("");
//       // htmlImagenes = imagenes
//       //   .map((img, idx) => {
//       //     return `<img src="${img}" class="foto-terreno-${idx}" alt="Terreno">`;
//       //   })
//       //   .join("");
//       //const todo = htmlImagenes.querySelector(`.foto-terreno-${idx}`);
//       //console.log(imagenes.length);
//       //}

//       // ------------------------------------------------------
//       // FINANCIACIÓN Y CONTADO
//       // ------------------------------------------------------
//       const financiamiento = obtenerFinanciacion(t.detalle);
//       const contado = obtenerPrecioContado(t.detalle);

//       let texto = "";
//       let esDolar = false;

//       if (contado) {
//         esDolar = contado.includes("U$D");

//         if (esDolar) {
//           const monto = contado.replace("U$D", "").trim();
//           const montoPesos = await ConvertirApesos(monto);

//           texto = `
//               Precio Contado en Dólares:<br>${contado.toLowerCase()}<br>
//               Precio Contado en Pesos (convertido):<br>$ ${montoPesos.toLocaleString()}
//             `;
//         } else {
//           texto = `Precio Contado en Pesos:<br>${contado.toLowerCase()}`;
//         }
//       }

//       // ------------------------------------------------------
//       // ARMADO DEL CONTENIDO
//       // ------------------------------------------------------
//       const htmlContent = `
//           <div class="content">
//               <!-- <h4>${t.titulo}</h4> -->
//               <h4>
//                 <a href="detalles.html?id=${num}" target="_blank">${
//         t.titulo
//       }</a>
//               </h4>

//               <ul>
//                 <li><p>Medida:<br>${t.medida.toLowerCase()}</p></li>

//                 <li><p>Descripción:<br>${t.detalle.toLowerCase()}</p></li>

//                 ${
//                   financiamiento
//                     ? `<li><p>Financiación:<br>${financiamiento
//                         .replace(/\n/g, "<br>")
//                         .toLowerCase()}</p></li>`
//                     : ""
//                 }

//                 ${contado ? `<li><p>${texto}</p></li>` : ""}
//               </ul>

//               <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
//                   <img src="images/ubicacion2.avif">
//                   <p>Ver ubicación</p>
//               </a>
//           </div>
//         `;

//       const htmlImagenesWrapper = `<div class="imagen">${htmlImagenes}</div>`;

//       // ------------------------------------------------------
//       // ORDEN DINÁMICO SEGÚN CANTIDAD DE IMÁGENES
//       // ------------------------------------------------------
//       if (imagenes.length > 10) {
//         // Content primero → Imágenes después
//         item.innerHTML = htmlContent + htmlImagenesWrapper;
//         item.style.flexDirection = "column";
//         //item.style.gridTemplateColumns = "repeat(5, 140px)";
//         const total = item.querySelectorAll(".imagen img");
//         const contenedorImg = item.querySelector(".imagen");
//         const contenedorContent = item.querySelector(".content");
//         if (total.length > 1) {
//           total.forEach((img, idx) => {
//             // img.style.width = "200px";
//             img.style.width = "auto";
//             img.style.margin = "auto";
//             img.style.height = "100%";
//             img.style.left = "0";
//             img.style.right = "0";
//             contenedorImg.style.display = "grid";
//             contenedorImg.style.gridTemplateColumns = "repeat(5, 140px)";
//             contenedorImg.style.width = "100%";
//             contenedorImg.style.height = "100%";
//             contenedorImg.style.marginTop = "5px";
//             contenedorContent.style.width = "100%";
//             //contenedorImg.style.justifyContent = "center";
//             contenedorImg.style.justifyContent = "space-evenly";
//             contenedorImg.style.alignItems = "center";
//             //console.log(contenedorImg);
//             //console.log(idx);
//           });
//         }
//         //console.log(total.length);
//         //console.log(document.querySelectorAll(".imagen img").length);
//         //console.log(item.querySelectorAll(".imagen img"));
//         //console.log(filas);
//         // const img = document.querySelectorAll(".imagen");
//         // const contenido = document.querySelectorAll(".content");
//         // img[1].style.display = "flex";
//         // contenido[1].style.width = "";
//         // const fotoTerreno = document.querySelectorAll(".imagen img");
//         // fotoTerreno.forEach((img, idx) => {
//         //   console.log(idx);
//         //   img.style.width = "200px";
//         // });
//       } else {
//         // Imagen primero → Content después
//         item.innerHTML = htmlImagenesWrapper + htmlContent;
//       }

//       contenedor.appendChild(item);
//       //const img = document.querySelectorAll(".imagen");
//       //const contenido = document.querySelectorAll(".content");
//       //const fotoTerreno = document.querySelectorAll(".foto-terreno");
//       //console.log(img[1]);
//       //   if (imagenes.length > 1) {
//       //     if (plataforma.includes("Win")) {
//       //       img[1].style.display = "grid";
//       //       img[1].style.width = "auto";
//       //       img[1].style.gridTemplateColumns = "repeat(5, 140px)";
//       //       contenido[1].style.width = "auto";
//       //       //fotoTerreno[1].style.width = "200px";
//       //     }
//       //     // fotoTerreno.forEach((img) => {
//       //     //   img.style.width = "200px";
//       //     // });
//       //     //fotoTerreno.style.width = "200px";
//       //     //document.querySelector(".imagen").style.display = "flex";
//       //   }
//     }
//   } catch (err) {
//     console.error("Error al cargar terrenos:", err);
//   }
// }

// Detectar coordenadas dentro de un link de Google Maps
function extraerCoordenadas(url) {
  if (!url) return null;

  // 1) Coordenadas decimales dentro de @LAT,LON
  const regexDecimal = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
  const matchDecimal = url.match(regexDecimal);

  if (matchDecimal) {
    // Reemplazo de "." por "-" aquí
    const latStr1 = matchDecimal[1].replace("-", "");
    const lngStr1 = matchDecimal[2].replace("-", "");
    const latStr = latStr1.replace(".", "-");
    const lngStr = lngStr1.replace(".", "-");

    return {
      lat: latStr, // si querés el string modificado
      lng: lngStr,
      formato: "decimal",
    };
  }

  // 2) Coordenadas formato DMS
  const regexDMS =
    /(\d+)[°](\d+)'(\d+\.\d+)"([NS])\+(\d+)[°](\d+)'(\d+\.\d+)"([EW])/;
  const matchDMS = url.match(regexDMS);

  if (matchDMS) {
    const lat = convertirDMADecimal(
      matchDMS[1],
      matchDMS[2],
      matchDMS[3],
      matchDMS[4]
    );

    const lng = convertirDMADecimal(
      matchDMS[5],
      matchDMS[6],
      matchDMS[7],
      matchDMS[8]
    );

    // Reemplazo también si querés que DMS quede igual
    return {
      lat: lat.toString().replace(".", "-"),
      lng: lng.toString().replace(".", "-"),
      formato: "DMS",
    };
  }

  return null;
}

// Conversión de DMS a decimal
function convertirDMADecimal(grados, minutos, segundos, direccion) {
  let decimal = Number(grados) + Number(minutos) / 60 + Number(segundos) / 3600;
  if (direccion === "S" || direccion === "W") decimal *= -1;
  return decimal;
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarTerrenos);
window.addEventListener("DOMContentLoaded", cargarInformacion);

document.addEventListener("click", function (e) {
  // Solo si clickeaste una imagen dentro de un terreno
  if (e.target.tagName === "IMG" && e.target.closest(".imagen")) {
    const img = e.target;

    // Si NO está en zoom → activarlo
    if (!img.classList.contains("img-zoom")) {
      img.classList.add("img-zoom");
      img.style.cursor = "zoom-out";
    } else {
      // Si ya está en zoom → salir
      img.classList.remove("img-zoom");
      img.style.cursor = "zoom-in";
    }
  }
});

function obtenerFinanciacion(texto) {
  if (!texto) return null;

  // Lista de palabras clave posibles
  const claves = [
    "financiación",
    "financiacion", // sin tilde
    "financiado",
    "financia",
    "cuotas",
  ];

  const lower = texto.toLowerCase();
  let indice = -1;

  // Buscar la primera palabra que aparezca
  for (const palabra of claves) {
    const pos = lower.indexOf(palabra.toLowerCase());
    if (pos !== -1) {
      indice = pos;
      break;
    }
  }

  // Si no se encontró ninguna palabra clave → no hay financiación
  if (indice === -1) return null;

  // Devolver desde la palabra clave encontrada hasta el final
  return texto.substring(indice).trim();
}

// function obtenerPrecioContado2(texto) {
//   if (!texto) return null;

//   const lower = texto.toLowerCase();
//   const idxContado = lower.indexOf("contado");
//   const idxValor = lower.indexOf("valor");

//   let indiceContado = -1;
//   let palabraClave = null;

//   if (idxContado !== -1 && idxValor !== -1) {
//     if (idxContado < idxValor) {
//       indiceContado = idxContado;
//       palabraClave = "contado";
//     } else {
//       indiceContado = idxValor;
//       palabraClave = "valor";
//     }
//   } else if (idxContado !== -1) {
//     indiceContado = idxContado;
//     palabraClave = "contado";
//   } else if (idxValor !== -1) {
//     indiceContado = idxValor;
//     palabraClave = "valor";
//   }

//   if (indiceContado === -1) return null;

//   // -----------------------------------------------------------------
//   // FUNCIÓN: detectar el valor y su moneda sin modificarla
//   // -----------------------------------------------------------------
//   function detectarValor(raw) {
//     if (!raw) return null;

//     let valor = raw.replace(/[^\d\.]/g, ""); // deja solo números y puntos
//     if (!valor) return null;

//     if (/u\$d|usd|u\$s/i.test(raw)) {
//       return {tipo: "dolares", valor: `U$D ${valor}`};
//     }

//     if (/\$/i.test(raw)) {
//       return {tipo: "pesos", valor: `$ ${valor}`};
//     }

//     return null;
//   }

//   // -----------------------------------------------------------------
//   // BUSCAR TODOS LOS VALORES EN EL TEXTO
//   // -----------------------------------------------------------------
//   const regexValor = /(U\$D\s*\d[\d\.]*|\$\s*\d[\d\.]*)/gi;
//   const encontrados = [...texto.matchAll(regexValor)];

//   let resultado = {
//     pesos: null,
//     dolares: null,
//   };

//   for (const m of encontrados) {
//     const dato = detectarValor(m[0]);
//     if (!dato) continue;

//     if (dato.tipo === "pesos" && !resultado.pesos) {
//       resultado.pesos = dato.valor;
//     }
//     if (dato.tipo === "dolares" && !resultado.dolares) {
//       resultado.dolares = dato.valor;
//     }
//   }

//   // Si encontró ambos → devolver ambos
//   if (resultado.pesos || resultado.dolares) {
//     return resultado;
//   }

//   // -----------------------------------------------------------------
//   // SI NO encontró valores directos con $ o U$D → usar la lógica vieja
//   // -----------------------------------------------------------------
//   const posterior = texto.substring(indiceContado + palabraClave.length).trim();
//   const palabras = posterior.split(/\s+/).slice(0, 2);

//   const contieneNumero = (str) => /\d/.test(str);
//   const numero = palabras.find(contieneNumero);

//   if (numero) {
//     return {pesos: `$ ${numero}`, dolares: null};
//   }

//   const regexNumero = /(\d[\d\.]{4,})/g;
//   const coincidencias = [...texto.matchAll(regexNumero)];

//   if (coincidencias.length > 0) {
//     let ultimoNumeroAntes = null;
//     for (const c of coincidencias) {
//       if (c.index < indiceContado) ultimoNumeroAntes = c[0];
//     }
//     if (ultimoNumeroAntes) {
//       return {pesos: `$ ${ultimoNumeroAntes}`, dolares: null};
//     }
//   }

//   return null;
// }

function obtenerPrecioContado(texto) {
  if (!texto) return null;

  const lower = texto.toLowerCase();

  // IDENTIFICAR palabra clave
  const idxContado = lower.indexOf("contado");
  const idxValor = lower.indexOf("valor");
  let indiceContado = -1;
  let palabraClave = null;

  if (idxContado !== -1 && idxValor !== -1) {
    if (idxContado < idxValor) {
      indiceContado = idxContado;
      palabraClave = "contado";
    } else {
      indiceContado = idxValor;
      palabraClave = "valor";
    }
  } else if (idxContado !== -1) {
    indiceContado = idxContado;
    palabraClave = "contado";
  } else if (idxValor !== -1) {
    indiceContado = idxValor;
    palabraClave = "valor";
  }

  if (indiceContado === -1) return null;

  // -----------------------------------------------------------------
  // FUNCION: determina si el valor es pesos o dólares
  // -----------------------------------------------------------------
  function detectarMoneda(str) {
    const l = str.toLowerCase();

    if (
      l.includes("u$d") ||
      l.includes("usd") ||
      l.includes("u$s") ||
      l.startsWith("u$")
    )
      return "USD";

    // Para evitar falso positivo: "$" SOLO si no es "U$D"
    if (/^\$/.test(str.trim())) return "ARS";

    return null;
  }

  // -----------------------------------------------------------------
  // Regex mejorado: captura: $ 25000 | U$D 35.000 | 25000 | 25.000
  // -----------------------------------------------------------------
  const regexValor =
    /(u\$d\s*\d[\d\.]*|usd\s*\d[\d\.]*|u\$s\s*\d[\d\.]*|\$\s*\d[\d\.]*|\b\d[\d\.]{3,})/gi;
  const encontrados = [...texto.matchAll(regexValor)];

  let resultado = {pesos: null, dolares: null};

  for (const m of encontrados) {
    const raw = m[0];
    const moneda = detectarMoneda(raw);
    //console.log(raw);

    // limpiar el número
    const numero = raw.replace(/[^\d\.]/g, "");

    if (!numero) continue;

    if (moneda === "ARS") {
      resultado.pesos = `$ ${numero}`;
    } else if (moneda === "USD") {
      resultado.dolares = `U$D ${numero}`;
    } else {
      // Si no tiene símbolo, decidir por contexto global
      if (
        lower.includes("usd") ||
        lower.includes("u$d") ||
        lower.includes("dolar")
      )
        resultado.dolares = `U$D ${numero}`;
      else resultado.pesos = `$ ${numero}`;
    }
  }

  // Si encontró valores → devolverlos
  if (resultado.pesos || resultado.dolares) return resultado;

  // -----------------------------------------------------------------
  // Búsqueda hacia adelante (primer número después de contado)
  // -----------------------------------------------------------------
  const posterior = texto.substring(indiceContado + palabraClave.length).trim();
  const palabras = posterior.split(/\s+/).slice(0, 2);
  const numeroAdelante = palabras.find((p) => /\d/.test(p));

  if (numeroAdelante) {
    return {pesos: `$ ${numeroAdelante}`, dolares: null};
  }

  return null;
}

function obtenerPrecioContado2(texto) {
  if (!texto) return null;

  const lower = texto.toLowerCase();
  const indiceContado1 = lower.indexOf("contado");
  // Buscar "contado" o "valor"
  const idxContado = lower.indexOf("contado");
  const idxValor = lower.indexOf("valor");
  let indiceContado = -1;
  let palabraClave = null;
  //if (indiceContado === -1) return null;

  // if (idxContado !== -1 && idxValor !== -1) {
  //   indiceContado = Math.min(idxContado, idxValor);
  // } else {
  //   indiceContado = idxContado !== -1 ? idxContado : idxValor;
  // }
  if (idxContado !== -1 && idxValor !== -1) {
    if (idxContado < idxValor) {
      indiceContado = idxContado;
      palabraClave = "contado";
    } else {
      indiceContado = idxValor;
      palabraClave = "valor";
    }
  } else if (idxContado !== -1) {
    indiceContado = idxContado;
    palabraClave = "contado";
  } else if (idxValor !== -1) {
    indiceContado = idxValor;
    palabraClave = "valor";
  }
  //console.log(indiceContado);
  if (indiceContado === -1) return null;

  // -----------------------------------------------------------------
  // FUNCIÓN EXTRA: determina si un valor es PESOS o DÓLARES
  // + Si ya tiene $ o U$D, NO agrega nada
  // -----------------------------------------------------------------
  function formatearValor(valor, texto) {
    if (!valor) return null;

    // Si ya contiene un símbolo → NO modificar
    if (/\$|u\$d/i.test(valor)) {
      return valor.replace("$", "$ ");
    }

    const lower = texto.toLowerCase();

    const esPesos =
      lower.includes("pesos") ||
      lower.includes("peso") ||
      lower.includes("$") ||
      lower.includes("ars");

    const esDolares =
      lower.includes("dolar") ||
      lower.includes("dolares") ||
      lower.includes("dólar") ||
      lower.includes("usd") ||
      lower.includes("u$d") ||
      lower.includes("u$s");
    //console.log(`dolar ${esDolares}`);
    //console.log(`peso ${esPesos}`);
    //console.log(`valor ${valor}`);

    if (esPesos && !esDolares) return `$ ${valor}`;
    if (esDolares && !esPesos) return `U$D ${valor}`;

    // Si menciona ambos, elegimos el más cercano al valor
    const idxValor = texto.indexOf(valor);
    const idxPeso = lower.indexOf("pesos");
    const idxDolar = lower.indexOf("dolares");
    //console.log(`dolar: ${idxDolar}`);
    //console.log(`peso: ${idxPeso}`);

    const distPeso = Math.abs(idxValor - idxPeso);
    const distDolar = Math.abs(idxValor - idxDolar);

    if (distPeso < distDolar) return `$ ${valor}`;
    else return `U$D ${valor}`;
  }

  // -----------------------------------------------------------------
  // 1) Buscar hacia adelante (primeras 2 palabras)
  // -----------------------------------------------------------------
  //const posterior = texto.substring(indiceContado + "contado".length).trim();
  const posterior = texto.substring(indiceContado + palabraClave.length).trim();
  const palabras = posterior.split(/\s+/).slice(0, 2);

  const contieneNumero = (str) => /\d/.test(str);

  const hayNumeroAdelante = palabras.some(contieneNumero);

  if (hayNumeroAdelante) {
    const numero = palabras.find(contieneNumero);
    return formatearValor(numero, texto);
  }

  // -----------------------------------------------------------------
  // 2) Si NO hay número adelante → buscar hacia atrás
  //    nnnnn o nn.nn.nn o 20000 o 20.000.000 etc.
  // -----------------------------------------------------------------
  const regexNumero = /(\d[\d\.]{4,})/g;
  const coincidencias = [...texto.matchAll(regexNumero)];

  if (coincidencias.length > 0) {
    let ultimoNumeroAntes = null;

    for (const c of coincidencias) {
      if (c.index < indiceContado) ultimoNumeroAntes = c[0];
    }

    return ultimoNumeroAntes ? formatearValor(ultimoNumeroAntes, texto) : null;
  }

  return null;
}

async function ConvertirApesos(importe) {
  const options = {method: "GET", headers: {accept: "application/json"}};
  const valor = importe.replace(".", "");
  try {
    const resp = await fetch(
      `https://api.fastforex.io/convert?from=USD&to=ARS&amount=${valor}&api_key=53f03dc89e-3ac874c308-t6aaw0`,
      options
    );
    data = await resp.json();
    const pesos = await data.result.ARS;
    //console.log(pesos);
    return pesos;
  } catch {
    print("Ha ocurrido un error");
  }
}

async function cargarInformacion() {
  try {
    // 1) Cargar JSON (puede ser local o remoto)
    const resp = await fetch("data/informacion.json");
    const data = await resp.json();
    //console.log(data);

    // 2) Seleccionar el contenedor
    const contenedor = document.querySelector(".destacados");
    const info = document.createElement("div");
    info.className = "tituloInformacion";
    info.innerHTML = `
      <h1>Información Importante</h1>
    `;
    contenedor.innerHTML = ""; // limpiar contenido actual
    contenedor.appendChild(info);

    // 3) Generar tarjetas dinámicamente
    data.forEach((bloque) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h3>${bloque.titulo}</h3>
        <ul>
          ${bloque.items.map((i) => `<li>${i}</li>`).join("")}
        </ul>
      `;

      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Error cargando destacados:", error);
  }
}
