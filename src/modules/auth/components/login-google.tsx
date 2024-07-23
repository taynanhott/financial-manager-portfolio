"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { AlertPopUp } from "@/components/ui/alert";
import Loading from "@/components/Resources/Loading";

interface LoginGoogleFormProps {
  loginGoogle: (
    uid: string,
    name: string,
    email: string
  ) => Promise<boolean | void>;
}

export default function LoginGoogleForm({ loginGoogle }: LoginGoogleFormProps) {
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

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

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);

      if (result) {
        await loginGoogle(
          result.user.uid as string,
          result.user.displayName as string,
          result.user.email as string
        ).then((response) => {
          setLoading(false);
          if (response == undefined) {
            setShowAlert(false);
          } else {
            alertHide();
          }
        });
      } else {
        setLoading(false);
        alertHide();
      }
    } catch (error) {
      setLoading(false);
      console.error("failed sigin with Google account:", error);
      alertHide();
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      <Button
        type="button"
        onClick={signInWithGoogle}
        className="flex w-full justify-center rounded-md border border-muted px-3 py-2 text-sm font-semibold  shadow-sm hover:bg-muted hover:text-muted-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <ChromeIcon className="mr-2 h-5 w-5" />
        Acessar com o Google
      </Button>
      {showAlert && <AlertPopUp />}
      <Loading active={loading} />
    </div>
  );
}

function ChromeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}
