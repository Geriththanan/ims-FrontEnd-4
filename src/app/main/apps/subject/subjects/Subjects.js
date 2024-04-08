import React from 'react'
import reducer from '../store';
import withReducer from 'app/store/withReducer';
import FusePageCarded from '@fuse/core/FusePageCarded';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import SubjectsTable from './SubjectsTable';
import SubjectsHeader from './SubjectsHeader';

function Subjects() {

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <FusePageCarded
      header={<SubjectsHeader/>}
      content={<SubjectsTable/>}
      scroll={isMobile ? 'normal' : 'content'}
    />
  )
}

export default withReducer('subjectApp', reducer)(Subjects);
