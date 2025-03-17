import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, TextField } from "@/components/ui";

export default function SandboxPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Actualizar el estado cuando la URL cambia (para manejar el caso de recarga de la página)
  useEffect(() => {
    if (router.query.search) {
      setSearch(router.query.search as string);
    }
  }, [router.query.search]);

  // Manejar el cambio en el input y actualizar la URL
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);

    // Actualiza la URL con el nuevo valor sin recargar la página
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, search: value || undefined }, // Elimina el parámetro si está vacío
      },
      undefined,
      { shallow: true } // Evita una nueva solicitud al servidor
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Controls</h2>
      <div className="grid grid-cols-2 gap-2 w-96">
        <Button variant="primary" onClick={() => alert("Primary clicked!")}>
          Primary Button
        </Button>
        <Button variant="secondary" size="large">
          Large Secondary Button
        </Button>
        <Button variant="success" disabled>
          Disabled Success Button
        </Button>
        <Button variant="danger" size="small">
          Small Danger Button
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 w-96">
        <div>
          <label htmlFor="name">name</label>
          <TextField tabIndex={1} id="name" name="name" />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <TextField tabIndex={2} type="email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="address">address</label>
          <TextField tabIndex={3} id="address" />
        </div>
        <div>
          <label htmlFor="birth">Date of Birth</label>
          <TextField tabIndex={4} type="date" id="birth" />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="search">Search</label>
          <TextField
            tabIndex={5}
            placeholder="City, State, street"
            id="search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
}
