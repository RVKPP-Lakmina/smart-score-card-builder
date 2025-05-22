/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
import { AttributeConfiguration } from "../../../../components/variable-definition/AttributeConfiguration";
import { VariableDefinitionForm } from "../../../../components/variable-definition/VariableDefinitionForm";
import {
  PropertiesMap,
  RuleEnhanced,
  RuleEnhancedWithId,
} from "../../../../types/rules";
import AttributeConfigurationMasterData from "../../../../components/variable-definition/AttributeConfigurationMasterData";

export default function VariableConfigurationPage() {
  const [variables, setVariables] = useState([] as RuleEnhancedWithId[]);
  const [attributes, setAttributes] = useState({} as PropertiesMap);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedVariable, setSelectedVariable] = useState<
    RuleEnhancedWithId | RuleEnhanced | null
  >(null);

  const handleSaveVariable = useCallback(
    (variable: RuleEnhanced | RuleEnhancedWithId) => {
      if ("id" in variable && variable.id) {
        const updatedVariables = variables.map((v) =>
          v.id === variable.id ? { ...v, ...variable } : v
        );
        setVariables(updatedVariables);
      } else {
        const newVariable = {
          ...variable,
          id: Date.now().toString(),
        };

        setVariables([...variables, newVariable]);
      }
    },
    [variables]
  );

  const handleProceedToStep2 = useCallback(
    (variable: RuleEnhancedWithId | RuleEnhanced) => {
      setSelectedVariable(variable);
      setCurrentStep(2);
    },
    []
  );

  const handleBackToStep1 = useCallback(() => {
    setSelectedVariable(null);
    setCurrentStep(1);
  }, []);

  const handleSaveAttributes = useCallback(
    (variable: RuleEnhancedWithId, newAttributes: any[]) => {
      setAttributes({
        ...attributes,
        [variable.id]: newAttributes,
      });

      setCurrentStep(1);
      setSelectedVariable(null);
    },
    [attributes]
  );

  return (
    <div className="container mx-auto py-2 px-4">
      {currentStep === 1 && (
        <VariableDefinitionForm
          onSave={handleSaveVariable}
          existingVariables={variables}
          onProceedToStep2={handleProceedToStep2}
        />
      )}

      {currentStep === 2 && selectedVariable && (
        <BuilderPage
          type={selectedVariable.type}
          selectedVariable={selectedVariable as RuleEnhancedWithId}
          onBack={handleBackToStep1}
        />
      )}
    </div>
  );
}

const BuilderPage = ({
  type,
  selectedVariable,
  onBack,
}: {
  type: RuleEnhancedWithId["type"];
  selectedVariable: RuleEnhancedWithId;
  onBack: () => void;
}) => {
  if (type === "numericRange") {
    return (
      <AttributeConfiguration
        variable={selectedVariable}
        // onSave={handleSaveAttributes}
        // onBack={handleBackToStep1}
      />
    );
  }
  if (type === "masterData") {
    return (
      <AttributeConfigurationMasterData
        variable={selectedVariable}
        // onSave={handleSaveAttributes}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Single Value Configuration</h2>
      <p className="text-gray-600">
        This is a placeholder for single value configuration.
      </p>
    </div>
  );
};
