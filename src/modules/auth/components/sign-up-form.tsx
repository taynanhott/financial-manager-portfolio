import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthActions from "../actions/auth-actions";

export default function SignUpForm() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div>
          <h2 className="pointer-events-none mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Gerenciador Financeiro
          </h2>
          <p className="pointer-events-none mt-2 text-center text-sm text-muted-foreground">
            Preencha os campos abaixo para criar uma conta.
          </p>
        </div>
        <form action={AuthActions.createAccount}>
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-muted-foreground"
            >
              Nome
            </Label>
            <div className="mt-1">
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                minLength={3}
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="Your name"
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block mt-4 text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                minLength={7}
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
                minLength={6}
                required
                className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="flex w-full justify-center mt-4 mb-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Criar Conta
          </Button>
          <Link
            href="/portal/sign-in"
            className={`flex justify-center font-medium text-primary hover:text-primary/90`}
          >
            Acessar conta existente
          </Link>
        </form>
      </div>
    </div>
  );
}
