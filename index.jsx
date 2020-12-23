import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import {
  List,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Box,
} from '@material-ui/core';
import io from 'socket.io-client';
import TopBarNotificationItemContent from './TopBarNotificationItemContent/TopBarNotificationItemContent';
import GetUnseenNotificationCountContent from './GetUnseeNotificationCountContent/getUnseenNotificationCountContent';
import { resetNotificationsRequest } from '../../redux/account/actions';
import {
  makeSeenRequest,
  makeReadRequest,
  acceptAppointmentRequest,
  cancelAppointmentRequest,
  acceptCustomerInvitationRequest,
  declineCustomerInvitationRequest,
  acceptIndustryCustomerInvitationRequest,
  declineIndustryCustomerInvitationRequest,
  acceptStaffInvitationFromNotificationRequest,
  declineStaffInvitationFromNotificationRequest,
  getNotificationByIdRequest,
} from '../../redux/notification/actions';
import usePrevious from '../../CustomHooks/usePrevious';

function Notifications(props) {
  const {
    account,
    history,
    userNotifications,
    isMakeSeenSuccess,
    isMakeSeenError,
    makeSeenErrorMessage,
    makeRead,
    isMakeReadSuccess,
    isMakeReadError,
    makeReadErrorMessage,
    acceptAppointment,
    isAcceptAppointmentSuccess,
    isAcceptAppointmentError,
    acceptAppointmentErrorMessage,
    cancelAppointment,
    isCancelAppointmentSuccess,
    isCancelAppointmentError,
    cancelAppointmentErrorMessage,
    resetNotifications,
    acceptCustomerInvitation,
    isAcceptCustomerInvitationSuccess,
    isAcceptCustomerInvitationError,
    acceptCustomerInvitationErrorMessage,
    declineCustomerInvitation,
    isDeclineCustomerInvitationSuccess,
    isDeclineCustomerInvitationError,
    declineCustomerInvitationErrorMessage,
    acceptIndustryCustomerInvitation,
    isAcceptIndustryCustomerInvitationSuccess,
    isAcceptIndustryCustomerInvitationError,
    acceptIndustryCustomerInvitationErrorMessage,
    declineIndustryCustomerInvitation,
    isDeclineIndustryCustomerInvitationSuccess,
    isDeclineIndustryCustomerInvitationError,
    declineIndustryCustomerInvitationErrorMessage,
    acceptStaffInvitation,
    isAcceptStaffInvitationSuccess,
    isAcceptStaffInvitationError,
    acceptStaffInvitationErrorMessage,
    declineStaffInvitation,
    isDeclineStaffInvitationSuccess,
    isDeclineStaffInvitationError,
    declineStaffInvitationErrorMessage,
    makeSeen,
    getNotificationById,
    isGetNotificationByIdSuccess,
    isGetNotificationByIdError,
    getNotificationByIdErrorMessage,
    notificationById,
  } = props;
  const prevIsGetNotificationByIdSuccess = usePrevious(isGetNotificationByIdSuccess);
  const prevIsGetNotificationByIdError = usePrevious(isGetNotificationByIdError);

  const [socket, setSocket] = useState(null);
  const [isAccountJoined, setIsAccountJoined] = useState(false);
  const [lastClickedNotificationId, setLastClickedNotificationId] = useState(null);
  const [notificationToDeleteId, setNotificationToDeleteId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isOpenNotifications, setIsOpenNotifications] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(isOpenNotifications);

  // Get some props previous values
  const prevIsMakeSeenSuccess = usePrevious(isMakeSeenSuccess);
  const prevIsMakeSeenError = usePrevious(isMakeSeenError);
  const prevIsMakeReadSuccess = usePrevious(isMakeReadSuccess);
  const prevIsMakeReadError = usePrevious(isMakeReadError);
  const prevIsAcceptAppointmentSuccess = usePrevious(isAcceptAppointmentSuccess);
  const prevIsAcceptAppointmentError = usePrevious(isAcceptAppointmentError);
  const prevIsCancelAppointmentSuccess = usePrevious(isCancelAppointmentSuccess);
  const prevIsCancelAppointmentError = usePrevious(isCancelAppointmentError);
  const prevIsAcceptCustomerInvitationSuccess = usePrevious(isAcceptCustomerInvitationSuccess);
  const prevIsAcceptCustomerInvitationError = usePrevious(isAcceptCustomerInvitationError);
  const prevIsDeclineCustomerInvitationSuccess = usePrevious(isDeclineCustomerInvitationSuccess);
  const prevIsDeclineCustomerInvitationError = usePrevious(isDeclineCustomerInvitationError);
  const prevIsAcceptIndividualCustomerInvitationSuccess = usePrevious(isAcceptIndustryCustomerInvitationSuccess);
  const prevIsAcceptIndividualCustomerInvitationError = usePrevious(isAcceptIndustryCustomerInvitationError);
  const prevIsDeclineIndustryCustomerInvitationSuccess = usePrevious(isDeclineIndustryCustomerInvitationSuccess);
  const prevIsDeclineIndustryCustomerInvitationError = usePrevious(isDeclineIndustryCustomerInvitationError);
  const prevIsAcceptStaffInvitationSuccess = usePrevious(isAcceptStaffInvitationSuccess);
  const prevIsAcceptStaffInvitationError = usePrevious(isAcceptStaffInvitationError);
  const prevIsDeclineStaffInvitationSuccess = usePrevious(isDeclineStaffInvitationSuccess);
  const prevIsDeclineStaffInvitationError = usePrevious(isDeclineStaffInvitationError);


  // Component mounted
  useEffect(() => {
    setNotifications([...userNotifications]);
    const socket = io(process.env.REACT_APP_NODEJS_API_URL);
    setSocket(socket);

    socket.on('receiveNotification', (id) => {
      getNotificationById({ id });
    });
  }, []);

  useEffect(() => {
    if (socket && account && !isAccountJoined) {
      const permalink = `account${account.permalink}`;
      socket.emit('joinNotifications', { permalink });
      setIsAccountJoined(true);
    }
  }, [socket, account]);

  useEffect(() => {
    if (prevIsGetNotificationByIdSuccess === false && isGetNotificationByIdSuccess) {
      setNotifications((prevValue) => ([notificationById, ...prevValue]));
    } else if (prevIsGetNotificationByIdError === false && isGetNotificationByIdError) {
      console.log(getNotificationByIdErrorMessage);
    }
  }, [isGetNotificationByIdSuccess, isGetNotificationByIdError]);

  // Perform, when make notifications seen success
  useEffect(() => {
    if (prevIsMakeSeenSuccess === false && isMakeSeenSuccess) {
      const now = moment();
      const seenNotifications = notifications.map((item) => ({
        ...item,
        seen_at: now,
      }));
      setNotifications(seenNotifications);
      resetNotifications(seenNotifications);
    }
  }, [isMakeSeenSuccess]);
  // Perform, when make notifications seen error
  useEffect(() => {
    if (prevIsMakeSeenError === false && isMakeSeenError) {
      toastr.error(makeSeenErrorMessage);
    }
  }, [isMakeSeenError]);
  // Perform, when make notification read success
  useEffect(() => {
    if (prevIsMakeReadSuccess === false && isMakeReadSuccess && lastClickedNotificationId) {
      const notificationsCopy = [...notifications];
      const notificationIndex = notificationsCopy.findIndex((item) => item.id === lastClickedNotificationId);
      notificationsCopy[notificationIndex].read_at = moment();
      setNotifications(notificationsCopy);
      resetNotifications(notificationsCopy);
      const { link } = notificationsCopy[notificationIndex];
      if (link) {
        history.push(link);
      }
    }
  }, [isMakeReadSuccess]);
  // Perform, when make notification read error
  useEffect(() => {
    if (prevIsMakeReadError === false && isMakeReadError) {
      const notificationsCopy = [...notifications];
      const notificationIndex = notificationsCopy.findIndex((item) => item.id === lastClickedNotificationId);
      const notification = notificationsCopy[notificationIndex];
      if (notification && notification.link) {
        history.push(notification.link);
      }
      toastr.error(makeReadErrorMessage);
    }
  }, [isMakeReadError]);
  // Perform, when accept appointment success
  useEffect(() => {
    if (prevIsAcceptAppointmentSuccess === false && isAcceptAppointmentSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Appointment accepted successfully');
    }
  }, [isAcceptAppointmentSuccess]);
  // Perform, when accept appointment error
  useEffect(() => {
    if (prevIsAcceptAppointmentError === false && isAcceptAppointmentError) {
      toastr.error(acceptAppointmentErrorMessage);
    }
  }, [isAcceptAppointmentError]);
  // Perform, when cancel appointment success
  useEffect(() => {
    if (prevIsCancelAppointmentSuccess === false && isCancelAppointmentSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Appointment cancelled successfully');
    }
  }, [isCancelAppointmentSuccess]);
  // Perform, when accept appointment error
  useEffect(() => {
    if (prevIsCancelAppointmentError === false && isCancelAppointmentError) {
      toastr.error(cancelAppointmentErrorMessage);
    }
  }, [isCancelAppointmentError]);
  // Perform, when accept customer invitation success
  useEffect(() => {
    if (prevIsAcceptCustomerInvitationSuccess === false && isAcceptCustomerInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation accepted successfully');
    }
  }, [isAcceptCustomerInvitationSuccess]);
  // Perform, when accept customer invitation error
  useEffect(() => {
    if (prevIsAcceptCustomerInvitationError === false && isAcceptCustomerInvitationError) {
      toastr.error(acceptCustomerInvitationErrorMessage);
    }
  }, [isAcceptCustomerInvitationError]);
  // Perform, when decline customer invitation success
  useEffect(() => {
    if (prevIsDeclineCustomerInvitationSuccess === false && isDeclineCustomerInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation declined');
    }
  }, [isDeclineCustomerInvitationSuccess]);
  // Perform, when decline customer invitation error
  useEffect(() => {
    if (prevIsDeclineCustomerInvitationError === false && isDeclineCustomerInvitationError) {
      toastr.error(declineCustomerInvitationErrorMessage);
    }
  }, [isDeclineCustomerInvitationError]);
  // Perform, when accept industry customer invitation success
  useEffect(() => {
    if (prevIsAcceptIndividualCustomerInvitationSuccess === false && isAcceptIndustryCustomerInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation accepted successfully');
    }
  }, [isAcceptIndustryCustomerInvitationSuccess]);
  // Perform, when accept industry customer invitation error
  useEffect(() => {
    if (prevIsAcceptIndividualCustomerInvitationError === false && isAcceptIndustryCustomerInvitationError) {
      toastr.error(acceptIndustryCustomerInvitationErrorMessage);
    }
  }, [isAcceptIndustryCustomerInvitationError]);
  // Perform, when decline industry customer invitation success
  useEffect(() => {
    if (prevIsDeclineIndustryCustomerInvitationSuccess === false && isDeclineIndustryCustomerInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation declined');
    }
  }, [isDeclineIndustryCustomerInvitationSuccess]);
  // Perform, when decline industry customer invitation error
  useEffect(() => {
    if (prevIsDeclineIndustryCustomerInvitationError === false && isDeclineIndustryCustomerInvitationError) {
      toastr.error(declineIndustryCustomerInvitationErrorMessage);
    }
  }, [isDeclineIndustryCustomerInvitationError]);
  // Perform, when accept staff invitation success
  useEffect(() => {
    if (prevIsAcceptStaffInvitationSuccess === false && isAcceptStaffInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation accepted');
    }
  }, [isAcceptStaffInvitationSuccess]);
  // Perform, when accept staff invitation error
  useEffect(() => {
    if (prevIsAcceptStaffInvitationError === false && isAcceptStaffInvitationError) {
      toastr.error(acceptStaffInvitationErrorMessage);
    }
  }, [isAcceptStaffInvitationError]);
  // Perform, when accept staff invitation success
  useEffect(() => {
    if (prevIsDeclineStaffInvitationSuccess === false && isDeclineStaffInvitationSuccess) {
      removeDeletedNotification(notifications);
      toastr.success('Invitation declined');
    }
  }, [isDeclineStaffInvitationSuccess]);
  // Perform, when accept staff invitation error
  useEffect(() => {
    if (prevIsDeclineStaffInvitationError === false && isDeclineStaffInvitationError) {
      toastr.error(declineStaffInvitationErrorMessage);
    }
  }, [isDeclineStaffInvitationError]);
  // Perform, when notify modal is open
  useEffect(() => {
    if (prevOpen.current === true && isOpenNotifications === false) {
      anchorRef.current.focus();
    }

    if (isOpenNotifications) {
      makeSeen();
    }

    prevOpen.current = isOpenNotifications;
  }, [isOpenNotifications]);

  const removeDeletedNotification = (notifications) => {
    const notificationsCopy = [...notifications];
    const notificationIndex = notificationsCopy.findIndex((item) => item.id === notificationToDeleteId);
    notificationsCopy.splice(notificationIndex, 1);
    setLastClickedNotificationId(null);
    setNotifications(notificationsCopy);
    resetNotifications(notificationsCopy);
  };

  const getUnseenNotificationCount = () => {
    const unseenNotifications = notifications.filter((item) => !item.seen_at);
    return unseenNotifications.length;
  };

  const redirectNotification = (event, notification) => {
    const { classList } = event.target;
    const { id, link } = notification;
    if (classList.contains('btn') || classList.contains('activity')) {
      return false;
    }
    if (!notification.read_at) {
      setLastClickedNotificationId(id);
      makeRead({ id });
    } else if (link) {
      history.push(link);
    }
  };

  const handleAcceptAppointment = (id) => {
    setNotificationToDeleteId(id);
    acceptAppointment({ id });
    setNotificationActionType(id, 'Accepted');
  };

  const handleCancelAppointment = (id) => {
    setNotificationToDeleteId(id);
    cancelAppointment({ id });
    setNotificationActionType(id, 'Canceled');
  };

  const handleAcceptCustomerInvitation = (id) => {
    setNotificationToDeleteId(id);
    acceptCustomerInvitation({ id });
    setNotificationActionType(id, 'Accepted');
  };

  const handleDeclineCustomerInvitation = (id) => {
    setNotificationToDeleteId(id);
    declineCustomerInvitation({ id });
    setNotificationActionType(id, 'Declined');
  };

  const handleAcceptIndustryCustomerInvitation = (id) => {
    setNotificationToDeleteId(id);
    acceptIndustryCustomerInvitation({ id });
    setNotificationActionType(id, 'Accepted');
  };

  const handleDeclineIndustryCustomerInvitation = (id) => {
    setNotificationToDeleteId(id);
    declineIndustryCustomerInvitation({ id });
    setNotificationActionType(id, 'Declined');
  };

  const handleAcceptStaffInvitation = (id) => {
    setNotificationToDeleteId(id);
    acceptStaffInvitation({ id });
    setNotificationActionType(id, 'Accepted');
  };

  const handleDeclineStaffInvitation = (id) => {
    setNotificationToDeleteId(id);
    declineStaffInvitation({ id });
    setNotificationActionType(id, 'Declined');
  };

  const setNotificationActionType = (id, typeMessage) => {
    const notificationCopy = [...notifications];
    const changedNotifyKey = notificationCopy.findIndex((item) => item.id === id);
    if (changedNotifyKey !== -1) {
      const changedNotify = notificationCopy[changedNotifyKey];
      changedNotify.action.type.name = 'info';
      changedNotify.action.type_message = typeMessage;
      changedNotify.message = `${typeMessage} notification`;
      changedNotify.action.message = `${typeMessage} notification`;
      changedNotify.action.description = `${typeMessage} notification`;
      setNotifications([...notificationCopy]);
    }
  };

  const toggleNotificationsMenu = () => {
    setIsOpenNotifications((prevOpen) => !prevOpen);
  };

  const closeNotificationsMenu = (event) => {
    let classList = [];
    if (event.target && event.target.classList) {
      classList = [...event.target.classList];
    }

    if ((anchorRef.current && anchorRef.current.contains(event.target)) || classList.includes('activity')) {
      return false;
    }

    setIsOpenNotifications(false);
  };

  return (
    <Box display="flex">
      <GetUnseenNotificationCountContent
        anchorRef={anchorRef}
        toggleNotificationsMenu={toggleNotificationsMenu}
        getUnseenNotificationCount={getUnseenNotificationCount}
      />
      <Popper
        open={isOpenNotifications}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className="notification"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeNotificationsMenu}>
                <MenuList autoFocusItem={isOpenNotifications} id="menu-list-grow" onKeyDown={closeNotificationsMenu} disablePadding>
                  <List onClick={closeNotificationsMenu} disablePadding className="buttons-notification">
                    <TopBarNotificationItemContent
                      notifications={notifications}
                      redirectNotification={redirectNotification}
                      handleAcceptAppointment={handleAcceptAppointment}
                      handleCancelAppointment={handleCancelAppointment}
                      handleAcceptCustomerInvitation={handleAcceptCustomerInvitation}
                      handleDeclineCustomerInvitation={handleDeclineCustomerInvitation}
                      handleAcceptIndustryCustomerInvitation={handleAcceptIndustryCustomerInvitation}
                      handleDeclineIndustryCustomerInvitation={handleDeclineIndustryCustomerInvitation}
                      handleAcceptStaffInvitation={handleAcceptStaffInvitation}
                      handleDeclineStaffInvitation={handleDeclineStaffInvitation}
                    />
                  </List>
                  <MenuItem onClick={closeNotificationsMenu} className="see-all" color="red">See all notifications</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

Notifications.propTypes = {
  account: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userNotifications: PropTypes.array.isRequired,
  // Reset Notifications
  resetNotifications: PropTypes.func.isRequired,
  // Make notifications seen
  makeSeen: PropTypes.func.isRequired,
  isMakeSeenSuccess: PropTypes.bool.isRequired,
  isMakeSeenError: PropTypes.bool.isRequired,
  makeSeenErrorMessage: PropTypes.string.isRequired,
  // Make notification read
  makeRead: PropTypes.func.isRequired,
  isMakeReadSuccess: PropTypes.bool.isRequired,
  isMakeReadError: PropTypes.bool.isRequired,
  makeReadErrorMessage: PropTypes.string.isRequired,
  // Accept appointment
  acceptAppointment: PropTypes.func.isRequired,
  isAcceptAppointmentSuccess: PropTypes.bool.isRequired,
  isAcceptAppointmentError: PropTypes.bool.isRequired,
  acceptAppointmentErrorMessage: PropTypes.string.isRequired,
  // Cancel appointment
  cancelAppointment: PropTypes.func.isRequired,
  isCancelAppointmentSuccess: PropTypes.bool.isRequired,
  isCancelAppointmentError: PropTypes.bool.isRequired,
  cancelAppointmentErrorMessage: PropTypes.string.isRequired,
  // Accept customer invitation
  acceptCustomerInvitation: PropTypes.func.isRequired,
  isAcceptCustomerInvitationSuccess: PropTypes.bool.isRequired,
  isAcceptCustomerInvitationError: PropTypes.bool.isRequired,
  acceptCustomerInvitationErrorMessage: PropTypes.string.isRequired,
  // Accept individual customer invitation
  acceptIndustryCustomerInvitation: PropTypes.func.isRequired,
  isAcceptIndustryCustomerInvitationSuccess: PropTypes.bool.isRequired,
  isAcceptIndustryCustomerInvitationError: PropTypes.bool.isRequired,
  acceptIndustryCustomerInvitationErrorMessage: PropTypes.string.isRequired,
  // Decline customer invitation
  declineCustomerInvitation: PropTypes.func.isRequired,
  isDeclineCustomerInvitationSuccess: PropTypes.bool.isRequired,
  isDeclineCustomerInvitationError: PropTypes.bool.isRequired,
  declineCustomerInvitationErrorMessage: PropTypes.string.isRequired,
  // Decline individual customer invitation
  declineIndustryCustomerInvitation: PropTypes.func.isRequired,
  isDeclineIndustryCustomerInvitationSuccess: PropTypes.bool.isRequired,
  isDeclineIndustryCustomerInvitationError: PropTypes.bool.isRequired,
  declineIndustryCustomerInvitationErrorMessage: PropTypes.string.isRequired,
  // Accept staff invitation
  acceptStaffInvitation: PropTypes.func.isRequired,
  isAcceptStaffInvitationSuccess: PropTypes.bool.isRequired,
  isAcceptStaffInvitationError: PropTypes.bool.isRequired,
  acceptStaffInvitationErrorMessage: PropTypes.string.isRequired,
  // Decline staff invitation
  isDeclineStaffInvitationSuccess: PropTypes.bool.isRequired,
  isDeclineStaffInvitationError: PropTypes.bool.isRequired,
  declineStaffInvitationErrorMessage: PropTypes.string.isRequired,
  declineStaffInvitation: PropTypes.func.isRequired,
  // Get notification by id
  getNotificationById: PropTypes.func.isRequired,
  isGetNotificationByIdSuccess: PropTypes.bool.isRequired,
  isGetNotificationByIdError: PropTypes.bool.isRequired,
  getNotificationByIdErrorMessage: PropTypes.string.isRequired,
  notificationById: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isMakeSeenSuccess: state.notification.isMakeSeenSuccess,
  isMakeSeenError: state.notification.isMakeSeenError,
  makeSeenErrorMessage: state.notification.makeSeenErrorMessage,
  isMakeReadSuccess: state.notification.isMakeReadSuccess,
  isMakeReadError: state.notification.isMakeReadError,
  makeReadErrorMessage: state.notification.makeReadErrorMessage,
  isAcceptAppointmentSuccess: state.notification.isAcceptAppointmentSuccess,
  isAcceptAppointmentError: state.notification.isAcceptAppointmentError,
  acceptAppointmentErrorMessage: state.notification.acceptAppointmentErrorMessage,
  isCancelAppointmentSuccess: state.notification.isCancelAppointmentSuccess,
  isCancelAppointmentError: state.notification.isCancelAppointmentError,
  cancelAppointmentErrorMessage: state.notification.cancelAppointmentErrorMessage,
  isAcceptCustomerInvitationSuccess: state.notification.isAcceptCustomerInvitationSuccess,
  isAcceptCustomerInvitationError: state.notification.isAcceptCustomerInvitationError,
  acceptCustomerInvitationErrorMessage: state.notification.acceptCustomerInvitationErrorMessage,
  isDeclineCustomerInvitationSuccess: state.notification.isDeclineCustomerInvitationSuccess,
  isDeclineCustomerInvitationError: state.notification.isDeclineCustomerInvitationError,
  declineCustomerInvitationErrorMessage: state.notification.declineCustomerInvitationErrorMessage,
  isAcceptIndustryCustomerInvitationSuccess: state.notification.isAcceptIndustryCustomerInvitationSuccess,
  isAcceptIndustryCustomerInvitationError: state.notification.isAcceptIndustryCustomerInvitationError,
  acceptIndustryCustomerInvitationErrorMessage: state.notification.acceptIndustryCustomerInvitationErrorMessage,
  isDeclineIndustryCustomerInvitationSuccess: state.notification.isDeclineIndustryCustomerInvitationSuccess,
  isDeclineIndustryCustomerInvitationError: state.notification.isDeclineIndustryCustomerInvitationError,
  declineIndustryCustomerInvitationErrorMessage: state.notification.declineIndustryCustomerInvitationErrorMessage,
  isAcceptStaffInvitationSuccess: state.notification.isAcceptStaffInvitationSuccess,
  isAcceptStaffInvitationError: state.notification.isAcceptStaffInvitationError,
  acceptStaffInvitationErrorMessage: state.notification.acceptStaffInvitationErrorMessage,
  isDeclineStaffInvitationSuccess: state.notification.isDeclineStaffInvitationSuccess,
  isDeclineStaffInvitationError: state.notification.isDeclineStaffInvitationError,
  declineStaffInvitationErrorMessage: state.notification.declineStaffInvitationErrorMessage,
  isGetNotificationByIdSuccess: state.notification.isGetNotificationByIdSuccess,
  isGetNotificationByIdError: state.notification.isGetNotificationByIdError,
  getNotificationByIdErrorMessage: state.notification.getNotificationByIdErrorMessage,
  notificationById: state.notification.notificationById,
});

function mapDispatchToProps(dispatch) {
  return {
    makeSeen: () => dispatch(makeSeenRequest()),
    makeRead: (data) => dispatch(makeReadRequest(data)),
    acceptAppointment: (data) => dispatch(acceptAppointmentRequest(data)),
    cancelAppointment: (data) => dispatch(cancelAppointmentRequest(data)),
    resetNotifications: (data) => dispatch(resetNotificationsRequest(data)),
    acceptCustomerInvitation: (data) => dispatch(acceptCustomerInvitationRequest(data)),
    acceptIndustryCustomerInvitation: (data) => dispatch(acceptIndustryCustomerInvitationRequest(data)),
    declineCustomerInvitation: (data) => dispatch(declineCustomerInvitationRequest(data)),
    declineIndustryCustomerInvitation: (data) => dispatch(declineIndustryCustomerInvitationRequest(data)),
    acceptStaffInvitation: (data) => dispatch(acceptStaffInvitationFromNotificationRequest(data)),
    declineStaffInvitation: (data) => dispatch(declineStaffInvitationFromNotificationRequest(data)),
    getNotificationById: (data) => dispatch(getNotificationByIdRequest(data)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
