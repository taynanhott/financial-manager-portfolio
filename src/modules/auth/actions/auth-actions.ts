import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import AuthService from "../services/auth-service";

const prisma = new PrismaClient();

async function createAccount(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user
    .create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    })
    .then(() => {
      redirect("/portal/sign-in");
    });
}

async function login(formData: FormData) {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return false;
  }

  if (user.password !== null) {
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return false;
    }
  } else {
    return false;
  }

  await AuthService.createSessionToken({
    sub: user.id,
    name: user.name,
    email: user.email,
  });

  return redirect("/gerenciar/dashboard");
}

async function loginGoogle(uid: string, name: string, email: string) {
  "use server";

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id: uid,
        name,
        email,
      },
    });
  }

  await AuthService.createSessionToken({
    sub: uid,
    name: name,
    email: email,
  });

  return redirect("/gerenciar/dashboard");
}

const AuthActions = {
  createAccount,
  login,
  loginGoogle,
};

export default AuthActions;
