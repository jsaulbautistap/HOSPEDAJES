# Componente Backend para Gestión de Hospedajes

El objetivo del proyecto fue **desarrollar el componente backend** de una aplicación de hospedajes, permitiendo a **huéspedes**, **anfitriones** y **administradores** interactuar con el sistema a través de funcionalidades clave como gestión de alojamientos, reservas, pagos, reportes, calificaciones.

---

## Descripción del Proyecto

El sistema está desarrollado bajo una arquitectura **RESTful API** utilizando **Node.js**, **Express** y **MongoDB**. Se implementaron endpoints seguros, estructurados y documentados que permiten a los diferentes tipos de usuario gestionar funcionalidades específicas según su rol.

- **Huésped**: puede registrarse, reservar alojamientos, calificar o reportar, visualizar sus reservas y realizar pagos con saldo.
- **Anfitrión**: gestiona sus alojamientos, ve las reservas recibidas y visualiza su saldo.
- **Administrador**: supervisa alojamientos, reportes y el estado de la plataforma.

---
## Características Principales

- Autenticación con JWT
- Registro e inicio de sesión de usuarios
- Gestión de alojamientos por anfitriones
- Sistema de reservas por parte de los huéspedes
- Calificación y reporte de alojamientos
- Gestión de reportes por parte del administrador
- Visualización de saldo para anfitriones
- Documentación de API con Swagger
- Subida de imágenes a Cloudinary
- Validación de roles y seguridad en endpoints
  
---


## Requisitos Previos

Antes de instalar y ejecutar este proyecto, asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org/) 
- [MongoDB](https://www.mongodb.com/) 
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)
- Cuenta de correo para recuperación de contraseña



---

# Instalación

## 1. Clona el repositorio:
Para tener acceso al proyecto, abre una terminal y pega el siguiente comando para clonar el repositorio.

```
git clone https://github.com/jsaulbautistap/HOSPEDAJES.git
```
## 2. Instala dependencias
Ejecuta el siguiente comando para instalar las dependencias del proyecto.

```
npm install
```
## 3. Variables de Entorno 
Ubica el archivo **.env.example** y reemplazalo con el nombre de **.env**

En este archivo, reemplaza las siguientes variables por sus propias
```
MONGODB_URI_PROD = "mongodb+srv://ejemplousuario:ejemplocontraseña"
JWT_SECRET = xxxxxxxxxxxx
CLOUDINARY_CLOUD_NAME=hospedajes
CLOUDINARY_API_KEY= xxxxxxxxxxxx
CLOUDINARY_API_SECRET= xxxxxxxxxxxxxx
COMISION = 0.3 
USER_MAIL_TRAP= ejemplo.correo@ejemplo.com
PASSWORD_MAIL_TRAP = ejemplo_contraseña`

```
## 4. Iniciar Servidor
Ejecuta el siguiente comando para iniciar el servidor 
```
npm run dev
```

# Documentación de la API 
Para documentar la API se utilizó la herramienta de Swagger.

Se encuentra disponible en [API DOCS](https://hospedajes-4rmu.onrender.com/doc/)




