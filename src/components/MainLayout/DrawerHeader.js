import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import BgImage from './DrawerHeaderBackground.png';
import ExampleImage from './user.png';

import MoodIcon from '@material-ui/icons/Mood';
import PersonIcon from '@material-ui/icons/Person';

import  WithUserContext, {WithRoleContext}  from 'containers/AppContext/context';
// import { withContext } from "with-context";

import { compose } from 'redux';

const styles = {
    userThumb: {
        width: 400,
        height: 110,
        backgroundImage: `url(${BgImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundColor: 'rgba(141, 64, 65, 0.2)', //#4b418c rgb(75, 65, 140)  #8d4041 rgb(141, 64, 65)
        backgroundBlendMode: 'screen',
    },
    gridContainer: {
        height: '100%',
    },
    badge: {

    },
    avatar: {
        margin: 'auto',
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        color: '#8F3F3F', //4B3F8F
        '& > A': {
            color: '#8F3F3F', //4B3F8F
        }
    },
    avatarIcon: {
        fontSize: '28pt',
    },
    textCenter: {
        textAlign: 'center',
    },
    accountType: {
        // color:
    }
};

const DrawerHeaderContextWrapper = props => {

};

// @WithUserContext
// export default class DrawerHeader extends React.Component {

    // render() {
const DrawerHeader = ({user, userRole}) => {

    // console.log('this.props DRAW HEAD', user)
    const userPic = user && user.photos && user.photos.byId && user.photos.byId[1] && user.photos.byId[1].data;

    return (
        <Paper style={styles.userThumb} elevation={0} square>
            <Grid container alignContent="center" alignItems="center" justify="center" height="100%" style={styles.gridContainer}>
                <Grid item xs={3} >
                    <Grid item style={styles.avatar}>
                        { user
                            //? <Badge badgeContent={777} color="secondary" style={styles.badge}><Avatar src={userPic ? userPic : ExampleImage} alt="avatar" style={styles.avatar} /></Badge>
                            ? <Avatar component={Link} to="/profile" src={userPic ? userPic : ExampleImage} alt="avatar" style={styles.avatar} />
                            // : <Avatar alt="avatar" style={styles.avatar}><Link to="/signIn"> <MoodIcon style={styles.avatarIcon} /> </Link> </Avatar>
                            : <Avatar alt="avatar" style={styles.avatar}><Link to="/signIn"> <PersonIcon style={styles.avatarIcon} /> </Link> </Avatar>
                            // : ""
                        }
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <Grid item xs={12}>

                        { user
                            ? <Typography variant="subheading">Hello, {user.name}</Typography>
                            : <Typography variant="subheading"><Link to="/auth">Sign Up</Link>  or <Link to="/auth">Sign In</Link></Typography>
                        }

                    </Grid>
                    <Grid item xs={12} style={styles.accountType}>
                        { user && <Link to="/profile">
                            <Typography color="primary">
                                {userRole == 'ROLE_TRAVELER' && ('Traveler\'s account')}
                                {userRole == 'ROLE_EXPLORER' && ('Explorer account')}
                                {userRole == 'ROLE_OWNER' && ('Owner account')}
                            </Typography>
                        </Link>}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
    // };
// }


// export default DrawerHeader;
// export default compose(WithUserContext)(DrawerHeader);
export default compose(WithUserContext, WithRoleContext)(DrawerHeader);
