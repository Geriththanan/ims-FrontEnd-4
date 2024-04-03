import React from 'react'
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import FusePageCarded from '@fuse/core/FusePageCarded';
import CoursesHeader from './CoursesHeader';
import CoursesTable from './CoursesTable';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

function Courses() {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<CoursesHeader/>}
      content={<CoursesTable/>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('CourseApp', reducer)(Courses);
