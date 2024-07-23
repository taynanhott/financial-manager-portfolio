"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/modules/auth/services/auth-service";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const dtini = url.searchParams.get("dtini");
  const dtend = url.searchParams.get("dtend");

  const session = await getSession();

  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/portal/sign-in" },
    });
  }

  const userId = session.sub as string;

  const whereConditions: any = {
    userId,
  };

  if (dtini && dtend) {
    whereConditions.date = {
      gte: new Date(dtini).toISOString(),
      lte: new Date(dtend).toISOString(),
    };
  }

  const collects = await prisma.collect.findMany({
    include: {
      user: true,
    },
    where: whereConditions,
  });

  return new Response(JSON.stringify({ collects }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: any) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const formData = await request.formData();
  const description = formData.get("description") as string;
  const value = +formData.get("value") as number;
  const date = formData.get("date") as string;

  let isoDate = "";
  if (date) {
    isoDate = new Date(date).toISOString();
  }

  const userId = session.sub as string;

  if (!description || !userId || !value || !date) {
    return new Response(
      JSON.stringify({ message: "Todos os campos devem ser preenchidos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.collect.create({
    data: {
      description,
      date: isoDate,
      value,
      userId,
    },
  });

  return new Response(
    JSON.stringify({ message: "Registro inserido com sucesso" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function PUT(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const formData = await request.formData();
  const id = formData.get("id") as string;

  const description = formData.get("description") as string;
  const status = formData.get("status") === "true" ? true : false;
  const value = formData.get("value") as string;
  const date = formData.get("date") as string;

  let isoDate = "";
  if (date) {
    isoDate = new Date(date).toISOString();
  }

  const userId = session.sub as string;

  if (
    !description ||
    !userId ||
    !value ||
    !date ||
    status === null ||
    status === undefined ||
    !id
  ) {
    return new Response(
      JSON.stringify({ message: "Todos os campos devem ser preenchidos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.collect.update({
    data: {
      description,
      status,
      value,
      date: isoDate,
    },
    where: {
      id,
      userId,
    },
  });

  return new Response(
    JSON.stringify({ message: "Registro inserido com sucesso" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function DELETE(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const userId = session.sub as string;
  const { id } = await request.json();

  const collect = await prisma.collect.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!collect) {
    return Response.json({ error: "Registro não encontrado" }, { status: 404 });
  }

  await prisma.collect.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  return Response.json({ message: "Registro apagado com sucesso" });
}
