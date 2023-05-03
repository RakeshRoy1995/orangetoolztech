"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueArrayBaseOnPhoneNumber = exports.formatPhoneNumber = exports.formatSuccess = exports.formatError = void 0;
const formatError = (msg) => ({
    errors: [
        {
            msg,
        },
    ],
});
exports.formatError = formatError;
const formatSuccess = (data) => ({
    success: true, data
});
exports.formatSuccess = formatSuccess;
const formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '');
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
};
exports.formatPhoneNumber = formatPhoneNumber;
const uniqueArrayBaseOnPhoneNumber = (data) => {
    // Create a Set of unique values based on a phone field
    let uniqueSet = new Set(data.map((item) => item.phone));
    // Create an array of unique objects based on the phone field
    return [...uniqueSet].map((phone) => {
        return data.find((item) => item.phone === phone);
    });
};
exports.uniqueArrayBaseOnPhoneNumber = uniqueArrayBaseOnPhoneNumber;
