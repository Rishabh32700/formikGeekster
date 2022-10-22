import React from 'react'
import { useFormik } from 'formik';

import "./signin.css"

const validate = values => {
  const errors = {};
  console.error("errors before", errors);

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  } else if (values.name.length < 3) {
    errors.name = 'Must be 3 characters or more';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.phone) {
    errors.phone = 'Required';
  } else if (!/^[0-9]{10}$/.test(values.phone)) {
    errors.phone = 'invalid phone number';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  console.error("errors after", errors);
  return errors;
};

const Signin = () => {

  const formik = useFormik(
    {
      initialValues: { name: '', email: '', phone: '', password: '' },
      validate,
      onSubmit: values => {
        console.table(values)
        fetch("https://reqres.in/api/users", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json"
          }
        })
          .then((response) => {
            console.log("api worked");
            response.json()
          })
          .catch((err) => {
            console.error(err);
          })
      }
    }
  )

  return (
    <div className='signinContainer'>
      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="name">Enter Your Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <h4>{formik.errors.name}</h4> : null}
        </div>

        <div className="field">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <h4>{formik.errors.email}</h4> : null}
        </div>

        <div className="field">
          <label htmlFor="phone">Enter your Phone Number Address</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          {formik.errors.phone ? <h4>{formik.errors.phone}</h4> : null}
        </div>

        <div className="field">
          <label htmlFor="password">Enter your password Number Address</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <h4>{formik.errors.password}</h4> : null}
        </div>


        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default Signin