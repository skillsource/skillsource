import React from "react";
import Snippet from './snippet.jsx';
import ApiService from '../services/ApiService.jsx';

const Dashboard = (props) => {
  // const courses = [{
  //         id: 1,
  //         name: 'Learn Javascript',
  //         description: 'Learn vanilla javascript in 30 days or less',
  //         rating: '****' },
  //         {
  //         id: 2,
  //         name: 'Swim like Michael Phelps',
  //         description: 'Master the techniques perfected by the master of swim.',
  //         rating: '*****' },
  //         {
  //         id: 3,
  //         name: 'Play the ukelele',
  //         description: 'Learn how to play the uke through youtube videos, perfectly ordered by level of difficulty.',
  //         rating: '***' }
  //       ]
  let user_id = localStorage.getItem("user_id");
  console.log("user_id:", user_id)
  // ApiService.getEnrollments(user_id)
  //   .then((response) => {
  //     console.log("response in call to getEnrollments:", response)
  //   })
  //   .catch((error) => {
  //     console.log("error in getEnrollments call:", error)
  //   })


  // const snippets = courses.map((course) => {
  //     return (
  //       <Snippet
  //         key={course.id}
  //         data={course}/>
  //     )
  //   });

  // return (
  //   <div className="dashboard">
  //       <h3>You are enrolled in:</h3>
  //       {snippets}
  //   </div>
  // );
  return (
    <div></div>
    );
}

export default Dashboard;