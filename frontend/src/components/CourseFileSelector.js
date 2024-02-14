import React, { useState, useEffect } from "react";
import useApi from "@/hooks/useApi";

const CourseFileSelector = ({ onFileSelect }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const { isLoading, error, makeRequest } = useApi();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseList = await makeRequest("subjects");
        setCourses(courseList.map((course) => course.name));
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const fetchFiles = async ({ selectedCourse }) => {
    try {
      const fileList = await makeRequest(`subjects/${selectedCourse}/files`);
      setFiles(fileList.map((file) => file.replace("/", " -> ")));
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedFile("");
    if (event.target.value) {
      fetchFiles({ selectedCourse: event.target.value });
    } else {
      setFiles([]);
    }
  };

  const handleFileChange = async (event) => {
    const selectedFileName = event.target.value;
    try {
      const fileName = selectedFileName
        .replace(" -> ", "/")
        .replace(".json", "")
        .replace(".md", "")
        .replace("experiments\\", "");
      console.log({ fileName });
      const fileContent = await makeRequest(
        `${
          selectedFileName.includes("experiments")
            ? "experiments/"
            : "subjects/"
        }${selectedCourse}/${fileName}`
      );

      onFileSelect(fileContent, selectedFileName.split(".")?.[1], `${fileName} - ${selectedCourse}`);
    } catch (error) {
      console.error("Error fetching file content:", error);
    }
  };

  console.log({ selectedCourse, selectedFile });

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md w-96">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Select a Course:
      </h2>
      <select
        className="w-full border border-gray-300 rounded-md p-2 mb-4 bg-gray-900 text-white"
        value={selectedCourse}
        onChange={handleCourseChange}
      >
        <option value="">Select a Course</option>
        {courses.map((course) => (
          <option key={course} value={course}>
            {course}
          </option>
        ))}
      </select>
      {isLoading && <div className="text-white">Loading...</div>}
      {!isLoading && selectedCourse && (
        <>
          <h2 className="text-lg font-semibold mb-2 text-white">
            Select a File:
          </h2>
          <select
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-900 text-white"
            value={selectedFile}
            onChange={handleFileChange}
          >
            <option value={selectedFile}>Select a File</option>
            {files.map((file) => (
              <option key={file.id} value={file.name}>
                {file}
              </option>
            ))}
          </select>
        </>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default CourseFileSelector;
