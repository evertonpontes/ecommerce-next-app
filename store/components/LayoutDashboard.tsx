import { ApertureIcon } from "lucide-react";
import React from "react";
import { Separator } from "./ui/separator";

export const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <div className="flex px-8 py-4">
        <ApertureIcon className="mr-2" />
        <h1 className="font-bold">DASHBOARD</h1>
      </div>
      <div className="h-full px-4 flex justify-center items-center">
        {children}
      </div>
      <div className="text-sm mx-2 my-4 text-center">
        <Separator className="my-4" />
        <p className="underline">
          <a href="/" target="_blank">
            Terms of Service
          </a>{" "}
          |{" "}
          <a href="/" target="_blank">
            Privacy Policy
          </a>
        </p>
        <p>Contact us: support@example.com | (123) 456-7890</p>
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </div>
  );
};
