"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import moment from "moment";
import "moment/locale/pt-br";

import { useEffect, useState } from "react";
import { useDate } from "@/context/DateContext";
import { Delete, Update } from "../confirm";

export function DialogDeptor() {
  const { date } = useDate();
  const [collects, setCollects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchCollect = async () => {
      try {
        const queryParams = new URLSearchParams({
          dtini: date.dtini ? date.dtini.toISOString() : "",
          dtend: date.dtend ? date.dtend.toISOString() : "",
        });

        const response = await fetch(`/api/collect?${queryParams.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCollects(data.collects);
        setLoading(true);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchCollect();
  }, [collects, date.dtini, date.dtend]);

  return (
    <>
      {collects.length > 0 ? (
        collects.map((element: any, index: number) => (
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
                <td className="p-2 text-sm">
                  {element.status ? `Pago` : `Pendente`}
                </td>
                <td className="p-2 text-sm text-center">
                  {moment.utc(element.date).format("DD/MM/YYYY")}
                </td>
                <td className="p-2 text-sm text-left text-nowrap">
                  R$ {Number(element.value).toFixed(2)}
                </td>
              </motion.tr>
            </DialogTrigger>
            <DialogContent className="w-10/12 rounded-lg">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <div className="grid grid-cols-4">
                    <h4 className="col-span-3 justify-start font-medium leading-none pointer-events-none">
                      Gerenciar Arrecadações
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground pointer-events-none">
                    Realize as ações desejadas para asarrecadações cadastradas.
                  </p>
                </div>
                <form id="form-update" className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Descrição</Label>
                    <Input
                      defaultValue={element.description}
                      className="col-span-2 h-8"
                      name="description"
                      placeholder="Digite uma descrição..."
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label className="col-span-1">Situação</Label>
                    <select
                      defaultValue={`${element.status}`}
                      name="status"
                      className="col-span-2 pl-2 bg-white border-slate-200 h-full p-0">
                      <option value="true">Pago</option>
                      <option value="false">Pendente</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label>Valor</Label>
                    <Input
                      type="number"
                      name="value"
                      defaultValue={`${element.value}`}
                      step="0.01"
                      pattern="^\d*\.?\d*$"
                      placeholder="Digite um valor..."
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="height">Data</Label>
                    <Input
                      type="date"
                      name="date"
                      className="col-span-2"
                      defaultValue={moment
                        .utc(element.date)
                        .format("YYYY-MM-DD")}
                      readOnly={false}
                    />
                  </div>
                  <Update elementId={element.id} url={`/api/collect`} />
                </form>
                <Delete elementId={element.id} url={`/api/collect`} />
              </div>
            </DialogContent>
          </Dialog>
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

export function ListDeptor() {
  const { date } = useDate();
  const [collects, setCollects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    const fetchCollect = async () => {
      try {
        const queryParams = new URLSearchParams({
          dtini: date.dtini ? date.dtini.toISOString() : "",
          dtend: date.dtend ? date.dtend.toISOString() : "",
        });

        const response = await fetch(`/api/collect?${queryParams.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCollects(data.collects);
        setLoading(true);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchCollect();
  }, [collects, date.dtini, date.dtend]);
  return (
    <>
      {collects.length > 0 ? (
        collects.map((element: any, index: number) => (
          <motion.tr
            key={`tr-${index}`}
            className={`pointer-events-none`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <td className="p-2 text-sm font-medium">
              {element.description}
            </td>
            <td className="p-2 text-sm">
              {element.status ? `Pago` : `Pendente`}
            </td>
            <td className="p-2 text-sm text-center">
              {moment.utc(element.date).format("DD/MM/YYYY")}
            </td>
            <td className="p-2 text-sm text-left text-nowrap">
              R$ {Number(element.value).toFixed(2)}
            </td>
          </motion.tr>
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
  )
}