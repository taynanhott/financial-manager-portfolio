import moment from "moment";
import Menu from "@/components/Html/Body/Menu/menu";
import Submenu from "@/components/Html/Body/Submenu/submenu";

import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { getSession } from "@/modules/auth/services/auth-service";
import { totalCard } from "@/components/Resources/CardBoard/functions";

const prisma = new PrismaClient();

export default async function Reserva() {
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

  return (
    <>
      <Menu />
      <section className="grow lg:ml-[240px] mt-14 lg:mt-auto pb-12">
        <div id="header-page">
          <Submenu variant={"hidden"} />
        </div>

        <div id="mid-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-[38px] pt-[38px]">
            <div className="h-[400px] col-span-1 border bg-white shadow-md">
              <div className="items-center text-lg flex font-poppins-bold text-white bg-slate-900 rounded-t-sm mb-4">
                <p className="px-6 py-4 pointer-events-none">
                  Reserva Financeira
                </p>
              </div>

              <div className="flex flex-col items-start px-6">
                <Label className="pointer-events-none">
                  Porcentagem de Reserva
                </Label>
                <div className="flex items-center">
                  <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                    15
                  </div>

                  <p className="font-poppins-bold flex text-lg text-nowrap">
                    % do faturamento total
                  </p>
                </div>
                <div className="pointer-events-none">
                  <Label>Valor do Faturamento Total</Label>
                  <div className="flex items-center">
                    <p className="font-poppins-bold flex text-lg text-nowrap">
                      R$
                    </p>
                    <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                      {totalFat.toFixed(2)}
                    </div>
                  </div>
                  <Label>Valor de Reserva</Label>
                  <div className="flex items-center">
                    <p className="font-poppins-bold flex text-lg text-nowrap">
                      R$
                    </p>
                    <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                      {(totalFat * 0.15).toFixed(2)}
                    </div>
                  </div>
                  <Label>Valor Restante sem Reserva</Label>
                  <div className="flex items-center">
                    <p className="font-poppins-bold flex text-lg text-nowrap">
                      R$
                    </p>
                    <div className="my-2 font-poppins-bold flex text-lg text-nowrap">
                      {(totalFat - totalFat * 0.1).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
