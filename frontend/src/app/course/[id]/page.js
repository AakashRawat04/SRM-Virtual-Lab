"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import Link from "next/link";

const Sidebar = ({ pages, selectedPage, onSelectPage, courseId }) => {
  const formatPageName = (page) => {
    return page.replace(/_/g, " ");
  };

  return (
    <div className="drawer w-0">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {pages.map((page) => (
            <li
              key={page}
              className={`menu-item ${selectedPage === page ? "active" : ""}`}
            >
              {page.toLowerCase() === "experiments" ? (
                <Link href={`/course/${courseId}/experiments`}>
                  Experiments
                </Link>
              ) : (
                <a onClick={() => onSelectPage(page)}>{formatPageName(page)}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Page = ({ params }) => {
  const { id } = params;
  const [data, setData] = useState(null);
  const [selectedPage, setSelectedPage] = useState("introduction");
  const { isLoading, error, makeRequest } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pages = await makeRequest(`subjects/${id}`);
        setData({ pages });

        const subjectData = await makeRequest(`subjects/${id}/${selectedPage}`);
        setData((prevData) => ({ ...prevData, subjectData }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, selectedPage]);

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

  const matterResult = matter(data?.subjectData);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        pages={data?.pages}
        selectedPage={selectedPage}
        onSelectPage={setSelectedPage}
        courseId={id}
      />
      <div className="content w-full p-8">
        <h1 className="text-4xl font-bold border-b-2 mb-4 pb-2">{id}</h1>
        <div className="flex items-center justify-between border-b-2 pb-2 mb-6">
          <h2 className="text-2xl font-bold">{selectedPage}</h2>
        </div>
        <article className="prose">
          <Markdown>{matterResult.content}</Markdown>
        </article>
      </div>
    </div>
  );
};

export default Page;
