'use client';

import ReactDOM from 'react-dom';
import CancelIcon from './ui/CancelIcon';

type Props = {
  isModalOpen: boolean;
  text: string;
  modalText?: string;
  onClick: () => void;
  setIsModalOpen: (value: boolean) => void;
  goToCart: () => void;
};

const Modal = ({
  text,
  modalText,
  isModalOpen,
  setIsModalOpen,
  onClick,
  goToCart,
}: Props) => {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-950 opacity-20"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center bg-white w-96 p-10 rounded-lg">
          <button
            className="absolute top-3 right-3"
            onClick={() => setIsModalOpen(false)}
            aria-label="Cancel Button"
          >
            <CancelIcon />
          </button>
          <p className="mt-4">{text}</p>
          <button
            className="px-4 py-2 mt-10 rounded bg-navypoint hover:bg-pinkpoint text-white"
            onClick={goToCart}
            aria-label="Modal Button"
          >
            {modalText}
          </button>
        </div>
      </div>
    </>,
    document.getElementById('global-modal') as HTMLElement,
  );
};

export default Modal;
