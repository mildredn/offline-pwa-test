import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    getCourses().then(_courses => setCourses(_courses));
  }, []);

  useEffect(() => {
    getAuthors().then(_authors => setAuthors(_authors));
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <Link className="btn btn-primary" to="/course">
        Add Note
      </Link>
      <CourseList courses={courses} authors={authors} />
    </div>
  );
}

export default CoursesPage;
