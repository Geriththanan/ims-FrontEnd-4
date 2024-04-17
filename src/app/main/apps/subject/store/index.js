import { combineReducers } from '@reduxjs/toolkit';
import subject from './subjectSlice';
import subjects from './subjectsSlice';
import  courseIdName from './courseIdNameSlice';

const reducer = combineReducers({
  subject,
  subjects,
  courseIdName
});

export default reducer;
