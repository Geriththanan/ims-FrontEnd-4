import { combineReducers } from '@reduxjs/toolkit';
import subject from './subjectSlice';
import subjects from './subjectsSlice';

const reducer = combineReducers({
  subject,
  subjects,
});

export default reducer;
