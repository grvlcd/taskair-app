"use client";
import { NextPage } from "next";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

const BoardsPage: NextPage = () => {

  return (
    <DashboardLayout auth={true}>
      <h1>Boards</h1>
    </DashboardLayout>
  );
};

export default BoardsPage;
