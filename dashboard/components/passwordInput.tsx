"use client";

import { EyeIcon, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useContext, useState } from "react";
import { UploadingDataContext } from "@/contexts/uploadingDataContext";

const PasswordInput = ({
  field,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const {isUploadingData} = useContext(UploadingDataContext)

  return (
    <div className="w-full flex border rounded-md focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-background focus-within:ring-offset-2">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        {...field}
        autoComplete="password"
        className="border-none focus-visible:ring-transparent focus-visible:ring-inset"
        disabled={isUploadingData}
      />
      <Button
        type="button"
        variant="link"
        disabled={isUploadingData}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeOff className="text-muted-foreground" />
        ) : (
          <EyeIcon className="text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
