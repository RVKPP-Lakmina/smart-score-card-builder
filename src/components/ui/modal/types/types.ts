export interface ModalContextType {
  openModal: (props: OpenModalProps) => void;
  closeModal: () => void;
  // propsRef: React.RefObject<OpenModalProps | null>;
}

export interface PropsRef extends OpenModalProps {
  Child: React.LazyExoticComponent<React.FC<unknown>> | React.ReactNode;
}

export type OpenModalProps = {
  title?: string;
  childrenkey: string;
  footerProps?: unknown;
  headerProps?: unknown;
  props?: unknown;
  size?: Size;
  closeOnOutsideClick?: boolean;
};
export type Size = "sm" | "md" | "lg" | "xl";

export type ModalFooterKey = "sampleDelete" | "anotherAction"; // Add your keys here

export interface ModalFooterProps {
  onClose: () => void;
  onConfirm?: () => void;
  // Add more props that all footers share
}
