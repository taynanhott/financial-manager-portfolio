import moment from "moment";
import Image from "next/image";
import Menu from "@/components/Html/Body/Menu/menu";
import Graph from "@/components/Resources/GraphApex";
import Submenu from "@/components/Html/Body/Submenu/submenu";

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { ListDash } from "@/components/Resources/Table";
import { getSession } from "@/modules/auth/services/auth-service";
import { seriesPayment } from "@/components/Resources/GraphApex/functions";

const prisma = new PrismaClient();

export default async function Pagar() {
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
        gte: new Date(moment().startOf("month").format("YYYY-MM-DD")),
        lte: new Date(moment().endOf("month").format("YYYY-MM-DD")),
      },
    },
  });

  const category = await prisma.category.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
    },
  });

  const subcategory = await prisma.subcategory.findMany({
    include: {
      user: true,
    },
    where: {
      userId: userId,
    },
  });

  const seriesSimple = seriesPayment(category, entries, "category");

  const labelCat = seriesPayment(category, entries, "category").map(
    (cat) => cat.name
  ) as string[];
  const seriesCat = seriesPayment(category, entries, "category").map(
    (cat) => cat.data[0]
  ) as number[];
  const labelSub = seriesPayment(subcategory, entries, "subcategory").map(
    (sub) => sub.name
  ) as string[];
  const seriesSub = seriesPayment(subcategory, entries, "subcategory").map(
    (sub) => sub.data[0]
  ) as number[];

  const graficoSimples = [
    {
      options: {
        chart: {
          id: "bar" as const,
          foreColor: "#F5F5F5",
        },
        xaxis: {
          categories: ["Categoria da Movimentação"],
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
      series: seriesSimple,
      height: 170,
    },
  ];

  const graficoDonut = [
    {
      options: {
        chart: {
          id: "donut" as const,
        },
        labels: labelCat,
        legend: {
          show: false,
        },
      },
      series: seriesCat,
      height: 170,
    },
  ];

  const graficoDonutSub = [
    {
      options: {
        chart: {
          id: "donut" as const,
        },
        labels: labelSub,
        legend: {
          show: false,
        },
      },
      series: seriesSub,
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-[38px] pt-[38px] pb-52">
            <div className="h-[340px] lg:h-[475px] col-span-1 border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm">
                <p className="px-6 py-4 pointer-events-none">Contas à Pagar</p>
              </div>
              <div className="h-full">
                <ListDash
                  className={`h-64 lg:h-96 p-4 w-full rounded-md`}
                  variant={`paymount`}
                />
              </div>
            </div>

            <div className="h-[475px] grid grid-cols-1 lg:grid-cols-4 gap-8 col-span-1">
              <div className="col-span-1 lg:col-span-4 border bg-white shadow-md">
                <div className="h-[200px] bg-gradient-to-r rounded-sm from-slate-500 to-slate-400">
                  <Graph components={graficoSimples} />
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2 border bg-white shadow-md">
                <div className="col-span-1 items-center text-lg font-poppins-bold px-4 pt-4 pointer-events-none">
                  % Por Categoria
                </div>
                {seriesCat.length ? (
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
              <div className="col-span-1 lg:col-span-2 border bg-white shadow-md">
                <div className="col-span-1 items-center text-lg font-poppins-bold px-4 pt-4 pointer-events-none">
                  % Por Subcategoria
                </div>
                {seriesSub.length ? (
                  <Graph components={graficoDonutSub} />
                ) : (
                  <div className="flex justify-center items-center">
                    <Image
                      src="/image/menu/not-found-2.png"
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
