import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCourse = createAsyncThunk('courseApp/course/getCourse', async (courseId) => {
  const response = await axios.get(`http://ims-backend-4.test/api/courses/${courseId}`);
  const data = await response.data.course;

  return data === undefined ? null : data;
});

export const removeCourse = createAsyncThunk(
  'courseApp/course/removeCourse',
  async ({ getState }) => {
    const { id } = getState().CourseApp.course;
    await axios.delete('http://ims-backend-4.test/api/courses/'+id);  //http://ims-backend-4.test/api/courses/2
    return id;
  }
);

export const saveCourse = createAsyncThunk(
  'courseApp/course/saveCourse',
  async (courseData) => {

    const response = await axios.post('http://ims-backend-4.test/api/courses', courseData);
    const data = await response.data.course;
    return data;
  }
);

export const updateCourse = createAsyncThunk(
  'courseApp/course/updateCourse',
  async (courseData) => {
    const response = await axios.put('http://ims-backend-4.test/api/courses/'+courseData.id, courseData);
    const data = await response.data.course;
    return data;
  }
);

const courseSlice = createSlice({
  name: 'courseApp/course',
  initialState: null,
  reducers: {
    resetCourse: () => null,
    newCourse: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: '',
          name: '',
          description: '',
        },
      }),
    },
  },
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => action.payload,
    [saveCourse.fulfilled]: (state, action) => action.payload,
    [updateCourse.fulfilled]: (state, action) => action.payload,
    [removeCourse.fulfilled]: (state, action) => null,
  },
});

export const { newCourse, resetCourse } = courseSlice.actions;

export const selectCourse = ({ CourseApp }) => CourseApp.course;

export default courseSlice.reducer;
