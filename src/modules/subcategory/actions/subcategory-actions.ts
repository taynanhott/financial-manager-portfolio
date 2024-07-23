import { PrismaClient } from "@prisma/client";
import { getSession } from "@/modules/auth/services/auth-service";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

async function insertSubCategory(formData: FormData) {
  "use server";

  const session = await getSession();

  if (!session) {
    redirect("/portal/sign-in");
  }

  const description = formData.get("description") as string;
  const userId = session.sub as string;

  await prisma.subcategory.create({
    data: {
      description,
      userId,
    },
  });

  redirect("/gerenciar/cadastrar/categoria");
}

const Subcategory = {
  insertSubCategory,
};

export default Subcategory;
