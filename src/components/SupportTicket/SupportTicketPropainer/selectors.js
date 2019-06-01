import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the supportTicket state domain
 */

const selectSupportTicketDomain = state =>
  state.get('supportTicket', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SupportTicket
 */

const makeSelectSupportTicket = () =>
  createSelector(selectSupportTicketDomain, substate => substate.toJS());

const makeSelectSubmitResult = () =>
  createSelector(selectSupportTicketDomain, state => state.get('submitResult'));
const makeSelectSubmitError = () =>
  createSelector(selectSupportTicketDomain, state => state.get('submitError'));
const makeSelectSubmitting = () =>
  createSelector(selectSupportTicketDomain, state => state.get('submitting'));
const makeSelectSubject = () =>
  createSelector(selectSupportTicketDomain, state => state.get('subject'));
const makeSelectMessage = () =>
  createSelector(selectSupportTicketDomain, state => state.get('message'));
const makeSelectType = () =>
  createSelector(selectSupportTicketDomain, state => state.get('type'));
const makeSelectName = () =>
  createSelector(selectSupportTicketDomain, state => state.get('name'));
const makeSelectStatus = () =>
  createSelector(selectSupportTicketDomain, state => state.get('status'));

export default makeSelectSupportTicket;
export {
  selectSupportTicketDomain,
  makeSelectSupportTicket,
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSubject,
  makeSelectMessage,
  makeSelectType,
  makeSelectName,
  makeSelectStatus,
};
