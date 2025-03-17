export default function RootLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <html lang="es">
        <body className="bg-gray-100 text-gray-900">
          <header className="p-4 bg-blue-600 text-white text-center">
            <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
          </header>
          <main className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
            {children}
          </main>
        </body>
      </html>
    );
  }
  