import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';

import formFields from './formFields';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(field => (
      <Field {...field} key={field.id} component={SurveyField} />
    ));
  }

  render() {
    const { handleSubmit, onSurveySubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

SurveyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSurveySubmit: PropTypes.func
};

SurveyForm.defaultProps = {
  onSurveySubmit: () => {}
};

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  formFields.forEach(field => {
    const { label, name } = field;

    if (!values[name]) {
      errors[name] = `${label} cannot be blank`;
    }
  });

  return errors;
};

export default reduxForm({
  destroyOnUnmount: false,
  form: 'surveyForm',
  validate
})(SurveyForm);
