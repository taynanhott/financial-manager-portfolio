"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AlertEmpty, AlertFail } from "@/components/ui/alert";

interface Props {
  elementId: string;
  url: string;
}

export function Update({ elementId, url }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const onUpdate = async (id: string, event: any, url: string) => {
    event.preventDefault();

    const formElement = document.getElementById(
      "form-update"
    ) as HTMLFormElement;

    if (!formElement) {
      console.error("Form not found");
      return;
    }

    const formData = new FormData(formElement);
    formData.append("id", id);

    const response = await fetch(url, {
      method: "PUT",
      body: formData,
    });

    if (response.ok) {
      location.reload();
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleEditClick = (event: any) => {
    event.preventDefault();
    onUpdate(elementId, event, url);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-8">Editar Registro</Button>
        </DialogTrigger>
        <DialogContent className="w-10/12 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <ClipboardPenIcon className="size-12 text-blue-500" />
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Editar registro</h3>
              <p className="text-muted-foreground">
                Você está prestes a editar seu registro. Certifique-se de que
                todas as informações estejam corretas.
              </p>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleEditClick}>Editar Registro</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showAlert && <AlertEmpty />}
    </>
  );
}

export function Delete({ elementId, url }: Props) {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        location.reload();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const onDelete = async (id: string, url: string) => {
    const data = { id: id };

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      location.reload();
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleDeleteClick = (event: any) => {
    event.preventDefault();
    onDelete(elementId, url);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full">
            Excluir registro
          </Button>
        </DialogTrigger>
        <DialogContent className="w-10/12 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <CircleXIcon className="size-12 text-red-500" />
            <div className="space-y-2 text-center">
              <h3 className="text-xl font-bold">Excluir Registro</h3>
              <p className="text-muted-foreground">
                Tem certeza que deseja inativar o registro permanentemente? Essa
                ação não poderá ser revertida.
              </p>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end gap-2">
              <DialogClose>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={handleDeleteClick} variant="destructive">
                  Excluir Registro
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {showAlert && <AlertFail />}
    </>
  );
}

function ClipboardPenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M10.4 12.6a2 2 0 0 1 3 3L8 21l-4 1 1-4Z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5" />
      <path d="M4 13.5V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

function CircleXIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
