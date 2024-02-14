"use client";
import React, { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import Quiz from "@/components/Quiz";

const Sidebar = ({ experiments, selectedPage, onSelectPage }) => {
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
          {experiments.map((page) => (
            <li
              key={page}
              className={`menu-item ${selectedPage === page ? "active" : ""}`}
            >
              <a onClick={() => onSelectPage(page)}>
                {page.replace(/_/g, " ").replace(".json", "")}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Page = ({ params }) => {
  const { id } = params;
  const { experimentId } = params;

  const [data, setData] = useState(null);
  const [selectedPage, setSelectedPage] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const { isLoading, error, makeRequest } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experiments = await makeRequest(
          `experiments/${id}/${experimentId}`
        );
        setData({ experiments });

        if (!selectedPage && experiments?.length) {
          setSelectedPage(experiments[0]);
        }

        if (selectedPage && experiments.includes(selectedPage)) {
          const experimentData = await makeRequest(
            `experiments/${id}/${experimentId}/${selectedPage}`
          );
          if (selectedPage === "posttest" || selectedPage === "pretest") {
            setQuizData(experimentData);
          } else {
            setData((prevData) => ({ ...prevData, experimentData }));
          }
        }
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

  console.log({ data, quizData });

  const matterResult = matter(data?.experimentData || "Loading...");

  if (
    (selectedPage === "posttest" || selectedPage === "pretest") &&
    !quizData
  ) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        experiments={data?.experiments}
        selectedPage={selectedPage}
        onSelectPage={setSelectedPage}
      />
      <div className="content w-full p-8">
        <h1 className="text-4xl font-bold border-b-2 mb-4 pb-2">{id}</h1>
        <div className="flex items-center justify-between border-b-2 pb-2 mb-6">
          <h2 className="text-2xl font-bold">{selectedPage}</h2>
        </div>
        {(selectedPage === "posttest" || selectedPage === "pretest") &&
        quizData ? (
          <Quiz questions={quizData} />
        ) : (
          <article className="prose">
            <Markdown>{matterResult.content}</Markdown>
          </article>
        )}
      </div>
    </div>
  );
};

export default Page;
