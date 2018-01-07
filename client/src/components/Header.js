import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  renderContent() {
    const { auth } = this.props;

    switch (auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="2" style={{ margin: '0 10px'}}>
            Credits: {auth.credits || 0}
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    const { auth } = this.props;
    const logoUrl = auth ? '/surveys' : '/';

    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={logoUrl} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {};

Header.defaultProps = {};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Header);
