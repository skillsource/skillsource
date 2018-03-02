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
  createCourse: (name, description, creatorId, url, steps) => {
    return AuthService.fetch(`${AuthService.domain}/courses`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        url,
        steps
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  },
  addEnrollment: () => {

  },
  getEnrollments: () => {

  },
  deleteEnrollment: () => {

  },
  addRating: () => {

  },
  changeRating: () => {

  }
}

export default ApiService;




















