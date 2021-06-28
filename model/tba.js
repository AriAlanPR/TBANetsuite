//imports
const crypto = require('crypto');

//values of the class
//generated random values to use as identifiers unique
let nonce = crypto.randomBytes(16).toString('base64');
let date = new Date();
let timestamp = date.getTime(); 

//generated for example netsuite instance case
var organization = '1234567';

const Consumer_key = '';
const Consumer_secret = '';
const http_Method = 'POST';
let base_Uri = () => {
    return `https://${organization}.restlets.api.netsuite.com/rest/requesttoken`;
}

const encode_signature = () => {
    return {
        http_method: http_Method,
        base_uri: encodeURIComponent(base_Uri()),
        rp_to_normalize: { //request parameters to normalize
            oauth_callback: 'https://...',
            oauth_consumer_key: Consumer_key,
            oauth_nonce: nonce,
            oauth_signature_method: 'HMAC-SHA256',
            oauth_timestamp: timestamp.toString(),
            oauth_version: '1.0',
            // role: ''
        }
    }
}

module.exports.set_organization = (org) => {
    this.organization = org;
}

module.exports.digest1 = (basestring) => {
    let digest = crypto.createHmac('sha256', `${Consumer_secret}&`).update(basestring).digest("base64");

    return digest;
}

module.exports.iterate_signature = {
    from_params: (data) => { //requires an object data with the following: { http_method: ?, base_uri: ?, rp_to_normalize: ?} where ? means any value that can be assigned to an object property
        let container = new Array();

        for (const [key, value] of Object.entries(data.rp_to_normalize)) {
            console.log(`${key}: ${value}`);
            container.push(`${key}=${value}`);
        }
        
        let normalized_parameters = encodeURIComponent(container.join('&'));
        return `${data.http_method}&${data.base_uri}&${normalized_parameters}`;
    },

    from_base: () => {
        let container = new Array();

        for (const [key, value] of Object.entries(encode_signature().rp_to_normalize)) {
            console.log(`${key}: ${value}`);
            container.push(`${key}=${value}`);
        }
        
        let normalized_parameters = encodeURIComponent(container.join('&'));
        return `${encode_signature().http_method}&${encode_signature().base_uri}&${normalized_parameters}`;
    }
}
