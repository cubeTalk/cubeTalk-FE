const portalElement = document.getElementById('modal') as HTMLElement;

const Modal = ({ setIsOpen, src, data, title }: ModalProps) => {
  return (
    <>
      {createPortal(
        <>
          <BackDrop />
          <ModalImage
            setIsOpen={setIsOpen}
            src={src}
            data={data}
            title={title}
          />
        </>,
        portalElement,
      )}
    </>
  );
};