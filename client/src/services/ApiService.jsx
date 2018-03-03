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
  createCourse: (name, description, steps) => {
    return AuthService.fetch(`${AuthService.domain}/courses`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        description,
        steps
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  },
  changeEnrollment: () => {

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




















