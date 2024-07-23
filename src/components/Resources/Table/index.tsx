import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import moment from "moment";
import "moment/locale/pt-br";
import { DialogEntries, ListPayment } from "../Dialog/payment";
import { DialogDeptor, ListDeptor } from "../Dialog/deptor";
import { DialogCategory } from "../Dialog/category";
import { DialogSubCategory } from "../Dialog/subcategory";

interface Props {
  className?: string;
  variant: `deptor` | `paymount` | `category` | "subcategory";
}

function thVariant(
  variant: "deptor" | "paymount" | "category" | "subcategory"
) {
  switch (variant) {
    case `deptor`:
      return (
        <>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Descrição
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Situação
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-center">
            Data
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Valor
          </th>
        </>
      );
    case `paymount`:
      return (
        <>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Descrição
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Categoria
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Subcategoria
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Situação
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-center">
            Data
          </th>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Valor
          </th>
        </>
      );
    case `category`:
      return (
        <>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Descrição
          </th>
        </>
      );
    case `subcategory`:
      return (
        <>
          <th className="p-2 text-xs font-medium uppercase tracking-wider text-left">
            Descrição
          </th>
        </>
      );
    default:
      return <></>;
  }
}

export function ListDash({ className, variant }: Props) {

  return (
    <ScrollArea className={className}>
      <div className="relative">
        <table className="text-gray-500 divide-y divide-gray-200 w-full">
          <thead className="sticky top-0 z-10 bg-white pointer-events-none">
            <tr className="text-center">{thVariant(variant)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {variant == 'paymount' ? <ListPayment /> : <ListDeptor />}
          </tbody>
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

function dialogVariant(variant: string) {
  switch (variant) {
    case `deptor`:
      return <DialogDeptor />;
    case `paymount`:
      return <DialogEntries />;
    case `category`:
      return <DialogCategory />;
    case `subcategory`:
      return <DialogSubCategory />;
    default:
      return <></>;
  }
}

export function TableListAction({ className, variant }: Props) {
  return (
    <ScrollArea className={className}>
      <div className="relative">
        <table className="text-white divide-y divide-gray-200 w-full">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-slate-800 to-slate-600 pointer-events-none">
            <tr>{thVariant(variant)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-200"></tbody>
          {dialogVariant(variant)}
        </table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
