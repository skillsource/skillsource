import AuthService from './AuthService.js';
import Browse from '../components/browse.jsx';

const ApiService = {
  browse: () => AuthService.fetch('/courses', { method: 'GET' }),

  createCourse: (name, description, steps) => {
    return AuthService.fetch('/courses', {
      method: 'POST',
      body: {
        name,
        description,
        steps
      }
    });
  },

  getCourse: (id) => AuthService.fetch(`/courses/${id}`, { method: 'GET' }),

  isEnrolled: (courseId) => {
    return ApiService.getEnrollments()
      .then(enrollments => {
        for (var i = 0; i < enrollments.length; i++) {
          if (Number(courseId) === enrollments[i].id) {
            return true;
          }
        }
        return false;
      });
  },

  toggleEnrollment: (courseId) => {
    return AuthService.fetch('/enrollments', {
      method: 'POST',
      body: { courseId }
    });
  },

  getEnrollments: () => AuthService.fetch('/enrollments', { method: 'GET' }),

  toggleCheckbox: (stepId, completed) => {
    return AuthService.fetch(`/user-steps?stepId=${stepId}&completed=${completed}`, {
      method: 'PATCH'
    });
  },

  getUserSteps: (courseId) => {
    return AuthService.fetch(`/user-steps?courseId=${courseId}`, {
      method: 'GET'
    });
  },

  rate: (courseId, rating) => {
    return AuthService.fetch('/enrollments/rating', {
      method: 'PATCH',
      body: { courseId, rating }
    });
  },

  getCommentsForCourse: (courseId) => {
    return AuthService.fetch(`/comments?courseId=${courseId}`, {
      method: 'GET'
    });
  },

  addComment: (courseId, text) => {
    return AuthService.fetch('/comments', {
      method: 'POST',
      body: { courseId, text }
    });
  }
}

export default ApiService;
