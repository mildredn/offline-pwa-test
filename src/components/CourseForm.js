import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";
import "./style.css";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Company Name"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
        error={props.errors.title}
      />

      <div className="form-group">
        <label htmlFor="author">Analyst Name</label>
        <div className="field">
          <select
            id="author"
            name="authorId"
            onChange={props.onChange}
            value={props.course.authorId || ""}
            className="form-control"
          >
            <option value="" />
            {props.authors.map((author, i) => {
              return (
                <option value={author.id} key={i}>
                  {author.name}
                </option>
              );
            })}
          </select>
        </div>
        {props.errors.authorId && (
          <div className="alert alert-danger">{props.errors.authorId}</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="noteType">Note Type</label>
        <div className="field">
          <select
            id="noteType"
            name="noteType"
            onChange={props.onChange}
            value={props.course.noteType || ""}
            className="form-control"
          >
            <option value="" />
            <option value="Research">Research</option>
            <option value="Engagement">Engagement</option>
          </select>
        </div>
      </div>

      <TextInput
        id="engagementDate"
        label="Date"
        name="engagementDate"
        onChange={props.onChange}
        value={props.course.engagementDate}
        error={props.errors.engagementDate}
      />

      <TextInput
        id="objective"
        label="Objective"
        name="objective"
        onChange={props.onChange}
        value={props.course.objective}
        error={props.errors.objective}
      />

      {/* <TextInput
        id="keyIssues"
        label="Key Issues"
        name="keyIssues"
        onChange={props.onChange}
        value={props.course.keyIssues}
        error={props.errors.keyIssues}
      /> */}

      <label htmlFor="keyIssues">Key Issues</label>
      <div className="checkboxcontainer">
        <div className="Environment">
          <h6>Environment</h6>
          <p>
            <input
              type="checkbox"
              id="keyIssueE1"
              name="Environment_CarbonEmissions"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Environment_CarbonEmissions}
            ></input>
            <label htmlFor="keyIssueE1">Carbon Emissions</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueE2"
              name="Environment_ToxicEmissionsandWaste"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Environment_ToxicEmissionsandWaste}
            ></input>
            <label htmlFor="keyIssueE2">Toxic Emissions and Waste</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueE3"
              name="Environment_BiodiversityandLandUse"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Environment_BiodiversityandLandUse}
            ></input>
            <label htmlFor="keyIssueE3">Biodiversity and Land Use</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueE4"
              name="Environment_RawMaterialSourcing"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Environment_RawMaterialSourcing}
            ></input>
            <label htmlFor="keyIssueE4">Raw Material Sourcing</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueE5"
              name="Environment_Other"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Environment_Other}
            ></input>
            <label htmlFor="keyIssueE5">Other</label>
          </p>
        </div>

        <div className="Social">
          <h6>Social</h6>
          <p>
            <input
              type="checkbox"
              id="keyIssueS1"
              name="Social_SupplyChainLaborStandards"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_SupplyChainLaborStandards}
            ></input>
            <label htmlFor="keyIssueS1">Supply Chain Labor Standards</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueS2"
              name="Social_HealthandSafety"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_HealthandSafety}
            ></input>
            <label htmlFor="keyIssueS2">Health and Safety</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueS3"
              name="Social_PrivacyandDataSecurity"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_PrivacyandDataSecurity}
            ></input>
            <label htmlFor="keyIssueS3">Privacy and Data Security</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueS4"
              name="Social_LaborManagement"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_LaborManagement}
            ></input>
            <label htmlFor="keyIssueS4">Labor Management</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueS5"
              name="Social_ProductSafetyandQuality"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_ProductSafetyandQuality}
            ></input>
            <label htmlFor="keyIssueS5">Product Safety and Quality</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueS6"
              name="Social_Other"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Social_Other}
            ></input>
            <label htmlFor="keyIssueS6">Other</label>
          </p>
        </div>

        <div className="Governance">
          <h6>Governance</h6>
          <p>
            <input
              type="checkbox"
              id="keyIssueG1"
              name="Governance_BusinessEthicsandFraud"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_BusinessEthicsandFraud}
            ></input>
            <label htmlFor="keyIssueG1">Business Ethics and Fraud</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueG2"
              name="Governance_AnticompetitivePractice"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_AnticompetitivePractice}
            ></input>
            <label htmlFor="keyIssueG2">Anticompetitive Practice</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueG3"
              name="Governance_CorruptionandInstability"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_CorruptionandInstability}
            ></input>
            <label htmlFor="keyIssueG3">Corruption and Instability</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueG4"
              name="Governance_Board"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_Board}
            ></input>
            <label htmlFor="keyIssueG4">Board</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueG5"
              name="Governance_Pay"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_Pay}
            ></input>
            <label htmlFor="keyIssueG5">Pay</label>
          </p>
          <p>
            <input
              type="checkbox"
              id="keyIssueG6"
              name="Governance_Other"
              onChange={props.onCheckboxChange}
              checked={props.checkboxVal.Governance_Other}
            ></input>
            <label htmlFor="keyIssueG6">Other</label>
          </p>
        </div>
      </div>

      <input type="submit" value="Save" className="btn btn-primary" />
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

export default CourseForm;
