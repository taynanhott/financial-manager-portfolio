"use client";

import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginGoogleForm from "./login-google";
import { useEffect, useState } from "react";
import { AlertPopUp } from "@/components/ui/alert";
import Loading from "@/components/Resources/Loading";

interface LoginFormProps {
  login: (formData: FormData) => Promise<boolean | void>;
  loginGoogle: (
    uid: string,
    name: string,
    email: string
  ) => Promise<boolean | void>;
}

export default function LoginForm({ login, loginGoogle }: LoginFormProps) {
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  function alertHide() {
    setShowAlert(true);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timer);
  }

  async function signIn(formData: FormData) {
    try {
      setLoading(true);
      await login(formData).then((response) => {
        setLoading(false);
        if (response == undefined) {
          setShowAlert(false);
        } else {
          alertHide();
        }
      });
    } catch (error) {
      setLoading(false);
      console.error("failed sigin with email and password:", error);
      alertHide();
    }
  }

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="pointer-events-none mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Gerenciador Financeiro
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            <Link
              href="/portal/sign-up"
              className="font-medium text-primary hover:text-primary/90"
              prefetch={false}
            >
              Criar conta
            </Link>
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn(new FormData(e.currentTarget));
          }}
        >
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="examplo@email.com"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block mt-4 text-sm font-medium text-muted-foreground"
            >
              Senha
            </Label>
            <div className="mt-1">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="flex w-full justify-center my-4 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Acessar
          </Button>
          <LoginGoogleForm loginGoogle={loginGoogle} />
          {showAlert && <AlertPopUp />}
          <Loading active={loading} />
        </form>
      </div>
    </div>
  );
}
