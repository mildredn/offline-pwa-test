const courses = [
  {
    id: 213,
    title: "LUKOIL PJSC",
    slug: "LUKOIL-PJSC-213",
    authorId: 1,
    noteType: "Engagement",
    engagementDate: "August 13, 2018",
    objective: "Understanding our E & S Discount Rate Adjustments",
    keyIssues: [
      { Pillar: "Environment", KeyIssue: "CarbonEmissions" },
      { Pillar: "Environment", KeyIssue: "ToxicEmissionsandWaste" },
      { Pillar: "Environment", KeyIssue: "BiodiversityandLandUse" },
      { Pillar: "Social", KeyIssue: "HealthandSafety" }
    ]
  },
  {
    id: 214,
    title: "WELLS FARGO & CO",
    slug: "WELLS-FARGO-CO-214",
    authorId: 2,
    noteType: "Engagement",
    engagementDate: "August 5, 2018",
    objective: "Compliance issues, Balance Sheet growth potential",
    keyIssues: [{ Pillar: "Governance", KeyIssue: "BusinessEthicsandFraud" }]
  },
  {
    id: 215,
    title: "CIELO SA",
    slug: "CIELO-SA-215",
    authorId: 3,
    noteType: "Engagement",
    engagementDate: "August 14, 2018",
    objective: "Are we using the correct governance risk premium for Cielo",
    keyIssues: [
      { Pillar: "Governance", KeyIssue: "Board" },
      { Pillar: "Governance", KeyIssue: "Pay" },
      { Pillar: "Governance", KeyIssue: "Other" }
    ]
  },
  {
    id: 217,
    title: "JYSKE BANK A/S",
    slug: "JYSKE-BANK-217",
    authorId: 4,
    noteType: "Engagement",
    engagementDate: "September 19, 2018",
    objective:
      "Understand Jyske's Gibraltar risk and the Danish FSA's IT complaints.",
    keyIssues: [
      { Pillar: "Social", KeyIssue: "PrivacyandDataSecurity" },
      { Pillar: "Governance", KeyIssue: "BusinessEthicsandFraud" }
    ]
  },
  {
    id: 218,
    title: "COMPASS GROUP PLC",
    slug: "COMPASS-GROUP-PLC-218",
    authorId: 5,
    noteType: "Engagement",
    engagementDate: "September 19, 2018",
    objective: "Understanding workforce risks [S]",
    keyIssues: [{ Pillar: "Social", KeyIssue: "LaborManagement" }]
  },
  {
    id: 219,
    title: "DOLLAR GENERAL CORP",
    slug: "DOLLAR-GENERAL-COR-219",
    authorId: 5,
    noteType: "Engagement",
    engagementDate: "October 8, 2018",
    objective: "Understand managements handling of labor controversies",
    keyIssues: [{ Pillar: "Social", KeyIssue: "LaborManagement" }]
  },
  {
    id: 220,
    title: "SWISS RE AG",
    slug: "SWISS-RE-AG-220",
    authorId: 6,
    noteType: "Engagement",
    engagementDate: "December 11, 2018",
    objective:
      "To address the company's board structure and compensation mechanism. Also discussed the company's capital deployment plans from the business strategy aspect.",
    keyIssues: [
      { Pillar: "Governance", KeyIssue: "Board" },
      { Pillar: "Governance", KeyIssue: "Pay" }
    ]
  },
  {
    id: 221,
    title: "B&M EUROPEAN VALUE RETAIL SA",
    slug: "BM-EUROPEAN-VALUE-RETAIL-SA-221",
    authorId: 7,
    noteType: "Engagement",
    engagementDate: "November 20, 2018",
    objective:
      "We spoke with the CEO regarding the increased ESG focus placed on the company since IPO",
    keyIssues: [
      { Pillar: "Environment", KeyIssue: "Other" },
      { Pillar: "Social", KeyIssue: "Other" }
    ]
  },
  {
    id: 222,
    title: "ROCHE HOLDING AG",
    slug: "ROCHE-HOLDING-AG-222",
    authorId: 3,
    noteType: "Engagement",
    engagementDate: "December 11, 2018",
    objective:
      "Test low MSCI score on Product Safety and Corruption & Instability",
    keyIssues: [
      { Pillar: "Social", KeyIssue: "ProductSafetyandQuality" },
      { Pillar: "Governance", KeyIssue: "BusinessEthicsandFraud" },
      { Pillar: "Governance", KeyIssue: "AnticompetitivePractice" },
      { Pillar: "Governance", KeyIssue: "CorruptionandInstability" }
    ]
  },
  {
    id: 224,
    title: "STARBUCKS CORP",
    slug: "STARBUCKS-CORP-224",
    authorId: 8,
    noteType: "Engagement",
    engagementDate: "December 13, 2018",
    objective: "Understand Starbucks' coffee supply chain management practices",
    keyIssues: [
      { Pillar: "Environment", KeyIssue: "RawMaterialSourcing" },
      { Pillar: "Social", KeyIssue: "SupplyChainLaborStandards" }
    ]
  }
];

const authors = [
  { id: 1, name: "Thomas Skovbjerg" },
  { id: 2, name: "David Dalgas" },
  { id: 3, name: "Klaus Ingemann Nielsen" },
  { id: 4, name: "Rasmus Lee Hansen" },
  { id: 5, name: "Per La Cour" },
  { id: 6, name: "Anuradha Venkataraman" },
  { id: 7, name: "John Keith" },
  { id: 8, name: "James Tierney" }
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  noteType: "",
  engagementDate: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors
};
