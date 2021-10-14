import React from 'react';
import PropTypes from 'prop-types';

function Button({
  children,
  className = 'border-gray-400 text-gray-400 hover:border-gray-500',
  icon,
  ...rest
}) {
  return (
    <button
      type="button"
      {...rest}
      className={`px-6 py-3 flex items-center justify-evenly bg-white border-b rounded text-sm shadow ${className}`}
    >
      {icon && <span className="-ml-1 mr-2 text-base">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
};
