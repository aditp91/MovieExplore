import React, {Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.css';

export default class MyReviews extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render() {
    const { className, ...props } = this.props;
    return (
      <div className={classnames('MyReviews', className)} {...props}>
        <h1>
          MyReviews
        </h1>
      </div>
    );
  }
}