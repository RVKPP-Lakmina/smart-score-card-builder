// import { useState, useEffect } from "react";
// import { Search, AlertCircle, Info, Plus, Trash2 } from "lucide-react";
// import { Properties } from "../../../../types/rules";

// type VariableDefinitionFormProps = {
//   onSave: (variable: Omit<Properties, "id">) => void;
//   existingVariables: Properties[];
//   onProceedToStep2?: (variable: Properties) => void;
//   initialVariable?: Properties;
// };

// export function VariableDefinitionForm({
//   onSave,
//   existingVariables,
//   onProceedToStep2,
//   initialVariable,
// }: VariableDefinitionFormProps) {
//   const [name, setName] = useState(initialVariable?.name || "");
//   const [description, setDescription] = useState(
//     initialVariable?.description || ""
//   );
//   const [type, setType] = useState<Properties["type"]>(
//     initialVariable?.type || "singleValue"
//   );
//   const [sectionWeight, setSectionWeight] = useState<number>(
//     initialVariable?.sectionWeight || 0
//   );
//   const [modelWeight, setModelWeight] = useState<number>(
//     initialVariable?.modelWeight || 0
//   );
//   const [dataSourcePath, setDataSourcePath] = useState(
//     initialVariable?.dataSourcePath || ""
//   );
//   const [conditions, setConditions] = useState(
//     initialVariable?.conditions || []
//   );
//   const [ranges, setRanges] = useState(initialVariable?.ranges || []);
//   const [validation, setValidation] = useState(
//     initialVariable?.validation || {}
//   );

//   const [searchResults, setSearchResults] = useState<Properties[]>([]);
//   const [showAutoFillPrompt, setShowAutoFillPrompt] = useState(false);
//   const [matchedVariable, setMatchedVariable] = useState<Properties | null>(
//     null
//   );
//   const [nameError, setNameError] = useState("");
//   const [isFormValid, setIsFormValid] = useState(false);
//   const [activeTab, setActiveTab] = useState<
//     "basic" | "conditions" | "ranges" | "validation"
//   >("basic");

//   // Search for existing variables as user types
//   useEffect(() => {
//     if (name.trim().length > 2) {
//       const results = existingVariables.filter((variable) =>
//         variable.name.toLowerCase().includes(name.toLowerCase())
//       );
//       setSearchResults(results);

//       // If exact match found
//       const exactMatch = results.find(
//         (variable) => variable.name.toLowerCase() === name.toLowerCase()
//       );
//       if (exactMatch && !initialVariable) {
//         setMatchedVariable(exactMatch);
//         setShowAutoFillPrompt(true);
//       } else {
//         setShowAutoFillPrompt(false);
//         setMatchedVariable(null);
//       }
//     } else {
//       setSearchResults([]);
//       setShowAutoFillPrompt(false);
//       setMatchedVariable(null);
//     }
//   }, [name, existingVariables, initialVariable]);

//   // Validate form
//   useEffect(() => {
//     const isDuplicateName = initialVariable
//       ? existingVariables.some(
//           (v) =>
//             v.name.toLowerCase() === name.toLowerCase() &&
//             v.id !== initialVariable.id
//         )
//       : existingVariables.some(
//           (v) => v.name.toLowerCase() === name.toLowerCase()
//         );

//     if (isDuplicateName) {
//       setNameError("This variable name already exists");
//     } else if (name.trim() === "") {
//       setNameError("Variable name is required");
//     } else {
//       setNameError("");
//     }

//     const isBasicValid =
//       name.trim() !== "" &&
//       description.trim() !== "" &&
//       sectionWeight > 0 &&
//       modelWeight > 0 &&
//       !isDuplicateName;

//     let isTypeValid = true;

//     if (type === "masterData" && conditions.length === 0) {
//       isTypeValid = false;
//     } else if (type === "numericRange" && ranges.length === 0) {
//       isTypeValid = false;
//     }

//     setIsFormValid(isBasicValid && isTypeValid);
//   }, [
//     name,
//     description,
//     sectionWeight,
//     modelWeight,
//     existingVariables,
//     initialVariable,
//     type,
//     conditions,
//     ranges,
//   ]);

//   const handleAutoFill = () => {
//     if (matchedVariable) {
//       setName(matchedVariable.name);
//       setDescription(matchedVariable.description);
//       setType(matchedVariable.type);
//       setSectionWeight(matchedVariable.sectionWeight);
//       setModelWeight(matchedVariable.modelWeight);
//       setDataSourcePath(matchedVariable.dataSourcePath || "");
//       setConditions(matchedVariable.conditions || []);
//       setRanges(matchedVariable.ranges || []);
//       setValidation(matchedVariable.validation || {});
//       setShowAutoFillPrompt(false);
//     }
//   };

//   const handleEditAnyway = () => {
//     setShowAutoFillPrompt(false);
//   };

//   const handleSave = () => {
//     if (isFormValid) {
//       onSave({
//         name,
//         description,
//         type,
//         sectionWeight,
//         modelWeight,
//         dataSourcePath: dataSourcePath || undefined,
//         conditions: conditions.length > 0 ? conditions : undefined,
//         ranges: ranges.length > 0 ? ranges : undefined,
//         validation: Object.keys(validation).length > 0 ? validation : undefined,
//       });

//       if (!initialVariable) {
//         // Reset form if creating new
//         setName("");
//         setDescription("");
//         setType("singleValue");
//         setSectionWeight(0);
//         setModelWeight(0);
//         setDataSourcePath("");
//         setConditions([]);
//         setRanges([]);
//         setValidation({});
//       }
//     }
//   };

//   const handleProceedToStep2 = () => {
//     if (matchedVariable && onProceedToStep2) {
//       onProceedToStep2(matchedVariable);
//     } else if (isFormValid && onProceedToStep2) {
//       const newVariable: Properties = {
//         id: initialVariable?.id || Date.now().toString(),
//         name,
//         description,
//         type,
//         sectionWeight,
//         modelWeight,
//         dataSourcePath: dataSourcePath || undefined,
//         conditions: conditions.length > 0 ? conditions : undefined,
//         ranges: ranges.length > 0 ? ranges : undefined,
//         validation: Object.keys(validation).length > 0 ? validation : undefined,
//       };

//       onSave(newVariable);
//       onProceedToStep2(newVariable);
//     }
//   };

//   const addCondition = () => {
//     setConditions([
//       ...conditions,
//       {
//         id: Date.now().toString(),
//         label: "",
//         value: "",
//         score: 0,
//       },
//     ]);
//   };

//   const updateCondition = (
//     id: string,
//     field: string,
//     value: string | number
//   ) => {
//     setConditions(
//       conditions.map((condition) =>
//         condition.id === id ? { ...condition, [field]: value } : condition
//       )
//     );
//   };

//   const removeCondition = (id: string) => {
//     setConditions(conditions.filter((condition) => condition.id !== id));
//   };

//   const addRange = () => {
//     setRanges([
//       ...ranges,
//       {
//         id: Date.now().toString(),
//         min: "",
//         max: "",
//         label: "",
//         score: 0,
//       },
//     ]);
//   };

//   const updateRange = (id: string, field: string, value: string | number) => {
//     setRanges(
//       ranges.map((range) =>
//         range.id === id ? { ...range, [field]: value } : range
//       )
//     );
//   };

//   const removeRange = (id: string) => {
//     setRanges(ranges.filter((range) => range.id !== id));
//   };

//   const updateValidation = (field: string, value: string | number) => {
//     setValidation({
//       ...validation,
//       [field]: value,
//     });
//   };

//   return (
//     <div className="space-y-6">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//         <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
//           {initialVariable ? "Edit Variable" : "Step 1: Variable Definition"}
//         </h2>

//         {/* Tabs */}
//         <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
//           <button
//             className={cn(
//               "py-2 px-4 text-sm font-medium",
//               activeTab === "basic"
//                 ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
//                 : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             )}
//             onClick={() => setActiveTab("basic")}
//           >
//             Basic Info
//           </button>
//           <button
//             className={cn(
//               "py-2 px-4 text-sm font-medium",
//               activeTab === "conditions"
//                 ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
//                 : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             )}
//             onClick={() => setActiveTab("conditions")}
//           >
//             Conditions
//           </button>
//           <button
//             className={cn(
//               "py-2 px-4 text-sm font-medium",
//               activeTab === "ranges"
//                 ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
//                 : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             )}
//             onClick={() => setActiveTab("ranges")}
//           >
//             Ranges
//           </button>
//           <button
//             className={cn(
//               "py-2 px-4 text-sm font-medium",
//               activeTab === "validation"
//                 ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
//                 : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
//             )}
//             onClick={() => setActiveTab("validation")}
//           >
//             Validation
//           </button>
//         </div>

//         {activeTab === "basic" && (
//           <>
//             {/* Search and auto-fill prompt */}
//             <div className="relative mb-6">
//               <div className="relative">
//                 <Search
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//                   size={18}
//                 />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Variable Name"
//                   className={cn(
//                     "w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent",
//                     nameError
//                       ? "border-red-500"
//                       : "border-gray-300 dark:border-gray-600"
//                   )}
//                 />
//               </div>

//               {nameError && (
//                 <p className="mt-1 text-sm text-red-500 flex items-center">
//                   <AlertCircle size={14} className="mr-1" />
//                   {nameError}
//                 </p>
//               )}

//               {/* Search results dropdown */}
//               {searchResults.length > 0 &&
//                 !showAutoFillPrompt &&
//                 !initialVariable && (
//                   <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
//                     {searchResults.map((variable) => (
//                       <div
//                         key={variable.id}
//                         className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
//                         onClick={() => {
//                           setMatchedVariable(variable);
//                           setShowAutoFillPrompt(true);
//                         }}
//                       >
//                         <div className="font-medium">{variable.name}</div>
//                         <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                           {variable.description}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               {/* Auto-fill prompt */}
//               {showAutoFillPrompt && matchedVariable && !initialVariable && (
//                 <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
//                   <div className="flex items-start">
//                     <Info
//                       className="text-blue-500 mr-2 mt-0.5 flex-shrink-0"
//                       size={18}
//                     />
//                     <div>
//                       <p className="text-sm text-blue-800 dark:text-blue-200">
//                         This variable already exists. Do you want to auto-fill
//                         with previous data?
//                       </p>
//                       <div className="mt-2 flex space-x-2">
//                         <button
//                           onClick={handleAutoFill}
//                           className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded-md"
//                         >
//                           Auto-fill
//                         </button>
//                         <button
//                           onClick={handleEditAnyway}
//                           className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md"
//                         >
//                           Edit Anyway
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Description */}
//             <div className="mb-4">
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//               >
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter a detailed description of this variable..."
//               />
//             </div>

//             {/* Variable Type */}
//             <div className="mb-4">
//               <label
//                 htmlFor="type"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//               >
//                 Variable Type
//               </label>
//               <select
//                 id="type"
//                 value={type}
//                 onChange={(e) => setType(e.target.value as Properties["type"])}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 <option value="singleValue">Single Value</option>
//                 <option value="masterData">Master Data (Conditions)</option>
//                 <option value="numericRange">Numeric Range</option>
//               </select>
//             </div>

//             {/* Data Source Path (for masterData) */}
//             {type === "masterData" && (
//               <div className="mb-4">
//                 <label
//                   htmlFor="dataSourcePath"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Data Source Path (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   id="dataSourcePath"
//                   value={dataSourcePath}
//                   onChange={(e) => setDataSourcePath(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="API endpoint or data source path"
//                 />
//               </div>
//             )}

//             {/* Weights */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label
//                   htmlFor="sectionWeight"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Section Weight (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="sectionWeight"
//                   value={sectionWeight}
//                   onChange={(e) => setSectionWeight(Number(e.target.value))}
//                   min="0"
//                   max="100"
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="modelWeight"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
//                 >
//                   Model Weight (%)
//                 </label>
//                 <input
//                   type="number"
//                   id="modelWeight"
//                   value={modelWeight}
//                   onChange={(e) => setModelWeight(Number(e.target.value))}
//                   min="0"
//                   max="100"
//                   className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Weight Indicator */}
//             <div className="mb-6">
//               <TotalWeightIndicator
//                 sectionWeight={sectionWeight}
//                 modelWeight={modelWeight}
//                 maxSectionWeight={100}
//                 maxModelWeight={100}
//               />
//             </div>
//           </>
//         )}

//         {activeTab === "conditions" && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-medium">Conditions</h3>
//               <button
//                 onClick={addCondition}
//                 className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//               >
//                 <Plus size={16} className="mr-1" />
//                 Add Condition
//               </button>
//             </div>

//             {conditions.length === 0 ? (
//               <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-md text-center">
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No conditions defined yet.
//                 </p>
//                 <button
//                   onClick={addCondition}
//                   className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
//                 >
//                   Add Your First Condition
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {conditions.map((condition) => (
//                   <div
//                     key={condition.id}
//                     className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
//                   >
//                     <div className="flex justify-between mb-2">
//                       <h4 className="font-medium">Condition</h4>
//                       <button
//                         onClick={() => removeCondition(condition.id)}
//                         className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Label
//                         </label>
//                         <input
//                           type="text"
//                           value={condition.label}
//                           onChange={(e) =>
//                             updateCondition(
//                               condition.id,
//                               "label",
//                               e.target.value
//                             )
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Display label"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Value
//                         </label>
//                         <input
//                           type="text"
//                           value={condition.value}
//                           onChange={(e) =>
//                             updateCondition(
//                               condition.id,
//                               "value",
//                               e.target.value
//                             )
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Actual value"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Score
//                         </label>
//                         <input
//                           type="number"
//                           value={condition.score}
//                           onChange={(e) =>
//                             updateCondition(
//                               condition.id,
//                               "score",
//                               Number(e.target.value)
//                             )
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Score value"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "ranges" && (
//           <div className="space-y-4">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-medium">Numeric Ranges</h3>
//               <button
//                 onClick={addRange}
//                 className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
//               >
//                 <Plus size={16} className="mr-1" />
//                 Add Range
//               </button>
//             </div>

//             {ranges.length === 0 ? (
//               <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-md text-center">
//                 <p className="text-gray-500 dark:text-gray-400">
//                   No ranges defined yet.
//                 </p>
//                 <button
//                   onClick={addRange}
//                   className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
//                 >
//                   Add Your First Range
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {ranges.map((range) => (
//                   <div
//                     key={range.id}
//                     className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
//                   >
//                     <div className="flex justify-between mb-2">
//                       <h4 className="font-medium">Range</h4>
//                       <button
//                         onClick={() => removeRange(range.id)}
//                         className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Min Value
//                         </label>
//                         <input
//                           type="text"
//                           value={range.min}
//                           onChange={(e) =>
//                             updateRange(range.id, "min", e.target.value)
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Minimum value"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Max Value
//                         </label>
//                         <input
//                           type="text"
//                           value={range.max}
//                           onChange={(e) =>
//                             updateRange(range.id, "max", e.target.value)
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Maximum value"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Label
//                         </label>
//                         <input
//                           type="text"
//                           value={range.label}
//                           onChange={(e) =>
//                             updateRange(range.id, "label", e.target.value)
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Display label"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                           Score
//                         </label>
//                         <input
//                           type="number"
//                           value={range.score}
//                           onChange={(e) =>
//                             updateRange(
//                               range.id,
//                               "score",
//                               Number(e.target.value)
//                             )
//                           }
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                           placeholder="Score value"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "validation" && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium">Validation Rules</h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Regex Pattern (Optional)
//                 </label>
//                 <input
//                   type="text"
//                   value={validation.regex || ""}
//                   onChange={(e) => updateValidation("regex", e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                   placeholder="Regular expression pattern"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Minimum Value (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   value={validation.min || ""}
//                   onChange={(e) =>
//                     updateValidation("min", Number(e.target.value))
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                   placeholder="Minimum allowed value"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Maximum Value (Optional)
//                 </label>
//                 <input
//                   type="number"
//                   value={validation.max || ""}
//                   onChange={(e) =>
//                     updateValidation("max", Number(e.target.value))
//                   }
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
//                   placeholder="Maximum allowed value"
//                 />
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Action buttons */}
//         <div className="flex justify-end space-x-3 mt-6">
//           <button
//             onClick={handleSave}
//             disabled={!isFormValid}
//             className={cn(
//               "px-4 py-2 rounded-md",
//               isFormValid
//                 ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
//                 : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//             )}
//           >
//             {initialVariable ? "Update Variable" : "Save Variable"}
//           </button>
//           {onProceedToStep2 && (
//             <button
//               onClick={handleProceedToStep2}
//               disabled={!isFormValid && !matchedVariable}
//               className={cn(
//                 "px-4 py-2 rounded-md",
//                 isFormValid || matchedVariable
//                   ? "bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 text-white"
//                   : "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
//               )}
//             >
//               Proceed to Step 2
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Existing Variables Table */}
//       {!initialVariable && (
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
//           <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
//             Existing Variables
//           </h3>

//           {existingVariables.length === 0 ? (
//             <div className="text-center py-8 text-gray-500 dark:text-gray-400">
//               <p>No variables defined yet. Create your first variable above.</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 dark:bg-gray-700">
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                       Variable Name
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                       Type
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                       Section Weight
//                     </th>
//                     <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                       Model Weight
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                   {existingVariables.map((variable) => (
//                     <tr
//                       key={variable.id}
//                       className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
//                       onClick={() => {
//                         setMatchedVariable(variable);
//                         setShowAutoFillPrompt(true);
//                       }}
//                     >
//                       <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                         {variable.name}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                         {variable.type}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
//                         {variable.description.length > 100
//                           ? `${variable.description.substring(0, 100)}...`
//                           : variable.description}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                         {variable.sectionWeight}%
//                       </td>
//                       <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
//                         {variable.modelWeight}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
