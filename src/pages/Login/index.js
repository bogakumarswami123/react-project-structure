import React from "react";
import "./login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, FormGroup, Input } from "reactstrap";
import UserContext from "../../contexts/UserContext";

export default class Login extends React.PureComponent {
  // eslint-disable-next-line
  static contextType = UserContext;

  componentDidMount() {
    this.componentDidMountOrUpdate(this.props, this.context);
  }

  componentDidUpdate() {
    this.componentDidMountOrUpdate(this.props, this.context);
  }

  getForm() {
    const { onLogin } = this.context;

    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, actions) => {
          onLogin(
            {
              ...values,
            },
            actions,
          );
        }}
        render={({
          handleSubmit,
          errors,
          touched,
          isSubmitting,
          isValid,
          handleChange,
        }) => (
          <div className="row labels-container">
            <div className="row">
              <h1 className="sign-in-header">Sign In</h1>
            </div>
            <div className="col-md-12 col-xs-12 col-sm-12">
              <form className="align-center" onSubmit={handleSubmit}>
                <div>
                  <FormGroup>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      disabled={isSubmitting}
                      onChange={handleChange}
                    />
                    {errors.email && touched.email && errors.email}
                  </FormGroup>
                </div>

                <div>
                  <FormGroup>
                    <Input
                      name="password"
                      type="password"
                      placeholder="Password"
                      disabled={isSubmitting}
                      onChange={handleChange}
                    />
                    {errors.password && touched.password && errors.password}
                  </FormGroup>
                </div>

                <div className="btn-container">
                  <Button
                    className="submit-btn"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                  >
                    Sign In
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      />
    );
  }

  componentDidMountOrUpdate = (props, context) => {
    const { isLoggedIn } = context;
    if (isLoggedIn()) {
      props.history.push("/sign-up");
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-md-6 col-xs-12 col-sm-12 offset-md-4"
            style={{ maxWidth: "453px" }}
          >
            {this.getForm()}
          </div>
        </div>
      </div>
    );
  }
}
