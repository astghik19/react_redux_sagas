import { put, takeLatest } from 'redux-saga/effects';
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
} from './actions';
import axiosInstance from '../../Config/ServerConfig';

function* getNotificationById(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.get(`/notification/${id}`);
    if (response && response.data) {
      yield put(getNotificationByIdSuccess((response.data)));
    } else {
      yield put(getNotificationByIdError(response.response.data));
    }
  } catch (e) {
    yield put(getNotificationByIdError((e.response.data)));
  }
}

function* makeSeen() {
  try {
    const response = yield axiosInstance.put('notifications/seen');
    if (response && response.status === 202) {
      yield put(makeSeenSuccess());
    } else {
      yield put(makeReadError(response.response.data));
    }
  } catch (e) {
    yield put(makeSeenError(e.response.data));
  }
}

function* makeRead(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/read`);
    if (response && response.status === 202) {
      yield put(makeReadSuccess());
    } else {
      yield put(makeReadError(response.response.data));
    }
  } catch (e) {
    yield put(makeReadError(e.response.data));
  }
}

function* acceptAppointment(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/appointment/accept`);
    if (response && response.status === 202) {
      yield put(acceptAppointmentSuccess(id));
    } else {
      yield put(acceptAppointmentError(response.response.data));
    }
  } catch (e) {
    yield put(acceptAppointmentError(e.response.data));
  }
}

function* cancelAppointment(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/appointment/cancel`);
    if (response && response.status === 202) {
      yield put(cancelAppointmentSuccess(id));
    } else {
      yield put(cancelAppointmentError(response.response.data));
    }
  } catch (e) {
    yield put(cancelAppointmentError(e.response.data));
  }
}

function* acceptCustomerInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/invitation/accept`);
    if (response && response.status === 202) {
      yield put(acceptCustomerInvitationSuccess());
    } else {
      yield put(acceptCustomerInvitationError(response.response.data));
    }
  } catch (e) {
    yield put(acceptCustomerInvitationError(e.response.data));
  }
}

function* acceptIndustryCustomerInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/industry/invitation/accept`);
    if (response && response.status === 202) {
      yield put(acceptIndustryCustomerInvitationSuccess());
    } else {
      yield put(acceptIndustryCustomerInvitationError(response.response.data));
    }
  } catch (e) {
    yield put(acceptIndustryCustomerInvitationError(e.response.data));
  }
}

function* declineCustomerInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/invitation/decline`);
    if (response && response.status === 202) {
      yield put(declineCustomerInvitationSuccess());
    } else {
      yield put(declineCustomerInvitationError(response.response.data));
    }
  } catch (e) {
    yield put(declineCustomerInvitationError(e.response.data));
  }
}

function* declineIndustryCustomerInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/industry/invitation/decline`);
    if (response && response.status === 202) {
      yield put(declineIndustryCustomerInvitationSuccess());
    } else {
      yield put(declineIndustryCustomerInvitationError(response.response.data));
    }
  } catch (e) {
    yield put(declineIndustryCustomerInvitationError(e.response.data));
  }
}

function* acceptStaffInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/staff/invitation/accept`);
    if (response && response.status === 202) {
      yield put(acceptStaffInvitationFromNotificationSuccess());
    } else {
      yield put(acceptStaffInvitationFromNotificationError(response.response.data));
    }
  } catch (e) {
    yield put(acceptStaffInvitationFromNotificationError(e.response.data));
  }
}

function* declineStaffInvitation(action) {
  try {
    const { id } = action.payload;
    const response = yield axiosInstance.put(`notifications/${id}/staff/invitation/decline`);
    if (response && response.status === 202) {
      yield put(declineStaffInvitationFromNotificationSuccess());
    } else {
      yield put(declineStaffInvitationFromNotificationError(response.response.data));
    }
  } catch (e) {
    yield put(declineStaffInvitationFromNotificationError(e.response.data));
  }
}

export default function* () {
  yield takeLatest(getNotificationByIdRequest, getNotificationById);
  yield takeLatest(makeSeenRequest, makeSeen);
  yield takeLatest(makeReadRequest, makeRead);
  yield takeLatest(acceptAppointmentRequest, acceptAppointment);
  yield takeLatest(cancelAppointmentRequest, cancelAppointment);
  yield takeLatest(acceptCustomerInvitationRequest, acceptCustomerInvitation);
  yield takeLatest(acceptIndustryCustomerInvitationRequest, acceptIndustryCustomerInvitation);
  yield takeLatest(declineCustomerInvitationRequest, declineCustomerInvitation);
  yield takeLatest(declineIndustryCustomerInvitationRequest, declineIndustryCustomerInvitation);
  yield takeLatest(acceptStaffInvitationFromNotificationRequest, acceptStaffInvitation);
  yield takeLatest(declineStaffInvitationFromNotificationRequest, declineStaffInvitation);
}
