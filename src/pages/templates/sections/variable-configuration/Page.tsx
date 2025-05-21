/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TotalWeightIndicator } from "../../../../components/TotalWeightIndicator";
import { AttributeConfiguration } from "../../../../components/variable-definition/AttributeConfiguration";
import { VariableDefinitionForm } from "../../../../components/variable-definition/VariableDefinitionForm";

// Mock data for demonstration
const mockVariables = [
  {
    id: "1",
    name: "Age",
    description:
      "Typically a borrower's income earning capacity increases with age. However, health and the physical stamina of the borrower will deteriorate over time owing to advancements in age. As such, the borrower will not be able to optimize productivity.",
    sectionWeight: 15,
    modelWeight: 5,
  },
  {
    id: "2",
    name: "Level of Education",
    description:
      "The level of education is an important parameter to estimate the future earning potential of the borrower.",
    sectionWeight: 20,
    modelWeight: 7,
  },
  {
    id: "3",
    name: "Residence",
    description:
      "The borrower would have to incur additional expenses for rental/mortgage if the borrower lives in a rented house or own mortgaged house. This situation is an implication that the ability of making lease payments may be reduced due to the rental/mortgage payments. Furthermore, this factor gives an indication of the stability of the borrower.",
    sectionWeight: 15,
    modelWeight: 5,
  },
];

type Attribute = {
  id: string;
  name: string;
  type: "numericRange" | "masterData";
  description: string;
  ranges?: {
    id: string;
    min: string;
    max: string;
    label: string;
    score: number;
  }[];
  conditions?: { id: string; label: string; value: string; score: number }[];
};

type AttributesMap = {
  [key: string]: Attribute[];
};

const mockAttributes: AttributesMap = {
  "1": [
    {
      id: "attr1",
      name: "Age Range",
      type: "numericRange",
      description: "Age of the borrower in years",
      ranges: [
        { id: "range1", min: "<=25", max: "", label: "<=25", score: 20 },
        {
          id: "range2",
          min: ">25",
          max: "<=35",
          label: ">25 and <=35",
          score: 60,
        },
        {
          id: "range3",
          min: ">35",
          max: "<=45",
          label: ">35 and <=45",
          score: 100,
        },
        {
          id: "range4",
          min: ">45",
          max: "<=55",
          label: ">45 and <=55",
          score: 80,
        },
        {
          id: "range5",
          min: ">55",
          max: "<=60",
          label: ">55 and <=60",
          score: 40,
        },
        { id: "range6", min: ">60", max: "", label: ">60", score: 0 },
      ],
    },
  ],
  "2": [
    {
      id: "attr2",
      name: "Education Level",
      type: "masterData",
      description: "Highest level of education achieved by the borrower",
      conditions: [
        {
          id: "cond1",
          label:
            "Professional Qualification (MBBS, LLB/Attorney at Law, BSc Eng, ACA, CFA etc.)",
          value: "prof_qual",
          score: 100,
        },
        { id: "cond2", label: "Graduates", value: "graduate", score: 80 },
        {
          id: "cond3",
          label: "Vocational Training / Diploma Holders",
          value: "vocational",
          score: 60,
        },
        { id: "cond4", label: "Advanced Level", value: "advanced", score: 40 },
        {
          id: "cond5",
          label: "Up to Ordinary Level",
          value: "ordinary",
          score: 20,
        },
      ],
    },
  ],
  "3": [
    {
      id: "attr3",
      name: "Residence Type",
      type: "masterData",
      description: "Current residence status of the borrower",
      conditions: [
        {
          id: "cond6",
          label: "Own (Not Mortgaged)",
          value: "own_not_mortgaged",
          score: 100,
        },
        {
          id: "cond7",
          label: "Own (Mortgaged)",
          value: "own_mortgaged",
          score: 70,
        },
        {
          id: "cond8",
          label: "Parents / Spouse's House",
          value: "family",
          score: 40,
        },
        { id: "cond9", label: "Leased/Rented", value: "rented", score: 20 },
      ],
    },
  ],
};

export default function VariableConfigurationPage() {
  const [variables, setVariables] = useState(mockVariables);
  const [attributes, setAttributes] = useState(mockAttributes);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVariable, setSelectedVariable] = useState<
    (typeof mockVariables)[0] | null
  >(null);

  const handleSaveVariable = (
    variable: Omit<(typeof mockVariables)[0], "id">
  ) => {
    const newVariable = {
      ...variable,
      id: Date.now().toString(),
    };

    setVariables([...variables, newVariable]);
  };

  const handleProceedToStep2 = (variable: (typeof mockVariables)[0]) => {
    setSelectedVariable(variable);
    setCurrentStep(2);
  };

  const handleBackToStep1 = () => {
    setSelectedVariable(null);
    setCurrentStep(1);
  };

  const handleSaveAttributes = (
    variable: (typeof mockVariables)[0],
    newAttributes: any[]
  ) => {
    setAttributes({
      ...attributes,
      [variable.id]: newAttributes,
    });

    setCurrentStep(1);
    setSelectedVariable(null);
  };

  const totalSectionWeight = variables.reduce(
    (sum, variable) => sum + variable.sectionWeight,
    0
  );
  const totalModelWeight = variables.reduce(
    (sum, variable) => sum + variable.modelWeight,
    0
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Variable Configuration
      </h1>

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <TotalWeightIndicator
          total={totalSectionWeight}
          target={100}
          label="Total Section Weight"
          className="flex-1"
        />
        <TotalWeightIndicator
          total={totalModelWeight}
          target={100}
          label="Total Model Weight"
          className="flex-1"
        />
      </div>

      {currentStep === 1 && (
        <VariableDefinitionForm
          onSave={handleSaveVariable}
          existingVariables={variables}
          onProceedToStep2={handleProceedToStep2}
        />
      )}

      {currentStep === 2 && selectedVariable && (
        <AttributeConfiguration
          variable={selectedVariable}
          onSave={handleSaveAttributes}
          onBack={handleBackToStep1}
          existingAttributes={attributes[selectedVariable.id] || []}
        />
      )}
    </div>
  );
}
