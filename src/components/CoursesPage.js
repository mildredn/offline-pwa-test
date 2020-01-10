import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import { getAuthors } from "../api/authorApi";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import "./style.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [btnVisibility, setbtnVisibility] = useState("inline");
  const [pVisibility, setpVisibility] = useState("none");

  useEffect(() => {
    getCourses().then(_courses => setCourses(_courses));
  }, []);

  useEffect(() => {
    getAuthors().then(_authors => setAuthors(_authors));
  }, []);

  const baseUrl = "/sync";

  function btnOnClick() {
    navigator.serviceWorker.ready.then(reg => reg.sync.register("myEvent"));
  }

  function checkOnline() {
    //console.log("called");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/");
    xhr.send();

    xhr.onerror = function() {
      console.log("offline");
      // only triggers if the request couldn't be made at all
      setbtnVisibility("none");
      setpVisibility("inline");
    };

    xhr.onload = function() {
      console.log("online");
      // only triggers if the request couldn't be made at all
      setbtnVisibility("inline");
      setpVisibility("none");
    };
  }
  checkOnline();
  setInterval(function() {
    checkOnline();
  }, 20000);

  return (
    <div>
      <h2>Notes</h2>
      <Link className="btn btn-primary" to="/course">
        Add Note
      </Link>
      <button
        className="btn btn-primary btn-sync"
        onClick={btnOnClick}
        style={{ display: btnVisibility }}
      >
        Sync Notes
      </button>
      <p className="btn-sync" style={{ display: pVisibility }}>
        You are offline!
      </p>
      {authors.length > 0 && <CourseList courses={courses} authors={authors} />}
    </div>
  );
}

export default CoursesPage;
