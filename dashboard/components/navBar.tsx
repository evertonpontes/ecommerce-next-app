"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ApertureIcon, Edit, MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Menubar, MenubarItem, MenubarTrigger } from "./ui/menubar";
import { MenubarContent, MenubarMenu } from "@radix-ui/react-menubar";
import Link from "next/link";

export const NavBar = () => {
  const { data: session } = useSession();

  return (
    <Card className="w-full rounded-none">
      <CardContent className="flex justify-between items-center p-2">
        <CardHeader className="p-2">
          <Button variant="ghost">
            <MenuIcon />
          </Button>
        </CardHeader>
        <CardDescription>
          <Menubar className="border-none">
            <MenubarMenu>
              <MenubarTrigger>
                <Avatar>
                  <AvatarImage
                    src={(session?.user && session.user.image) || ""}
                  />
                  <AvatarFallback>
                    {session?.user &&
                      session.user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </MenubarTrigger>
              <MenubarContent className="bg-background border-border border rounded-lg m-2">
                <MenubarItem className="flex gap-1">
                  <Edit className="w-4 h-4" />
                  <Link href="/">
                      Edit Profile
                  </Link>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
