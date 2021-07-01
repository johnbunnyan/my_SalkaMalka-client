// action types
export const SIGNIN = "SIGNIN";
export const SETACCESSTOKEN = "SETACCESSTOKEN";
export const SETQUERYSTRING = "SETQUERYSTRING";

export const userSignIn = (data) => {
  const { email, userId, accessToken, provider } = data;
  console.log(data)
  return {
    type: SIGNIN,
    payload: {
        isSignIn: true,
        accessToken: accessToken,
        userId: userId,
        email: email,
        provider: provider
    }
  }
}

export const setAccessToken = (accessToken) => {
  return {
    type: SETACCESSTOKEN,
    payload: {
      accessToken: accessToken
    }
  }
}

export const setQueryString = (queryString) => {
  return {
    type: SETQUERYSTRING,
    payload: {
        queryString: queryString
    }
  }
}