"use client";

import moment from "moment";
import Image from "next/image";
import Menu from "@/components/Html/Body/Menu/menu";
import Graph from "@/components/Resources/GraphApex";
import Submenu from "@/components/Html/Body/Submenu/submenu";
import CardDashBoard from "@/components/Resources/CardBoard";
import { motion } from "framer-motion";
import useAnimatedCount from "@/components/animation";

import { ListDash } from "@/components/Resources/Table";
import { seriesPayment } from "@/components/Resources/GraphApex/functions";
import { totalCard } from "@/components/Resources/CardBoard/functions";
import { useDate } from "@/context/DateContext";
import { useEffect, useState } from "react";

export default function Gerenciar() {
  const { date } = useDate();
  const [paymentsall, setPaymentsAll] = useState<any[]>([]);
  const [collectsall, setCollectsAll] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [collects, setCollects] = useState<any[]>([]);
  const [category, setCategorys] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsQueryParams = new URLSearchParams({
          dtini: date.dtini ? date.dtini.toISOString() : "",
          dtend: date.dtend ? date.dtend.toISOString() : "",
        });

        const paymentsAllUrl = "/api/payment";
        const collectsAllUrl = "/api/collect";

        const paymentsUrl = `/api/payment?${paymentsQueryParams.toString()}`;
        const collectsUrl = `/api/collect?${paymentsQueryParams.toString()}`;

        const categoryUrl = "/api/category";

        const [
          paymentsAllResponse,
          collectsAllResponse,
          paymentsResponse,
          collectsResponse,
          categoryResponse,
        ] = await Promise.all([
          fetch(paymentsAllUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(collectsAllUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(paymentsUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(collectsUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
          fetch(categoryUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }),
        ]);

        if (
          !paymentsAllResponse.ok ||
          !collectsAllResponse.ok ||
          !collectsResponse.ok ||
          !paymentsResponse.ok ||
          !categoryResponse.ok
        ) {
          throw new Error("Network response was not ok");
        }

        const [
          paymentsAllData,
          collectsAllData,
          paymentsData,
          collectsData,
          categoryData,
        ] = await Promise.all([
          paymentsAllResponse.json(),
          collectsAllResponse.json(),
          paymentsResponse.json(),
          collectsResponse.json(),
          categoryResponse.json(),
        ]);

        setPaymentsAll(paymentsAllData.payments);
        setCollectsAll(collectsAllData.collects);
        setPayments(paymentsData.payments);
        setCollects(collectsData.collects);
        setCategorys(categoryData.categorys);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, [date.dtini, date.dtend]);

  const totalEntries = totalCard(payments, 1);
  const totalDeptor = totalCard(collects, 1);

  const totalDeptorFalse = totalCard(collects, 0);
  const totalEntriesFalse = totalCard(payments, 0);

  const totalPrev = totalCard(collects, null) - totalCard(payments, null);

  const cards = [
    {
      title: totalDeptor - totalEntries,
      icon: "/image/menu/levantamento.png",
      text: `de faturamento atual`,
      href: "/gerenciar/levantamento/faturamento",
      footer: `Conferir os Lançamentos`,
    },
    {
      title: totalDeptorFalse,
      icon: "/image/menu/receber.png",
      text: `à receber`,
      href: "/gerenciar/levantamento/receber",
      footer: `Conferir os Devedores`,
    },
    {
      title: totalEntriesFalse,
      icon: "/image/menu/cadastrar.png",
      text: `à pagar`,
      href: "/gerenciar/levantamento/pagar",
      footer: `Conferir as Dívidas`,
    },
    {
      title: totalPrev,
      icon: "/image/menu/levantamento.png",
      text: `de faturamento previsto`,
      href: "/gerenciar/levantamento/faturamento",
      footer: `Conferir os Lançamentos`,
    },
  ];

  const sumsDeptorYear: number[] = Array(12).fill(0);

  collectsall.forEach((collects: any) => {
    const value = parseFloat(collects.value && collects.status ? collects.value : "0") || 0;
    const date = moment.utc(collects.date);
    const formattedValue: number = parseFloat(value.toFixed(2));

    if (date.year() === moment.utc().year()) {
      sumsDeptorYear[+date.month()] += parseFloat(formattedValue.toFixed(2));
    }
  });

  const sumsEntriesYear: number[] = Array(12).fill(0);

  paymentsall.forEach((entrie: any) => {
    const value: number = parseFloat(entrie.value && entrie.status ? entrie.value : "0") || 0;
    const date = moment.utc(entrie.date);
    const formattedValue: number = parseFloat(value.toFixed(2));

    if (date.year() === moment.utc().year()) {
      sumsEntriesYear[+date.month()] += parseFloat(formattedValue.toFixed(2));
    }
  });

  const sumsEntries = [0, 0, 0, 0];

  payments.forEach((entry: any) => {
    if (entry.status) {
      const date = moment.utc(entry.date);
      const format = moment.utc(entry.date).format("YYYY-MM-DD");

      const value: number =
        parseFloat(
          entry.value &&
            entry.status &&
            date.isBetween(
              moment.utc().startOf("month"),
              moment.utc().endOf("month"),
              null,
              "[]"
            )
            ? entry.value
            : ``
        ) || 0;

      const formattedValue: number = parseFloat(value.toFixed(2));

      const dateMoment = (day: string) => moment.utc().date(parseInt(day));

      if (moment.utc(dateMoment(`07`)).isAfter(format)) {
        sumsEntries[0] += formattedValue;
      } else if (
        moment.utc(dateMoment(`07`)).isBefore(format) &&
        moment.utc(dateMoment(`14`)).isAfter(format)
      ) {
        sumsEntries[1] += formattedValue;
      } else if (
        moment.utc(dateMoment(`14`)).isBefore(format) &&
        moment.utc(dateMoment(`21`)).isAfter(format)
      ) {
        sumsEntries[2] += formattedValue;
      } else if (moment.utc(dateMoment(`21`)).isBefore(format)) {
        sumsEntries[3] += formattedValue;
      }
    }
  });

  const graficoSimples = [
    {
      options: {
        chart: {
          id: "bar" as const,
          foreColor: "#F5F5F5",
        },
        xaxis: {
          categories: ["1ª semana", "2ª semana", "3ª semana", "4ª semana"],
        },
        fill: {
          colors: ["#F5F5F5", "#b1b7b4"],
        },
        colors: ["#F5F5F5", "#b1b7b4"],
        dataLabels: {
          enabled: false,
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
      },
      series: [
        {
          name: "Valor semanal",
          data: [
            Number((totalDeptor / 4).toFixed(2)),
            Number((totalDeptor / 4).toFixed(2)),
            Number((totalDeptor / 4).toFixed(2)),
            Number((totalDeptor / 4).toFixed(2)),
          ],
        },

        {
          name: "Valor Gasto",
          data: sumsEntries,
        },
      ],
      height: 200,
    },
  ];
  const graficoDetalhado = [
    {
      options: {
        chart: {
          id: "bar" as const,
        },
        xaxis: {
          categories: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ],
        },
        dataLabels: {
          enabled: false,
          formatter: function (val: number) {
            return val.toFixed(2);
          },
        },
        fill: {
          colors: ["#334155", "#0f172a"],
        },
        colors: ["#64748b", "#0f172a"],
      },
      series: [
        {
          name: "Creditado",
          data: sumsDeptorYear.map(val => parseFloat(val.toFixed(2))),
        },
        {
          name: "Debitado",
          data: sumsEntriesYear.map(val => parseFloat(val.toFixed(2))),
        },
      ],
      xaxis: {
        type: 'numeric'
      },
      height: 250,
    },
  ];

  const labelCat = seriesPayment(category, payments, "category").map(
    (cat) => cat.name
  ) as string[];
  const seriesCat = seriesPayment(category, payments, "category").map(
    (cat) => cat.data[0]
  ) as number[];

  const graficoDonut = [
    {
      options: {
        chart: {
          id: "donut" as const,
        },
        labels: labelCat,
        legend: {
          position: "bottom" as const,
        },
      },
      series: seriesCat.map(val => parseFloat(val.toFixed(2))),
      height: 290,
    },
  ];

  return (
    <>
      <Menu />
      <section className="grow lg:ml-[240px] mt-14 lg:mt-auto pb-12">
        <div id="header-dashboard">
          <Submenu />
        </div>

        <div id="top-dashboard shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-[38px] pt-[38px]">
            <CardDashBoard cards={cards} />
          </div>
        </div>

        <div id="mid-dashboard">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-[38px] pt-[38px]">
            <div className="h-[341px] col-span-1 lg:col-span-2 rounded-sm border bg-white shadow-md">
              <div className="px-4 items-center text-lg flex font-poppins-bold pt-4 pointer-events-none">
                Movimentação Anual
              </div>

              <div className="tems-center flex">
                <Graph components={graficoDetalhado} />
              </div>
            </div>
            <div className="h-[341px] col-span-1 rounded-sm border bg-white shadow-md">
              <div className="h-2/3 bg-gradient-to-r from-slate-500 to-slate-400">
                <Graph components={graficoSimples} />
              </div>

              <div className="p-4 h-1/3 items-center pointer-events-none">
                <div className="px-2 flex justify-start font-poppins-bold text-lg">
                  Distribuição semanal
                </div>
                <div className="px-2 pt-2 flex justify-start text-nowrap font-poppins-bold">
                  {moment.utc().startOf('month').format('DD/MM/YYYY')} à {moment().endOf('month').format('DD/MM/YYYY')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="features-dashboard">
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-8 px-[38px] pt-[38px]">
            <div className="h-[341px] col-span-8 lg:col-span-5 rounded-sm border bg-white shadow-md">
              <div className="col-span-1 items-center text-lg font-poppins-bold px-4 pt-4 pointer-events-none">
                Lista de Devedores
              </div>
              <ListDash
                className={`h-72 p-4 w-full rounded-md`}
                variant={`deptor`}
              />
            </div>
            <div className="h-[341px] col-span-8 lg:col-span-4 rounded-sm border bg-white shadow-md">
              <div className="col-span-1 items-center text-lg font-poppins-bold px-4 pt-4 pointer-events-none">
                % Por Categoria
              </div>
              <div className="bg-gradient-to-r">
                {seriesCat.length ? (
                  <Graph components={graficoDonut} />
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src="/image/menu/not-found.png"
                      width={350}
                      height={350}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="h-52 lg:h-[341px] grid grid-cols-8 lg:grid-cols-1 gap-8 col-span-8 lg:col-span-3 rounded-sm pointer-events-none">
              <div className="col-span-8 md:col-span-4 lg:col-span-1 rounded-sm border bg-white shadow-md">
                <div className="h-2/3 flex justify-center items-center p-4 text-green-500  bg-gradient-to-r from-green-300 to-green-200">
                  R$
                  <div className="font-poppins-bold flex text-[160%] text-nowrap justify-center">
                    <motion.div>
                      {useAnimatedCount(totalDeptor.toFixed(2))}
                    </motion.div>
                  </div>
                </div>
                <div className="px-4 h-1/3 flex justify-center lg:justify-start font-poppins-bold items-center">
                  Movimentações Creditadas
                </div>
              </div>
              <div className="col-span-8 md:col-span-4 lg:col-span-1 rounded-sm border bg-white shadow-md">
                <div className="h-2/3 flex justify-center items-center p-4 text-rose-500 bg-gradient-to-r from-rose-300 to-rose-200">
                  R$
                  <div className="font-poppins-bold flex text-[160%] text-nowrap justify-center">
                    <motion.div>
                      {useAnimatedCount(totalEntries.toFixed(2))}
                    </motion.div>
                  </div>
                </div>
                <div className="px-4 h-1/3 flex justify-center lg:justify-start font-poppins-bold items-center">
                  Movimentações Debitadas
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
