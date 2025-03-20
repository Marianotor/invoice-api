# Usa una imagen base oficial de Node.js (puedes elegir otra versión si lo requieres)
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]