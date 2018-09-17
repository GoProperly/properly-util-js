import * as CommonUtil from "./common-util.js";

const USER_ID_PATH = "user.id";
const USER_EMAIL_PATH = "user.email";
//const USER_FULL_NAME_PATH = "user.fullName";

var gUserId = null;

export function getUserId() {
    var storage = window.localStorage;

    if (!(gUserId ))
    {
        //try reading first
        gUserId = storage.getItem(USER_ID_PATH);
    }

    if (!(gUserId)) {
        // record in session
        gUserId = CommonUtil.base64UUIDv4();

        //store if created
        storage.setItem(USER_ID_PATH, gUserId);
    }
    return gUserId;
};

export function updateUserId(userId) {
    var storage = window.localStorage;

    gUserId = userId;

    storage.setItem(USER_ID_PATH, gUserId);
}

//NOTE: when login successful, this userId might change (i.e. assign temporary on a new device, login restores permanent)
//consider using a listener pattern to notify the app of both the before and after Id so that analytics can be updated to relate them

export function updateEmailAddress(emailAddress) {
    var storage = window.localStorage;

    storage.setItem(USER_EMAIL_PATH, emailAddress);
};

export function getEmailAddress() {
    var storage = window.localStorage;

    var emailAddress = storage.getItem(USER_EMAIL_PATH);

    if (!(emailAddress)) {return null;}

    return emailAddress;
};
