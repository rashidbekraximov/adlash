// src/format.js

export function formatNumber(number) {
    if (number === null || number === '') return '0';
    if (typeof value === 'string') {
        return parseFloat(number.replace(/,/g, ''));
    }
    return number;
}

export function formatNumberForAmount(value) {
    if (Number.isInteger(value)) {
        // If the value is an integer, return it as is with one decimal place
        return value.toFixed(1);
    } else {
        // If the value has decimals, return it as is with one decimal place
        return parseFloat(value).toFixed(1);
    }
}
// utils.js

export function convertNumericFieldsToNumbers(obj) {
    const convertedObj = { ...obj }; // Create a shallow copy of the object
    for (const key in convertedObj) {
        if (Object.prototype.hasOwnProperty.call(convertedObj, key)) {
            const value = convertedObj[key];
            if (typeof value === 'string' && value.match(/^\d{1,3}(,\d{3})*(\.\d+)?$/)) {
                // If the value is a string formatted as a number with commas, convert it
                convertedObj[key] = parseFloat(value.replace(/,/g, ''));
            }
        }
    }
    return convertedObj;
}
