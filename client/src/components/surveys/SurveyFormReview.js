import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = props => {
  const { formValues, history, onBack, submitSurvey } = props;
  const reviewFields = formFields.map(({ id, label, name }) => (
    <div key={id}>
      <label>{label}</label>
      <div>{formValues[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button className="yellow darken-3 btn-flat" onClick={onBack}>
        Back
      </button>
      <button
        className="green btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

SurveyFormReview.propTypes = {
  formValues: PropTypes.object,
  history: PropTypes.object.isRequired,
  onBack: PropTypes.func,
  submitSurvey: PropTypes.func.isRequired
};

SurveyFormReview.defaultProps = {
  formValues: {},
  onBack: () => {}
};

const mapStateToProps = ({ form }) => ({
  formValues: form.surveyForm.values
});

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
