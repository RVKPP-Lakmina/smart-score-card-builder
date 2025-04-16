import { Toggle } from "../../ui/ToggleButton";
import { SelectableList } from "../../ui/SeletableList";
import { SectionStoreContextType } from "../../../types/section";
import React from "react";
import { useModal } from "../../../hooks/useModal";

type Props = {
  useSectionStore: () => SectionStoreContextType;
  isChecked?: boolean;
  onSave: () => Promise<void>;
};

const CreateNewSection = (props: Props) => {
  const { useCreateNewSections } = props.useSectionStore();
  const { toggleNewSection } = useCreateNewSections();
  const isChecked = toggleNewSection.get();
  const { closeModal } = useModal();

  const nextProps = React.useMemo(
    () => ({
      ...props,
      isChecked,
    }),
    [props, isChecked]
  );

  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <Toggle
            onClick={() => toggleNewSection.set((prev) => !prev)}
            checked={toggleNewSection.get()}
            onCheckedChange={() => toggleNewSection.set((prev) => !prev)}
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

      <SectionManagement {...nextProps} />

      <div className="p-4 border-t dark:border-gray-700 rounded-b-xl bg-gray-50 dark:bg-gray-900">
        <div className="flex justify-end space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-all"
          >
            Cancel
          </button>
          <button
            onClick={props.onSave}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-md shadow-md transition-all"
          >
            Save Section
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateNewSection;

const SectionManagement = React.memo((props: Props) => {
  if (!props.isChecked) {
    return (
      <div className="p-4">
        <CreateSection {...props} />
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <SelectSection {...props} />
      </div>
    );
  }
});

const CreateSection = (props: Props) => {
  console.log("CreateSection", props);
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
          <h3>Create Template For The Section</h3>
        </div>
      </div>
    </div>
  );
};

const SelectSection = (props: Props) => {
  const { useCreateNewSections, rawSections: sections } =
    props.useSectionStore();
  const { selectedVariables, onCheckedChange } = useCreateNewSections();
  return (
    <SelectableList
      items={sections}
      selectedIds={selectedVariables.current}
      onChange={onCheckedChange}
      maxHeight="max-h-[250px]"
      className={"min-h-[250px]"}
    />
  );
};
