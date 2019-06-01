/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const styles = theme => ({
  button: {
    background: 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%);',
    color: 'white',
    paddingTop: '13px',
    paddingBottom: '13px',
  },
});

// const SomeButton = () => withStyles(styles)();

function StyledButton(props) {
  const {classes, children, className, ...otherProps} = props;
  // console.log('other p', props);
  return (
  <Button  className={classes.button} {...otherProps}>
    {children}
  </Button>
  );
}

StyledButton.propTypes = {};

export default withStyles(styles)(StyledButton);
