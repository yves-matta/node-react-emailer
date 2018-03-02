import PropTypes from 'prop-types';
import React from 'react';

const SurveyField = props => {
  const { id, input, label, meta: { touched, error }, type } = props;

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input {...input} id={id} style={{ marginBottom: '5px' }} type={type} />
      {touched && (
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

SurveyField.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string
};

SurveyField.defaultProps = {
  type: 'text'
};

export default SurveyField;
