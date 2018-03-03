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
    return AuthService.fetch(`${AuthService.domain}/enrollments`, {
      method: 'GET'
    })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
  },
  deleteEnrollment: () => {

  },
  addRating: () => {

  },
  changeRating: () => {

  },
  getCommentsForCourse: (courseId) => {
    return AuthService.fetch(`${AuthService.domain}/comments?courseId=` + courseId, {
      method: 'GET'
    })
    .then((response) => {
      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
  },
  addComment: (courseId, comment) => {
    return AuthService.fetch(`${AuthService.domain}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        courseId: courseId,
        commentText: comment
      })
    })
    .then((response) => {

      return Promise.resolve(response);
    })
    .catch((error) => {
      return Promise.reject(error);
    })
  }
}

export default ApiService;




















