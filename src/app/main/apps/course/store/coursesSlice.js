import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCourses = createAsyncThunk('courseApp/courses/getCourses', async () => {
  const response = await axios.get('http://ims-backend-4.test/api/courses');
  const data = await response.data.courses;
  return data;
});

export const removeCourses = createAsyncThunk(
  'courseApp/courses/removeCourses',
  async (selectedCourseIds) => {
    await axios.delete('http://ims-backend-4.test/api/courses/'+selectedCourseIds);
    return selectedCourseIds;
  }
);

const coursesAdapter = createEntityAdapter({});

export const { selectAll: selectCourses, selectById: selectCoursesById } =
coursesAdapter.getSelectors((state) => state.CourseApp.courses);

const coursesSlice = createSlice({
  name: 'courseApp/courses',
  initialState: coursesAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setCoursesSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getCourses.fulfilled]: coursesAdapter.setAll,
    [removeCourses.fulfilled]: (state, action) =>
      coursesAdapter.removeMany(state, action.payload),
  },
});

export const { setCoursesSearchText } = coursesSlice.actions;

export const selectCoursesSearchText = ({ CourseApp }) => CourseApp.courses.searchText;

export default coursesSlice.reducer;
