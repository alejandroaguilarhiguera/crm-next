import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Input } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea"

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
    <div className="m-4">
      <h2 className="text-xl font-bold mb-4">ui</h2>
      
    <div className="grid grid-cols-2 gap-4 my-4">
      {/* Enabled button */}
    <div className="grid grid-cols-1 border p-2 rounded shadow-md">
      <h4>Enabled</h4>
      <div className="grid grid-cols-2 gap-2 ">
        <Button variant="default" onClick={() => alert("Primary clicked!")}>
        default
        </Button>
        <Button variant="destructive">
        destructive
        </Button>
        <Button variant="ghost">
        ghost
        </Button>
        <Button variant="link">
        link
        </Button>

        <Button variant="outline">
        outline
        </Button>

        <Button variant="secondary">
        secondary
        </Button>
      </div>
      </div>
      {/* Disabled button */}
      <div className="grid grid-cols-1 border p-2 rounded shadow-md">
      <h4>Disabled</h4>
      <div className="grid grid-cols-2 gap-2 ">
        <Button variant="default" disabled onClick={() => alert("Primary clicked!")}>
        default
        </Button>
        <Button variant="destructive" disabled>
        destructive
        </Button>
        <Button variant="ghost" disabled>
        ghost
        </Button>
        <Button variant="link" disabled>
        link
        </Button>

        <Button variant="outline" disabled>
        outline
        </Button>

        <Button variant="secondary" disabled>
        secondary
        </Button>
      </div>
      </div>

      {/* Enabled Input */}
      <div className="grid grid-cols-1">
        <h4>Input enabled</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="name">name</label>
            <Input id="name" name="name" />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <Input type="email" name="email" id="email" />
          </div>
          <div>
            <label htmlFor="address">address</label>
            <Input id="address" />
          </div>
          <div>
            <label htmlFor="birth">Date of Birth</label>
            <Input type="date" id="birth" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <Textarea id="description" />
          </div>

        </div>
      </div>

      {/* Disabled Input */}
      <div className="grid grid-cols-1">
        <h4>Input disabled</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="name">name</label>
            <Input name="name" disabled />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <Input type="email" name="email" disabled />
          </div>
          <div>
            <label htmlFor="address">address</label>
            <Input name="address" disabled/>
          </div>
          <div>
            <label htmlFor="birth">Date of Birth</label>
            <Input type="date" disabled />
          </div>

        </div>
      </div>

    </div>

  
    </div>
  );
}
