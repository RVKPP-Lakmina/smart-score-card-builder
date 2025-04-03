import { Suspense, useRef, useState } from "react";
import ModalContext from "../context/context";
import { OpenModalProps, PropsRef } from "../types/types";
import modalMap from "../modalMap";
import { Modal } from "../Modal";
import React from "react";
import modalFooterMap from "../modalFotter";

interface ProviderProps {
  children: React.ReactNode;
}

const ContextProvider = ModalContext.Provider;

const Provider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const propsRef = useRef<PropsRef | null>(null);

  const closeModal = () => {
    if (!propsRef.current) return;

    propsRef.current = null;

    setIsOpen(false);
  };

  const openModal: (props: OpenModalProps) => void = ({
    title = "",
    childrenkey,
    footerProps = {},
    props = {},
    size = "md",
    closeOnOutsideClick = true,
  }: OpenModalProps) => {
    propsRef.current = {
      title,
      childrenkey,
      Child: modalMap.has(childrenkey) ? modalMap.get(childrenkey) : <></>,
      props,
      footerProps,
      size,
      closeOnOutsideClick,
    };

    setIsOpen(true);
  };

  return (
    <ContextProvider
      value={{
        openModal,
        closeModal,
      }}
    >
      {children}

      {Boolean(propsRef.current) && (
        <Suspense fallback={<div>Loading...</div>}>
          <Modal
            isOpen={isOpen}
            footer={
              <>
                {propsRef.current?.childrenkey &&
                modalFooterMap.has(propsRef.current.childrenkey) ? (
                  React.createElement(
                    modalFooterMap.get(propsRef.current.childrenkey) ||
                      (() => <></>),
                    propsRef.current.footerProps as Record<string, unknown>
                  )
                ) : (
                  <></>
                )}
              </>
            }
            title={propsRef.current?.title}
            size={propsRef.current?.size}
            onClose={closeModal}
            closeOnOutsideClick={propsRef.current?.closeOnOutsideClick || true}
            children={
              <>
                {propsRef.current?.childrenkey &&
                modalMap.has(propsRef.current.childrenkey) ? (
                  React.createElement(
                    modalMap.get(propsRef.current.childrenkey) || (() => <></>),
                    propsRef.current.footerProps as Record<string, unknown>
                  )
                ) : (
                  <></>
                )}
              </>
            }
          />
        </Suspense>
      )}
    </ContextProvider>
  );
};

const DialogModalProvider: React.FC<ProviderProps> = React.memo(
  Provider,
  (prevProps, nextProps) => {
    return prevProps.children === nextProps.children;
  }
);

export default DialogModalProvider;
