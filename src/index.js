/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import {
  StripeProvider,
  Elements,
  injectStripe,
  CardElement,
  CardNumberElement,
  CardCVCElement,
  CardExpiryElement,
} from 'react-stripe-elements';

const printObj = obj => JSON.stringify(obj, null, 2);

const createToken = async stripeInstance => {
  const response = await stripeInstance.createToken();

  if (response.token) alert(`CREATED: ${printObj(response.token)}`);
  else if (response.error) alert(`ERROR: ${printObj(response.error)}`);
  else alert(`UNKNOWN ERROR: ${printObj(response.error)}`);
};

class FormSingle extends Component {
  static propTypes = {
    stripe: PropTypes.shape({ createToken: PropTypes.func }),
  };

  static defaultProps = {
    stripe: { createToken: () => Promise.resolve() },
  };

  handleSubmit = event => {
    event.preventDefault();
    createToken(this.props.stripe);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

class FormSplit extends Component {
  static propTypes = {
    stripe: PropTypes.shape({ createToken: PropTypes.func }),
  };

  static defaultProps = {
    stripe: { createToken: () => Promise.resolve() },
  };

  handleSubmit = event => {
    event.preventDefault();
    createToken(this.props.stripe);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardNumberElement />
        <CardCVCElement />
        <CardExpiryElement />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}

const StripeFormSingle = injectStripe(FormSingle);
const StripeFormSplit = injectStripe(FormSplit);

class StripeAsync extends Component {
  static propTypes = { children: PropTypes.node };

  static defaultProps = { children: [] };

  state = { stripe: null };

  componentDidMount() {
    document.querySelector('#stripe-js').addEventListener('load', () => {
      this.setState({ stripe: window.Stripe(STRIPE_API_KEY) });
    });
  }

  render() {
    return (
      <StripeProvider stripe={this.state.stripe}>
        {this.props.children}
      </StripeProvider>
    );
  }
}

render(
  <div>
    <h2>this form will collect number, cvc, expiry. works fine</h2>
    <StripeAsync>
      <Elements>
        <StripeFormSingle />
      </Elements>
    </StripeAsync>
    <hr />
    <h2>
      this form will only collect number. causes 400 on the createToken request
      (inspect request params in browser dev tools)
    </h2>
    <StripeAsync>
      <Elements>
        <StripeFormSplit />
      </Elements>
    </StripeAsync>
  </div>,
  document.getElementById('app-root'),
);
