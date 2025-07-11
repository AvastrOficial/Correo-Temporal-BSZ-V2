    const apiUrl = 'API PRIVADA BSZ';
  let token = '';
  let emailActual = '';
  let passwordGenerada = '';
  let mensajeLlegado = false;
  let alertTimeout;

  async function obtenerDominio() {
    const res = await fetch(`${apiUrl}/domains`);
    const data = await res.json();
    return data['hydra:member'][0].domain;
  }

  async function crearCuenta(email, password) {
    await fetch(`${apiUrl}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: email, password })
    });
  }

  async function obtenerToken(email, password) {
    const res = await fetch(`${apiUrl}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: email, password })
    });
    const data = await res.json();
    return data.token;
  }

  async function obtenerMensajes() {
    const res = await fetch(`${apiUrl}/messages`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return data['hydra:member'];
  }

  async function obtenerMensaje(id) {
    const res = await fetch(`${apiUrl}/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return await res.json();
  }

  function mostrarAlerta(mensaje, duracion = 3000) {
    const alerta = document.getElementById('alertaPop');
    document.getElementById('alertaTexto').textContent = mensaje;
    alerta.classList.add('mostrar');
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
      alerta.classList.remove('mostrar');
    }, duracion);
  }

  function copiarCorreo() {
    copiarAlPortapapeles(emailActual);
  }

 function copiarCorreo() {
  const correo = document.getElementById("correoGenerado")?.textContent.trim();
  if (correo && correo.includes("@")) {
    copiarAlPortapapeles(correo);
  } else {
    mostrarAlerta("No hay un correo válido para copiar");
  }
}

function copiarAlPortapapeles(texto) {
  if (!texto) {
    mostrarAlerta("Texto vacío, no se pudo copiar");
    return;
  }

  // Intentar API moderna
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(texto)
      .then(() => mostrarAlerta("Correo copiado al portapapeles"))
      .catch(err => {
        console.error("Error clipboard API:", err);
        fallbackCopy(texto);
      });
  } else {
    fallbackCopy(texto);
  }
}

function fallbackCopy(texto) {
  const textarea = document.createElement("textarea");
  textarea.value = texto;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const exito = document.execCommand("copy");
    mostrarAlerta(exito ? "Correo copiado al portapapeles" : "No se pudo copiar");
  } catch (err) {
    console.error("Fallback error:", err);
    mostrarAlerta("Error al copiar correo");
  } finally {
    document.body.removeChild(textarea);
  }
}


  async function cargarMensajes() {
    const contenedor = document.getElementById('mensajes');
    contenedor.innerHTML = 'Cargando mensajes...';
    const mensajes = await obtenerMensajes();
    contenedor.innerHTML = '';

    if (mensajes.length === 0) {
      contenedor.innerHTML = 'Buzón vacío.';
      return;
    }

    mensajeLlegado = true;

    for (const msg of mensajes) {
      const detalle = await obtenerMensaje(msg.id);
      const div = document.createElement('div');
      div.className = 'mensaje';
      div.innerHTML = `
        <h3>De: ${detalle.from?.address || '(desconocido)'}</h3>
        <strong>Asunto:</strong> ${detalle.subject || '(Sin asunto)'}<br/>
        <p>${detalle.text || '[Mensaje vacío]'}</p>
      `;
      contenedor.appendChild(div);
    }
  }
async function iniciar() {
  try {
    passwordGenerada = Math.random().toString(36).substring(2, 12);
    const dominio = await obtenerDominio();
    emailActual = `bsz_${Math.random().toString(36).substring(2, 8)}@${dominio}`;

    const emailDiv = document.getElementById('email');
    emailDiv.innerHTML = `
      <i class="fa-solid fa-envelope-circle-check"></i>
      <span id="correoGenerado">${emailActual}</span>
    `;

    try {
      await crearCuenta(emailActual, passwordGenerada);
    } catch (e) {
      console.warn('La cuenta pudo haber sido creada anteriormente.');
    }

    token = await obtenerToken(emailActual, passwordGenerada);
    document.getElementById('mensajes').innerHTML = 'Buzón vacío.';

    mensajeLlegado = false;
    clearTimeout(alertTimeout);
    alertTimeout = setTimeout(() => {
      if (!mensajeLlegado) {
        mostrarAlerta('No han llegado mensajes en los últimos 30 segundos.', 5000);
      }
    }, 30000);

    // 🔽 Copiar automáticamente el correo al portapapeles
    copiarAlPortapapeles(emailActual);

  } catch (e) {
    mostrarAlerta('Error al generar correo temporal');
    console.error(e);
  }
}


  function generarNuevoCorreo() {
    iniciar();
    document.getElementById('mensajes').innerHTML = '';
  }

  // Ejecutar al cargar
  iniciar();
    
     async function mostrarIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      document.getElementById('ip-box').textContent = data.ip;
    } catch (error) {
      document.getElementById('ip-box').textContent = 'No se pudo obtener la IP';
      console.error('Error al obtener la IP:', error);
    }
  }

  mostrarIP();
