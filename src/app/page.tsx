"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/persons");
  }, [router]);

  return <></>;
};

export default MainPage;
