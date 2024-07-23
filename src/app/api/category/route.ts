"use server";

import { PrismaClient } from "@prisma/client";
import { getSession } from "@/modules/auth/services/auth-service";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getSession();

  if (!session) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/portal/sign-in" },
    });
  }

  const userId = session.sub as string;

  const categorys = await prisma.category.findMany({
    include: {
      user: true,
    },
    where: {
      userId,
    },
  });

  return new Response(JSON.stringify({ categorys }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const formData = await request.formData();
  const description = formData.get("description") as string;
  const userId = session.sub as string;

  if (!description || !userId) {
    return new Response(
      JSON.stringify({ message: "Todos os campos devem ser preenchidos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.category.create({
    data: {
      description,
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

  const userId = session.sub as string;

  if (!description || !userId || !id) {
    return new Response(
      JSON.stringify({ message: "Todos os campos devem ser preenchidos" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  await prisma.category.update({
    data: {
      description,
    },
    where: {
      id,
      userId,
    },
  });

  return Response.json({ message: "Registro atualizado com sucesso" });
}

export async function DELETE(request: Request) {
  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const userId = session.sub as string;
  const { id } = await request.json();

  const category = await prisma.category.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  });

  if (!category) {
    return Response.json({ error: "Registro não encontrado" }, { status: 404 });
  }

  await prisma.category.delete({
    where: {
      id: id,
      userId: userId,
    },
  });

  return Response.json({ message: "Registro apagado com sucesso" });
}
