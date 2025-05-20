import { PlusCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { NoRecords } from "../ui/DataNotFound";
import { RuleBoxWrapper } from "./RuleWrapBox";
import { RuleWithId } from "../../types/rules";

const RuleCard = ({
  rule,
  id,
  title,
}: {
  rule: RuleWithId;
  id: string;
  title: string;
}) => {
  return (
    <RuleBoxWrapper
      id={`${id}-RuleCard-RuleBoxWrapper`}
      title={title}
      value={0}
      sectionScore={rule.sectionWeight}
      modalScore={rule.modelWeight}
    >
      <ul>
        {(rule.properties || []).length ? (
          <>{(rule.properties || []).map((item) => item.name)}</>
        ) : (
          <NoRecords
            variant="centered"
            action={
              <Button
                // onClick={addNewRule}
                className="bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 flex items-center gap-2"
              >
                <PlusCircle size={16} />
                Add Record
              </Button>
            }
          />
        )}
      </ul>
    </RuleBoxWrapper>
  );
};

export default RuleCard;
