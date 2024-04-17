import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCourseIdName = createAsyncThunk('subjectApp/subject/getCourseIdName', async () => {
  const response = await axios.get(`http://ims-backend-4.test/api/coursesIdName`);
  const data = await response.data.coursesIdName;
  return data === undefined ? null : data;
});


const courseIdNameSlice = createSlice({
  name: 'subjectApp/courseIdName',
  initialState: null,
  reducers: {

  },
  extraReducers: {
    [getCourseIdName.fulfilled]: (state, action) => action.payload,
  },
});

export const selectCourseIdName = ({ subjectApp }) => subjectApp.courseIdName;

export default courseIdNameSlice.reducer;
