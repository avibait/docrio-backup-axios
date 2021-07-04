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
let tempSignedUrl = 'https://683ef0de-2535-47e1-88d4-f4ba3eeee906-us-east-2-documents.s3.us-east-2.amazonaws.com/a1G4W00000OsUGDUA3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASTJHEZOAAG524YZD%2F20210704%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210704T233022Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDcaCXVzLWVhc3QtMiJIMEYCIQD2UMJR9nmdLSkNLruaWfBvLX23EPF%2Fc%2BOLTPXXWgUrFQIhAKaPfJocI6xGjoxkqfQgBQDCf30V4VxPLo07mob4xPIOKrQCCCEQABoMMTc4ODYwMTE2ODY0Igyv748SdWIA%2FEWrlDEqkQKSWgN3xEHHiL89VrCfUKnz273jcDk9k4go60DuAAgcZLG6w0DEmOshJLBvHJ%2FUKiEih2F10VHV012yFt%2B%2FdzdhS9To99voKYeqAXTtfjElLeZ%2FO4Sg4drfofSdH7T8FCMWNqKiyGXuA%2BcQWvSsDodGwfrsjJBdwQOTwvBfh9miQ8HWofJu%2Fq%2BzteHoOhgR10JrvFSoFpyYBKoZZ8K3zoGBZUTeVN%2Fb8Z9c98CEk66PRmK2cuu7LTzIL%2F5oOXmXaH7A1UNb4k3vdeXuoE1iHhew9096CjDlO1JyDqUbmtiQsaJmnvIwCkGJiWbHk42CXzM%2FNWnJkWajb3mIEXqQFSQHVLFNSON5NXtAaz4dXkI7JfowrIaJhwY6mQFuoTsCcy5wRXlJ4EX3dOu1H7GUtA1y9WR3aX94engcHPUX6tR%2BXwH2ncyvREpW%2FxSqJBCvsljebmZ6MIS%2BdqVCzC9%2FWZrHbq%2F%2F1jRx1MLr4MjmAr%2FvpGUfZKX5xk7NvWV4CRmgYu7pTiX3ExVYdlEWesx1gObvd9cu%2B1YBoWHeDZl9BQGJxydYdJQtwnHf8mgnFlcgX2fBswM%3D&X-Amz-Signature=2a2ca6b0404c2e5f2bd382fd65e189bbff50a16c811613a5bb5ca9f1066a385d&X-Amz-SignedHeaders=host'
let pathName = path.resolve(__dirname, '/Users/avibaitelman/Desktop/Docrio-Files-From-Axios', 'myDocrioFilenumber5.jpg');

//const singleFileInfoId = prompt('Finish Auth. Please enter a File Info Id');
//console.log(`Hey there ${nam);

//async - working
  async function getAccessToken() {
    try {
      const response = await axios.post(accessTokenUrl, {}, {params: creds});
      //console.log(response.data);
      return response.data.access_token;
    } catch (error) {
      console.error('in error' + error.message);
    }
  }
//async - working
  async function getAwsApiPrefix() {
    try {
      const response = await axios.get(getOrgInfoUrl, {headers: {Authorization: 'Bearer ' + accessToken}});
      //console.log(response.data);
      return JSON.stringify(response.data.AwsApiPrefix);
    } catch (error) {
      console.error('in error' + error.message);
    }
  }
//async - get signed url not working yet due to URL concatenation not formatting string correctly when adding  "/files" to the end
  async function getSignedUrl() {
    try {

    temp = 'https://api.178860116864.genesisapi.com/v1/files';
      //const response = await axios.get(temp,{headers: {Authorization: 'Bearer ' + accessToken}, params:  {Id: fileInfoIds}});
      const response = await axios({
          method: 'GET', 
          url: 'https://api.178860116864.genesisapi.com/v1/files', 
          headers: {Authorization: 'Bearer ' + accessToken},
          params: {Id:fileInfoIds}
      });
      console.log(response.data.Records[0].SignedUrl);
      return JSON.stringify(response.data.Records[0].SignedUrl);
    } catch (error) {
      console.error('in file error' + error.message);
    }
  }

  //get files - works
  async function getFiles() {
    try {
   

      const response = await axios({ 
        method: 'GET', 
        url: 'https://683ef0de-2535-47e1-88d4-f4ba3eeee906-us-east-2-documents.s3.us-east-2.amazonaws.com/a1G4W00000OsUGDUA3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIASTJHEZOAFGTOM4JC%2F20210704%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20210704T235038Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDgaCXVzLWVhc3QtMiJGMEQCIHCnkvRtWEUB4gh26LkuqViqAQX70XpTNFK6tyRRxkxVAiACVf0O795IhegQE%2FrtVQsP2hu1SNyJGWL%2FU5roVpsjhCq0AgghEAAaDDE3ODg2MDExNjg2NCIMx4Drh8Ukr6iFI0%2B2KpECvFJ0NEe9YuoO%2Byf7mg3%2Bj%2FCpG21ZPe006Xitm7AA%2BeF458E9uf2aMGeQJ9FyZiaNdUmLZviWKchvNpncnYhKwWkK2VHZHoysWD2KZkfuqvhSsGRvbahCgzHr89%2FrGSufPAZEa2p7CQ3Ginr0PFSYi0CKvzih1I3W3ojHUrI%2BJCyK7q3ia%2BsvfsQBMMRlIuLJCz9h%2Fl9ryGBffPlgtXx6FtzrEivs6V7jINfqW7BXsE6YrP1h%2Fuxa7ZRuvdsfBOcfRVxNFdN4zrFnG26MykA2w752uxH2OAWvNFTwWPeop%2FaHfnEObFRm%2F2YB%2F%2BZ8rkdEvzjaAN9%2FUyxle8RbUdVzzCF2jj4Xv8vFIOWYG5SBihkIMMySiYcGOpsB0oojxsqRipVoiv8qS623fVxffBzus9LiavRf6HpI2Vi98WFCzp0VvmABPO86i%2FvrssRSFb3C4Yr9wsQGDxfjTro7zovvVmmkTdsuyLDPUhxizW%2BtsWa%2FQLVRanYOOBGrhcQpL0tsqf5I9UHwo%2BnBKLumzdGKLqRcGJMUyPyppva3%2BFBP9TUhYLakuwruKGAtxtxjGK0wMyf5QmM%3D&X-Amz-Signature=62b6276020c38c1d839ca270bade34e8c4a2d4ba1198dc0abee1fcf60f17784a&X-Amz-SignedHeaders=host',
        responseType: 'stream'});

      response.data.pipe(fs.createWriteStream(pathName));
      
   
      //return JSON.stringify(response.data);
    } catch (error) {
      console.error('in file error___________' + error.message);
    }
  }



//call all functions
async function callAllFunctions(){
    accessToken = await getAccessToken();
    awsApiPrefix = await getAwsApiPrefix();
 
    signedUrl = await getSignedUrl();
    console.log('here is url' + signedUrl);
   
    getFiles();
    
}

//execute functions
if(!accessToken){
 callAllFunctions();

} else {
    //get files

}

//interceptors for troubleshooting
axios.interceptors.request.use(config => {
    // perform a task before the request is sent
    console.log('Request was sent' + JSON.stringify(config));
  
    return config;
  }, error => {
    // handle the error
    console.log('in intercepted error')
    return Promise.reject(error);
  });

  axios.interceptors.response.use((response) => {
    // do something with the response data
    console.log('Response was received');
  
    return response;
  }, error => {
    // handle the response error
    return Promise.reject(error);
  });


