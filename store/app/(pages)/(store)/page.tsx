"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Home = () => {
  const { data: session } = useSession();

  console.log(session?.user?.image);

  return (
    <div>
      <div>{session?.user?.name}</div>
      <div className="w-16 h-16 overflow-hidden rounded-full">
        <Image
          alt="image"
          src={session?.user?.image || ""}
          width={64}
          height={64}
        />
      </div>
      <Button onClick={() => signOut()}>Logout</Button>
    </div>
  );
};

export default Home;
