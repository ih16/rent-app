import React from 'react';
import PropTypes from 'prop-types';

function Input({ placeholder, icon, label, ...rest }) {
  return (
    <div className="flex flex-col">
      <span className="mt-2 mb-3 text-sm text-gray-500">{label}</span>
      <div className="relative">
        <input
          {...rest}
          className="p-3 pr-10 text-sm bg-white border-0 rounded outline-none shadow"
          placeholder={placeholder}
        />
        <div className="text-purple-lighter absolute right-0 top-0.5 mr-4 mt-3 text-gray-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default Input;

Input.propTypes = {
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};
