import moment from "moment";
import Image from "next/image";
import Menu from "@/components/Html/Body/Menu/menu";
import Graph from "@/components/Resources/GraphApex";
import Submenu from "@/components/Html/Body/Submenu/submenu";

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ListDash } from "@/components/Resources/Table";
import { getSession } from "@/modules/auth/services/auth-service";

const prisma = new PrismaClient();

export default async function Receber() {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const userId = session.sub as string;

  const deptor = await prisma.collect.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
      date: {
        gte: new Date(moment().startOf("month").format("YYYY-MM-DD")),
        lte: new Date(moment().endOf("month").format("YYYY-MM-DD")),
      },
    },
  });

  const sumsDeptor = [0, 0, 0];

  deptor.forEach((deptor: any) => {
    if (deptor.status) {
      sumsDeptor[0] += +deptor.value;
    } else if (moment.utc().isAfter(deptor.date) && !deptor.status) {
      sumsDeptor[1] += +deptor.value;
    } else if (moment.utc().isBefore(deptor.date) && !deptor.status) {
      sumsDeptor[2] += +deptor.value;
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
          categories: ["Estado da Dívida"],
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
          name: "Pago",
          data: [sumsDeptor[0]],
        },
        {
          name: "Atrasado",
          data: [sumsDeptor[1]],
        },
        {
          name: "Pendente",
          data: [sumsDeptor[2]],
        },
      ],
      height: 170,
    },
  ];

  const graficoDonut = [
    {
      options: {
        chart: {
          id: "donut" as const,
          type: "donut",
        },
        labels: ["Pago", "Atrasado", "Pendente"],
        legend: {
          position: "right" as const,
        },
      },
      series: [sumsDeptor[0], sumsDeptor[1], sumsDeptor[2]],
      height: 170,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-[38px] pt-[38px]">
            <div className="h-[340px] lg:h-[475px] col-span-1 border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">
                  Contas à Receber
                </p>
              </div>
              <div className="h-full">
                <ListDash
                  className={`h-64 lg:h-96 p-4 w-full rounded-md`}
                  variant={`deptor`}
                />
              </div>
            </div>

            <div className="h-[475px] grid grid-cols-1 lg:grid-cols-4 gap-8 col-span-1">
              <div className="col-span-1 lg:col-span-4 border bg-white shadow-md">
                <div className="h-full bg-gradient-to-r rounded-sm from-slate-500 to-slate-400">
                  <Graph components={graficoSimples} />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-3 border bg-white shadow-md">
                <div className="col-span-1 items-center text-lg font-poppins-bold px-4 pt-4 pointer-events-none">
                  % Por Status
                </div>
                {!(
                  sumsDeptor[0] === 0 &&
                  sumsDeptor[1] === 0 &&
                  sumsDeptor[2] === 0
                ) ? (
                  <Graph components={graficoDonut} />
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src="/image/menu/not-found.png"
                      width={300}
                      height={300}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
