const admin = require("firebase-admin");
const configJsonFirebase = require("../config/service-account-file.json")

const defaultAppConfig = {
    credential: admin.credential.cert(configJsonFirebase)
};
// Initialize the default app
admin.initializeApp(defaultAppConfig);

const sendNotification = (tokenDevice, body, data) => {
    let message = {
        token: tokenDevice, // token của thiết bị muốn push notification
        notification: {
            "title": "New notification from Event Booking App",
            "body": body
        },
        data: data,
    }

    admin.messaging().send(message)
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
