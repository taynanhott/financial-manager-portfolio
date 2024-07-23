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

  const payments = await prisma.payment.findMany({
    include: {
      user: true,
      category: true,
      subcategory: true,
    },
    where: whereConditions,
  });

  return new Response(JSON.stringify({ payments }), {
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
  const categoryId = formData.get("category") as string;
  const subcategoryId = formData.get("subcategory") as string;
  const value = +formData.get("value") as number;

  const date = formData.get("date") as string;

  let isoDate = "";
  if (date) {
    isoDate = new Date(date).toISOString();
  }

  const userId = session.sub as string;

  if (!description || !userId || !categoryId || !subcategoryId || !value) {
    return new Response(
      JSON.stringify({ message: "Todos os campos devem ser preenchidos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.payment.create({
    data: {
      description,
      categoryId,
      subcategoryId,
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
  const categoryId = formData.get("category") as string;
  const subcategoryId = formData.get("subcategory") as string;
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
    !categoryId ||
    !subcategoryId ||
    status === null ||
    status === undefined ||
    !value ||
    !date ||
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

  await prisma.payment.update({
    data: {
      description,
      categoryId,
      status,
      subcategoryId,
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

  const payment = await prisma.payment.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!payment) {
    return Response.json({ error: "Registro não encontrado" }, { status: 404 });
  }

  await prisma.payment.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  return Response.json({ message: "Registro apagado com sucesso" });
}
