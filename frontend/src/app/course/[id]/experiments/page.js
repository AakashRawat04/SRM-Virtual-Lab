"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Link from "next/link";

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const { isLoading, error, makeRequest } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experiments = await makeRequest(`experiments/${id}`);
        setData({ experiments });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600">
        Error: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">No data</div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="content w-full p-8">
        <h1 className="text-4xl font-bold border-b-2 mb-4 pb-2">{id}</h1>
        <div className="flex items-center justify-between border-b-2 pb-2 mb-6">
          {data.experiments.map((experiment) => (
            <div key={experiment}>
              <Link href={`/course/${id}/experiments/${experiment}`}>
                <h1>{experiment}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
