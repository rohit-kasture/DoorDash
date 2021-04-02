import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { postUser } from '../actions'
import history from './history';

class Register extends React.Component {

  componentDidMount() {
    console.log(this.props);
  }
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    alert("onsubmit")
    this.props.postUser(formValues);
    //console.log(formValues + " AND this.props= " + );
    //this.props.postUser(JSON.stringify(formValues));
    history.push('/login')
  }
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="userId" component={this.renderInput} label="UserId" />
        <Field name="email" component={this.renderInput} label="Email" type="email" />

        <Field
          name="password"
          component={this.renderInput}
          label="Password"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.userId) {
    errors.userId = 'Please enter userId';
  }
  if (!formValues.email) {
    errors.email = 'Please enter email Id';
  }

  if (!formValues.password) {
    errors.password = 'Password can not be empty';
  }
  return errors;
};
const decoratedComponent = connect(null,
  { postUser })(Register);

export default reduxForm({
  form: 'RegisterUser',
  validate
})(decoratedComponent);
