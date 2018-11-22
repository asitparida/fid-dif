import { AWSIdenityPoolID } from 'creds';

declare var AWS: any;

export const UpdateAWSConfig = function() {
    AWS.config.region = 'us-east-2'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: AWSIdenityPoolID
    });
};
