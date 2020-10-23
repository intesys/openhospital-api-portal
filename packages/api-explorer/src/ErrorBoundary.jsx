import React, {Fragment} from 'react'
import {FormattedMessage} from 'react-intl';

const PropTypes = require('prop-types');

const BoundaryStackTrace = require('./BoundaryStackTrace');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
    // TODO add bugsnag here?
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <Fragment>
          <h3>
            <FormattedMessage
              id="error.explorer.render"
              defaultMessage="There was an error rendering the API Explorer."
            />
          </h3>
          <BoundaryStackTrace error={this.state.error} info={this.state.info} />
        </Fragment>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

module.exports = ErrorBoundary;
