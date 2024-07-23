"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertEmpty } from "@/components/ui/alert";
import { TableListAction } from "@/components/Resources/Table";

import React from "react";
import Menu from "@/components/Html/Body/Menu/menu";
import Submenu from "@/components/Html/Body/Submenu/submenu";

export default function Pagamento() {
  const [category, setCategorys] = useState<any[]>([]);
  const [subcategory, setSubCategorys] = useState<any[]>([]);
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

    await fetch("/api/payment", {
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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const categoryUrl = "/api/category";
        const subcategoryUrl = "/api/subcategory";

        const [categoryResponse, subcategoryResponse] = await Promise.all([
          fetch(categoryUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(subcategoryUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (!categoryResponse.ok || !subcategoryResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [categoryData, subcategoryData] = await Promise.all([
          categoryResponse.json(),
          subcategoryResponse.json(),
        ]);

        setCategorys(categoryData.categorys);
        setSubCategorys(subcategoryData.subcategorys);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Menu />
      <section className="grow lg:ml-[240px] mt-14 lg:mt-auto pb-12">
        <div id="header-page">
          <Submenu />
        </div>

        <div id="mid-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-[38px] pt-[38px]">
            <div className="h-[650px] lg:h-[620px] col-span-1 rounded-sm border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">
                  Cadastro de Pagamento
                </p>
              </div>

              <div className="px-6 my-4 pointer-events-none">
                <p>
                  Cadastre todas as movimentações financeiras que debitaram de
                  sua conta.
                </p>
              </div>

              <form
                className="flex flex-col items-start px-6"
                onSubmit={onSubmit}
              >
                <Label className="pointer-events-none">
                  Descrição da movimentação
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Digite uma descrição..."
                />

                <Label className="pointer-events-none">Categoria</Label>
                <select
                  name="category"
                  disabled={loading}
                  className="w-full md:w-1/2 lg:w-1/2">
                  {category.length > 0 ? (
                    category.map((cat: any, index: number) => (
                      <option key={`option-cat-${index}`} value={cat.id}>
                        {cat.description}
                      </option>
                    ))
                  ) : (

                    <option>
                      {loading ? (
                        "Nenhuma categoria encontrada"
                      ) : (
                        "Carregando..."
                      )}
                    </option>
                  )}
                </select>

                <Label className="pointer-events-none">Subcategoria</Label>
                <select
                  name="subcategory"
                  disabled={loading}
                  className="w-full md:w-1/2 lg:w-1/2">
                  {subcategory.length > 0 ? (
                    subcategory.map((sub: any, index: number) => (
                      <option key={`option-sub-${index}`} value={sub.id}>
                        {sub.description}
                      </option>
                    ))
                  ) : (

                    <option>
                      {loading ? (
                        "Nenhuma subcategoria encontrada"
                      ) : (
                        "Carregando..."
                      )}
                    </option>
                  )}
                </select>

                <Label className="pointer-events-none">
                  Data da movimentação
                </Label>
                <Input
                  className="bg-slate-100 w-full md:w-1/2 lg:w-1/2 border border-slate-300 my-4"
                  type="date"
                  name="date"
                  pattern="^\d*\.?\d*$"
                  placeholder="Digite um valor..."
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

            <div className="h-80 lg:h-[620px] col-span-1 rounded-sm border bg-white shadow-md">
              <div className="h-full rounded-sm bg-gradient-to-r from-slate-800 to-slate-600">
                <div className="items-center text-lg flex font-poppins-bold text-white  rounded-t-sm">
                  <p className="px-6 pt-4 pointer-events-none">
                    Lista de Movimentações
                  </p>
                </div>
                <div className="items-center text-sm flex font-poppins-bold text-white rounded-t-sm">
                  <p className="px-6 pointer-events-none">
                    Clique no item caso deseje gerencia-lo.
                  </p>
                </div>
                <TableListAction
                  className={`h-60 lg:h-[540px] p-4 w-full rounded-md`}
                  variant={`paymount`}
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
