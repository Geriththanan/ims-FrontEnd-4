import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Course = lazy(() => import('./course/Course'));
const Courses = lazy(() => import('./courses/Courses'));

const CourseAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/course/courses',
      element: <Courses />,
    },
    {
      path: 'apps/course/courses/:courseId/*',
      element: <Course />,
    },
    //default
    {
      path: 'apps/courses',
      element: <Navigate to="Courses" />,
    },
  ],
};

export default CourseAppConfig;
