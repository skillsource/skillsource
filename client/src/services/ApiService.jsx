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

  getCourse: (id) => {
    return AuthService.fetch(`${AuthService.domain}/courses/${id}`,{
       method: 'GET',
    }).then(res => {
      return Promise.resolve(res);
    })
  },

  isEnrolled: (courseId) => {
    courseId = Number(courseId);
    return ApiService.getEnrollments().then((enrolledCourses)=>{
      for (var i = 0; i < enrolledCourses.length; i++) {
        if (courseId === enrolledCourses[i].id) {
          return true;
        }
      }
      return false;
    });
  },

  enroll: (courseId) => {
    return AuthService.fetch(`${AuthService.domain}/enrollments`, {
      method: 'POST',
      body: JSON.stringify({
        courseId: courseId
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  },

  getEnrollments: () => {
    return AuthService.fetch(`${AuthService.domain}/enrollments`, {
      method: 'GET',
    }).then(res => {
      return Promise.resolve(res)
    })
  },

  toggleCheckbox: (stepId, completed) => {
    return AuthService.fetch(`${AuthService.domain}/user-steps/?stepId=${stepId}&completed=${completed}`, {
      method: 'PATCH',
    }).then(res => {
      return Promise.resolve(res)
    })
  },

  getUserSteps: (courseId) => {
    return AuthService.fetch(`${AuthService.domain}/user-steps/?courseId=${courseId}`, {
      method: 'GET',
    }).then(res => {
      return Promise.resolve(res)
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




















