# 📬 Correo Temporal BSZ

Este proyecto utiliza la [API de Mail.tm](https://docs.mail.tm/) para generar correos electrónicos temporales automáticamente desde el navegador, mostrar los mensajes recibidos, copiar el correo al portapapeles y mostrar la IP pública del usuario.

---

## 🚀 Características

- Generación automática de correo temporal.
- Copia directa del correo al portapapeles.
- Lectura automática de mensajes recibidos.
- Alerta visual si no llegan mensajes en 30 segundos.
- Visualización de IP pública del usuario.

---

## 🔧 Tecnologías usadas

- HTML + JavaScript
- API REST de [Mail.tm](https://mail.tm/)
- API pública [ipify.org](https://www.ipify.org/) para IP del cliente
- Íconos de Font Awesome (`fa-envelope-circle-check`)

---

## 📂 Estructura general del código

### Funciones principales

- `obtenerDominio()`: Obtiene el dominio de correo disponible.
- `crearCuenta(email, password)`: Registra un nuevo correo temporal.
- `obtenerToken(email, password)`: Autentica el correo y devuelve el token de sesión.
- `obtenerMensajes()`: Lista los mensajes recibidos.
- `obtenerMensaje(id)`: Devuelve el contenido completo de un mensaje.
- `copiarAlPortapapeles(texto)`: Copia texto al portapapeles con fallback.
- `mostrarAlerta(mensaje)`: Muestra mensajes emergentes al usuario.
- `mostrarIP()`: Muestra la IP pública del usuario.
- `iniciar()`: Lógica principal que crea el correo, obtiene token y espera mensajes.
- `generarNuevoCorreo()`: Reinicia el flujo para obtener un nuevo correo.

---

## 📋 Ejemplo de uso

1. Al cargar la página se genera un correo automáticamente.
2. El correo se copia al portapapeles.
3. Se visualiza la IP pública.
4. Se espera la llegada de mensajes.
5. Si no hay mensajes en 30 segundos, se notifica al usuario.
6. Se puede hacer clic en un botón para generar un nuevo correo.

---

## ✅ Servicios que SÍ suelen aceptar correos temporales

| Servicio           | Tipo                | Comentarios generales                                                              |
|--------------------|---------------------|-------------------------------------------------------------------------------------|
| Discord            | Comunicación        | Generalmente permite, aunque recomienda correo válido.                             |
| Slack              | Comunicación        | Permite, pero no para cuentas oficiales o empresariales.                           |
| Telegram (registro)| Mensajería          | Solo teléfono, pero no restringe correos temporales para bots.                     |
| Spotify            | Música              | Permite registros con correos temporales en ocasiones.                             |
| Deezer             | Música              | Menos restrictivo, puede bloquear en algunos casos.                                |
| SoundCloud         | Música              | Acepta, pero no recomendado.                                                       |
| Pinterest          | Red social          | Más permisivo, pero puede bloquear.                                                |
| Reddit             | Comunidad           | Permite algunos correos temporales, no recomendado.                                |
| Twitch             | Streaming / Juegos  | Algunos dominios temporales funcionan, no recomendado.                             |
| Steam              | Juegos              | Generalmente acepta correos temporales.                                            |
| GitHub             | Desarrollo          | Permite correos temporales para pruebas y usuarios.                                |
| GitLab             | Desarrollo          | Similar a GitHub.                                                                  |
| Bitbucket          | Desarrollo          | Más permisivo.                                                                     |
| Stack Overflow     | Desarrollo          | Permite, aunque recomienda correos válidos.                                        |
| Medium             | Blogging            | Acepta correos temporales para registro.                                           |
| WordPress.com      | Blogging            | Generalmente permite.                                                              |
| Tumblr             | Blogging            | Permite correos temporales.                                                        |
| Figma              | Diseño gráfico      | Permite correos temporales.                                                        |
| Skype              | Videollamadas       | Más permisivo con correos temporales.                                              |
| Zoom               | Videoconferencias   | Permite pero puede limitar algunas funciones.                                      |
| Mailchimp          | Email marketing     | Permite registro, pero bloquea algunas campañas.                                   |
| Wix                | Creación web        | Permite correos temporales.                                                        |
| Coursera           | Educación           | Permite correos temporales para registro.                                          |
| Udemy              | Educación           | Generalmente permite.                                                              |
| Khan Academy       | Educación           | Permite correos temporales.                                                        |
| Duolingo           | Educación           | Permite registro con correos temporales.                                           |

![image](https://github.com/user-attachments/assets/35d8a7c2-add8-4ef7-a876-d65aaa6d3ccb)
