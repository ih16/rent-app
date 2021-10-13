import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, className, color = 'gray', icon, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className={`px-6 py-3 flex items-center justify-evenly bg-white border-b border-${color}-400 hover:border-${color}-500 rounded text-sm shadow ${className} text-${color}-800`}
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
