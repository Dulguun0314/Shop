"use client";

import { useRouter } from "next/navigation";
import DashboardPanel from "./components/DashboardPanel";
import { useAdmin } from "./utils/AdminProvider";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAdmin();
  const router = useRouter();
  useEffect(() => {
    if (user.role !== "admin") {
      router.push("/");}
  }, []);

  return (
    <>
      <DashboardPanel />
    </>
  );
}
