import { useCallback, useEffect, useState } from "react";
import { exportLine } from "../services/services";
import { ExportLine } from "../types/responseTypes";
import { Info } from "lucide-react";
import { useModal } from "../hooks/useModal";

const InfoComponents = ({ templateId }: { templateId: string }) => {
  const [dataLine, setDataLine] = useState<ExportLine | null>(null);
  const { openModal } = useModal();

  const preInitializer = useCallback(async () => {
    const theLine = (await exportLine(templateId)) as ExportLine;

    if (!theLine) {
      return;
    }

    setDataLine(theLine);
  }, [templateId]);

  useEffect(() => {
    preInitializer();
  }, [preInitializer]);

  const openInfoModal = useCallback(() => {
    if (!dataLine) {
      return;
    }

    openModal({
      childrenkey: "sectionRulesPreview",
      size: "6xl",
      closeOnOutsideClick: true,
      props: {
        data: dataLine,
      },
    });
  }, [dataLine, openModal]);

  return (
    <button
      onClick={openInfoModal}
      className="p-2 text-blue-500 hover:bg-blue-50 hover:scale-110 dark:hover:bg-gray-700 rounded-md"
    >
      <Info size={18} />
    </button>
  );
};

export default InfoComponents;
