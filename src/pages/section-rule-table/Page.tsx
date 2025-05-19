import { SectionRulesPreview } from "../../components/modals/childrens/SectionRuleTable";

export default function SectionRuleTableExamplePage() {
  return (
    <div
      className="container mx-auto py-2 px-2"
      style={{ overflowY: "auto", maxHeight: "calc(100vh - 250px)" }}
    >
      <SectionRulesPreview />
    </div>
  );
}
