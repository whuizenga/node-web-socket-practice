import * as React from 'react'
// import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import SignupRoute from './signup'

function Routes(_props) {
  return (
    <Switch>
      <Route exact path="/signup">
        <SignupRoute />
      </Route>

      <Route>
        Home
      </Route>
    </Switch>
  )
}

Routes.propTypes = {}

export {
  Routes as default,
}
