import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Dialog, DialogContentAlert, DialogTitle } from "./dialog";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

function AlertPopUp() {
  return (
    <Dialog open={true}>
      <DialogTitle></DialogTitle>
      <DialogContentAlert className="sm:max-w-[400px] w-full p-6 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold">Falha ao Acessar!</h3>
            <p className="text-muted-foreground">Email ou Senha incorretos.</p>
          </div>
        </div>
      </DialogContentAlert>
    </Dialog>
  );
}

function AlertEmpty() {
  return (
    <Dialog open={true}>
      <DialogTitle></DialogTitle>
      <DialogContentAlert className="sm:max-w-[400px] z-50 w-full p-6 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold">Atenção!</h3>
            <p className="text-muted-foreground">
              Por favor, preencha todos os campos do formulário.
            </p>
          </div>
        </div>
      </DialogContentAlert>
    </Dialog>
  );
}

function AlertFail() {
  return (
    <Dialog open={true}>
      <DialogTitle></DialogTitle>
      <DialogContentAlert className="sm:max-w-[400px] z-50 w-full p-6 bg-background rounded-lg shadow-lg">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-bold">Processo Interrompido!</h3>
            <p className="text-muted-foreground">
              Desculpe, houve uma falha no processo.
            </p>
          </div>
        </div>
      </DialogContentAlert>
    </Dialog>
  );
}

export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertPopUp,
  AlertEmpty,
  AlertFail,
};
