const axios = require('axios');
const prompt = require('prompt-sync')();
const fs = require('fs');
const path = require('path');


const creds = require('./creds');

let accessTokenUrl = 'https://login.salesforce.com/services/oauth2/token';
let getOrgInfoUrl = 'https://2xm5rfl2q0.execute-api.us-east-2.amazonaws.com/v1/orginfo';

let accessToken = '';
let awsApiPrefix = '';
let fileInfoIds = 'a1G4W00000OsUGD';
let signedUrl = '';
let pathName = path.resolve(__dirname, '/Users/avibaitelman/Desktop/Docrio-Files-From-Axios', 'myDocrioFilenumber4.jpg');

//const singleFileInfoId = prompt('Finish Auth. Please enter a File Info Id');
//console.log(`Hey there ${nam);

//async get access token - working
  async function getAccessToken() {
    try {
      const response = await axios.post(accessTokenUrl, {}, {params: creds});
      return response.data.access_token;
    } catch (error) {
      console.error('in error' + error.message);
    }
  }
//async get aws prefix - working
  async function getAwsApiPrefix() {
    try {
      const response = await axios.get(getOrgInfoUrl, {headers: {Authorization: 'Bearer ' + accessToken}});
      return response.data.AwsApiPrefix;
    } catch (error) {
      console.error('in error' + error.message);
    }
  }
//async get signed url  - working
  async function getSignedUrl() {
    try {
      const response = await axios({
          method: 'GET', 
          url: awsApiPrefix + '/files',
          headers: {Authorization: 'Bearer ' + accessToken},
          params: {Id:fileInfoIds}
      });
      return response.data.Records[0].SignedUrl;
    } catch (error) {
      console.error('in file error' + error.message);
    }
  }

  //get files - works
  async function getFiles() {
    try {
      const response = await axios({ 
        method: 'GET', 
        url: signedUrl, 
        responseType: 'stream'});

      response.data.pipe(fs.createWriteStream(pathName));

    } catch (error) {
      console.error('in file error___________' + error.message);
    }
  }

//call all functions
async function callAllFunctions(){
    accessToken = await getAccessToken();
    awsApiPrefix = await getAwsApiPrefix();
    signedUrl = await getSignedUrl();
    getFiles();
    
}

//execute functions called from runner
 callAllFunctions();


//interceptors for troubleshooting
  axios.interceptors.request.use(config => {
    return config;
  }, error => {
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    return response;
  }, error => {
    return Promise.reject(error);
  });


