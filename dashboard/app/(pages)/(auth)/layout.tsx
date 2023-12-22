import React from "react";
import { LayoutDashboard } from "@/components/LayoutDashboard";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  return <LayoutDashboard>{children}</LayoutDashboard>;
};

export default LayoutAuth;
