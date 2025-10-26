import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import { awsConfig } from '@/config/aws-config';

const userPool = new CognitoUserPool({
  UserPoolId: awsConfig.userPoolId,
  ClientId: awsConfig.userPoolClientId,
});

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export const signUp = (data: SignUpData): Promise<any> => {
  return new Promise((resolve, reject) => {
    const attributeList = [];
    userPool.signUp(
      data.email,
      data.password,
      attributeList,
      [],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      }
    );
  });
};

export const signIn = (data: SignInData): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password,
    });

    const cognitoUser = new CognitoUser({
      Username: data.email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        resolve(session);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const signOut = (): void => {
  const cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) {
    cognitoUser.signOut();
  }
};

export const getCurrentUser = (): CognitoUser | null => {
  return userPool.getCurrentUser();
};

export const getSession = (): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUser();
    if (!cognitoUser) {
      reject(new Error('No current user'));
      return;
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        reject(err);
        return;
      }
      if (session) {
        resolve(session);
      } else {
        reject(new Error('No session'));
      }
    });
  });
};

export const getIdToken = async (): Promise<string> => {
  const session = await getSession();
  return session.getIdToken().getJwtToken();
};

export const confirmSignUp = (email: string, code: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

export const resendConfirmationCode = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};
