import { cn } from "../lib/util";

type Rule = {
  id: string;
  name: string;
  parameterType: "Quantitative" | "Qualitative";
  maxScore: number;
  weightInSection: number;
  weightInModel: number;
};

type Section = {
  id: string;
  name: string;
  weightInModel: number;
  rules: Rule[];
};

type SectionRuleTableProps = {
  sections: Section[];
  className?: string;
};

export function SectionRuleTable({
  sections,
  className,
}: SectionRuleTableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {sections.map((section) => (
        <div key={section.id} className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Characteristics
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Parameter Type
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Max Score
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Proposed Weight in overall model
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Proposed Weight in each section
                </th>
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Proposed Weight in the Model
                </th>
              </tr>
            </thead>
            <tbody>
              {section.rules.map((rule) => (
                <tr
                  key={rule.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    {rule.name}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-xs",
                        rule.parameterType === "Quantitative"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      )}
                    >
                      {rule.parameterType}
                    </span>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {rule.maxScore}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {section.weightInModel}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {rule.weightInSection}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {rule.weightInModel}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

// Example usage component with mock data
export function SectionRulesPreview() {
  const mockSections: Section[] = [
    {
      id: "1",
      name: "Borrower Characteristics",
      weightInModel: 35,
      rules: [
        {
          id: "1-1",
          name: "Age - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-2",
          name: "Age - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-3",
          name: "Level of Education - PA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "1-4",
          name: "Level of Education - JA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "1-5",
          name: "Residence - PA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-6",
          name: "Residence - JA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-7",
          name: "Employment Status - PA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-8",
          name: "Employment Status - JA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-9",
          name: "Years of experience in current profession / vocation - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "1-10",
          name: "Years of experience in current profession / vocation - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "1-11",
          name: "Employment Type - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
        {
          id: "1-12",
          name: "Employment Type - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 7.5,
          weightInModel: 2.6,
        },
      ],
    },
    {
      id: "2",
      name: "Financial Risk Characteristics",
      weightInModel: 30,
      rules: [
        {
          id: "2-1",
          name: "Monthly income to no of dependents - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 15.0,
          weightInModel: 4.5,
        },
        {
          id: "2-2",
          name: "Monthly income to no of dependents - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 15.0,
          weightInModel: 4.5,
        },
        {
          id: "2-3",
          name: "% of loan installment (outstanding loans + proposed loans) to monthly income - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 15.0,
          weightInModel: 4.5,
        },
        {
          id: "2-4",
          name: "% of loan installment (outstanding loans + proposed loans) to monthly income - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 15.0,
          weightInModel: 4.5,
        },
        {
          id: "2-5",
          name: "Debt Handling Capacity - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 20.0,
          weightInModel: 6.0,
        },
        {
          id: "2-6",
          name: "Debt Handling Capacity - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 20.0,
          weightInModel: 6.0,
        },
      ],
    },
    {
      id: "3",
      name: "Transactional Risk",
      weightInModel: 35,
      rules: [
        {
          id: "3-1",
          name: "Salary Assignment - PA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-2",
          name: "Salary Assignment - JA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-3",
          name: "LTV Ratio",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 20.0,
          weightInModel: 7.0,
        },
        {
          id: "3-4",
          name: "CRIB Record - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-5",
          name: "CRIB Record - JA",
          parameterType: "Qualitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-6",
          name: "Relationship with RDB - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-7",
          name: "Relationship with RDB - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-8",
          name: "Presence in the regulated financial system - PA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
        {
          id: "3-9",
          name: "Presence in the regulated financial system - JA",
          parameterType: "Quantitative",
          maxScore: 100,
          weightInSection: 10.0,
          weightInModel: 3.5,
        },
      ],
    },
  ];

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-green-300">
        Section and Rule Weights
      </h2>
      <SectionRuleTable sections={mockSections} />
    </div>
  );
}
