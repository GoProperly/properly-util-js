import * as Uuidv4 from 'uuid/v4';
import * as Base64 from 'base64-js';

export const base64UUIDv4 = () => {
  const byteArray = new Uint8Array(16);
  Uuidv4(null, byteArray, 0);

  const base64String = Base64.fromByteArray(byteArray);

  const res = base64String.replace(/\/|\+|=/g, (toReplace) => {
    if (toReplace === '/') {
      return '_';
    }

    if (toReplace === '+') {
      return '-';
    }

    if (toReplace === '=') {
      return '';
    }

    throw new Error(`invalid char in base64 uri conversion: ${toReplace}`);
  });

  return res;
}

// TODO : excellent candidate for test case,
export const parseQueryStringToObject = (queryString, parameterWhiteList) => {
  const parmHash = {};
  if ((queryString === null)
        || (queryString.length < 2)
        || (queryString.charAt(0) !== '?')) {
    return parmHash;
  }
  queryString = queryString.substring(1); // strip question mark indicator

  const parameterArray = queryString.split('&');

  let parmPair = null;

  for (const parmSet of parameterArray) {
    parmPair = parmSet.split('=', 2);
    // strict check on valid strings sent, no overflow or bad chars etc
    parmPair[0] = decodeURIComponent(parmPair[0]);
    if (parameterWhiteList.includes(parmPair[0])) {
      parmHash[parmPair[0]] = parmPair[1];
      if (parmHash[parmPair[0]]) { // not null
        parmHash[parmPair[0]] = decodeURIComponent(parmHash[parmPair[0]]);
      }
    }
  }

  return parmHash;
};
