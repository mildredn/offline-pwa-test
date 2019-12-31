import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function keyIssuesString(_keyIssues) {
  var output = keyIssuesDisplay(_keyIssues);
  var resultString = "";

  output.forEach(element => {
    resultString += element.Pillar.toString() + ": ";
    resultString += element.KeyIssue.toString() + "\n";
  });

  return <div>{resultString}</div>;
}

function keyIssuesDisplay(_keyIssues) {
  var output = [];

  _keyIssues.forEach(_keyIssue => {
    var existing = output.filter(opKeyIssue => {
      return opKeyIssue.Pillar === _keyIssue.Pillar;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].KeyIssue = output[existingIndex].KeyIssue.concat(
        _keyIssue.KeyIssue
      );
    } else {
      if (typeof _keyIssue.KeyIssue == "string")
        _keyIssue.KeyIssue = [_keyIssue.KeyIssue];
      output.push(_keyIssue);
    }
  });
  return output;
}

function CourseList(props) {
  console.log(props);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Engagement Date</th>
          <th>Note Type</th>
          <th>Title</th>
          <th>Author Name</th>
          <th>Objective</th>
          <th>Key Issues</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map(course => {
          return (
            <tr key={course.id}>
              <td>{course.engagementDate}</td>
              <td>{course.noteType}</td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>
                {
                  props.authors.find(author => {
                    return author.id === course.authorId;
                  }).name
                }
              </td>
              <td>{course.objective}</td>
              <td>{keyIssuesString(course.keyIssues)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      noteType: PropTypes.string.isRequired
    })
  ).isRequired,

  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  )
};

export default CourseList;
