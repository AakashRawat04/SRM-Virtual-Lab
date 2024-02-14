"use client";
import React, { useState } from "react";
import Markdown from "markdown-to-jsx";
import CourseFileSelector from "@/components/CourseFileSelector";
import ReactJson from "react-json-view";

const MarkdownRenderer = ({ markdownContent }) => (
  <div className="w-1/2 p-4 border-l border-gray-200">
    <Markdown>{markdownContent}</Markdown>
  </div>
);

const MarkdownPage = () => {
  const [fileContent, setFileContent] = useState("");
  const [selectedFileContent, setSelectedFileContent] = useState("");
  const [selectedFileType, setSelectedFileType] = useState("");

  const handleFileSelect = (fileContent, fileType) => {
    setSelectedFileType(fileType);
    setSelectedFileContent(fileContent);
    setFileContent(fileContent);
  };

  const handleInputChange = (event) => {
    setFileContent(event.target.value);
  };

  console.log({ fileContent, selectedFileType });

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <CourseFileSelector onFileSelect={handleFileSelect} />
        Updating {selectedFileType} file
        <div className="w-1/2 p-4">
          {selectedFileType === "json" ? (
            <div className="bg-white p-2 rounded-md mb-4 w-full h-full">
              <ReactJson
                src={fileContent}
                onEdit={(newContent) => setFileContent(newContent)}
                onDelete={(deletedContent) => setFileContent(deletedContent)}
                onAdd={(addedContent) => setFileContent(addedContent)}
              />
            </div>
          ) : (
            <textarea
              className="w-full h-full border border-gray-300 rounded-md p-2 resize-none"
              value={fileContent}
              onChange={handleInputChange}
              placeholder="Enter Markdown content here..."
            />
          )}
        </div>
        {selectedFileType !== "json" ? (
          <MarkdownRenderer
            markdownContent={
              selectedFileType !== "json" ? fileContent : selectedFileContent
            }
          />
        ) : null}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={() => console.log(fileContent)}
      >
        Save
      </button>
    </div>
  );
};

export default MarkdownPage;
