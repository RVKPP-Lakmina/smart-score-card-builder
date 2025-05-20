import { Plus } from "lucide-react";
import EditableText from "../ui/EditableText";
import React, { useEffect, useMemo } from "react";

interface RuleBoxWrapperProps {
  id: string;
  title: string;
  value: number;
  count?: number;
  onAdd?: () => void;
  className?: string;
  children?: React.ReactNode;
  saveButtonVisible?: boolean;
  sectionScore?: number;
  modalScore?: number;
  onSubmit?: ({
    sectionWeight,
    modalWeight,
  }: {
    sectionWeight: number;
    modalWeight: number;
  }) => void;
}

export function RuleBoxWrapper({
  title,
  onAdd,
  children,
  saveButtonVisible,
  sectionScore,
  modalScore,
  onSubmit,
}: RuleBoxWrapperProps) {
  const [sectionWeight, setSectionWeight] = React.useState<number>(0);
  const [sectionWeightPrev, setSectionWeightPrev] = React.useState<number>(0);

  const [modalWeight, setModalWeight] = React.useState<number>(0);
  const [modalWeightPrev, setModalWeightPrev] = React.useState<number>(0);

  const isChangeDetected = useMemo(() => {
    let isChanged = false;

    if (sectionWeight !== sectionWeightPrev) {
      isChanged = true;
    }

    if (modalWeight !== modalWeightPrev) {
      isChanged = true;
    }

    return isChanged;
  }, [sectionWeight, sectionWeightPrev, modalWeight, modalWeightPrev]);

  useEffect(() => {
    if (sectionScore && sectionScore !== sectionWeight) {
      setSectionWeight(sectionScore);
      setSectionWeightPrev(sectionScore);
    }

    if (modalScore && modalScore !== modalWeight) {
      setModalWeight(modalScore);
      setModalWeightPrev(modalScore);
    }
  }, [sectionScore, modalScore, sectionWeight, modalWeight]);

  const onValueChange = (value: string) => {
    const number = Number(value);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  };

  const onSectionWeightChange = (value: string) => {
    setSectionWeight(onValueChange(value));
  };

  const onModalWeightChange = (value: string) => {
    setModalWeight(onValueChange(value));
  };

  const handleSave = () => {
    if (onSubmit) {
      onSubmit({
        sectionWeight,
        modalWeight,
      });
    }

    if (sectionWeight !== sectionWeightPrev) {
      setSectionWeightPrev(sectionWeight);
    }

    if (modalWeight !== modalWeightPrev) {
      setModalWeightPrev(modalWeight);
    }
  };

  const handleCancel = () => {
    setSectionWeight(sectionWeightPrev);
    setModalWeight(modalWeightPrev);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-lg transition-shadow">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-green-400"></div>
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onAdd}
            className="transition-all delay-300 text-blue-500 dark:text-white hover:text-blue-600 rounded-full bg-green-400/20 p-2 hover:bg-green-600/20 duration-200 ease-in-out"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 py-[1px] flex justify-end items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            Section Weight:
            <EditableText
              label={sectionWeight?.toString() || "0.00"}
              onValueChange={onSectionWeightChange}
            />
          </span>
          <span className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            Modal Weight:
            <EditableText
              label={sectionWeight?.toString() || "0.00"}
              onValueChange={onModalWeightChange}
            />
          </span>
        </div>
      </div>

      <div className="border flex justify-between border-gray-200 dark:border-gray-700"></div>

      <div
        className="p-3"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 400px)",
          minHeight: "calc(100vh - 400px)",
        }}
      >
        {children}
      </div>

      {saveButtonVisible && isChangeDetected && (
        <div className="flex justify-end space-x-2 p-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
