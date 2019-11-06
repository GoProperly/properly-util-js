const CommonUtil = require('./common-util')

const USER_ID_PATH = 'user.id';
const USER_EMAIL_PATH = 'user.email';

let gUserId = null;

const getUserId = () => {
  const storage = window.localStorage;

  if (!gUserId) {
    // try reading first
    gUserId = storage.getItem(USER_ID_PATH);
  }

  if (!gUserId) {
    // record in session
    gUserId = CommonUtil.base64UUIDv4();

    // store if created
    storage.setItem(USER_ID_PATH, gUserId);
  }

  return gUserId;
};

const updateUserId = (userId) => {
  const storage = window.localStorage;

  gUserId = userId;

  storage.setItem(USER_ID_PATH, gUserId);
};

// NOTE: when login successful, this userId might change (i.e. assign temporary
// on a new device, login restores permanent) consider using a listener pattern
// to notify the app of both the before and after Id so that analytics can be
// updated to relate them

const updateEmailAddress = (emailAddress) => {
  const storage = window.localStorage;

  storage.setItem(USER_EMAIL_PATH, emailAddress);
};

const getEmailAddress = () => {
  const storage = window.localStorage;

  const emailAddress = storage.getItem(USER_EMAIL_PATH);

  if (!emailAddress) {
    return null;
  }

  return emailAddress;
};

module.exports = {
  getUserId,
  updateUserId,
  updateEmailAddress,
  getEmailAddress,
}