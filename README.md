# Invoice API

Este proyecto consiste en una API para gestionar facturas, clientes y productos, utilizando **Node.js**, **Express**, **TypeORM** y **PostgreSQL**. El entorno de desarrollo se levanta con **Docker Compose** para facilitar la instalación y configuración.

---

## Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) instalado.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

_(Opcional pero recomendado)_

- [Node.js](https://nodejs.org/) >= 14, si deseas ejecutar la API localmente fuera de Docker.

---

## Configuración

1. **Archivo `.env` (opcional):**  
   Si deseas personalizar las variables de entorno (por ejemplo, credenciales de la base de datos), puedes crear un archivo `.env` en la raíz del proyecto y definir valores como:

   ```bash
   DB_HOST=db
   DB_USER=postgres
   DB_PASSWORD=admin
   DB_NAME=invoice_db
   PORT=3000

   ## Cómo Levantar el Entorno

   ```

1. Clona el repositorio:

   ```bash
   git clone https://github.com/marianotor/invoice-api.git

   cd invoice-api

   docker-compose up -d
   ```
