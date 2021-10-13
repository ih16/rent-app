import React from 'react';
import PropTypes from 'prop-types';
import { FiChevronDown } from 'react-icons/fi';

function Select({ options, label, placeholder, ...rest }) {
  return (
    <div className="flex flex-col">
      <span className="mt-2 mb-3 text-sm text-gray-500">{label}</span>
      <div className="relative">
        <select
          {...rest}
          className="p-3 pr-10 text-sm bg-white border-0 rounded outline-none shadow appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(data => (
            <option key={data.code} value={data.code}>
              {data.name}
            </option>
          ))}
        </select>
        <div className=" absolute right-0 top-0.5 mr-4 mt-3 text-gray-600">
          <FiChevronDown />
        </div>
      </div>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Select;
