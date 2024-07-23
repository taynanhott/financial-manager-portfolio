"use client";

import Menu from "@/components/Html/Body/Menu/menu";
import Submenu from "@/components/Html/Body/Submenu/submenu";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertEmpty } from "@/components/ui/alert";
import { TableListAction } from "@/components/Resources/Table";

export default function Arrecadar() {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  function alertHide() {
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2500);

    return () => clearTimeout(timer);
  }

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    await fetch("/api/collect", {
      method: "POST",
      body: formData,
    }).then((response) => {
      setLoading(false);
      if (response.ok) {
        location.reload();
        setShowAlert(false);
      } else {
        alertHide();
      }
    });
  };

  return (
    <>
      <Menu />
      <section className="grow lg:ml-[240px] mt-14 lg:mt-auto pb-12">
        <div id="header-page">
          <Submenu />
        </div>

        <div id="mid-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-[38px] pt-[38px]">
            <div className="h-[470px] lg:h-[450px] col-span-1 rounded-sm border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">
                  Cadastro de Arrecadação
                </p>
              </div>

              <div className="px-6 my-4 pointer-events-none">
                <p>Cadastre todos os valores pendentes recebimento.</p>
              </div>

              <form
                className="flex flex-col items-start px-6"
                onSubmit={onSubmit}
              >
                <Label className="pointer-events-none">
                  Descrição da arrecadação
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  name="description"
                  placeholder="Digite uma descrição..."
                  type="text"
                />

                <Label className="pointer-events-none">
                  Prazo de recebimento
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  type="date"
                  name="date"
                />

                <Label className="pointer-events-none">Valor</Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  type="number"
                  name="value"
                  pattern="^\d*\.?\d*$"
                  placeholder="Digite um valor..."
                />

                <Button disabled={loading} type="submit">
                  Cadastrar
                </Button>
              </form>
            </div>

            <div className="h-80 lg:h-[450px] col-span-1 border bg-white shadow-md">
              <div className="h-full rounded-sm bg-gradient-to-r from-slate-800 to-slate-600">
                <div className="items-center text-lg flex font-poppins-bold text-white rounded-t-sm">
                  <p className="px-6 pt-4 pointer-events-none">
                    Lista de Devedores
                  </p>
                </div>
                <div className="items-center text-sm flex font-poppins-bold text-white rounded-t-sm">
                  <p className="px-6 pointer-events-none">
                    Clique no item caso deseje gerencia-lo.
                  </p>
                </div>
                <TableListAction
                  className={`h-64 lg:h-96 p-4 w-full rounded-md`}
                  variant={`deptor`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {showAlert && <AlertEmpty />}
    </>
  );
}