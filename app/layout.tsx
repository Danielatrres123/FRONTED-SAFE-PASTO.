// app/layout.tsx
import './globals.css'; // si tienes estilos globales

export const metadata = {
  title: 'Safe Pasto',
  description: 'Aplicación Safe Pasto',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

