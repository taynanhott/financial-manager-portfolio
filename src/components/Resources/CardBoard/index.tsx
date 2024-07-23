import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import useAnimatedCount from "@/components/animation";

interface Props {
  cards: {
    title: number;
    icon?: string;
    href: string;
    text: string;
    footer: string;
  }[];
}

export default function CardDashBoard({ cards }: Props) {
  const animatedCounts = cards.map((card) =>
    useAnimatedCount(
      +card.title >= 0 ? +card.title.toFixed(2) : +card.title.toFixed(2) * -1
    )
  );

  return (
    <>
      {cards.map((card: any, index: number) => (
        <motion.div
          key={`card-${index}`}
          className="backdrop-blur-sm shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={card.href} target="_self">
            <div className="h-48 min-h-48 grid grid-cols-2 lg:hover:scale-105 rounded-sm border bg-white transition ease-in-out hover:-translate-y-1 duration-700">
              <div className="col-span-2 px-4 pt-2 flex justify-between items-center">
                <div className="text-lg font-poppins-bold inline-block">
                  {card.title >= 0 ? "R$" : "- R$"}{" "}
                  <motion.div className="inline-block">
                    {animatedCounts[index]}
                  </motion.div>
                </div>
                <Image
                  className=""
                  src={card.icon ?? ``}
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
              <div className="col-span-2 px-4 font-poppins">{card.text}</div>
              <div className="col-span-2 rounded-b-sm px-2 items-center flex font-poppins-bold text-white bg-gradient-to-r from-slate-700 to-slate-500">
                {card.footer}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  );
}
