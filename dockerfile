# Use a lightweight Node.js 18 image as the base
FROM node:18-alpine AS builder

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Configura NODE_OPTIONS para compatibilidad con OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copia todos los archivos de la aplicación Angular al contenedor
COPY . .

# Compila la aplicación Angular en archivos estáticos
RUN ng build --configuration=production

# Usa una imagen ligera de Nginx como base para servir los archivos estáticos
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist/e-app .

EXPOSE 80

# Use the default Nginx configuration
CMD ["nginx", "-g", "daemon off;"]

