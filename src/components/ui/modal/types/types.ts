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
  footer?: React.ReactNode;
  size?: Size;
  closeOnOutsideClick?: boolean;
};
export type Size = "sm" | "md" | "lg" | "xl";
