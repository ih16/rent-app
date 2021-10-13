import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

function Modal({
  title = 'Modal Title',
  submitLabel = 'Submit',
  submitIcon,
  submitCallback,
  closeCallback,
  closeLabel = 'Close',
  closeIcon,
  content,
  form,
  setModalState,
}) {
  return (
    <div
      aria-hidden="true"
      className="bg-black backdrop-filter backdrop-blur-sm absolute z-10 bottom-0 left-0 top-0 flex items-end justify-center w-full h-screen bg-opacity-20 overflow-hidden md:items-center"
    >
      <div className="bg-white w-full max-w-2xl p-8 flex flex-col justify-between rounded bottomRevealEffect">
        <div className="mt-2 text-2xl font-semibold">{title}</div>
        <div className="flex w-full justify-start">{content}</div>
        <div className="flex w-full justify-end mt-10 mb-2">
          <Button
            className="mr-2"
            type={form ? 'submit' : 'button'}
            form={form}
            color="blue"
            icon={submitIcon}
            onClick={() => {
              if (submitCallback) submitCallback();
            }}
          >
            {submitLabel}
          </Button>
          <Button
            color="red"
            icon={closeIcon}
            onClick={() => {
              if (closeCallback) closeCallback();
              else setModalState(false);
            }}
          >
            {closeLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
Modal.propTypes = {
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  submitIcon: PropTypes.node,
  closeLabel: PropTypes.string,
  closeIcon: PropTypes.node,
  form: PropTypes.string,
  content: PropTypes.node,
  setModalState: PropTypes.func,
  submitCallback: PropTypes.func,
  closeCallback: PropTypes.func,
};

export default Modal;
