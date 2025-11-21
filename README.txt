Pasos para ejecutar frontend local

1) Requisitos: Node.js LTS (18 o 20)
2) Abrir terminal en: C:\Users\USUARIO\Desktop\safePasto\Frontend-SafePasto
3) Configurar variables de entorno:
   NEXT_PUBLIC_API_URL=http://localhost:8080/api
   NEXT_PUBLIC_WS_URL=http://localhost:8080/ws-alertas
   (en Windows puede hacerse desde Configuración del sistema o usando setx)
4) Instalar dependencias:
   npm install
5) Ejecutar en desarrollo:
   npm run dev
6) Abrir el navegador en:
   http://localhost:3000
   Home: mapa, filtros, listado y estado WS
   /login: autenticación JWT
   /new-alert: creación de alertas

Despliegue en Vercel
1) Conectar este repositorio a Vercel
2) Variables del proyecto:
   NEXT_PUBLIC_API_URL=https://<tu-backend>.onrender.com/api
   NEXT_PUBLIC_WS_URL=https://<tu-backend>.onrender.com/ws-alertas
3) Deploy desde Vercel y validar la Home