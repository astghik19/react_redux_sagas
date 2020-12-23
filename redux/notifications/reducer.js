import { handleActions } from 'redux-actions';
import {
  getNotificationByIdRequest,
  getNotificationByIdSuccess,
  getNotificationByIdError,
  makeSeenRequest,
  makeSeenSuccess,
  makeSeenError,
  makeReadRequest,
  makeReadSuccess,
  makeReadError,
  acceptAppointmentRequest,
  acceptAppointmentSuccess,
  acceptAppointmentError,
  cancelAppointmentRequest,
  cancelAppointmentSuccess,
  cancelAppointmentError,
  acceptCustomerInvitationRequest,
  acceptCustomerInvitationSuccess,
  acceptCustomerInvitationError,
  acceptIndustryCustomerInvitationRequest,
  acceptIndustryCustomerInvitationSuccess,
  acceptIndustryCustomerInvitationError,
  declineCustomerInvitationRequest,
  declineCustomerInvitationSuccess,
  declineCustomerInvitationError,
  declineIndustryCustomerInvitationRequest,
  declineIndustryCustomerInvitationSuccess,
  declineIndustryCustomerInvitationError,
  acceptStaffInvitationFromNotificationRequest,
  acceptStaffInvitationFromNotificationSuccess,
  acceptStaffInvitationFromNotificationError,
  declineStaffInvitationFromNotificationRequest,
  declineStaffInvitationFromNotificationSuccess,
  declineStaffInvitationFromNotificationError,
  clearLastUsedNotificationDataRequest,
} from './actions';

const initialState = {
  isGetNotificationByIdSuccess: false,
  isGetNotificationByIdError: false,
  getNotificationByIdErrorMessage: '',
  notificationById: {},
  isMakeSeenSuccess: false,
  isMakeSeenError: false,
  makeSeenErrorMessage: '',
  isMakeReadSuccess: false,
  isMakeReadError: false,
  makeReadErrorMessage: '',
  isAcceptAppointmentSuccess: false,
  isAcceptAppointmentError: false,
  acceptAppointmentErrorMessage: '',
  isCancelAppointmentSuccess: false,
  isCancelAppointmentError: false,
  cancelAppointmentErrorMessage: '',
  isAcceptCustomerInvitationSuccess: false,
  isAcceptCustomerInvitationError: false,
  acceptCustomerInvitationErrorMessage: '',
  isAcceptIndustryCustomerInvitationSuccess: false,
  isAcceptIndustryCustomerInvitationError: false,
  acceptIndustryCustomerInvitationErrorMessage: '',
  isDeclineCustomerInvitationSuccess: false,
  isDeclineCustomerInvitationError: false,
  declineCustomerInvitationErrorMessage: '',
  isDeclineIndustryCustomerInvitationSuccess: false,
  isDeclineIndustryCustomerInvitationError: false,
  declineIndustryCustomerInvitationErrorMessage: '',
  isAcceptStaffInvitationSuccess: false,
  isAcceptStaffInvitationError: false,
  acceptStaffInvitationErrorMessage: '',
  isDeclineStaffInvitationSuccess: false,
  isDeclineStaffInvitationError: false,
  declineStaffInvitationErrorMessage: '',
  lastUsedNotification: {
    id: null,
    action: '',
  },
};

const reducer = handleActions({
  [makeSeenRequest]: (state) => ({
    ...state,
    isMakeSeenSuccess: false,
    isMakeSeenError: false,
    makeSeenErrorMessage: '',
  }),
  [makeSeenSuccess]: (state) => ({
    ...state,
    isMakeSeenSuccess: true,
    isMakeSeenError: false,
    makeSeenErrorMessage: '',
  }),
  [makeSeenError]: (state, { payload }) => ({
    ...state,
    isMakeSeenSuccess: false,
    isMakeSeenError: true,
    makeSeenErrorMessage: payload.message,
  }),
  [makeReadRequest]: (state) => ({
    ...state,
    isMakeReadSuccess: false,
    isMakeReadError: false,
    makeReadErrorMessage: '',
  }),
  [makeReadSuccess]: (state) => ({
    ...state,
    isMakeReadSuccess: true,
    isMakeReadError: false,
    makeReadErrorMessage: '',
  }),
  [makeReadError]: (state, { payload }) => ({
    ...state,
    isMakeReadSuccess: false,
    isMakeReadError: true,
    makeReadErrorMessage: payload.message,
  }),
  [acceptAppointmentRequest]: (state) => ({
    ...state,
    isAcceptAppointmentSuccess: false,
    isAcceptAppointmentError: false,
    acceptAppointmentErrorMessage: '',
  }),
  [acceptAppointmentSuccess]: (state, { payload }) => ({
    ...state,
    isAcceptAppointmentSuccess: true,
    isAcceptAppointmentError: false,
    acceptAppointmentErrorMessage: '',
    lastUsedNotification: { id: payload, action: 'Accept' },
  }),
  [acceptAppointmentError]: (state, { payload }) => ({
    ...state,
    isAcceptAppointmentSuccess: false,
    isAcceptAppointmentError: true,
    acceptAppointmentErrorMessage: payload.message,
  }),
  [cancelAppointmentRequest]: (state) => ({
    ...state,
    isCancelAppointmentSuccess: false,
    isCancelAppointmentError: false,
    cancelAppointmentErrorMessage: '',
  }),
  [cancelAppointmentSuccess]: (state, { payload }) => ({
    ...state,
    isCancelAppointmentSuccess: true,
    isCancelAppointmentError: false,
    cancelAppointmentErrorMessage: '',
    lastUsedNotification: { id: payload, action: 'Cancel' },
  }),
  [cancelAppointmentError]: (state, { payload }) => ({
    ...state,
    isCancelAppointmentSuccess: false,
    isCancelAppointmentError: false,
    cancelAppointmentErrorMessage: payload.message,
  }),
  [acceptCustomerInvitationRequest]: (state) => ({
    ...state,
    isAcceptCustomerInvitationSuccess: false,
    isAcceptCustomerInvitationError: false,
    acceptCustomerInvitationErrorMessage: '',
  }),
  [acceptCustomerInvitationSuccess]: (state) => ({
    ...state,
    isAcceptCustomerInvitationSuccess: true,
    isAcceptCustomerInvitationError: false,
    acceptCustomerInvitationErrorMessage: '',
  }),
  [acceptCustomerInvitationError]: (state, { payload }) => ({
    ...state,
    isAcceptCustomerInvitationSuccess: false,
    isAcceptCustomerInvitationError: true,
    acceptCustomerInvitationErrorMessage: payload.message,
  }),
  [acceptIndustryCustomerInvitationRequest]: (state) => ({
    ...state,
    isAcceptIndustryCustomerInvitationSuccess: false,
    isAcceptIndustryCustomerInvitationError: false,
    acceptIndustryCustomerInvitationErrorMessage: '',
  }),
  [acceptIndustryCustomerInvitationSuccess]: (state) => ({
    ...state,
    isAcceptIndustryCustomerInvitationSuccess: true,
    isAcceptIndustryCustomerInvitationError: false,
    acceptIndustryCustomerInvitationErrorMessage: '',
  }),
  [acceptIndustryCustomerInvitationError]: (state, { payload }) => ({
    ...state,
    isAcceptIndustryCustomerInvitationSuccess: false,
    isAcceptIndustryCustomerInvitationError: true,
    acceptIndustryCustomerInvitationErrorMessage: payload.message,
  }),
  [declineCustomerInvitationRequest]: (state) => ({
    ...state,
    isDeclineCustomerInvitationSuccess: false,
    isDeclineCustomerInvitationError: false,
    declineCustomerInvitationErrorMessage: '',
  }),
  [declineCustomerInvitationSuccess]: (state) => ({
    ...state,
    isDeclineCustomerInvitationSuccess: true,
    isDeclineCustomerInvitationError: false,
    declineCustomerInvitationErrorMessage: '',
  }),
  [declineCustomerInvitationError]: (state, { payload }) => ({
    ...state,
    isDeclineCustomerInvitationSuccess: false,
    isDeclineCustomerInvitationError: true,
    declineCustomerInvitationErrorMessage: payload.message,
  }),
  [declineIndustryCustomerInvitationRequest]: (state) => ({
    ...state,
    isDeclineIndustryCustomerInvitationSuccess: false,
    isDeclineIndustryCustomerInvitationError: false,
    declineIndustryCustomerInvitationErrorMessage: '',
  }),
  [declineIndustryCustomerInvitationSuccess]: (state) => ({
    ...state,
    isDeclineIndustryCustomerInvitationSuccess: true,
    isDeclineIndustryCustomerInvitationError: false,
    declineIndustryCustomerInvitationErrorMessage: '',
  }),
  [declineIndustryCustomerInvitationError]: (state, { payload }) => ({
    ...state,
    isDeclineIndustryCustomerInvitationSuccess: false,
    isDeclineIndustryCustomerInvitationError: true,
    declineIndustryCustomerInvitationErrorMessage: payload.message,
  }),
  [acceptStaffInvitationFromNotificationRequest]: (state) => ({
    ...state,
    isAcceptStaffInvitationSuccess: false,
    isAcceptStaffInvitationError: false,
    acceptStaffInvitationErrorMessage: '',
  }),
  [acceptStaffInvitationFromNotificationSuccess]: (state) => ({
    ...state,
    isAcceptStaffInvitationSuccess: true,
    isAcceptStaffInvitationError: false,
    acceptStaffInvitationErrorMessage: '',
  }),
  [acceptStaffInvitationFromNotificationError]: (state, { payload }) => ({
    ...state,
    isAcceptStaffInvitationSuccess: false,
    isAcceptStaffInvitationError: true,
    acceptStaffInvitationErrorMessage: payload.message,
  }),
  [declineStaffInvitationFromNotificationRequest]: (state) => ({
    ...state,
    isDeclineStaffInvitationSuccess: false,
    isDeclineStaffInvitationError: false,
    declineStaffInvitationErrorMessage: '',
  }),
  [declineStaffInvitationFromNotificationSuccess]: (state) => ({
    ...state,
    isDeclineStaffInvitationSuccess: true,
    isDeclineStaffInvitationError: false,
    declineStaffInvitationErrorMessage: '',
  }),
  [declineStaffInvitationFromNotificationError]: (state, { payload }) => ({
    ...state,
    isDeclineStaffInvitationSuccess: false,
    isDeclineStaffInvitationError: true,
    declineStaffInvitationErrorMessage: payload.message,
  }),
  [clearLastUsedNotificationDataRequest]: (state, { payload }) => ({
    ...state,
    lastUsedNotification: { ...payload },
  }),
  [getNotificationByIdRequest]: (state) => ({
    ...state,
    isGetNotificationByIdSuccess: false,
    isGetNotificationByIdError: false,
    getNotificationByIdErrorMessage: '',
    notificationById: {},
  }),
  [getNotificationByIdSuccess]: (state, { payload }) => ({
    ...state,
    isGetNotificationByIdSuccess: true,
    isGetNotificationByIdError: false,
    getNotificationByIdErrorMessage: '',
    notificationById: payload.data,
  }),
  [getNotificationByIdError]: (state, { payload }) => ({
    ...state,
    isGetNotificationByIdSuccess: false,
    isGetNotificationByIdError: true,
    getNotificationByIdErrorMessage: payload.message,
    notificationById: {},
  }),
}, initialState);

export default reducer;
