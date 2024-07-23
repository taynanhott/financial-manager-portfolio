"use client";

import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MenuToggleProvider, useMenuToggle } from "@/context/MenuContext";

import Image from "next/image";
import Link from "next/link";

interface Props {
  name: string;
  href: string;
  target?: `_self` | `_blank`;
}

const navegation: Props[] = [
  {
    name: "Dashboard",
    href: "/gerenciar/dashboard",
    target: `_self`,
  },
];

const cadastro: Props[] = [
  {
    name: "Pagamento",
    href: "/gerenciar/cadastrar/pagamento",
    target: `_self`,
  },
  {
    name: "Arrecadação",
    href: "/gerenciar/cadastrar/arrecadar",
    target: `_self`,
  },
  {
    name: "Categoria",
    href: "/gerenciar/cadastrar/categoria",
    target: `_self`,
  },
];

const levantamento: Props[] = [
  {
    name: "Faturamento",
    href: "/gerenciar/levantamento/faturamento",
    target: `_self`,
  },
  {
    name: "Contas à receber",
    href: "/gerenciar/levantamento/receber",
    target: `_self`,
  },
  {
    name: "Contas à pagar",
    href: "/gerenciar/levantamento/pagar",
    target: `_self`,
  },
  {
    name: "Reserva",
    href: "/gerenciar/levantamento/reserva",
    target: `_self`,
  },
];

const outros: Props[] = [
  {
    name: "Repositório Projeto",
    href: "https://github.com/taynanhott/financial-manager-portfolio.git",
    target: `_blank`,
  },
  {
    name: "Portfólio",
    href: "https://taynan.dev/home",
    target: `_blank`,
  },
];

interface PropsMenu {
  menu: {
    title?: string;
    subtitle: string[];
    img: string[];
    href: Props[][];
  }[];
}

const menu: PropsMenu["menu"] = [
  {
    title: "Navegação",
    subtitle: ["Home"],
    img: ["/image/menu/home.png"],
    href: [navegation],
  },
  {
    title: "Funcionalidades",
    subtitle: ["Cadastro", "Levantamento"],
    img: ["/image/menu/cadastro.png", "/image/menu/levantamento-menu.png"],
    href: [cadastro, levantamento],
  },
  {
    title: "Acesse também",
    subtitle: ["Mais detalhes"],
    img: ["/image/menu/repository.png"],
    href: [outros],
  },
];

function MenuItem({ name, href, target }: Props) {
  const variants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <li className="block items-center ml-4 max-h-6 cursor-pointer">
      <Link
        href={href}
        target={target}
        className="hover:border-b mt-4 hover:border-white flex items-center"
      >
        {`> ${name}`}
      </Link>
    </li>
  );
}
function MenuList({ menu }: { menu: PropsMenu["menu"] }) {
  const { toggle, editToggle } = useMenuToggle();

  const safeMenu = menu || [];

  return (
    <ScrollArea className="h-full p-4 w-full rounded-md">
      {safeMenu.map((division, divIndex) => (
        <div key={`menu-${divIndex}`}>
          {division.title ? (
            <div className="text-gray-500 lg:flex pl-4 pb-4 font-poppins pointer-events-none text-sm">
              {division.title}
            </div>
          ) : (
            <></>
          )}
          {division.subtitle.map((label, subIndex: number) => (
            <ul
              key={`submenu-${subIndex}`}
              className="pl-4 pb-4 w-[240px] lg:flex"
            >
              <li key={`li-${subIndex}`}>
                <div className="text-gray-100 text-xl font-poppins-bold flex items-center pointer-events-none">
                  <Image
                    className="mr-2"
                    src={division.img[subIndex]}
                    width={25}
                    height={25}
                    alt=""
                  />
                  {label}
                </div>
                {division.href[subIndex]?.map((link, index) => (
                  <button
                    className="font-poppins text-gray-400 block"
                    key={`link-${subIndex}-${index}`}
                    onClick={() => editToggle(!toggle)}
                  >
                    <MenuItem
                      name={link.name}
                      href={link.href}
                      target={link.target}
                    />
                  </button>
                ))}
              </li>
            </ul>
          ))}
        </div>
      ))}
    </ScrollArea>
  );
}

function MenuToggle({ menu }: { menu: PropsMenu["menu"] }) {
  const { toggle, editToggle } = useMenuToggle();

  return (
    <>
      <button
        onClick={() => editToggle(!toggle)}
        className="ml-4 mt-2 bg-transparent fixed top-2 items-center flex lg:hidden z-30"
      >
        <Image src="/image/menu/botao-menu.png" width={25} height={25} alt="" />
      </button>
      <div className="fixed flex-none top-0 left-0 bg-slate-800 h-14 lg:h-screen z-20">
        <div className="w-screen lg:w-[240px] p-3 pointer-events-none">
          <Label className="text-gray-100 text-lg font-poppins-bold text-center items-center flex justify-center col-span-9">
            Gerenciador Financeiro
          </Label>
        </div>
        <div
          className={`mt-1 h-screen w-[240px] ${
            toggle ? "" : "hidden lg:block"
          } bg-slate-700 lg:bg-slate-800 z-10`}
        >
          <MenuList menu={menu} />
        </div>
      </div>
    </>
  );
}

export default function Menu() {
  return (
    <MenuToggleProvider>
      <MenuToggle menu={menu} />
    </MenuToggleProvider>
  );
}
