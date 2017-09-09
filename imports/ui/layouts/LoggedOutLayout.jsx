import React from 'react';
import PropTypes from 'prop-types';

import LoggedOutNav from '/imports/ui/components/core/LoggedOutNav';

class LoggedOutLayout extends React.Component {
  componentWillMount() {
    this.loginUser();
  }

  componentDidUpdate() {
    this.loginUser();
  }

  isLoggedIn() {
    const { loggedIn } = this.props;
    return loggedIn;
  }

  loginUser() {
    const { loggedIn } = this.props;
    return () => loggedIn;
  }
  render() {
    const { children } = this.props;
    return (
      <div>
        <LoggedOutNav />
        {children}
      </div>
    );
  }
}

LoggedOutLayout.defaultProps = {
  loggedIn: false,
};

LoggedOutLayout.propTypes = {
  children: PropTypes.element.isRequired,
  loggedIn: PropTypes.bool,
};
export default LoggedOutLayout;