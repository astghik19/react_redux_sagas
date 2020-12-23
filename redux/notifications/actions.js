import { createAction } from 'redux-actions';

export const getNotificationByIdRequest = createAction('GET_NOTIFICATION_BY_ID_REQUEST');
export const getNotificationByIdSuccess = createAction('GET_NOTIFICATION_BY_ID_SUCCESS');
export const getNotificationByIdError = createAction('GET_NOTIFICATION_BY_ID_ERROR');

export const makeSeenRequest = createAction('MAKE_SEEN_REQUEST');
export const makeSeenSuccess = createAction('MAKE_SEEN_SUCCESS');
export const makeSeenError = createAction('MAKE_SEEN_ERROR');

export const makeReadRequest = createAction('MAKE_READ_REQUEST');
export const makeReadSuccess = createAction('MAKE_READ_SUCCESS');
export const makeReadError = createAction('MAKE_READ_ERROR');

export const acceptAppointmentRequest = createAction('ACCEPT_APPOINTMENT_REQUEST');
export const acceptAppointmentSuccess = createAction('ACCEPT_APPOINTMENT_SUCCESS');
export const acceptAppointmentError = createAction('ACCEPT_APPOINTMENT_ERROR');

export const cancelAppointmentRequest = createAction('CANCEL_APPOINTMENT_REQUEST');
export const cancelAppointmentSuccess = createAction('CANCEL_APPOINTMENT_SUCCESS');
export const cancelAppointmentError = createAction('CANCEL_APPOINTMENT_ERROR');

export const acceptCustomerInvitationRequest = createAction('ACCEPT_CUSTOMER_INVITATION_REQUEST');
export const acceptCustomerInvitationSuccess = createAction('ACCEPT_CUSTOMER_INVITATION_SUCCESS');
export const acceptCustomerInvitationError = createAction('ACCEPT_CUSTOMER_INVITATION_ERROR');

export const acceptIndustryCustomerInvitationRequest = createAction('ACCEPT_INDUSTRY_CUSTOMER_INVITATION_REQUEST');
export const acceptIndustryCustomerInvitationSuccess = createAction('ACCEPT_INDUSTRY_CUSTOMER_INVITATION_SUCCESS');
export const acceptIndustryCustomerInvitationError = createAction('ACCEPT_INDUSTRY_CUSTOMER_INVITATION_ERROR');

export const declineCustomerInvitationRequest = createAction('DECLINE_CUSTOMER_INVITATION_REQUEST');
export const declineCustomerInvitationSuccess = createAction('DECLINE_CUSTOMER_INVITATION_SUCCESS');
export const declineCustomerInvitationError = createAction('DECLINE_CUSTOMER_INVITATION_ERROR');

export const declineIndustryCustomerInvitationRequest = createAction('DECLINE_INDUSTRY_CUSTOMER_INVITATION_REQUEST');
export const declineIndustryCustomerInvitationSuccess = createAction('DECLINE_INDUSTRY_CUSTOMER_INVITATION_SUCCESS');
export const declineIndustryCustomerInvitationError = createAction('DECLINE_INDUSTRY_CUSTOMER_INVITATION_ERROR');

export const acceptStaffInvitationFromNotificationRequest = createAction('ACCEPT_STAFF_INVITATION_FROM_NOTIFICATION_REQUEST');
export const acceptStaffInvitationFromNotificationSuccess = createAction('ACCEPT_STAFF_INVITATION_FROM_NOTIFICATION_SUCCESS');
export const acceptStaffInvitationFromNotificationError = createAction('ACCEPT_STAFF_INVITATION_FROM_NOTIFICATION_ERROR');

export const declineStaffInvitationFromNotificationRequest = createAction('DECLINE_STAFF_INVITATION_FROM_NOTIFICATION_REQUEST');
export const declineStaffInvitationFromNotificationSuccess = createAction('DECLINE_STAFF_INVITATION_FROM_NOTIFICATION_SUCCESS');
export const declineStaffInvitationFromNotificationError = createAction('DECLINE_STAFF_INVITATION_FROM_NOTIFICATION_ERROR');

export const clearLastUsedNotificationDataRequest = createAction('CLEAR_LAST_USED_NOTIFICATION_DATA_REQUEST');
