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
let imgInfo2;
const whatsapp = document.querySelector("#imagen-flotante");
const numero = "+5492995933317";
const url = `https://wa.me/${encodeURIComponent(numero)}`;
//https://api.whatsapp.com/send?phone=+5492995933317&text=esto
const urlJSON =
  "https://drive.google.com/uc?export=download&id=1zjkNZVr-lyQ3CVVFA1HodNlYI5Ucg0Xq";
//"https://drive.google.com/file/d/1zjkNZVr-lyQ3CVVFA1HodNlYI5Ucg0Xq/view?usp=sharing";

window.onload = function () {
  //console.log(plataforma);
  if (plataforma.includes("Android")) {
    textoBtnUbicacion = "hhh ";
    //const imagen = document.querySelector(".imgFlotante"); //.style.display = "none";
    //console.log(imagen);
    //imgInfo = "images/info.avif";
    imgInfo = "images/whatsapp.avif";
  } else if (plataforma.includes("Win")) {
    textoBtnUbicacion = "Ver ubicación";
    imgInfo = "images/left.avif";
    imgInfo2 = "images/whatsapp.avif";
  }
};

const params = new URLSearchParams(window.location.search);
const mostrarID = params.get("id"); // ej: "7"

// Cargar dinámicamente los terrenos desde terrenos.json
async function cargarTerrenos() {
  try {
    //const respuesta = await fetch("data/terrenos.json");
    const respuesta = await fetch(urlJSON);
    const terrenos = await respuesta.json();

    const contenedor = document.getElementById("lista-terrenos");
    contenedor.innerHTML = ""; // Limpiar lista

    //terrenos.forEach((t) => {
    for (const t of terrenos) {
      const coords = extraerCoordenadas(t.ubicacion);
      //console.log("Coordenadas detectadas:", coords);

      const item = document.createElement("div");
      item.classList.add(`item`);
      num++;
      item.id = `item-${num}`;
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
      let texto = "";
      //let esDolar = false;
      //let esPesos = false;
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

          texto = `
            <!-- Precio Contado en Dólares:<br>${contado.dolares}<br> -->
            Precio Contado en Dólares:<br>${t.precio}<br>
            Precio Contado en Pesos (convertido):<br>$ ${montoPesos.toLocaleString()}
          `;
        } else if (esPesos && !esDolar) {
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
      }

      item.innerHTML = `
        <div class="tituloImg">
          <div class="titulo" title="Haga click en el título para más información">
            <h4>
              <a href="detalles.html?id=${num}" target="_blank">${t.titulo.toLowerCase()}</a>
            </h4>
          </div>
          <div class="imagen">
            <div class="TextoImagen">
            <img src="${rutaImagen}" alt="Terreno" />
              <p class="titulo-zoom">${t.titulo.toLowerCase()}</p>
            </div>
            <!-- <img src="${rutaImagen}" alt="Terreno" /> -->
          </div>
          <a href="${t.ubicacion}" target="_blank" class="btn-ubicacion">
              <img src="images/ubicacion2.avif">
              <p class="textoUbicacion">${textoBtnUbicacion}</p>
          </a>
      </div>
      <div class="content">
          <!-- <h4>${t.titulo}</h4> -->
          <div class="imgFlotante">
            <!-- <a href="${url}?text=Quiero más información sobre: ${t.titulo.toLowerCase()}\nhola" target="_blank"><img id="imagen-flotante" src="${imgInfo}" ></a> -->
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
            <span class="texto-flotante">Haga click en el título para más información<br>Presione aquí para contactarse con un vendedor.!</span>
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
      </div>
    `;

      contenedor.appendChild(item);
      //});
    }
    // Después que se terminan de cargar todos los terrenos
    if (mostrarID) {
      setTimeout(() => {
        const elemento = document.getElementById("item-" + mostrarID);

        if (elemento) {
          elemento.scrollIntoView({behavior: "smooth", block: "start"});
          elemento.classList.add("resaltado");
        }
      }, 200); // pequeño delay para asegurar que se renderizó
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
    const contenedor = img.closest(".imagen"); // 📌 Contenedor de la imagen
    const texto = contenedor.querySelector("p");
    //console.log(texto);

    // Si NO está en zoom → activarlo
    if (!img.classList.contains("img-zoom")) {
      img.classList.add("img-zoom");
      img.style.cursor = "zoom-out";
      texto.classList.add("active");
    } else {
      // Si ya está en zoom → salir
      img.classList.remove("img-zoom");
      img.style.cursor = "zoom-in";
      texto.classList.remove("active");
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
