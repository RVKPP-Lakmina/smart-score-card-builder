/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Save,
  FileText,
  Calculator,
  AlertTriangle,
} from "lucide-react";
import { cn } from "../lib/util";
import { DataNotFound } from "./ui/DataNotFound";
import { Button } from "./ui/Button";
import { ExportLine, Templates } from "../types/responseTypes";
import { exportLine } from "../services/services";
import { RuleWithId } from "../types/rules";

interface RuleScores {
  ruleId: string;
  ruleName: string;
  value: any;
  score: number;
  weight: number;
  weightedScore: number;
  sectionWeight: number;
}

interface FormValues {
  [key: string]: any;
}

interface DynamicRuleFormProps {
  product?: Templates[string];
  onScoreGenerated?: (report: Report) => void;
}

interface Report {
  id: string;
  productId: string;
  productName: string;
  templateId: string;
  templateName: string;
  createdAt: string;
  createdBy: string;
  status: "active" | "inactive";
  totalScore: number;
  sectionScores: {
    sectionId: string;
    sectionName: string;
    score: number;
    weight: number;
    weightedScore: number;
    rules: RuleScores[];
  }[];
}

export function DynamicRuleForm({
  product,
  onScoreGenerated,
}: DynamicRuleFormProps) {
  const [template, setTemplate] = useState<ExportLine[string] | null>(
    {} as ExportLine[string]
  );
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") ?? "{}")
    : {};

  const userName = user ? user : "User";

  const preInitializer = useCallback(async () => {
    const response = await exportLine(product?.id as string);

    if (response) {
      const templateData = Object.values(response)[0] as ExportLine[string];
      setTemplate(templateData);
      setCurrentSection(Object.values(templateData.sections)[0].id);
    }
  }, [product]);

  // Mock function to fetch template data based on product
  useEffect(() => {
    if (product) {
      preInitializer();

      setIsLoading(false);
      // In a real app, this would be an API call
    }
  }, [preInitializer, product]);

  // Handle form value changes
  const handleChange = (ruleId: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [ruleId]: value,
    }));

    // Clear error for this field if it exists
    if (errors[ruleId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[ruleId];
        return newErrors;
      });
    }
  };

  // Validate form
  // const validateForm = () => {
  //   const newErrors: { [key: string]: string } = {};
  //   let isValid = true;

  //   if (!template) return false;

  //   Object.values(template.sections).forEach((section) => {
  //     section.ruleEntries.forEach((rule) => {
  //       if (
  //         rule.required &&
  //         (formValues[rule.id] === undefined || formValues[rule.id] === "")
  //       ) {
  //         newErrors[rule.id] = "This field is required";
  //         isValid = false;
  //       } else if (rule.type === "number" || rule.type === "range") {
  //         const value = Number(formValues[rule.id]);
  //         if (isNaN(value)) {
  //           newErrors[rule.id] = "Please enter a valid number";
  //           isValid = false;
  //         } else if (rule.min !== undefined && value < rule.min) {
  //           newErrors[rule.id] = `Value must be at least ${rule.min}`;
  //           isValid = false;
  //         } else if (rule.max !== undefined && value > rule.max) {
  //           newErrors[rule.id] = `Value must be at most ${rule.max}`;
  //           isValid = false;
  //         }
  //       }
  //     });
  //   });

  //   setErrors(newErrors);
  //   return isValid;
  // };

  // Generate report with scores
  const generateReport = (): Report => {
    if (!template || !product) {
      throw new Error("Template or product not found");
    }

    const sectionScores = Object.values(template.sections).map((section) => {
      const ruleScores: RuleScores[] = section.ruleEntries.map(
        (rule: RuleWithId) => {
          const value = formValues[rule.id];
          const score =
            rule.properties.find((opt) => opt.name === value)?.score || 0;

          const weight =
            rule.modelWeight !== undefined ? Number(rule.modelWeight) : 0;
          const sectionWeight =
            rule.sectionWeight !== undefined ? Number(rule.sectionWeight) : 0;
          const weightedScore: number = (Number(score) * weight) / 100;

          return {
            ruleId: rule.id,
            ruleName: rule.name,
            value,
            score,
            weight,
            weightedScore,
            sectionWeight,
          };
        }
      );

      const sectionScore = ruleScores.reduce(
        (sum: number, rule: RuleScores) =>
          sum + Number(rule.weightedScore) || 0,
        0
      );

      return {
        sectionId: section.id,
        sectionName: section.name,
        score: sectionScore,
        weight:
          section.overallWeight !== undefined
            ? Number(section.overallWeight)
            : 0,
        weightedScore: sectionScore,
        rules: ruleScores,
      };
    });

    const totalScore = sectionScores.reduce(
      (sum, section) => sum + section.weightedScore,
      0
    );

    const individualTemplate = Object.values(template)[0];

    return {
      id: `report-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      templateId: individualTemplate.id,
      templateName: individualTemplate.name,
      createdAt: new Date().toISOString(),
      createdBy: userName,
      status: "active",
      totalScore,
      sectionScores,
    };
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const report = generateReport();

      // Save report to local storage
      const existingReports = JSON.parse(
        localStorage.getItem("scorecard-reports") || "[]"
      );
      localStorage.setItem(
        "scorecard-reports",
        JSON.stringify([...existingReports, report])
      );

      // Call the callback if provided
      if (onScoreGenerated) {
        onScoreGenerated(report);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to next section
  const handleNextSection = () => {
    if (!template || !currentSection) return;

    const currentIndex = Object.values(template.sections).findIndex(
      (section) => section.id === currentSection
    );
    if (currentIndex < Object.values(template.sections).length - 1) {
      setCurrentSection(Object.values(template.sections)[currentIndex + 1].id);
    }
  };

  // Navigate to previous section
  const handlePrevSection = () => {
    if (!template || !currentSection) return;

    const currentIndex = Object.values(template.sections).findIndex(
      (section) => section.id === currentSection
    );
    if (currentIndex > 0) {
      setCurrentSection(Object.values(template.sections)[currentIndex - 1].id);
    }
  };

  // // Render a rule input based on its type
  // const renderRuleInput = (rule: Rule) => {
  //   const value = formValues[rule.id] !== undefined ? formValues[rule.id] : "";
  //   const error = errors[rule.id];

  //   switch (rule.type) {
  //     case "number":
  //       return (
  //         <div className="space-y-1">
  //           <input
  //             type="number"
  //             id={rule.id}
  //             value={value}
  //             onChange={(e) => handleChange(rule.id, e.target.value)}
  //             min={rule.min}
  //             max={rule.max}
  //             className={cn(
  //               "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
  //               error
  //                 ? "border-red-500 dark:border-red-400"
  //                 : "border-gray-300 dark:border-gray-700 dark:bg-gray-800"
  //             )}
  //           />
  //           {error && <p className="text-sm text-red-500">{error}</p>}
  //         </div>
  //       );

  //     case "select":
  //       return (
  //         <div className="space-y-1">
  //           <select
  //             id={rule.id}
  //             value={value}
  //             onChange={(e) => handleChange(rule.id, e.target.value)}
  //             className={cn(
  //               "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
  //               error
  //                 ? "border-red-500 dark:border-red-400"
  //                 : "border-gray-300 dark:border-gray-700 dark:bg-gray-800"
  //             )}
  //           >
  //             <option value="">Select an option</option>
  //             {rule.options?.map((option) => (
  //               <option
  //                 key={option.value.toString()}
  //                 value={option.value.toString()}
  //               >
  //                 {option.label}
  //               </option>
  //             ))}
  //           </select>
  //           {error && <p className="text-sm text-red-500">{error}</p>}
  //         </div>
  //       );

  //     case "boolean":
  //       return (
  //         <div className="space-y-1">
  //           <div className="flex items-center space-x-4">
  //             <label className="flex items-center space-x-2">
  //               <input
  //                 type="radio"
  //                 name={rule.id}
  //                 value="true"
  //                 checked={value === true}
  //                 onChange={() => handleChange(rule.id, true)}
  //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
  //               />
  //               <span>Yes</span>
  //             </label>
  //             <label className="flex items-center space-x-2">
  //               <input
  //                 type="radio"
  //                 name={rule.id}
  //                 value="false"
  //                 checked={value === false}
  //                 onChange={() => handleChange(rule.id, false)}
  //                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
  //               />
  //               <span>No</span>
  //             </label>
  //           </div>
  //           {error && <p className="text-sm text-red-500">{error}</p>}
  //         </div>
  //       );

  //     case "range":
  //       return (
  //         <div className="space-y-1">
  //           <div className="flex items-center space-x-4">
  //             <input
  //               type="range"
  //               id={rule.id}
  //               value={value}
  //               onChange={(e) => handleChange(rule.id, e.target.value)}
  //               min={rule.min}
  //               max={rule.max}
  //               step="1"
  //               className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
  //             />
  //             <span className="w-12 text-center">{value || 0}</span>
  //           </div>
  //           {error && <p className="text-sm text-red-500">{error}</p>}
  //         </div>
  //       );

  //     default:
  //       return <p>Unsupported rule type</p>;
  //   }
  // };

  // If no product is selected
  if (!product) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <DataNotFound
          title="No Product Selected"
          message="Please select a product to generate a score card."
          icon={
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          }
        />
      </div>
    );
  }

  // If loading
  if (isLoading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If template not found
  if (!template) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <DataNotFound
          title="Template Not Found"
          message="The template associated with this product could not be found."
          icon={
            <AlertTriangle className="w-12 h-12 text-yellow-400 dark:text-yellow-500" />
          }
        />
      </div>
    );
  }

  // Get current section
  const currentSectionData = Object.values(template.sections).find(
    (section) => section.id === currentSection
  );
  const currentSectionIndex = Object.values(template.sections).findIndex(
    (section) => section.id === currentSection
  );
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection =
    currentSectionIndex === Object.values(template.sections).length - 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Section navigation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {Object.values(template.sections).map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap transition-colors",
                section.id === currentSection
                  ? "bg-gradient-to-r from-blue-500 to-green-400 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <span className="mr-2">{index + 1}.</span>
              {section.name}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {currentSectionData && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                {currentSectionData.name}
              </h3>
              {currentSectionData.description && (
                <p className="text-gray-600 dark:text-gray-400">
                  {currentSectionData.description}
                </p>
              )}
            </div>

            <div className="space-y-6">
              {Object.values(
                currentSectionData.ruleEntries as RuleWithId[]
              ).map((rule: RuleWithId) => (
                <div
                  key={rule.id}
                  className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg"
                >
                  <label className="flex items-center font-semibold space-x-2 mb-1">
                    {rule.name}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id={rule.id}
                    value={formValues[rule.id] || ""}
                    onChange={(e) => handleChange(rule.id, e.target.value)}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                      errors[rule.id]
                        ? "border-red-500 dark:border-red-400"
                        : "border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                    )}
                  >
                    <option value="">Select an option</option>
                    {rule.properties?.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevSection}
                disabled={isFirstSection}
                className={cn(
                  "flex items-center",
                  isFirstSection && "opacity-50 cursor-not-allowed"
                )}
              >
                Previous
              </Button>

              {isLastSection ? (
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const report = generateReport();
                      alert(`Total Score: ${report.totalScore.toFixed(2)}`);
                    }}
                    className="flex items-center"
                  >
                    <Calculator size={18} className="mr-2" />
                    Calculate Score
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white flex items-center"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    ) : (
                      <Save size={18} className="mr-2" />
                    )}
                    Generate Report
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={handleNextSection}
                  className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white flex items-center"
                >
                  Next
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
