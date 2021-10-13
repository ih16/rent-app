import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col">
      <span className="mt-2 mb-3 text-sm text-gray-500">{label}</span>
      <input
        {...rest}
        type="date"
        className="p-3  text-sm bg-white border-0 rounded outline-none shadow"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;

Input.propTypes = {
  placeholder: PropTypes.string,
  label: PropTypes.string,
};
