const admin = require("firebase-admin");
const configJsonFirebase = require("../config/service-account-file.json")
const config = require("../utils/config")

const defaultAppConfig = {
    credential: admin.credential.cert(configJsonFirebase),
    databaseURL: config.MONGODB_URI
};
// Initialize the default app
admin.initializeApp(defaultAppConfig);

const sendNotification = (tokenDevices, body, data) => {

    let ios = {
        headers: {
            'apns-priority': '10', //mức độ ưu tiên khi push notification
            'apns-expiration': '360000'// hết hạn trong 1h
        },
        payload: {
            aps: {
                alert: {
                    title: "New notification from Event Booking App"
                },
                badge: 1,
                sound: 'default',
            }
        }
    }
    let message = {
        token: tokenDevices, // token của thiết bị muốn push notification
        notification:{
            "title": "New notification from Event Booking App",
            "body": body
        },
        data : data,
        apns: ios,
    }
    admin.messaging().sendMulticast(message)
        .then((response) => {
            console.log("Send notification successfully", response)
        })
        .catch((error) => {
            console.error("Fail to send notification", error)
        });
}

module.exports = {
    sendNotification
}
