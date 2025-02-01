"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { CircleX, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { verifySecret, sendEmailOTP } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OTPModal = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setisLoading(true);

    try {
      // cal api to verify OTP
      const sessionId = await verifySecret({ accountId, password });

      if (sessionId) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error deleting account", error);
    }

    setisLoading(false);
  };

  const handleResendOTP = async () => {
    // call api to resend OTP
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setisOpen}>
      <AlertDialogContent className="shad-slert-dialog rounded-2xl">
        <AlertDialogHeader className="relative flex justify-center">
          <AlertDialogTitle className="h2 text-center">
            Enter your OTP
            <CircleX
              onClick={() => setisOpen(false)}
              className="otp-close-button mt-3 text-zinc-500"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100">
            We've send code to <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* OTP input */}
        <InputOTP maxLength={6} value={password} onChange={setPassword}>
          <InputOTPGroup className="flex w-full justify-between gap-1">
            <InputOTPSlot index={0} className="shad-otp-slot" />
            <InputOTPSlot index={1} className="shad-otp-slot" />
            <InputOTPSlot index={2} className="shad-otp-slot" />
            <InputOTPSlot index={3} className="shad-otp-slot" />
            <InputOTPSlot index={4} className="shad-otp-slot" />
            <InputOTPSlot index={5} className="shad-otp-slot" />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn"
              type="button"
            >
              Submit
              {isLoading && (
                <LoaderCircle
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center">
              Didn't get a code?
              <Button
                type="button"
                variant={"link"}
                className="pl-1 text-brand"
                onClick={handleResendOTP}
              >
                Click to resend
              </Button>
            </div>
          </div>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OTPModal;
