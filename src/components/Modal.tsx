'use client';

import ReactDOM from 'react-dom';
import CancelIcon from './ui/CancelIcon';

type Props = {
  isModalOpen: boolean;
  text: string;
  modalText?: string;
  onClick: () => void;
  setIsModalOpen: (value: boolean) => void;
};

export default function Modal({
  isModalOpen,
  text,
  onClick,
  setIsModalOpen,
  modalText,
}: Props) {
  if (!isModalOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className='fixed inset-0 bg-gray-950 opacity-20 z-5'></div>
      <div className='fixed inset-0 flex items-center justify-center z-5'>
        <div className='relative flex flex-col items-center bg-white w-96 p-10 rounded-lg'>
          <button
            className='absolute top-3 right-3'
            onClick={() => setIsModalOpen(false)}
          >
            <CancelIcon />
          </button>
          <p className='mt-4'>{text}</p>
          <button
            className='px-4 py-2 mt-10 rounded bg-navypoint hover:bg-pinkpoint text-white'
            onClick={onClick}
          >
            {modalText}
          </button>
        </div>
      </div>
    </>,
    document.getElementById('global-modal') as HTMLElement
  );
}
