const CryptoJS = require("crypto-js");
const fs = require("fs");

const secretKey = "bir key belirleyin";

function encryptData(data) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encryptData(value)}${expires}; path=/; Secure; HttpOnly; SameSite=Strict`;
}

const userData = {
    userID: crypto.randomUUID(),
    sessionID: Math.random().toString(36).substring(2),
    ipAddress: "192.168.1.1",
    location: { lat: null, long: null },
    deviceInfo: navigator.userAgent,
    browserLang: navigator.language,
    screenSize: { width: window.innerWidth, height: window.innerHeight },
    lastVisit: new Date().toISOString(),
    securityFlags: {
        csrfProtection: true,
        xssProtection: true,
        clickjackingProtection: true,
    },
    sitePreferences: {
        darkMode: false,
        fontSize: "medium",
        notifications: true,
    },
    interactionData: {
        pagesVisited: [],
        formSubmissions: 0,
        buttonsClicked: 0,
    }
};

fs.writeFileSync("cookiesData.json", JSON.stringify(userData, null, 4));

setCookie("UserData", userData, 30);
setCookie("SessionID", userData.sessionID, 7);
setCookie("Security", userData.securityFlags, 7);
