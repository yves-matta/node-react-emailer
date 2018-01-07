import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    const { handleToken } = this.props;

    return (
      <StripeCheckout
        amount={500}
        description="$5 for 5 email credits"
        name="Emaily"
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={token => handleToken(token)}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
