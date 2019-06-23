import React from 'react';
import styled from 'styled-components';

import BedderConfig from 'bedder/bedderConfig';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';

const WhiteA = styled.ul`
  padding: 0;
  list-style-type: none;
  a {
    color: #fff;
    text-decoration: none;
  }
`;

const IconA = styled.ul`
  padding: 0;
  list-style-type: none;
  li {
    display: inline-block;
    margin-right: 10px;
  }
  span {
    color: #fff;
    border: 1px solid white;
    padding: 10px;
    width: 38px;
    height: 38px;
    text-align: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
`;

const style = {
  footerContainer: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: 30,
  },
  footerContent: {
    marginLeft: 'auto',
    padding: '0px 15px',
  },
  topHr: {
    borderWidth: 0.5,
    marginTop: 0,
  },
  bottomHr: {
    borderWidth: 0.5,
    marginBottom: 20,
    marginTop: 0,
  },
};

const Footer = () => (
  <React.Fragment>
    <Grid container spacing={0} style={style.footerContainer} >
      <Grid item xs={12} sm={12} md={8} style={style.footerContent}>
        <Grid container spacing={0} style={{padding: '0px 15px'}}>
          <Grid item xs={12} sm={12} md={4}>
            <h4>About Us</h4>
            <hr style={style.topHr} />
            <p style={{ marginRight: 10 }}>Bedder uses the power of user generated content to guide other travellers like you to the best places to stay.</p>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <h4>Bedder</h4>
            <hr style={style.topHr} />
            <WhiteA>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/about">Learn more</Link></li>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="#">Blog</Link></li>
            </WhiteA>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <h4>Follow Us</h4>
            <hr style={style.topHr} />
            <IconA>
              <li><a href={BedderConfig.getSocialUrls().facebook} target="_blank" rel="noopener noreferrer"><span className="fa fa-facebook"></span></a></li>
              <li><a href={BedderConfig.getSocialUrls().instagram} target="_blank" rel="noopener noreferrer"><span className="fa fa-instagram"></span></a></li>
            </IconA>
          </Grid>
          <Grid item xs={12}>
            <hr style={style.bottomHr} />
            &copy; 2019 Bedder. All Rights Reserved.
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item md={1} >
        </Grid>
      </Hidden>
    </Grid>
  </React.Fragment>
);

export default Footer;
