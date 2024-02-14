"use client";
import SubjectList from "@/components/SubjectListCard";
import useApi from "@/hooks/useApi";
import { useEffect } from "react";

export default function Home() {
  const { isLoading, error, data, makeRequest } = useApi();

  useEffect(() => {
    makeRequest("subjects");
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <main className="flex min-h-screen flex-col p-10">
        <h1 className="text-4xl font-bold text-center">SRM VIRTUAL LAB</h1>
        <SubjectList subjects={data} />
      </main>
    );
  }
}
