const NodeGeocoder = require('node-geocoder');
const options ={
    provider: 'mapquest' ,   //process.env.GEOCODER_PROVIDER
    httpAdapter: 'https',
    apiKey:'z7RfyaRxeALMsZGbASGUFc3qvRbN4sGe', //process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder =NodeGeocoder(options);

module.exports=geocoder;