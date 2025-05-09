import { Trash2 } from "lucide-react";
import { updateRulesScore } from "../services/services";
import EditableText from "./ui/EditableText";
import { useModal } from "../hooks/useModal";
import { Properties, RuleWithId } from "../types/rules";
import { useCallback, useEffect, useState } from "react";

const RuleItem = ({
  item,
  onDelete,
}: {
  item: RuleWithId;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { openModal } = useModal();
  const [scores, setScores] = useState({
    sectionWeight: item.sectionWeight,
    modelWeight: item.modelWeight,
  });

  useEffect(() => {
    setScores({
      sectionWeight: item.sectionWeight,
      modelWeight: item.modelWeight,
    });
  }, [item.sectionWeight, item.modelWeight]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        updateRulesScore({
          ruleId: item.id,
          sectionWeight: Number(scores.sectionWeight),
          modelWeight: Number(scores.modelWeight),
        });
      }
    },
    [item.id, scores.modelWeight, scores.sectionWeight]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const addEditNewProperties = (
    lable: string,
    exisitingProperties: Properties[]
  ) => {
    openModal({
      title: lable,
      childrenkey: "ruleEditor",
      size: "lg",
      closeOnOutsideClick: true,
      props: {
        initialItems: exisitingProperties,
      },
      headerProps: {
        items: [],
        addItem: (index: number) => {
          console.log("Add item at index:", index);
        },
      },
    });
  };

  return (
    <li
      key={item.id}
      className="p-2 cursor-pointer 
    m-2 border rounded-lg border-gray-200  hover:bg-gray-200 
    dark:hover:bg-gray-700 transition duration-200 delay-100 ease-in-out"
    >
      <div
        onClick={() => addEditNewProperties(item.name, item.properties)}
        className="  flex items-center justify-between"
      >
        <h5 className=" flex-2 font-semibold">{item.name}</h5>

        <div className="flex space-x-2 items-center">
          <button
            type="button"
            onClick={() => {
              onDelete(item.id);
            }}
            className="text-gray-400 hover:text-red-500 cursor-pointer transition-all duration-300 ease-in-out p-0 bg-transparent border-none focus:outline-none"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-2">
        <div className="flex items-center gap-2">
          <label className="text-gray-600 text-sm">Section Weight</label>
          <EditableText
            label={scores.sectionWeight?.toString() || "0.00"}
            onValueChange={(value) => {
              setScores((prev) => ({
                ...prev,
                sectionWeight: Number(value),
              }));
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-600 text-sm">Model Weight</label>
          <EditableText
            label={scores?.modelWeight?.toString() || "0.00"}
            onValueChange={(value) => {
              setScores((prev) => ({
                ...prev,
                modelWeight: Number(value),
              }));
            }}
          />
        </div>
      </div>
    </li>
  );
};

export default RuleItem;
// RuleItem component is used to display a single rule item in the list.
