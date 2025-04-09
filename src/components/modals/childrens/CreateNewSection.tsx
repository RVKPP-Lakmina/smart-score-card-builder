import { useEffect, useState } from "react";
import { Toggle } from "../../ui/ToggleButton";
import VariableSelection from "./VariableSelector";

const CreateNewSection = () => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <Toggle
            onClick={() => setIsChecked(!isChecked)}
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
            size="lg"
          />
          <h3
            className={`font-semibold text-gray-600 dark:text-gray-300 transition-opacity duration-300 ease-in-out ${
              isChecked ? "opacity-100" : "opacity-80"
            }`}
          >
            {isChecked
              ? "Add Section From Existing Sections"
              : "Create New Section"}
          </h3>
        </div>
      </div>

      <Boady isChecked={isChecked} />

      <div className="p-4 border-t dark:border-gray-700 rounded-b-xl bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all">
            Save Section
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewSection;

const Boady = ({ isChecked }: { isChecked: boolean }) => {
  if (isChecked) {
    return (
      <div className="p-4">
        <CreateSection />
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <SelectSection />
      </div>
    );
  }
};

const CreateSection = () => {
  return (
    <div className="space-y-4 px-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Section Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          placeholder="Enter template name"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
          rows={3}
          placeholder="Enter template description"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <input
            className="rounded-full"
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
          />
          <h4>Create For This Template</h4>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="vehicle1" name="vehicle1" />
          <h4>Create Global Section</h4>
        </div>
      </div>
    </div>
  );
};

const SelectSection = () => {
  return <VariableSelection variables={[]} />;
};
