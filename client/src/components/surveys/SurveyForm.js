import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import surveyField from "./SurveyField";
import { Link } from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";

class SurveyForm extends Component {
  renderFields() {
    return formFields.map(({ label, name }) => (
      <Field
        key={name}
        component={surveyField}
        type="text"
        label={label}
        name={name}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            cancel
          </Link>

          <button type="submit" className="teal btn-flat right white-text">
            next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || "");

  for (let { name } of formFields) {
    if (!values[name]) errors[name] = "You must provide a value";
  }

  return errors;
}

export default reduxForm({
  form: "surveyForm",
  validate: validate,
  destroyOnUnmount: false,
})(SurveyForm);
