import { combineReducers } from '@reduxjs/toolkit';
import course from './courseSlice';
import courses from './coursesSlice';

const reducer = combineReducers({
  course,
  courses,
});

export default reducer;
