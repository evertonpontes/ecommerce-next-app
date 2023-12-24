import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ApertureIcon,
  HomeIcon,
  BoxIcon,
  StretchHorizontalIcon,
  SendHorizontalIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "./ui/separator";

export const SideBar = () => {
  return (
    <Card className="h-screen rounded-none bg-primary border-none text-secondary">
      <CardContent>
        <CardHeader>
          <Link href="/" className="flex flex-row items-center gap-1">
            <ApertureIcon className="mr-2" />
            <CardTitle>Dashboard</CardTitle>
          </Link>
        </CardHeader>
        <Separator />
        <CardDescription className="flex flex-col items-start gap-4 text-secondary pt-4 pl-7">
          <Link href="/" className="flex flex-row items-center gap-1">
            <HomeIcon className="mr-2" />
            <span>Home</span>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-1">
            <BoxIcon className="mr-2" />
            <span>Products</span>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-1">
            <StretchHorizontalIcon className="mr-2" />
            <span>Category</span>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-1">
            <SendHorizontalIcon className="mr-2" />
            <span>Order</span>
          </Link>
          <Link href="/" className="flex flex-row items-center gap-1">
            <SettingsIcon className="mr-2" />
            <span>Settings</span>
          </Link>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
