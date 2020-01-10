import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

var mapping = {
  CarbonEmissions: "Carbon Emissions ",
  ToxicEmissionsandWaste: "Toxic Emissions and Waste",
  BiodiversityandLandUse: "Biodiversity and Land Use",
  RawMaterialSourcing: "Raw Material Sourcing",
  Other: "Other",
  SupplyChainLaborStandards: "Supply Chain Labor Standards",
  HealthandSafety: "Health & Safety",
  PrivacyandDataSecurity: "Privacy and Data Security",
  LaborManagement: "Labor Management",
  ProductSafetyandQuality: "Product Safety and Quality ",
  BusinessEthicsandFraud: "Business Ethics and Fraud",
  AnticompetitivePractice: "Anticompetitive Practice",
  CorruptionandInstability: "Corruption and Instability",
  Board: "Board",
  Pay: "Pay"
};

function keyIssuesDisplay(_keyIssues) {
  var ePillar = _keyIssues.filter(_keyIssue => {
    return _keyIssue.Pillar === "Environment";
  });

  if (ePillar.length > 0) {
    var ePillarString =
      ePillar[0].Pillar.toString() +
      ": " +
      ePillar
        .map(eKeyIssue => {
          return mapping[eKeyIssue.KeyIssue];
        })
        .join(", ");
  }

  var sPillar = _keyIssues.filter(_keyIssue => {
    return _keyIssue.Pillar === "Social";
  });

  if (sPillar.length > 0) {
    var sPillarString =
      sPillar[0].Pillar.toString() +
      ": " +
      sPillar
        .map(sKeyIssue => {
          return mapping[sKeyIssue.KeyIssue];
        })
        .join(", ");
  }

  var gPillar = _keyIssues.filter(_keyIssue => {
    return _keyIssue.Pillar === "Governance";
  });

  if (gPillar.length > 0) {
    var gPillarString =
      gPillar[0].Pillar.toString() +
      ": " +
      gPillar
        .map(gKeyIssue => {
          return mapping[gKeyIssue.KeyIssue];
        })
        .join(", ");
  }

  console.log(ePillarString, sPillarString, gPillarString);

  return (
    <div>
      <p>{ePillarString}</p>
      <p>{sPillarString}</p>
      <p>{gPillarString}</p>
    </div>
  );
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
              <td>{keyIssuesDisplay(course.keyIssues)}</td>
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
