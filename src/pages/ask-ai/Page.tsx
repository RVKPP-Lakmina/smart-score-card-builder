import type React from "react";
import { useState } from "react";
import { Send, Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function NlpPromptingPage() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResponse(
        "I understand you want to create a new product with a credit risk assessment template. This feature is still under development, but we're working hard to bring it to you soon!"
      );
    }, 2000);
  };

  const examplePrompts = [
    "Create a personal loan product with credit risk assessment template",
    "Generate a mortgage loan template with property valuation rules",
    "Set up a business loan product with financial statement analysis",
    "Create a credit card application template with fraud detection",
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6 flex items-start">
        <AlertTriangle
          className="text-yellow-600 dark:text-yellow-500 mr-3 mt-0.5 flex-shrink-0"
          size={20}
        />
        <div>
          <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            Under Development
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            This feature is currently under development. You can try the
            interface, but actual product and template creation is not yet
            available.
          </p>
        </div>
      </div>

      <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit} className="mb-6">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">
              Enter your prompt
            </label>
            <div className="flex gap-2 mb-4">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 resize-none"
                placeholder="e.g., Create a personal loan product with credit risk assessment template"
                rows={3}
              ></textarea>
              <div className="flex items-center">
                <Button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white rounded-r-md"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Send size={20} />
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Example prompts</h3>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((examplePrompt, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(examplePrompt)}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-650 rounded-md text-sm text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {examplePrompt}
                </button>
              ))}
            </div>
          </div>

          {response && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-start">
                <Sparkles
                  className="text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                  size={20}
                />
                <div>
                  <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-1">
                    AI Response
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300">{response}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  1
                </span>
              </div>
              <h3 className="font-medium mb-2">Enter Your Prompt</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Describe the product or template you want to create using
                natural language.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  2
                </span>
              </div>
              <h3 className="font-medium mb-2">AI Processing</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI analyzes your prompt and generates the appropriate
                structure and rules.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  3
                </span>
              </div>
              <h3 className="font-medium mb-2">Review & Edit</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Review the generated product or template and make any necessary
                adjustments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
