import axios from 'axios'; 
import envConstants from './constants';

export const sendRequest = (url, params = {}) => {
    const fullUrl = envConstants.production + url;
    return axios(fullUrl, params)
}

export const numberLabel = (labelValue) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + " B"
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + " M"
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + " K"

    : Math.abs(Number(labelValue));
}