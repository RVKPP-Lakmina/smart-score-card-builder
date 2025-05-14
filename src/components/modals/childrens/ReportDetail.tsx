import React from "react";
import { ReportDetail } from "../../ReportDetail";
import { useModal } from "../../../hooks/useModal";

interface ReportDetailModalProps {
  reportId: string;
}

const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  reportId,
}: ReportDetailModalProps) => {
  const { closeModal: onClose } = useModal();
  return <ReportDetail reportId={reportId} onClose={onClose} />;
};

export default ReportDetailModal;
