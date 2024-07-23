"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Update, Delete } from "../confirm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function DialogCategory() {
  const [categorys, setCategorys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchCategory = async () => {
      try {
        const response = await fetch("/api/category", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCategorys(data.categorys);
        setLoading(true);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchCategory();
  }, [categorys]);

  return (
    <>
      {categorys.length > 0 ? (
        categorys.map((element: any, index: number) => (
          <>
            <Dialog key={`dialog-${index}`}>
              <DialogTrigger asChild>
                <motion.tr
                  key={`tr-${index}`}
                  className={`hover:bg-slate-600 cursor-pointer`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <td className="p-2 text-sm font-medium">
                    {element.description}
                  </td>
                </motion.tr>
              </DialogTrigger>
              <DialogContent className="w-10/12 rounded-lg">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <div className="grid grid-cols-4">
                      <h4 className="col-span-3 justify-start font-medium leading-none pointer-events-none">
                        Gerenciar Categorias
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground pointer-events-none">
                      Realize as ações desejadas para as categorias cadastradas.
                    </p>
                  </div>
                  <form id="form-update" className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label>Descrição</Label>
                      <Input
                        defaultValue={element.description}
                        className="col-span-2 h-8"
                        name="description"
                      />
                    </div>
                    <Update elementId={element.id} url={`/api/category`} />
                  </form>
                  <Delete elementId={element.id} url={`/api/category`} />
                </div>
              </DialogContent>
            </Dialog>
          </>
        ))
      ) : (
        <motion.tr
          className={`pointer-events-none`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <td colSpan={5} className="p-2 text-sm text-center font-medium">
            {loading ? (
              "Nenhum resultado encontrado"
            ) : (
              <span className="loader"></span>
            )}
          </td>
        </motion.tr>
      )}
    </>
  );
}
