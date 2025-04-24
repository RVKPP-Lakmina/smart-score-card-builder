const rulesList = {
  AGE: {
    id: "AGE",
    name: "Age",
    description: "Age of the applicant",
    type: "number",
    min: 18,
    max: 100,
    score: 0.05,
    seleted: false,
    required: true,
    properties: [
      { name: "<=25", id: "AGE_25", score: 20 },
      { name: ">25 and <=35", id: "AGE_25_AND_30", score: 60 },
      { name: ">35 and <=45", id: "AGE_35_AND_40", score: 100 },
      { name: ">45 and <=55", id: "AGE_45_AND_55", score: 80 },
      { name: ">55 and <=60", id: "AGE_45_AND_55", score: 60 },
      { name: ">60", id: "AGE_45_AND_55", score: 40 },
    ],
  },

  EDUCATION_LEVEL: {
    id: "EDUCATION_LEVEL",
    name: "Education level",
    description: "Education level of the applicant",
    type: "string",
    seleted: false,
    score: 0.07,
    required: true,
    properties: [
      {
        name: "Graduates & Professional Qualification (MBBS, LLB/Attorney at Law, BSc Eng, ACA, CFA etc.)",
        id: "NO_EDUCATION",
        score: 100,
      },
      {
        name: "Vocational Training / Diploma Holders",
        id: "PRIMARY_EDUCATION",
        score: 80,
      },
      { name: "Advanced Level", id: "SECONDARY_EDUCATION", score: 60 },
      { name: "Up to Ordinary Level", id: "HIGHER_EDUCATION", score: 40 },
      {
        name: "Postgraduate education",
        id: "POSTGRADUATE_EDUCATION",
        score: 100,
      },
    ],
  },

  RESIDENCE_TYPE: {
    id: "RESIDENCE_TYPE",
    name: "Residence type",
    description: "Residence type of the applicant",
    type: "string",
    seleted: false,
    required: true,
    score: 0.05,
    properties: [
      { name: "Own (Not Mortgaged)", id: "OWN", score: 100 },
      { name: "Own (Mortgaged)", id: "RENT", score: 80 },
      { name: "Parents / Spouse's House", id: "FAMILY", score: 60 },
      { name: "Leased/ Rented", id: "OTHER", score: 40 },
    ],
  },

  EMPLOYMENT_STATUS: {
    id: "EMPLOYMENT_STATUS",
    name: "Employment status",
    description: "Employment status of the applicant",
    type: "string",
    seleted: false,
    required: true,
    score: 0.09,
    properties: [
      { name: "Employed", id: "EMPLOYED", score: 100 },
      { name: "Self Employed", id: "SELF_EMPLOYED", score: 80 },
      { name: "Unemployed", id: "UNEMPLOYED", score: 60 },
      { name: "Retired", id: "RETIRED", score: 40 },
      { name: "Student", id: "STUDENT", score: 20 },
    ],
  },

  EXPERIENCE: {
    id: "EXPERIENCE",
    name: "No of experience in employment",
    description: "Experience of the applicant",
    type: "number",
    min: 0,
    max: 100,
    score: 0.12,
    seleted: false,
    required: true,
    properties: [
      { name: "<=1", id: "EXPERIENCE_1", score: 20 },
      { name: ">1 and <=3", id: "EXPERIENCE_3", score: 40 },
      { name: ">3 and <=5", id: "EXPERIENCE_5", score: 60 },
      { name: ">5 and <=10", id: "EXPERIENCE_10", score: 80 },
      { name: ">10", id: "EXPERIENCE_10", score: 100 },
    ],
  },

  EMPLOYMENT_TYPE: {
    id: "EMPLOYMENT_TYPE",
    name: "Employment Type",
    description: "Employment type of the applicant",
    type: "string",
    seleted: false,
    score: 0,
    required: true,
    properties: [
      {
        name: "Employees of Government and Statutory Bodies",
        id: "PERMANENT",
        score: 100,
      },
      {
        name: "Employees of Private Sector / Professionals with Fixed Income",
        id: "CONTRACT",
        score: 80,
      },
      {
        name: "Professionals with Non-Fixed Income",
        id: "TEMPORARY",
        score: 60,
      },
      { name: "Self-Employed / Own Business", id: "INTERNSHIP", score: 40 },
    ],
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
    properties: [
      { name: "<=10000", id: "DEPENDENT_INCOME_10000", score: 20 },
      { name: ">10000 and <=20000", id: "DEPENDENT_INCOME_20000", score: 40 },
      { name: ">20000 and <=30000", id: "DEPENDENT_INCOME_30000", score: 60 },
      { name: ">30000 and <=50000", id: "DEPENDENT_INCOME_50000", score: 80 },
      { name: ">50000", id: "DEPENDENT_INCOME_50000", score: 100 },
    ],
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
    properties: [
      { name: "<=10", id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE_10", score: 100 },
      {
        name: ">10 and <=20",
        id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE_20",
        score: 80,
      },
      {
        name: ">20 and <=30",
        id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE_30",
        score: 60,
      },
      {
        name: ">30 and <=40",
        id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE_40",
        score: 40,
      },
      { name: ">40", id: "LOAN_INSTALLMENT_INCOME_PERCENTAGE_40", score: 20 },
    ],
  },

  percentageLoanInstallIncome: {
    id: "percentageLoanInstallIncome",
    name: "Percentage of loan installment income",
    description: "Percentage of loan installment income of the applicant",
    type: "number",
    min: 0,
    max: 100,
    seleted: false,
    score: 0.09,
    required: true,
    properties: [
      { name: "<=10", id: "percentageLoanInstallIncome_10", score: 20 },
      { name: ">10 and <=20", id: "percentageLoanInstallIncome_20", score: 40 },
      { name: ">20 and <=30", id: "percentageLoanInstallIncome_30", score: 60 },
      { name: ">30 and <=40", id: "percentageLoanInstallIncome_40", score: 80 },
      { name: ">40", id: "percentageLoanInstallIncome_40", score: 100 },
    ],
  },

  DEBT_HANDLING_CAPACITY: {
    id: "DEBT_HANDLING_CAPACITY",
    name: "Debt handling capacity",
    description: "Debt handling capacity of the applicant",
    type: "number",
    min: 0,
    score: 0.12,
    max: 100,
    seleted: false,
    required: true,
    properties: [
      { name: "<=10", id: "DEBT_HANDLING_CAPACITY_10", score: 20 },
      { name: ">10 and <=20", id: "DEBT_HANDLING_CAPACITY_20", score: 40 },
      { name: ">20 and <=30", id: "DEBT_HANDLING_CAPACITY_30", score: 60 },
      { name: ">30 and <=40", id: "DEBT_HANDLING_CAPACITY_40", score: 80 },
      { name: ">40", id: "DEBT_HANDLING_CAPACITY_40", score: 100 },
    ],
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
    properties: [
      { name: "<=1", id: "LOAN_CYCLES_1", score: 20 },
      { name: ">1 and <=3", id: "LOAN_CYCLES_3", score: 40 },
      { name: ">3 and <=5", id: "LOAN_CYCLES_5", score: 60 },
      { name: ">5 and <=10", id: "LOAN_CYCLES_10", score: 80 },
      { name: ">10", id: "LOAN_CYCLES_10", score: 100 },
    ],
  },

  CRIB_RECORD: {
    id: "CRIB_RECORD",
    name: "CRIB record",
    description: "CRIB record of the applicant",
    type: "string",
    seleted: false,
    score: 0.07,
    required: true,
    properties: [
      { name: "No CRIB Record", id: "NO_CRIB_RECORD", score: 100 },
      { name: "Good CRIB Record", id: "GOOD_CRIB_RECORD", score: 80 },
      { name: "Bad CRIB Record", id: "BAD_CRIB_RECORD", score: 60 },
      { name: "Very Bad CRIB Record", id: "VERY_BAD_CRIB_RECORD", score: 40 },
    ],
  },
  BANK_RELATIONS: {
    id: "BANK_RELATIONS",
    name: "Bank relations",
    description: "Bank relations of the applicant",
    type: "string",
    seleted: false,
    score: 0.07,
    required: true,
    properties: [
      { name: "No Bank Relations", id: "NO_BANK_RELATIONS", score: 20 },
      { name: "Good Bank Relations", id: "GOOD_BANK_RELATIONS", score: 60 },
      { name: "Bad Bank Relations", id: "BAD_BANK_RELATIONS", score: 40 },
      {
        name: "Very Bad Bank Relations",
        id: "VERY_BAD_BANK_RELATIONS",
        score: 20,
      },
    ],
  },
  presenceOfRegulatedFinancialSystem: {
    id: "presenceOfRegulatedFinancialSystem",
    name: "Presence of regulated financial system",
    description: "Presence of regulated financial system of the applicant",
    type: "string",
    seleted: false,
    score: 0.07,
    required: true,
    properties: [
      { name: "No", id: "NO", score: 20 },
      { name: "Yes", id: "YES", score: 60 },
    ],
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
