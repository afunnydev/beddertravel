import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BedderValidator from 'bedder/bedderValidator';
import calculateProgress from 'utils/calculateProgress';

import RoomButtons from './RoomButtons.js';
import Room from './Room.js';
import ProgressTitle from './ProgressTitle.js';

BedderValidator.prepareTextField();

const BusinessEditBedrooms = (props) => {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [validationErrors, setValidationErrors] = useState(false);
  const progress = calculateProgress([
    props.roomName, 
    props.roomNumRooms, 
    props.roomNumPeople, 
    props.roomBedsKing || props.roomBedsQueen || props.roomBedsSimple, 
    props.roomPrice,
  ]);
  const vRefs = BedderValidator.makeRefs(BedderValidator.getBusinessEditRoomPage());

  return (
    <>
      <Grid container style={{ paddingTop: 50, paddingBottom: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Bedrooms" progress={progress} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RoomButtons
                {...props}
                activeRoomId={activeRoomId || 0}
                roomChosen={setActiveRoomId}
              />
            </Grid>
            <Grid item xs={12}>
              {props.units && props.units.length
                ? props.units.map(unit => (
                  <Room
                    key={unit.id}
                    activeRoomId={unit.id}
                    validationErrors={validationErrors} 
                    vRefs={vRefs} 
                    client={props.client}
                    visible={unit.id === activeRoomId}
                  />
                ))
                : <Typography>Please select or create a room to start.</Typography>
              }
              {/* {activeRoomId ? (
              {/*   <Room  */}
              {/*     activeRoomId={activeRoomId} */}
              {/*     validationErrors={validationErrors}  */}
              {/*     vRefs={vRefs}  */}
              {/*     client={props.client} */}
              {/*   /> */}
              {/* ) : ( */}
              {/*   <Typography>Please select or create a room to start.</Typography> */}
              {/* )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BusinessEditBedrooms;
