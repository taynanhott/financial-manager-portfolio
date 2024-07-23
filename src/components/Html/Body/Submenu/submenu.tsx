"use client";

import { DatePickerRange } from "@/components/Resources/DatePicker";
import Link from "next/link";

interface Props {
  variant?: "hidden";
}

export default function Submenu({ variant }: Props) {
  return (
    <div
      className={`bg-white px-8 flex ${
        variant == `hidden` ? `justify-end` : `justify-between`
      } items-center shadow-md w-full h-14 z-20`}
    >
      <div className={variant}>
        <DatePickerRange />
      </div>

      <div className="">
        <Link
          href="/api/logout"
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
        >
          Log out
        </Link>
      </div>
    </div>
  );
}
