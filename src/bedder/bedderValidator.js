import React from 'react';
import { fieldValidatorCore } from 'react-validation-framework';
import validator from 'validator';

class BedderValidator {
  validate(refs) {
    let isValid = true;
    Object.keys(refs).forEach((key) => {
      if (refs[key].current && refs[key].current.isValid === false) {
        isValid = false;
      }
    });
    return isValid;
  }

  makeRefs(page) {
    let ret = {};
    Object.keys(page).forEach((key) => {
      ret[key] = React.createRef();
    });
    return ret;
  }

  prepareTextField() {
    fieldValidatorCore.addSupport(
      'TextField',
      event => event[0].target.value,
      (callback, args) => callback(args[0], undefined, args[0].target.value),
      'error'
    );
  }

  getValidators() {
    return {
      notEmpty: {
        validator: val => !validator.isEmpty(val),
        errorPropValue: true,
        errorMessage: 'This field cannot be empty.',
      },
      isEmail: {
        validator: val => validator.isEmail(val),
        errorPropValue: true,
        errorMessage: 'Please enter a valid email.',
      },
      passwordLength: {
        validator: val => val.length >= 6,
        errorPropValue: true,
        errorMessage: 'Please enter a value',
      },
    };
  }

  getBusinessEditRoomPage() {
    return {
      roomName: {},
      roomNumRooms: {},
      roomDiscount: {},
      roomPrice: {},
      // roomSize: {},
      roomNumPeople: {},
    };
  }

  getSearchBar() {
    return {
      from: {},
      to: {},
      // location: {},
    };
  }

  getAskQuestion() {
    return {
      subject: {},
      message: {},
    };
  }

  getSupportTicket() {
    return {
      subject: {},
      message: {},
    };
  }

  getBusinessEditPage() {
    return {
      name: {},
      email: {},
      mood: {},
      type: {},
    };
  }

  getUserProfilePage() {
    return {
      email: {},
      newPassword: {},
      oldPassword: {},
      newPasswordRepeat: {},
      firstname: {},
      lastname: {},
      about: {},
    };
  }

  getSignupPage() {
    return {
      email: {},
      password: {},
      passwordRepeat: {},
      firstname: {},
      lastname: {},
    };
  }

  getLoginPage() {
    return {
      email: {},
      password: {},
    };
  }

  getForgotPage() {
    return {
      email: {},
      code: {},
      password: {},
      passwordRepeat: {},
    };
  }
}

export default new BedderValidator();
