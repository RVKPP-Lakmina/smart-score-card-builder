import { cn } from "../../../lib/util";
import { ExportLine } from "../../../types/responseTypes";

type SectionRuleTableProps = {
  sections: ExportLine[string];
  className?: string;
};

function SectionRuleTable({ sections, className }: SectionRuleTableProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {Object.values(sections.sections).map((section) => (
        <div key={section.id} className="overflow-x-auto">
          <h3 className="text-lg font-semibold mb-2">{section.name}</h3>
          <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Characteristics
                </th>
                {/* <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                  Parameter Type
                </th> */}
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
              {Object.values(section.ruleEntries).map((rule) => (
                <tr
                  key={rule.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  <td className="border border-gray-300 dark:border-gray-700 p-2">
                    {rule.name}
                  </td>
                  {/* <td className="border border-gray-300 dark:border-gray-700 p-2">
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
                  </td> */}
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {"100%"}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {section.overallWeight}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {rule.sectionWeight}%
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                    {rule.modelWeight}%
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

export default function SectionRulesPreview({ data }: { data: ExportLine }) {
  const template = Object.values(data)[0] as ExportLine[string];

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-green-300">
        {template.name}'s: Section and Rule Weights
      </h2>
      <SectionRuleTable sections={template} />
    </div>
  );
}
