import React from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete';
import { withRouter } from 'react-router-dom';


import { compose } from 'redux';
import { withConnect as withReduxProps } from './SearchBarRedux';
import SearchBarRedux from './SearchBarRedux/Loadable';
import {
    changeLatAction,
    changeLocationAction,
    changeLonAction,
} from './SearchBarRedux/actions';
import { submitAction } from '../HomePage/actions';


import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import MyLocation from '@material-ui/icons/MyLocation';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import BedderValidator from 'bedder/bedderValidator';

import { GUESTS_ARRAY, BED_ARRAY } from 'utils/constants';


const momentNow = new Date().setHours(0, 0, 0, 0);
const google = window.google;
const styles = theme => ({
    searchPaperWrapperHome: {
        padding: '20px',
    },
    searchPaperItem: {
        padding: '12px 20px',
    },
    searchPaperWrapper: {
        padding: '20px',
    },
    searchPaper: {
        // height: 45,
    },
    adornment: {
        marginRight: 5,
    },
    adornmentEnd: {
        cursor: 'pointer',
    },
    gridColumn: {
        padding: '0px 5px',
    },
    findButton: {
        minWidth: 'auto',
        background: 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%);',
        color: 'white',
        height: '56px',
        maxHeight: 'initial',
    },
    renderDiv: {
        maxWidth: 500,
    },
    primaryColor: {
        color: theme.palette.primary.main,
    },
    white: {
        color: 'white',
    },

    /*
     * From Mobile
     */
    '@media (max-width: 960px)': {
        gridColumn: {
            padding: '10px 15px',
        },
        gridColumnLeft: {
            padding: '10px 15px',
            paddingRight: 7.5,
        },
        gridColumnRight: {
            padding: '10px 15px',
            paddingLeft: 7.5,
        },
        searchPaperWrapper: {
            background: 'transparent',
            boxShadow: 'none',
        },
        searchPaper: {
            background: 'transparent',
            boxShadow: 'none',
        }
    }

});
export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#c26c6a',
            main: '#8f3f3f',
            dark: '#5d1219',
            contrastText: '#fff',
        },
        secondary: {
            light: '#7b6ac0',
            main: '#4b3f8f',
            dark: '#191861',
            contrastText: '#fff',
        },
    },
    typography: {
        fontFamily: ['Ubuntu'].join(','),
    },
    rootSelect: {
        paddingLeft: 5,
        margin: 100,
        display: 'block',
    },
});


class SearchBar extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            accuracy: null,
            locationError: false,
            toError: false,
            fromError: false,
            isValid: true,
            location: '',
            errorMsg: '',
            locationSelected: true,
        };
        this.suggestionSelected = this.suggestionSelected.bind(this);
        this.getGeolocation = this.getGeolocation.bind(this);
        this.getGeolocationF = this.getGeolocationF.bind(this);
        this.submit = this.submit.bind(this);
        this.searchTermsChange = this.searchTermsChange.bind(this);
        this.dispatchSubmit = this.dispatchSubmit.bind(this);

        this.changeTimeout = null;
    }

    dispatchSubmit() {
        this.props.dispatch(submitAction());
    }

    submit() {
        if (!this.validate()) {
            return false;
        }

        if (this.props.searchCallback) {
            this.props.searchCallback();
        }

        switch (this.props.location.pathname) {
            case '/home':
                this.props.dispatch(submitAction());
                break;
            default:
                this.props.history.push('/home');
                setTimeout(this.dispatchSubmit, 700);
                break;
        }
    }


    validate() {
        let isValid = true;
        // console.log('validate?');

        if (this.props.location.length <= 0 || this.state.locationSelected == false) {
            this.setState({ 'locationError': true });
            isValid = false;
        } else {
            this.setState({ 'locationError': false });
            // isValid = true;
        }

        if (!this.props.from || this.props.from < momentNow) {
            this.setState({ 'fromError': true });
            isValid = false;
        } else {
            this.setState({ 'fromError': false });
            // isValid = true;
        }

        if (!this.props.to || this.props.to <= this.props.from) {
            this.setState({ 'toError': true });
            isValid = false;
        } else {
            this.setState({ 'toError': false });
            // isValid = true;
        }

        this.setState({ isValid });

        return isValid;
    }

    searchTermsChange() {
        if (this.props.changeCallback) {
            this.props.changeCallback();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.locationText != this.props.locationText && this.state.locationSelected == true) {
            this.setState({ locationSelected: false });
        }

        if (prevProps.doSeach != this.props.doSearch && this.props.doSearch === true) {
            this.submit();
            this.props.didSearch();
        }

        if (
            prevProps.location != this.props.location
            || prevProps.from != this.props.from
            || prevProps.to != this.props.to
            || prevProps.numBed != this.props.numBed
            || prevProps.numPeople != this.props.numPeople
        ) {
            clearTimeout(this.changeTimeout);
            this.changeTimeout = setTimeout(this.searchTermsChange, 2000);
        }

        if (prevProps.from != this.props.from
            || prevProps.to != this.props.to
            || prevProps.locationText != this.props.locationText) {
            this.validate();
        }

        if (prevState.location != this.state.location) {
            this.props.onChangeLocationByHand(this.state.location);
            this.props.onChangeLat(this.state.latitude);
            this.props.onChangeLon(this.state.longitude);
        }

        if (prevProps.from != this.props.from) {
            if (this.props.from && (this.props.from >= this.props.to)) {
                const fromDate = this.props.from;
                this.props.onChangeToVal(fromDate.addDays(3));
            }
        }
    }

    getFrom = (date) => this.props.onChangeFromVal(date);
    getTo = (date) => this.props.onChangeToVal(date);

    getGeolocationF() {
        navigator.geolocation.getCurrentPosition(this.getGeolocation);
    }

    getGeolocation(location) {
        const { latitude, longitude, accuracy } = location.coords;
        this.setState({
            latitude,
            longitude,
            accuracy,
        });

        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
            {
                location: { lat: latitude, lng: longitude },
            },
            (results, status) => {
                if (status === 'OK') {
                    if (results[0]) {
                        this.setState({ location: results[0].formatted_address, locationSelected: true });
                        this.validate();
                    } else {
                        this.setState({ location: '', locationSelected: false });
                    }
                } else {
                    console.log(`Geocoder failed due to: ${status}`);
                }
            },
        );
    }

    suggestionSelected(suggestion) {
        this.props.dispatch(changeLocationAction(suggestion.description));
        geocodeBySuggestion(suggestion)
            .then((results) => {
                if (results.length < 1) {
                    return;
                }

                const { geometry } = results[0];

                this.props.dispatch(changeLatAction(geometry.location.lat()));
                this.props.dispatch(changeLonAction(geometry.location.lng()));

                this.setState({
                    lat: geometry.location.lat(),
                    lon: geometry.location.lng(),
                    locationSelected: true,
                });

                this.validate();
            })
            .catch((err) => {
                console.log('geocode err.message', err.message);
            });
    }

    render() {
        const { classes } = this.props;
        const errorMessage = this.state.locationSelected ? (this.state.isValid ? '' : 'Please, correct the form') : 'Please, select location from dropdown';

        return (
            // <Hidden smDown>
            <React.Fragment>

                <SearchBarRedux />

                <Paper className={this.props.isHome ? classes.searchPaperWrapperHome : classes.searchPaperWrapper} square>
                <Paper className={classes.searchPaper} elevation={0}>
                    <Grid container>

                        {this.props.displayButtonOnly || (
                            <React.Fragment>

                                {/* 
                                    Location Selector
                                */}
                                {this.props.hideLocation || (
                                    <Grid item xs={12} md={3}>
                                        <div className={classes.gridColumn}>
                                            <Paper className={classes.searchPaperItem}>
                                                <MUIPlacesAutocomplete
                                                    // renderTarget={RenderMUIInput}
                                                    // error={this.state.locationError}
                                                    textFieldProps={{
                                                        fullWidth: true,

                                                        value: this.props.locationText,
                                                        id: 'location',
                                                        onChange: this.props.onChangeLocation,
                                                        InputProps: {
                                                            style: this.state.locationError ? { color: 'red' } : {},
                                                            disableUnderline: true,
                                                            startAdornment: (
                                                                <InputAdornment
                                                                    position="start"
                                                                    className={classes.adornment}
                                                                >
                                                                    {/* <Search /> */}
                                                                    {/* <span className={classes.primaryColor}> */}
                                                                    <span className="icon-search" />
                                                                    {/* </span> */}
                                                                </InputAdornment>
                                                            ),
                                                            endAdornment: (
                                                                <InputAdornment
                                                                    // component={IconButton}
                                                                    onClick={this.getGeolocationF}
                                                                    position="end"
                                                                    className={classes.adornmentEnd}
                                                                >
                                                                    <MyLocation color="primary" />
                                                                </InputAdornment>
                                                            ),
                                                        },
                                                    }}
                                                    onSuggestionSelected={this.suggestionSelected}
                                                    renderTarget={() => <div className={classes.renderDiv} />}
                                                />
                                            </Paper>
                                        </div>
                                    </Grid>
                                )}

                                
                                {/* 
                                    Date Picker
                                */}
                                <Grid item xs={12} md={4}>
                                    <Grid container>
                                        
                                        {/* 
                                            From
                                        */}
                                        <Grid item xs={6}>
                                            <div className={classes.gridColumn}>
                                                <Paper className={classes.searchPaperItem}>
                                                    <DatePicker
                                                        id="from"
                                                        selected={this.props.from}
                                                        fullWidth
                                                        onChange={this.getFrom}
                                                        customInput={
                                                            <TextField
                                                                fullWidth
                                                                error
                                                                InputProps={{
                                                                    style: this.state.fromError ? { color: 'red' } : {},
                                                                    disableUnderline: true,
                                                                    startAdornment: (
                                                                        <InputAdornment
                                                                            position="start"
                                                                            className={classes.adornment}
                                                                        >
                                                                            <span className={classes.primaryColor}>
                                                                                <span className="icon-go" />
                                                                            </span>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </Paper>
                                            </div>
                                        </Grid>
                                        
                                        {/* 
                                            To
                                        */}
                                        <Grid item xs={6}>
                                            <div className={classes.gridColumn}>
                                                <Paper className={classes.searchPaperItem}>
                                                    <DatePicker
                                                        id="to"
                                                        selected={this.props.to}
                                                        fullWidth
                                                        onChange={this.getTo}
                                                        customInput={
                                                            <TextField
                                                                fullWidth
                                                                InputProps={{
                                                                    style: this.state.toError ? { color: 'red' } : {},
                                                                    disableUnderline: true,
                                                                    startAdornment: (
                                                                        <InputAdornment
                                                                            position="start"
                                                                            className={classes.adornment}
                                                                        >
                                                                            <span className={classes.primaryColor}>
                                                                                <span className="icon-back" />
                                                                            </span>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        }
                                                    />
                                                </Paper>
                                            </div>
                                        </Grid>
                                    
                                    </Grid>
                                </Grid>

                                {/* 
                                    Guest & Bed Selectors
                                */}
                                <Grid item xs={12} md={3}>

                                    <Grid container>

                                        {/* 
                                            Guest Selector
                                        */}
                                        <Grid item xs={6}>
                                            <div className={classes.gridColumn}>
                                                <Paper className={classes.searchPaperItem}>
                                                    <TextField
                                                        id="numPeople"
                                                        value={this.props.numPeople}
                                                        select
                                                        fullWidth
                                                        onChange={this.props.onChangeNumPeople}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            startAdornment: (
                                                                <InputAdornment
                                                                    position="start"
                                                                    className={classes.adornment}
                                                                >
                                                                    <PersonIcon className={classes.primaryColor} />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                    >
                                                        {GUESTS_ARRAY.map(option => (
                                                            <MenuItem
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Paper>
                                            </div>
                                        </Grid>
                                        
                                        {/* 
                                            Bed Selector
                                        */}
                                        <Grid item xs={6}>
                                            <div className={classes.gridColumn}>
                                                <Paper className={classes.searchPaperItem}>
                                                    <TextField
                                                        id="numBed"
                                                        value={this.props.numBed}
                                                        select
                                                        fullWidth
                                                        onChange={this.props.onChangeNumBed}
                                                        InputProps={{
                                                            disableUnderline: true,
                                                            startAdornment: (
                                                                <InputAdornment
                                                                    position="start"
                                                                    className={classes.adornment}
                                                                >
                                                                    {/* <LocalHotelIcon /> */}
                                                                    <span className={classes.primaryColor}>
                                                                        <span className="icon-bed" />
                                                                    </span>
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        SelectProps={{
                                                            MenuProps: {
                                                                // className: classes.menu,
                                                            },
                                                        }}
                                                    >
                                                        {BED_ARRAY.map(option => (
                                                            <MenuItem key={option} value={option}>
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Paper>
                                            </div>
                                        </Grid>
                                    </Grid>

                                </Grid>

                                {this.props.displayFormOnly || (
                                    <Grid item xs={12} md={2}>
                                        <div className={classes.gridColumn} align="right">
                                            <Typography noWrap>
                                                <Button
                                                    fullWidth
                                                    onClick={this.submit}
                                                    classes={{
                                                        root: classes.findButton,
                                                    }}>
                                                    {this.props.submitting ? (<CircularProgress size={20} classes={{ circle: classes.white }} />) : 'Find'}
                                                </Button>
                                            </Typography>
                                        </div>
                                    </Grid>
                                )}
                                
                            </React.Fragment>
                        )}

                        {this.props.displayButtonOnly && (
                            <Grid item xs={12} md={2}>
                                <div className={classes.gridColumn} align="right">
                                    <Typography noWrap>
                                        <Button
                                            fullWidth
                                            onClick={this.submit}
                                            classes={{
                                                root: classes.findButton,
                                            }}>
                                            Find!
                                        </Button>
                                    </Typography>
                                </div>
                            </Grid>
                        )}


                    </Grid>
                </Paper>
                </Paper>

                {/* 
                    Error Message
                */}
                <Typography color="error" style={this.props.isHome ? { height: '1em' } : {}}>{errorMessage}</Typography>


            {/* </Hidden> */}
            </React.Fragment>
        );
    }
}

export default compose(
    withReduxProps,
    withRouter,
)(withStyles(styles)(SearchBar));
