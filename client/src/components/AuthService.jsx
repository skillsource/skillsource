import decode from 'jwt-decode';

const AuthService = {
  domain: 'http://localhost:3000',
  login: (email, password) => {
    // Get a token from api server using the fetch api
    return AuthService.fetch(`${AuthService.domain}/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).then(res => {
      AuthService.setToken(res.token); // Setting the token in localStorage
      AuthService.setTokenForUserID(res.user_id); // Setting the user_id in localStorage
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log("error during login:", error);
    })
  },
  signup: (username, password, email) => {
    // Get a token from api server using the fetch api
    return AuthService.fetch(`${AuthService.domain}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email
      })
    }).then(res => {
      AuthService.setTokenForUserID(res.user_id);
      AuthService.setToken(res.token); // Setting the token in localStorage
      return Promise.resolve(res);
    })
  },
  loggedIn: () => {
    // Checks if there is a saved token and it's still valid
    const token = AuthService.getToken() // Getting token from localstorage
    return !!token && !AuthService.isTokenExpired(token) // handwaiving here
  },
  isTokenExpired: (token) => {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      } else {
        return false
      }
    }
    catch (err) {
      return false;
    }
  },
  setToken: (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken)
  },
  setTokenForUserID: (id) => {
    localStorage.setItem('user_id', id);
  },
  getToken: () => {
    // Retrieves the user token from localStorage
    const token = localStorage.getItem('id_token');
    return token;
  },
  logout: () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('user_id');
  },
  getProfile: () => {
    // Using jwt-decode npm package to decode the token
    return decode(AuthService.getToken());
  },
  fetch: (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (AuthService.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + AuthService.getToken()
    }

    return fetch(url, {headers, ...options})
      .then(AuthService._checkStatus)
      .then(response => response.json())
  },
  _checkStatus: (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error;
    }
  }
}

export default AuthService;




















