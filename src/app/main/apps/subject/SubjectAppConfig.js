import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Subject = lazy(() => import('./subject/Subject'));
const Subjects = lazy(() => import('./subjects/Subjects'));

const SubjectAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/subjects',
      element: <Subjects />,
    },
    {
      path: 'apps/subject/:subjectId/*',
      element: <Subject />,
    },
    //default
    {
      path: 'apps/subject',
      element: <Navigate to="Subjects" />,
    },
  ],
};

export default SubjectAppConfig;
