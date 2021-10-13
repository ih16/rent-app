import React from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

function ConfrimDialogue({ title, state, setState }) {
  const Contents = () => {
    return (
      <div className="mt-6">
        {state.content}
        <br />
        Do you want to proceed?
      </div>
    );
  };
  return (
    <Modal
      title={title}
      content={<Contents />}
      submitLabel="Yes"
      closeLabel="No"
      submitCallback={state.action}
      closeCallback={() => setState(current => ({ ...current, open: false }))}
      buttonJustify="end"
    />
  );
}

ConfrimDialogue.propTypes = {
  title: PropTypes.any,
  setState: PropTypes.func,
  state: PropTypes.object,
};

export default ConfrimDialogue;
