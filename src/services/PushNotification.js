const admin = require("firebase-admin");
const configJsonFirebase = require("service-account-file");
const config = require("../utils/config")

const defaultAppConfig = {
    credential: admin.credential.cert(configJsonFirebase),
    databaseURL: config.MONGODB_URI
};
// Initialize the default app
admin.initializeApp(defaultAppConfig);

const sendNotification = (tokenDevice, title) => {

    let ios = {
        headers: {
            'apns-priority': '10', //mức độ ưu tiên khi push notification
            'apns-expiration': '360000'// hết hạn trong 1h
        },
        payload: {
            aps: {
                alert: {
                    title: title
                },
                badge: 1,
                sound: 'default',
            }
        }
    }
    let message = {
        apns: ios,
        token: tokenDevice // token của thiết bị muốn push notification
    }
    admin.messaging().send(message)
        .then((response) => {
            console.log("Send notification successfully", response)
        })
        .catch((error) => {
            console.error("Fail to send notify", error)
        });
}

module.exports = {
    sendNotification
}
