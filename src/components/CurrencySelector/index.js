import React from 'react';
import PropTypes from 'prop-types';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const currencies = ['ARS','AUD','BAM','BDT','BOB','BRL','BZD','CAD','CLP','CNY','COP','CRC','CUP','CZK','DOP','EGP','EUR','FJD','GBP','GTQ','HNL','HRK','HUF','IDR','INR','ISK','JMD','JPY','KHR','LAK','LBP','LKR','MAD','MGA','MMK','MNT','MVR','MXN','MYR','NIO','NPR','NZD','PAB','PEN','PHP','PYG','SGD','SRD','THB','TND','TRY','TWD','USD','UYU','VEF','VND','XCD','YER',];

const CurrencySelector = ({ currency, onChange }) => (
  <Select value={currency} onChange={onChange}>
    {currencies.map(currency => (
      <MenuItem key={currency} value={currency}>{currency}</MenuItem>
    ))}
  </Select>
);

CurrencySelector.propTypes = {
  currency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CurrencySelector;