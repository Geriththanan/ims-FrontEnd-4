import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubjects = createAsyncThunk('subjectApp/subjects/getSubjects', async () => {
  const response = await axios.get('http://ims-backend-4.test/api/subjects');
  const data = await response.data.subjects;
  return data;
});

export const removeSubjects = createAsyncThunk(
  'subjectApp/subjects/removeSubjects',
  async (selectedSubjectIds) => {
    await axios.delete('http://ims-backend-4.test/api/subjects/'+selectedSubjectIds);
    return selectedSubjectIds;
  }
);

const subjectsAdapter = createEntityAdapter({});

export const { selectAll: selectSubjects, selectById: selectSubjectsById } =
subjectsAdapter.getSelectors((state) => state.subjectApp.subjects);

const subjectsSlice = createSlice({
  name: 'subjectApp/subjects',
  initialState: subjectsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSubjectsSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getSubjects.fulfilled]: subjectsAdapter.setAll,
    [removeSubjects.fulfilled]: (state, action) =>
      subjectsAdapter.removeMany(state, action.payload),
  },
});

export const { setSubjectsSearchText } = subjectsSlice.actions;

export const selectSubjectsSearchText = ({ subjectApp }) => subjectApp.subjects.searchText;

export default subjectsSlice.reducer;
