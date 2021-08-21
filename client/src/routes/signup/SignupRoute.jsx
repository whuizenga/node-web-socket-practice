import * as React from 'react'
// import PropTypes from 'prop-types'

function SignupRoute(_props) {
  const [values, setValues] = React.useState({})

  const handleChange = React.useCallback(
    (event) => {
      const { name, value } = event.target

      setValues({
        ...values,
        [name]: value,
      })
    },
    [values]
  )

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault()
    },
    []
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username
            <input
              name="username"
              type="text"
              onChange={handleChange}
              value={values.username}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={values.password}
            />
          </label>
        </div>
        <div>
          <label>
            Confirm Password
            <input
              name="passwordConfirm"
              type="password"
              onChange={handleChange}
              value={values.passwordConfirm}
            />
          </label>
        </div>
      </form>
    </div>
  )
}

SignupRoute.propTypes = {}

export {
  SignupRoute as default,
}
