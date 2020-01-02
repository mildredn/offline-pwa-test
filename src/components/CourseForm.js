import React from "react";
import TextInput from "./common/TextInput";
import PropTypes from "prop-types";

function CourseForm(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id="title"
        label="Title"
        onChange={props.onChange}
        name="title"
        value={props.course.title}
        error={props.errors.title}
      />

      <div className="form-group">
        <label htmlFor="author">Author</label>
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
        label="Engagement Date"
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

      <TextInput
        id="keyIssues"
        label="Key Issues"
        name="keyIssues"
        onChange={props.onChange}
        value={props.course.keyIssues}
        error={props.errors.keyIssues}
      />

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
