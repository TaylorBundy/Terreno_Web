const plataforma = navigator.userAgent;
// Cargar dinámicamente los terrenos desde terrenos.json
// async function cargarTerrenos() {
//   try {
//     const respuesta = await fetch("data/terrenos.json");
//     const terrenos = await respuesta.json();

//const {data} = require("jquery");

//     const contenedor = document.getElementById("lista-terrenos");
//     contenedor.innerHTML = ""; // Limpiar lista

//     terrenos.forEach((t) => {
//       const coords = extraerCoordenadas(t.ubicacion);
//       console.log("Coordenadas detectadas:", coords);

//       const item = document.createElement("div");
//       item.classList.add("item");

//       item.innerHTML = `
//             <img src="${t.imagen}" alt="Terreno" />
//             <div>
//                 <h4>${t.titulo}</h4>
//                 <p>${t.medida}</p>
//                 <p>${t.detalle}</p>
//                 ${
//                   coords
//                     ? `<p><b>Lat:</b> ${coords.lat} <b>Lng:</b> ${coords.lng}</p>`
//                     : ""
//                 }
//                 <a href="${
//                   t.ubicacion
//                 }" target="_blank" class="btn-ubicacion">Ver ubicación</a>
//             </div>
//         `;

//       contenedor.appendChild(item);
//     });
//   } catch (err) {
//     console.error("Error al cargar terrenos:", err);
//   }
// }

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

let texto;
let importePesos;
let htmlImagenes = "";

// async function cargarTerrenos2() {
//   try {
//     const respuesta = await fetch("data/terrenos.json");
//     const terrenos = await respuesta.json();

//     const contenedor = document.getElementById("lista-terrenos");
//     contenedor.innerHTML = ""; // Limpiar lista

//     terrenos.forEach((t) => {
//       const coords = extraerCoordenadas(t.ubicacion);
//       //console.log("Coordenadas detectadas:", coords);

//       const item = document.createElement("div");
//       item.classList.add("item");

//       // Si detectamos coordenadas → generar carpeta dinámica
//       let rutaImagen = "img/noimage.jpg"; // fallback

//       if (coords) {
//         // Convertir LAT decimal a formato carpeta: 38.880071 → 38-880071
//         const carpetaLat = String(coords.lat).replace(".", "-");

//         // Ruta dinámica
//         rutaImagen = `terrenos/${carpetaLat}/1.avif`;
//       }
//       const financiamiento = obtenerFinanciacion(t.detalle);
//       const contado = obtenerPrecioContado(t.detalle);
//       const esDolares = contado.includes("U$D");

//       if (esDolares) {
//         console.log(contado.replace("U$D", ""));
//         const monto = contado.replace("U$D", "");
//         (async () => {
//           const descripcion = await ConvertirApesos(monto);
//           texto = `Precio Contado en Dolares:<br>${contado
//             .replace(/\n/g, "<br>")
//             .toLowerCase()}<br>Precio Contado en Pesos (convertido):<br>$ ${descripcion.toLocaleString()}`;
//           console.log(descripcion);
//           item.innerHTML = `
//       <div class="imagen">
//           <img src="${rutaImagen}" alt="Terreno" />
//           </div>

//           <div class="content">
//               <h4>${t.titulo}</h4>
//               <ul>
//               <li><p>Medida:<br> ${t.medida.toLowerCase()}</p></li>
//               <li><p>Descripción:<br> ${t.detalle.toLowerCase()}</p></li>
//               <!-- <li>Financiación:<br> ${t.detalle}</li> -->
//               ${
//                 financiamiento
//                   ? `<li><p>Financiación:<br>${financiamiento
//                       .replace(/\n/g, "<br>")
//                       .toLowerCase()}</p></li>`
//                   : ""
//               }
//               <!-- ${
//                 contado
//                   ? `<li><p>${texto}<br>${contado
//                       .replace(/\n/g, "<br>")
//                       .toLowerCase()}</p></li>`
//                   : ""
//               } -->
//               ${contado ? `<li><p>${texto}</p></li>` : ""}

//               </ul>
//               <!-- <p>${t.medida}</p> -->
//               <!-- <p>${t.detalle}</p> -->

//               <!-- ${
//                 coords
//                   ? `<p><b>Lat:</b> ${coords.lat} <b>Lng:</b> ${coords.lng}</p>`
//                   : `<p style="color:red;">No se detectaron coordenadas</p>`
//               } -->

//               <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
//               <img src="images/ubicacion2.avif"></img>
//                   <p>Ver ubicación</p>
//               </a>
//           </div>
//         `;
//         })();
//         //console.log(descripcion);
//       } else {
//         //texto = "Precio Contado en Pesos:";
//         texto = `Precio Contado en Pesos:<br>${contado
//           .replace(/\n/g, "<br>")
//           .toLowerCase()}`;
//         //return null;
//       }

//       item.innerHTML = `
//       <div class="imagen">
//           <img src="${rutaImagen}" alt="Terreno" />
//           </div>

//           <div class="content">
//               <h4>${t.titulo}</h4>
//               <ul>
//               <li><p>Medida:<br> ${t.medida.toLowerCase()}</p></li>
//               <li><p>Descripción:<br> ${t.detalle.toLowerCase()}</p></li>
//               <!-- <li>Financiación:<br> ${t.detalle}</li> -->
//               ${
//                 financiamiento
//                   ? `<li><p>Financiación:<br>${financiamiento
//                       .replace(/\n/g, "<br>")
//                       .toLowerCase()}</p></li>`
//                   : ""
//               }
//               <!-- ${
//                 contado
//                   ? `<li><p>${texto}<br>${contado
//                       .replace(/\n/g, "<br>")
//                       .toLowerCase()}</p></li>`
//                   : ""
//               } -->
//               ${contado ? `<li><p>${texto}</p></li>` : ""}

//               </ul>
//               <!-- <p>${t.medida}</p> -->
//               <!-- <p>${t.detalle}</p> -->

//               <!-- ${
//                 coords
//                   ? `<p><b>Lat:</b> ${coords.lat} <b>Lng:</b> ${coords.lng}</p>`
//                   : `<p style="color:red;">No se detectaron coordenadas</p>`
//               } -->

//               <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
//               <img src="images/ubicacion2.avif"></img>
//                   <p>Ver ubicación</p>
//               </a>
//           </div>
//         `;

//       contenedor.appendChild(item);
//     });
//   } catch (err) {
//     console.error("Error al cargar terrenos:", err);
//   }
// }

// async function cargarTerrenos3() {
//   try {
//     const respuesta = await fetch("data/terrenos.json");
//     const terrenos = await respuesta.json();

//     const contenedor = document.getElementById("lista-terrenos");
//     contenedor.innerHTML = ""; // Limpiar lista

//     for (const t of terrenos) {
//       const coords = extraerCoordenadas(t.ubicacion);

//       const item = document.createElement("div");
//       item.classList.add("item");

//       // ------------------------------------------------------
//       // Cargar imágenes desde carpeta de coordenadas
//       // ------------------------------------------------------
//       let htmlImagenes = "";

//       if (coords) {
//         const carpetaLat = String(coords.lat).replace(".", "-");
//         const basePath = `terrenos/${carpetaLat}/`;

//         let index = 1;
//         let sigue = true;

//         while (sigue) {
//           const ruta = `${basePath}${index}.jpg`;
//           try {
//             const resp = await fetch(ruta);
//             if (resp.ok) {
//               htmlImagenes += `<img src="${ruta}" class="foto-terreno" alt="Terreno">`;
//               index++;
//             } else {
//               sigue = false;
//             }
//           } catch (e) {
//             sigue = false;
//           }
//         }
//       }

//       if (!htmlImagenes) {
//         htmlImagenes = `<img src="img/noimage.jpg" class="foto-terreno" alt="Terreno">`;
//       }

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

//           // Convertir a pesos
//           const montoPesos = await ConvertirApesos(monto);

//           texto = `
//               Precio Contado en Dólares:<br>${contado.toLowerCase()}<br>
//               Precio Contado en Pesos (convertido):<br>$ ${montoPesos.toLocaleString()}
//             `;
//         } else {
//           texto = `
//               Precio Contado en Pesos:<br>${contado.toLowerCase()}
//             `;
//         }
//       }

//       // ------------------------------------------------------
//       // Insertar en HTML final
//       // ------------------------------------------------------
//       item.innerHTML = `
//           <div class="imagen">${htmlImagenes}</div>

//           <div class="content">
//               <h4>${t.titulo}</h4>

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

//       contenedor.appendChild(item);
//     }
//   } catch (err) {
//     console.error("Error al cargar terrenos:", err);
//   }
// }

async function cargarTerrenos() {
  try {
    const respuesta = await fetch("data/terrenos.json");
    const terrenos = await respuesta.json();

    const contenedor = document.getElementById("lista-terrenos");
    contenedor.innerHTML = ""; // Limpiar lista

    let num = 0;
    for (const t of terrenos) {
      const coords = extraerCoordenadas(t.ubicacion);

      const item = document.createElement("div");
      num++;
      item.classList.add(`item`);
      item.id = `item-${num}`;
      //item.style.display = "flex";
      //console.log(num);

      // ------------------------------------------------------
      // Cargar imágenes desde carpeta de coordenadas
      // ------------------------------------------------------
      let imagenes = [];
      //let htmlImagenes = "";
      let index1 = 0;
      if (coords) {
        const carpetaLat = String(coords.lat).replace(".", "-");
        const basePath = `terrenos/${carpetaLat}/`;

        let index = 1;
        let sigue = true;

        while (sigue) {
          const ruta = `${basePath}${index}.avif`;
          try {
            const resp = await fetch(ruta);
            if (resp.ok) {
              imagenes.push(ruta);
              //console.log(imagenes.length);
              //console.log(index);
              //   htmlImagenes = imagenes
              //     .map(
              //       (r) =>
              //         `<img src="${r}" class="foto-terreno-${index}" alt="Terreno">`
              //     )
              //     .join("");
              //index1 = imagenes.length;
              index++;
            } else {
              sigue = false;
            }
          } catch (e) {
            sigue = false;
          }
        }
      }
      //index1 = imagenes.length;

      const filas = [...document.querySelectorAll(".item .imagen")];
      if (imagenes.length === 0) {
        htmlImagenes = `<img src="img/noimage.jpg" class="foto-terreno" alt="Terreno">`;
        //console.log(filas);
      } else {
        //imagenes.forEach((img, idx) => {
        //console.log(idx);
        //index1 = idx;
        //});
        //console.log(index1);

        //const todo = document.querySelectorAll(`.item`);
        //const filas = [...document.querySelectorAll(".item .imagen")];
        //const todoImg = todo.querySelector(".img");
        //console.log(filas);
        htmlImagenes = imagenes
          .map(
            (img, idx) =>
              `<img src="${img}" class="foto-terreno-${idx}" alt="Terreno">`
          )
          .join("");
        // htmlImagenes = imagenes
        //   .map((img, idx) => {
        //     return `<img src="${img}" class="foto-terreno-${idx}" alt="Terreno">`;
        //   })
        //   .join("");
        //const todo = htmlImagenes.querySelector(`.foto-terreno-${idx}`);
        console.log(imagenes.length);
        //console.log(htmlImagenes.split("Terreno"));
        //   htmlImagenes = imagenes
        //     .map(
        //       (r) =>
        //         `<img src="${r}" class="foto-terreno-${index1}" alt="Terreno">`
        //     )
        //     .join("");
        //});
      }

      // ------------------------------------------------------
      // FINANCIACIÓN Y CONTADO
      // ------------------------------------------------------
      const financiamiento = obtenerFinanciacion(t.detalle);
      const contado = obtenerPrecioContado(t.detalle);

      let texto = "";
      let esDolar = false;

      if (contado) {
        esDolar = contado.includes("U$D");

        if (esDolar) {
          const monto = contado.replace("U$D", "").trim();
          const montoPesos = await ConvertirApesos(monto);

          texto = `
              Precio Contado en Dólares:<br>${contado.toLowerCase()}<br>
              Precio Contado en Pesos (convertido):<br>$ ${montoPesos.toLocaleString()}
            `;
        } else {
          texto = `Precio Contado en Pesos:<br>${contado.toLowerCase()}`;
        }
      }

      // ------------------------------------------------------
      // ARMADO DEL CONTENIDO
      // ------------------------------------------------------
      const htmlContent = `
          <div class="content">
              <h4>${t.titulo}</h4>
  
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
  
                ${contado ? `<li><p>${texto}</p></li>` : ""}
              </ul>
  
              <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
                  <img src="images/ubicacion2.avif">
                  <p>Ver ubicación</p>
              </a>
          </div>
        `;

      const htmlImagenesWrapper = `<div class="imagen">${htmlImagenes}</div>`;

      // ------------------------------------------------------
      // ORDEN DINÁMICO SEGÚN CANTIDAD DE IMÁGENES
      // ------------------------------------------------------
      if (imagenes.length > 1) {
        // Content primero → Imágenes después
        item.innerHTML = htmlContent + htmlImagenesWrapper;
        item.style.flexDirection = "column";
        //item.style.gridTemplateColumns = "repeat(5, 140px)";
        const total = item.querySelectorAll(".imagen img");
        const contenedorImg = item.querySelector(".imagen");
        const contenedorContent = item.querySelector(".content");
        if (total.length > 1) {
          total.forEach((img, idx) => {
            // img.style.width = "200px";
            img.style.width = "auto";
            img.style.margin = "auto";
            img.style.height = "100%";
            img.style.left = "0";
            img.style.right = "0";
            contenedorImg.style.display = "grid";
            contenedorImg.style.gridTemplateColumns = "repeat(5, 140px)";
            contenedorImg.style.width = "100%";
            contenedorImg.style.height = "100%";
            contenedorImg.style.marginTop = "5px";
            contenedorContent.style.width = "100%";
            //contenedorImg.style.justifyContent = "center";
            contenedorImg.style.justifyContent = "space-evenly";
            contenedorImg.style.alignItems = "center";
            console.log(contenedorImg);
            console.log(idx);
          });
        }
        console.log(total.length);
        console.log(document.querySelectorAll(".imagen img").length);
        console.log(item.querySelectorAll(".imagen img"));
        console.log(filas);
        // const img = document.querySelectorAll(".imagen");
        // const contenido = document.querySelectorAll(".content");
        // img[1].style.display = "flex";
        // contenido[1].style.width = "";
        // const fotoTerreno = document.querySelectorAll(".imagen img");
        // fotoTerreno.forEach((img, idx) => {
        //   console.log(idx);
        //   img.style.width = "200px";
        // });
      } else {
        // Imagen primero → Content después
        item.innerHTML = htmlImagenesWrapper + htmlContent;
      }

      contenedor.appendChild(item);
      //const img = document.querySelectorAll(".imagen");
      //const contenido = document.querySelectorAll(".content");
      //const fotoTerreno = document.querySelectorAll(".foto-terreno");
      //console.log(img[1]);
      //   if (imagenes.length > 1) {
      //     if (plataforma.includes("Win")) {
      //       img[1].style.display = "grid";
      //       img[1].style.width = "auto";
      //       img[1].style.gridTemplateColumns = "repeat(5, 140px)";
      //       contenido[1].style.width = "auto";
      //       //fotoTerreno[1].style.width = "200px";
      //     }
      //     // fotoTerreno.forEach((img) => {
      //     //   img.style.width = "200px";
      //     // });
      //     //fotoTerreno.style.width = "200px";
      //     //document.querySelector(".imagen").style.display = "flex";
      //   }
    }
  } catch (err) {
    console.error("Error al cargar terrenos:", err);
  }
}

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
    //console.log(latStr1);
    //console.log(lngStr1);
    //const latStr = matchDecimal[1].replace(".", "-");
    const latStr = latStr1.replace(".", "-");
    //const lngStr = matchDecimal[2].replace(".", "-");
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

// function extraerCoordenadas(url) {
//   if (!url) return null;

//   // 1) Coordenadas decimales dentro de @LAT,LON
//   const regexDecimal = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
//   const matchDecimal = url.match(regexDecimal);

//   if (matchDecimal) {
//     const latStr = matchDecimal[1].replace(".", "-");
//     const lngStr = matchDecimal[2].replace(".", "-");
//     return {
//       latStr,
//       lngStr,
//       //lat: parseFloat(matchDecimal[1].replace(".", "-")),
//       //lng: parseFloat(matchDecimal[2]),
//       formato: "decimal",
//     };
//   }

//   // 2) Coordenadas en formato DMS (grados, minutos y segundos)
//   const regexDMS =
//     /(\d+)[°](\d+)'(\d+\.\d+)"([NS])\+(\d+)[°](\d+)'(\d+\.\d+)"([EW])/;
//   const matchDMS = url.match(regexDMS);

//   if (matchDMS) {
//     const lat = convertirDMADecimal(
//       matchDMS[1],
//       matchDMS[2],
//       matchDMS[3],
//       matchDMS[4]
//     );

//     const lng = convertirDMADecimal(
//       matchDMS[5],
//       matchDMS[6],
//       matchDMS[7],
//       matchDMS[8]
//     );

//     return {
//       //lat,
//       //lng,
//       lat: lat.toString().replace(".", "-"),
//       lng: lng.toString().replace(".", "-"),
//       formato: "DMS",
//     };
//   }

//   // Si no se detectan coordenadas
//   return null;
// }

// Conversión de DMS a decimal
function convertirDMADecimal(grados, minutos, segundos, direccion) {
  let decimal = Number(grados) + Number(minutos) / 60 + Number(segundos) / 3600;
  if (direccion === "S" || direccion === "W") decimal *= -1;
  return decimal;
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarTerrenos);

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

// function obtenerFinanciacion2(texto) {
//   // Si no hay financiación, devolvemos null
//   if (!texto.includes("FINANCIACIÓN")) return null;

//   // Extraemos desde "FINANCIACIÓN" hasta el final
//   const index = texto.indexOf("FINANCIACIÓN");
//   return texto.substring(index).trim();
// }

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

// function obtenerContado2(texto) {
//   const claves = [
//     "valor de contado",
//     "precio contado",
//     "precio de contado",
//     "de contado",
//     "contado",
//     "valor",
//     "valor anterior",
//   ];

//   // Buscar la primera coincidencia
//   let indice = -1;
//   for (const palabra of claves) {
//     const pos = texto.toLowerCase().indexOf(palabra.toLowerCase());
//     if (pos !== -1) {
//       indice = pos;
//       break;
//     }
//   }

//   if (indice === -1) return null; // No existe apartado de contado

//   return texto.substring(indice).trim();
// }

// function obtenerContado(texto) {
//   const claves = [
//     "valor de contado",
//     "precio contado",
//     "precio de contado",
//     "de contado",
//     "contado",
//   ];

//   const min = texto.toLowerCase();

//   // 1. Buscar primera coincidencia
//   let indice = -1;
//   for (const palabra of claves) {
//     const pos = min.indexOf(palabra.toLowerCase());
//     if (pos !== -1 && (indice === -1 || pos < indice)) {
//       indice = pos;
//     }
//   }

//   if (indice === -1) return null;

//   // 2. Recortar desde ahí
//   let recorte = texto.substring(indice).trim();

//   // 3. Cortar cuando aparezcan mayúsculas completas que suelen ser otros mensajes
//   //    como: "CON LA TIERRA", "OBRA DE LUZ", "AGUA", "CANCELADOS"...
//   const cortadores = [
//     "CON LA",
//     "OBRA",
//     "TIERRA",
//     "AGUA",
//     "CANCELADOS",
//     "CUOTAS",
//     "FINAN",
//   ];

//   for (const c of cortadores) {
//     const pos = recorte.indexOf(c);
//     if (pos > 5) {
//       // evitar cortar dentro de "DE CONTADO!!"
//       recorte = recorte.substring(0, pos).trim();
//     }
//   }

//   return recorte;
// }
// function obtenerPrecioContado2(texto) {
//   const lower = texto.toLowerCase();
//   const indiceContado = lower.indexOf("contado");

//   if (indiceContado === -1) return null;

//   // 1. Tomar el texto posterior a "contado"
//   const posterior = texto.substring(indiceContado + "contado".length).trim();

//   // 2. Tomar las primeras 2 palabras luego de "contado"
//   const palabras = posterior.split(/\s+/).slice(0, 2);

//   const contieneNumero = (str) => /\d/.test(str);

//   // 3. Si NO aparece un número en las primeras 2 palabras → buscar hacia atrás
//   const hayNumeroAdelante = palabras.some(contieneNumero);

//   if (!hayNumeroAdelante) {
//     // Buscar valores numéricos mayores o iguales a 5 dígitos (para evitar 20, 50, etc)
//     const numeros = [...texto.matchAll(/(\d[\d\.]{4,})/g)];

//     if (numeros.length > 0) {
//       // Tomar el ÚLTIMO número antes de "contado"
//       let numeroCorrecto = null;

//       for (const n of numeros) {
//         if (n.index < indiceContado) {
//           numeroCorrecto = n[0];
//         }
//       }
//       console.log(numeroCorrecto);

//       return numeroCorrecto ? numeroCorrecto : null;
//     }

//     return null;
//   }

//   // 4. Caso normal: sí hay número después de "contado"
//   console.log(palabras.find(contieneNumero));
//   return palabras.find(contieneNumero);
// }

// function obtenerPrecioContado3(texto) {
//   if (!texto) return null;

//   const lower = texto.toLowerCase();
//   const indiceContado = lower.indexOf("contado");
//   if (indiceContado === -1) return null;

//   // -----------------------------------------------------------------
//   // FUNCIÓN EXTRA: determina si un valor es PESOS o DÓLARES
//   // -----------------------------------------------------------------
//   function formatearValor(valor, texto) {
//     if (!valor) return null;
//     const lower = texto.toLowerCase();

//     const esPesos =
//       lower.includes("pesos") ||
//       lower.includes("peso") ||
//       lower.includes("$") ||
//       lower.includes("ars");

//     const esDolares =
//       lower.includes("dolar") ||
//       lower.includes("dólar") ||
//       lower.includes("usd") ||
//       lower.includes("u$d") ||
//       lower.includes("u$s");

//     if (esPesos && !esDolares) return `$ ${valor}`;
//     if (esDolares && !esPesos) return `U$D ${valor}`;

//     // Si menciona ambos, elegimos el más cercano al valor
//     const idxValor = texto.indexOf(valor);
//     const idxPeso = lower.indexOf("peso");
//     const idxDolar = lower.indexOf("dolar");

//     const distPeso = Math.abs(idxValor - idxPeso);
//     const distDolar = Math.abs(idxValor - idxDolar);

//     if (distPeso < distDolar) return `$ ${valor}`;
//     else return `U$D ${valor}`;
//   }

//   // -----------------------------------------------------------------
//   // 1) Buscar hacia adelante (primeras 2 palabras)
//   // -----------------------------------------------------------------
//   const posterior = texto.substring(indiceContado + "contado".length).trim();
//   const palabras = posterior.split(/\s+/).slice(0, 2);

//   const contieneNumero = (str) => /\d/.test(str);

//   const hayNumeroAdelante = palabras.some(contieneNumero);

//   if (hayNumeroAdelante) {
//     const numero = palabras.find(contieneNumero);
//     return formatearValor(numero, texto);
//   }

//   // -----------------------------------------------------------------
//   // 2) NO hay número adelante → buscar hacia atrás
//   //    nnnnn o nn.nn.nn o 20000 o 20.000.000 etc.
//   // -----------------------------------------------------------------
//   const regexNumero = /(\d[\d\.]{4,})/g;
//   const coincidencias = [...texto.matchAll(regexNumero)];

//   if (coincidencias.length > 0) {
//     let ultimoNumeroAntes = null;

//     for (const c of coincidencias) {
//       if (c.index < indiceContado) ultimoNumeroAntes = c[0];
//     }

//     return ultimoNumeroAntes ? formatearValor(ultimoNumeroAntes, texto) : null;
//   }

//   return null;
// }

function obtenerPrecioContado(texto) {
  if (!texto) return null;

  const lower = texto.toLowerCase();
  const indiceContado = lower.indexOf("contado");
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
      lower.includes("dólar") ||
      lower.includes("usd") ||
      lower.includes("u$d") ||
      lower.includes("u$s");

    if (esPesos && !esDolares) return `$ ${valor}`;
    if (esDolares && !esPesos) return `U$D ${valor}`;

    // Si menciona ambos, elegimos el más cercano al valor
    const idxValor = texto.indexOf(valor);
    const idxPeso = lower.indexOf("peso");
    const idxDolar = lower.indexOf("dolar");

    const distPeso = Math.abs(idxValor - idxPeso);
    const distDolar = Math.abs(idxValor - idxDolar);

    if (distPeso < distDolar) return `$ ${valor}`;
    else return `U$D ${valor}`;
  }

  // -----------------------------------------------------------------
  // 1) Buscar hacia adelante (primeras 2 palabras)
  // -----------------------------------------------------------------
  const posterior = texto.substring(indiceContado + "contado".length).trim();
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

  //   const resp = await fetch(
  //     `https://api.fastforex.io/convert?from=USD&to=ARS&amount=${valor}&api_key=53f03dc89e-3ac874c308-t6aaw0`,
  //     options
  //   )
  //     .then((res) => res.json())
  //     //.then((res) => console.log(res.result.ARS))
  //     .then((res) => {
  //       console.log(res.result.ARS);
  //       const pesos = res.result.ARS;
  //       return pesos;
  //     })
  //     .catch((err) => console.error(err));
  try {
    const resp = await fetch(
      `https://api.fastforex.io/convert?from=USD&to=ARS&amount=${valor}&api_key=53f03dc89e-3ac874c308-t6aaw0`,
      options
    );
    //const resp2 = await fetch(url2 + apikey);
    //console.log(resp.json())
    //console.log(base)
    data = await resp.json();
    const pesos = data.result.ARS;
    //const data2 = await resp2.json()
    //const curren = await data2["currencies"]
    //divisas = await data["result"];
    //resultado = divisas[div] * cant;
    //console.log(data2)
    //console.log(divisas[div])
    //console.log(resultado)
    //divRes.value = simbolo + resultado.toFixed(4);
    //holaaaa();
    console.log(pesos);
    return pesos;
  } catch {
    print("Ha ocurrido un error");
  }
}
