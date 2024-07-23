import moment from "moment";
import Menu from "@/components/Html/Body/Menu/menu";
import Graph from "@/components/Resources/GraphApex";
import Submenu from "@/components/Html/Body/Submenu/submenu";

import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/modules/auth/services/auth-service";
import { totalCard } from "@/components/Resources/CardBoard/functions";

const prisma = new PrismaClient();

export default async function Faturamento() {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const userId = session.sub as string;

  const entries = await prisma.payment.findMany({
    include: {
      user: true,
      category: true,
      subcategory: true,
    },
    where: {
      userId: userId,
      date: {
        gte: new Date(moment().startOf('month').format('YYYY-MM-DD')),
        lte: new Date(moment().endOf('month').format('YYYY-MM-DD')),
      },
    },
  });

  const deptor = await prisma.collect.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
      date: {
        gte: new Date(moment().startOf('month').format('YYYY-MM-DD')),
        lte: new Date(moment().endOf('month').format('YYYY-MM-DD')),
      },
    },
  });

  const totalEntries = totalCard(entries, 1);
  const totalDeptor = totalCard(deptor, 1);

  const totalFat = totalDeptor - totalEntries;

  const sumsEntries = [0, 0, 0, 0];

  entries.forEach((entry: any) => {
    if (entry.status) {
      const date = moment.utc(entry.date);
      const format = moment.utc(entry.date).format("YYYY-MM-DD");

      const value =
        parseFloat(
          entry.value &&
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
        sumsEntries[0] += formattedValue
      } else if (
        moment.utc(dateMoment(`07`)).isBefore(format) &&
        moment.utc(dateMoment(`14`)).isAfter(format)
      ) {
        sumsEntries[1] += formattedValue
      } else if (
        moment.utc(dateMoment(`14`)).isBefore(format) &&
        moment.utc(dateMoment(`21`)).isAfter(format)
      ) {
        sumsEntries[2] += formattedValue
      } else if (moment.utc(dateMoment(`21`)).isBefore(format)) {
        sumsEntries[3] += formattedValue
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
        grid: {
          position: "front",
        },
        fill: {
          colors: ["#F5F5F5", "#b1b7b4"],
        },
        colors: ["#F5F5F5", "#b1b7b4"],
        dataLabels: {
          enabled: false,
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
      height: 310,
    },
  ];

  return (
    <>
      <Menu />
      <section className="grow lg:ml-[240px] mt-14 lg:mt-auto pb-12">
        <div id="header-page">
          <Submenu variant={"hidden"} />
        </div>

        <div id="mid-page">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-[38px] pt-[38px]">
            <div className="h-[355px] col-span-1 border bg-white shadow-md pointer-events-none">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm mb-4">
                <p className="px-6 py-4 pointer-events-none">Faturamento</p>
              </div>

              <div className="flex flex-col items-start px-6 pointer-events-none">
                <Label>Período Contabilizado</Label>
                <p className="my-2 font-poppins-bold flex text-lg text-nowrap">
                  {moment.utc().startOf('month').format('DD/MM/YYYY')} à {moment().endOf('month').format('DD/MM/YYYY')}
                </p>
                <Label>Valor Por Dia</Label>
                <div className="flex items-center">
                  <p className="font-poppins-bold flex text-lg text-nowrap">
                    R$
                  </p>
                  <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                    {(totalFat /
                      moment.utc().endOf("month").diff(moment.utc(), "days")).toFixed(2)}
                  </div>
                </div>
                <Label>Valor Por Semana</Label>
                <div className="flex items-center">
                  <p className="font-poppins-bold flex text-lg text-nowrap">
                    R$
                  </p>
                  <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                    {(totalDeptor / 4).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[355px] col-span-1 rounded-sm border bg-white shadow-md">
              <div className="h-full bg-gradient-to-r from-slate-800 to-slate-600">
                <Graph components={graficoSimples} />
              </div>
            </div>

            <div className="h-full lg:h-[340px] grid grid-cols-1 gap-8 col-span-1 rounded-sm pointer-events-none">
              <div className="col-span-1 rounded-sm border bg-white shadow-md">
                <div className="h-2/3 flex justify-center items-center p-4 text-green-500  bg-gradient-to-r from-green-300 to-green-200">
                  R${" "}
                  <div className="font-poppins-bold flex text-[160%] text-nowrap justify-center">
                    {totalDeptor.toFixed(2)}
                  </div>
                </div>
                <div className="px-4 h-1/3 flex  justify-center lg:justify-start  font-poppins-bold items-center">
                  Total à Receber
                </div>
              </div>
              <div className="col-span-1 rounded-sm border bg-white shadow-md">
                <div className="col-span-1 h-2/3 flex justify-center text-nowrap items-center font-poppins-bold p-4 text-rose-500 bg-gradient-to-r from-rose-300 to-rose-200">
                  R${" "}
                  <div className="font-poppins-bold flex text-[160%] text-nowrap justify-center pointer-events-none">
                    {totalEntries.toFixed(2)}
                  </div>
                </div>
                <div className="px-4 h-1/3 flex justify-center lg:justify-start font-poppins-bold items-center">
                  Total à Pagar
                </div>
              </div>
              <div className="col-span-1 rounded-sm border bg-white shadow-md">
                <div className="h-2/3 flex justify-center items-center p-4 text-slate-500  bg-gradient-to-r from-slate-300 to-slate-200">
                  R${" "}
                  <div className="font-poppins-bold flex text-[160%] text-nowrap justify-center pointer-events-none">
                    {totalFat.toFixed(2)}
                  </div>
                </div>
                <div className="px-4 h-1/3 flex  justify-center lg:justify-start  font-poppins-bold items-center">
                  Restante Total
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
