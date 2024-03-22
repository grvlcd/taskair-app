"use client";
import { NextPage } from "next";

import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const Home: NextPage = () => {
  return (
    <DashboardLayout auth={true}>
      <h1>Dashboard</h1>
    </DashboardLayout>
  );
};

export default Home;
