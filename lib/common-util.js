'use strict';

//let Uuidv4 = require('uuid/v4');
import * as Uuidv4 from 'uuid/v4'
import * as Base64 from 'base64-js';


export function base64UUIDv4() {
    let byteArray = new Uint8Array(16);
    Uuidv4(null, byteArray, 0);

    let base64String = Base64.fromByteArray(byteArray);

    let res = base64String.replace(/\/|\+|=/g, function (toReplace) {
        if (toReplace === '/') {
            return '_'
        } else if (toReplace === '+') {

            return '-'
        } else if (toReplace === '=') {
            return '';
        } else {
            throw new Error("invalid char in base64 uri conversion: " + toReplace);
        }

    });
    return res;

}


//TODO : excellent candidate for test case,
export function parseQueryStringToObject (queryString, parameterWhiteList)
{
    let parmHash = {};
    if ((queryString === null)
        || (queryString.length <2)
        || (queryString.charAt(0) !== '?') )
    {
        return parmHash;
    }
    queryString = queryString.substring(1); //strip  question mark indicator

    let parameterArray = queryString.split("&");


    let parmPair = null;

    parameterArray.forEach(function (parmSet) {
        parmPair = parmSet.split("=", 2);
        //strict check on valid strings sent, no overflow or bad chars etc
        parmPair[0] = decodeURIComponent(parmPair[0]);
        if (parameterWhiteList.includes(parmPair[0])) {
            parmHash[parmPair[0]] = parmPair[1];
            if (parmHash[parmPair[0]]) { //not null
                parmHash[parmPair[0]] = decodeURIComponent(parmHash[parmPair[0]]);
            }
        }
    });

    return parmHash;
};





