"use client"

import RegisterForm from "@/components/registerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadingDataProvider } from "@/contexts/uploadingDataContext";
import React from "react";

const SignUp = () => {
  return (
    <Card className="w-full md:w-1/2">
      <CardHeader className="text-center">
        <CardTitle>New User</CardTitle>
      </CardHeader>
      <CardContent>
        <UploadingDataProvider>
          <RegisterForm />
        </UploadingDataProvider>
      </CardContent>
    </Card>
  );
};

export default SignUp;
