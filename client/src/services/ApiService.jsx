import AuthService from '../components/AuthService.jsx';
import Browse from '../components/browse.jsx';

const ApiService = {
  browse: () => {
    // Grab all courses from database via authenticated fetch request.
    return AuthService.fetch(`${AuthService.domain}/courses`, {
      method: 'GET',
    }).then(res => {
      return Promise.resolve(res);
    });
  },
  createCourse: (name, description, rating, userid) => {
    // Get a token from api server using the fetch api
    return AuthService.fetch(`${AuthService.domain}/users`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        rating,
        userid
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  },
  createStep: () => {

  },
  addEnrollment: () => {

  },
  getEnrollments: (id) => {
    return AuthService.fetch(`${AuthService.domain}/getEnrollments/` + id, {
      method: 'GET'
    })
    .then(res => {
      return Promise.resolve(res);
    })
    .catch((error) => {
      console.log("error getting enrollments in ApiService:", error);
    })
  },
  deleteEnrollment: () => {

  },
  addRating: () => {

  },
  changeRating: () => {

  }
}

export default ApiService;




















