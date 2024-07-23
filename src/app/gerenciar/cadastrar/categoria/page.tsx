"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TableListAction } from "@/components/Resources/Table";

import Menu from "@/components/Html/Body/Menu/menu";
import Submenu from "@/components/Html/Body/Submenu/submenu";
import { useEffect, useState } from "react";
import { AlertEmpty } from "@/components/ui/alert";

export default function Categoria() {
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

  const onSubmitCategory = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    await fetch("/api/category", {
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

  const onSubmitSubCategory = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    await fetch("/api/subcategory", {
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
            <div className="h-80 col-span-1 rounded-sm border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">
                  Cadastro de Categoria
                </p>
              </div>

              <div className="px-6 my-4 pointer-events-none">
                <p>
                  Cadastre categoria de acordo com o tipo de movimentação
                  financeira realizada.
                </p>
              </div>

              <form
                className="flex flex-col items-start px-6"
                onSubmit={onSubmitCategory}
              >
                <Label className="pointer-events-none">
                  Descrição Categoria
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  id="descricao"
                  name="description"
                  placeholder="Digite uma descrição..."
                  type="text"
                />
                <Button type="submit">Cadastrar</Button>
              </form>
            </div>

            <div className="h-80 col-span-1 border bg-white shadow-md">
              <div className="h-full bg-gradient-to-r rounded-sm from-slate-800 to-slate-600">
                <div className="items-center text-lg flex font-poppins-bold text-white  rounded-t-sm">
                  <p className="px-6 pt-4 pointer-events-none">
                    Lista de Categoorias
                  </p>
                </div>
                <div className="items-center text-sm flex font-poppins-bold text-white rounded-t-sm">
                  <p className="px-6 pointer-events-none">
                    Clique no item caso deseje gerencia-lo.
                  </p>
                </div>
                <TableListAction
                  className={`h-64 p-4 w-full rounded-md`}
                  variant={`category`}
                />
              </div>
            </div>

            <div className="h-80 col-span-1 rounded-sm border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">
                  Cadastro de Subcategoria
                </p>
              </div>

              <div className="px-6 my-4 pointer-events-none">
                <p>
                  Cadastre subcategoria de acordo com o tipo de movimentação
                  financeira realizada.
                </p>
              </div>

              <form
                className="flex flex-col items-start px-6"
                onSubmit={onSubmitSubCategory}
              >
                <Label className="pointer-events-none">
                  Descrição Subcategoria
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  id="descricao"
                  name="description"
                  placeholder="Digite uma descrição..."
                  type="text"
                />
                <Button type="submit">Cadastrar</Button>
              </form>
            </div>

            <div className="h-80 col-span-1 border bg-white shadow-md">
              <div className="h-full bg-gradient-to-r rounded-sm from-slate-800 to-slate-600">
                <div className="items-center text-lg flex font-poppins-bold text-white  rounded-t-sm">
                  <p className="px-6 pt-4 pointer-events-none">
                    Lista de Subcategorias
                  </p>
                </div>
                <div className="items-center text-sm flex font-poppins-bold text-white rounded-t-sm">
                  <p className="px-6 pointer-events-none">
                    Clique no item caso deseje gerencia-lo.
                  </p>
                </div>
                <TableListAction
                  className={`h-64 p-4 w-full rounded-md`}
                  variant={`subcategory`}
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
