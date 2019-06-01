import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ViewListIcon from '@material-ui/icons/ViewList';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import styles from './HeaderMenuStyles';

const HeaderMenuExplorer = ({ user, locationPathname }) => (
  <React.Fragment>
    { user
    &&
    <React.Fragment>
      <Button component={Link} to="/businesses" style={(locationPathname === '/businesses') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <ViewListIcon style={styles.icon}></ViewListIcon>
        My Pages
      </Button>
      <Button component={Link} to="/earnings" style={(locationPathname === '/earnings') ? { ...styles.button, ...styles.activeButton } : styles.button}>
        <MonetizationOnIcon style={styles.icon}></MonetizationOnIcon>
        My Earnings
      </Button>
    </React.Fragment>
    }

    <Button style={{ ...styles.button, ...styles.buttonSeparator }} disabled >|</Button>
    <Button component={Link} to="/business/add" style={(locationPathname === '/business/add') ? { ...styles.button, ...styles.activeButton } : styles.button}>
      Add
      <LibraryAddIcon style={styles.icon}></LibraryAddIcon>
    </Button>
  </React.Fragment>
);

HeaderMenuExplorer.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  locationPathname: PropTypes.string.isRequired,
};

export default HeaderMenuExplorer;
