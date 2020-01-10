import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { getAuthors } from "../api/authorApi";
import { toast } from "react-toastify";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    noteType: null,
    engagementDate: "",
    objective: "",
    keyIssues: []
  });
  const [authors, setAuthors] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState({
    Environment_CarbonEmissions: false,
    Environment_ToxicEmissionsandWaste: false,
    Environment_BiodiversityandLandUse: false,
    Environment_RawMaterialSourcing: false,
    Environment_Other: false,
    Social_SupplyChainLaborStandards: false,
    Social_HealthandSafety: false,
    Social_PrivacyandDataSecurity: false,
    Social_LaborManagement: false,
    Social_ProductSafetyandQuality: false,
    Social_Other: false,
    Governance_BusinessEthicsandFraud: false,
    Governance_AnticompetitivePractice: false,
    Governance_CorruptionandInstability: false,
    Governance_Board: false,
    Governance_Pay: false,
    Governance_Other: false
  });

  useEffect(() => {
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (slug) {
      courseApi.getCourseBySlug(slug).then(_course => setCourse(_course));
    }
  }, [props.match.params.slug]);

  useEffect(() => {
    getAuthors().then(_authors => setAuthors(_authors));
  }, []);

  useEffect(() => {
    const slug = props.match.params.slug; // from the path `/courses/:slug`
    if (slug) {
      courseApi.getCourseBySlug(slug).then(_course => {
        var finalIssues = {};
        _course.keyIssues.forEach(keyIssue => {
          var re = new RegExp(" ", "g");

          var finalKeyIssue =
            keyIssue.Pillar + "_" + keyIssue.KeyIssue.replace(re, "");

          finalIssues[finalKeyIssue] = true;
          console.log(finalKeyIssue);
        });
        setCheckboxValue({
          ...checkboxValue,
          ...finalIssues
        });
      });
      //setCheckboxValue();
    }
  }, [props.match.params.slug]);

  function setCheckbox({ target }) {
    console.log(course);
    var pillar = target.name.split("_")[0];
    var keyIssue = target.name.split("_")[1];

    if (target.checked) {
      setCourse({
        ...course,
        keyIssues: [
          ...course.keyIssues,
          { Pillar: pillar.toString(), KeyIssue: keyIssue.toString() }
        ]
      });
      //console.log(course);
      setCheckboxValue({
        ...checkboxValue,
        [target.name]: true
      });
    } else {
      // course.keyIssues = course.keyIssues.filter(r => r.Pillar === pillar && r.KeyIssue === keyIssue)
      setCourse({
        ...course,
        keyIssues: course.keyIssues.filter(r => {
          //r !== { Pillar: pillar.toString(), KeyIssue: keyIssue.toString() };
          console.log(r);
          if (
            r.Pillar === pillar.toString() &&
            r.KeyIssue === keyIssue.toString()
          ) {
            return false;
          }
          return true;
        })
      });
      //console.log(course);
      setCheckboxValue({
        ...checkboxValue,
        [target.name]: false
      });
    }
  }

  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  // function handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === "checkbox" ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.noteType) _errors.noteType = "Note Type is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Note saved.");
    });
  }

  return (
    <>
      <h2>Manage Notes</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onCheckboxChange={setCheckbox}
        checkboxVal={checkboxValue}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
