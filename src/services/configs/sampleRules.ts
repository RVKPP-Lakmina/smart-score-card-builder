const rulesList = {
  AGE: {
    id: "AGE",
    name: "Age",
    description: "Age of the applicant",
    type: "number",
    min: 18,
    max: 100,
    score: 0,
    seleted: false,
    required: true,
    properties: [],
  },

  EDUCATION_LEVEL: {
    id: "EDUCATION_LEVEL",
    name: "Education level",
    description: "Education level of the applicant",
    type: "string",
    seleted: false,
    score: 0,
    required: true,
    properties: [],
  },

  RESIDENCE_TYPE: {
    id: "RESIDENCE_TYPE",
    name: "Residence type",
    description: "Residence type of the applicant",
    type: "string",
    seleted: false,
    required: true,
    score: 0,
    properties: [],
  },

  EMPLOYMENT_STATUS: {
    id: "EMPLOYMENT_STATUS",
    name: "Employment status",
    description: "Employment status of the applicant",
    type: "string",
    seleted: false,
    required: true,
    score: 0,
    properties: [],
  },

  EXPERIENCE: {
    id: "EXPERIENCE",
    name: "No of experience in employment",
    description: "Experience of the applicant",
    type: "number",
    min: 0,
    max: 100,
    score: 0,
    seleted: false,
    required: true,
    properties: [],
  },

  EMPLOYMENT_TYPE: {
    id: "EMPLOYMENT_TYPE",
    name: "Employment Type",
    description: "Employment type of the applicant",
    type: "string",
    seleted: false,
    score: 0,
    required: true,
    properties: [],
  },

  DEPENDENT_INCOME: {
    id: "DEPENDENT_INCOME",
    name: "Dependent Income",
    description: "Dependent income of the applicant",
    type: "number",
    min: 0,
    max: 1000000,
    score: 0,
    seleted: false,
    required: true,
    properties: [],
  },

  LOAN_INSTALLMENT_INCOME_PERCENTAGE: {
    id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE",
    name: "Loan installment income percentage",
    description: "Loan installment income percentage of the applicant",
    type: "number",
    min: 0,
    max: 100,
    seleted: false,
    score: 0,
    required: true,
    properties: [],
  },

  DEBT_HANDLING_CAPACITY: {
    id: "DEBT_HANDLING_CAPACITY",
    name: "Debt handling capacity",
    description: "Debt handling capacity of the applicant",
    type: "number",
    min: 0,
    score: 0,
    max: 100,
    seleted: false,
    required: true,
    properties: [],
  },

  LOAN_CYCLES: {
    id: "LOAN_CYCLES",
    name: "No of loan cycles",
    description: "No of loan cycles of the applicant",
    type: "number",
    min: 0,
    max: 100,
    score: 0,
    seleted: false,
    required: true,
    properties: [],
  },
};

export default rulesList as {
  [key: string]: {
    id: string;
    name: string;
    description: string;
    type: "string" | "number";
    score: 0;
    properties: {
      id: string;
      name: string;
      score: number;
    }[];
    min?: number;
    max?: number;
    seleted?: boolean;
    required?: boolean;
  };
};
