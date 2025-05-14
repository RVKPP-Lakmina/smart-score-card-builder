/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { useState, useEffect } from "react";
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

// Types for our form system
interface Rule {
  id: string;
  name: string;
  description?: string;
  type: "number" | "select" | "boolean" | "range";
  options?: { value: string | number; label: string; score: number }[];
  min?: number;
  max?: number;
  weight: number;
  required: boolean;
  section: string;
}

interface Section {
  id: string;
  name: string;
  description?: string;
  weight: number;
  rules: Rule[];
}

interface Template {
  id: string;
  name: string;
  description?: string;
  sections: Section[];
}

interface Product {
  id: string;
  name: string;
  description?: string;
  templateId: string;
}

interface FormValues {
  [key: string]: any;
}

interface DynamicRuleFormProps {
  product?: Product;
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
    rules: {
      ruleId: string;
      ruleName: string;
      value: any;
      score: number;
      weight: number;
      weightedScore: number;
    }[];
  }[];
}

export function DynamicRuleForm({
  product,
  onScoreGenerated,
}: DynamicRuleFormProps) {
  const [template, setTemplate] = useState<Template | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  // Mock function to fetch template data based on product
  useEffect(() => {
    if (product) {
      setIsLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock template data
        const mockTemplate: Template = {
          id: "template-1",
          name: "Credit Risk Assessment",
          description: "Template for assessing credit risk of borrowers",
          sections: [
            {
              id: "section-1",
              name: "Borrower Information",
              description: "Basic information about the borrower",
              weight: 0.3,
              rules: [
                {
                  id: "rule-1",
                  name: "Age",
                  description: "Age of the borrower",
                  type: "range",
                  min: 18,
                  max: 80,
                  weight: 0.2,
                  required: true,
                  section: "section-1",
                },
                {
                  id: "rule-2",
                  name: "Employment Status",
                  description: "Current employment status",
                  type: "select",
                  options: [
                    { value: "employed", label: "Employed", score: 100 },
                    {
                      value: "self-employed",
                      label: "Self-Employed",
                      score: 80,
                    },
                    { value: "unemployed", label: "Unemployed", score: 30 },
                    { value: "retired", label: "Retired", score: 60 },
                  ],
                  weight: 0.5,
                  required: true,
                  section: "section-1",
                },
                {
                  id: "rule-3",
                  name: "Years at Current Job",
                  description: "Number of years at current job",
                  type: "number",
                  min: 0,
                  max: 50,
                  weight: 0.3,
                  required: true,
                  section: "section-1",
                },
              ],
            },
            {
              id: "section-2",
              name: "Financial Information",
              description: "Financial details of the borrower",
              weight: 0.7,
              rules: [
                {
                  id: "rule-4",
                  name: "Annual Income",
                  description: "Annual income in USD",
                  type: "number",
                  min: 0,
                  weight: 0.4,
                  required: true,
                  section: "section-2",
                },
                {
                  id: "rule-5",
                  name: "Debt-to-Income Ratio",
                  description: "Current debt to income ratio",
                  type: "range",
                  min: 0,
                  max: 100,
                  weight: 0.4,
                  required: true,
                  section: "section-2",
                },
                {
                  id: "rule-6",
                  name: "Has Existing Loans",
                  description: "Does the borrower have existing loans?",
                  type: "boolean",
                  weight: 0.2,
                  required: true,
                  section: "section-2",
                },
              ],
            },
          ],
        };

        setTemplate(mockTemplate);
        // Set the first section as current
        if (mockTemplate.sections.length > 0) {
          setCurrentSection(mockTemplate.sections[0].id);
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [product]);

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
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!template) return false;

    template.sections.forEach((section) => {
      section.rules.forEach((rule) => {
        if (
          rule.required &&
          (formValues[rule.id] === undefined || formValues[rule.id] === "")
        ) {
          newErrors[rule.id] = "This field is required";
          isValid = false;
        } else if (rule.type === "number" || rule.type === "range") {
          const value = Number(formValues[rule.id]);
          if (isNaN(value)) {
            newErrors[rule.id] = "Please enter a valid number";
            isValid = false;
          } else if (rule.min !== undefined && value < rule.min) {
            newErrors[rule.id] = `Value must be at least ${rule.min}`;
            isValid = false;
          } else if (rule.max !== undefined && value > rule.max) {
            newErrors[rule.id] = `Value must be at most ${rule.max}`;
            isValid = false;
          }
        }
      });
    });

    setErrors(newErrors);
    return isValid;
  };

  // Calculate score for a rule based on its value
  const calculateRuleScore = (rule: Rule, value: any): number => {
    if (value === undefined || value === "") return 0;

    switch (rule.type) {
      case "select": {
        const option = rule.options?.find((opt) => opt.value === value);
        return option ? option.score : 0;
      }

      case "boolean":
        return value ? 100 : 0;

      case "number": {
        // If value is at min, score is 0, if at max or above, score is 100 // For number, we'll use a simple linear scale from min to max
        if (rule.min === undefined) return 0;
        const min = rule.min;
        const max = rule.max || min * 3; // If max is not defined, use 3x min as a default
        const range = max - min;
        if (range === 0) return value >= min ? 100 : 0;
        const normalizedValue = Math.min(Math.max(value - min, 0), range);
        return (normalizedValue / range) * 100;
      }

      case "range": {
        // For range, we'll use a bell curve where middle values score highest
        if (rule.min === undefined || rule.max === undefined) return 0;
        const midpoint = (rule.min + rule.max) / 2;
        const distance = Math.abs(value - midpoint);
        const maxDistance = (rule.max - rule.min) / 2;
        return Math.max(0, 100 - (distance / maxDistance) * 100);
      }

      default:
        return 0;
    }
  };

  // Generate report with scores
  const generateReport = (): Report => {
    if (!template || !product) {
      throw new Error("Template or product not found");
    }

    const sectionScores = template.sections.map((section) => {
      const ruleScores = section.rules.map((rule) => {
        const value = formValues[rule.id];
        const score = calculateRuleScore(rule, value);
        const weightedScore = score * rule.weight;
        return {
          ruleId: rule.id,
          ruleName: rule.name,
          value,
          score,
          weight: rule.weight,
          weightedScore,
        };
      });

      const sectionScore = ruleScores.reduce(
        (sum, rule) => sum + rule.weightedScore,
        0
      );
      const weightedSectionScore = sectionScore * section.weight;

      return {
        sectionId: section.id,
        sectionName: section.name,
        score: sectionScore,
        weight: section.weight,
        weightedScore: weightedSectionScore,
        rules: ruleScores,
      };
    });

    const totalScore = sectionScores.reduce(
      (sum, section) => sum + section.weightedScore,
      0
    );

    return {
      id: `report-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      templateId: template.id,
      templateName: template.name,
      createdAt: new Date().toISOString(),
      createdBy: "current-user", // In a real app, this would be the current user's ID
      status: "active",
      totalScore,
      sectionScores,
    };
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

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

    const currentIndex = template.sections.findIndex(
      (section) => section.id === currentSection
    );
    if (currentIndex < template.sections.length - 1) {
      setCurrentSection(template.sections[currentIndex + 1].id);
    }
  };

  // Navigate to previous section
  const handlePrevSection = () => {
    if (!template || !currentSection) return;

    const currentIndex = template.sections.findIndex(
      (section) => section.id === currentSection
    );
    if (currentIndex > 0) {
      setCurrentSection(template.sections[currentIndex - 1].id);
    }
  };

  // Render a rule input based on its type
  const renderRuleInput = (rule: Rule) => {
    const value = formValues[rule.id] !== undefined ? formValues[rule.id] : "";
    const error = errors[rule.id];

    switch (rule.type) {
      case "number":
        return (
          <div className="space-y-1">
            <input
              type="number"
              id={rule.id}
              value={value}
              onChange={(e) => handleChange(rule.id, e.target.value)}
              min={rule.min}
              max={rule.max}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                error
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              )}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div className="space-y-1">
            <select
              id={rule.id}
              value={value}
              onChange={(e) => handleChange(rule.id, e.target.value)}
              className={cn(
                "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                error
                  ? "border-red-500 dark:border-red-400"
                  : "border-gray-300 dark:border-gray-700 dark:bg-gray-800"
              )}
            >
              <option value="">Select an option</option>
              {rule.options?.map((option) => (
                <option
                  key={option.value.toString()}
                  value={option.value.toString()}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );

      case "boolean":
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={rule.id}
                  value="true"
                  checked={value === true}
                  onChange={() => handleChange(rule.id, true)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={rule.id}
                  value="false"
                  checked={value === false}
                  onChange={() => handleChange(rule.id, false)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span>No</span>
              </label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );

      case "range":
        return (
          <div className="space-y-1">
            <div className="flex items-center space-x-4">
              <input
                type="range"
                id={rule.id}
                value={value}
                onChange={(e) => handleChange(rule.id, e.target.value)}
                min={rule.min}
                max={rule.max}
                step="1"
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="w-12 text-center">{value || 0}</span>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        );

      default:
        return <p>Unsupported rule type</p>;
    }
  };

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
  const currentSectionData = template.sections.find(
    (section) => section.id === currentSection
  );
  const currentSectionIndex = template.sections.findIndex(
    (section) => section.id === currentSection
  );
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === template.sections.length - 1;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Section navigation */}
      <div className="p-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {template.sections.map((section, index) => (
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
              {currentSectionData.rules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg"
                >
                  <div className="mb-2">
                    <label
                      htmlFor={rule.id}
                      className="block font-medium text-gray-700 dark:text-gray-300"
                    >
                      {rule.name}{" "}
                      {rule.required && <span className="text-red-500">*</span>}
                    </label>
                    {rule.description && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {rule.description}
                      </p>
                    )}
                  </div>
                  {renderRuleInput(rule)}
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
                      if (validateForm()) {
                        const report = generateReport();
                        alert(`Total Score: ${report.totalScore.toFixed(2)}`);
                      }
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
