import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSubject = createAsyncThunk('subjectApp/subject/getSubject', async (subjectId) => {
  const response = await axios.get(`http://ims-backend-4.test/api/subjects/${subjectId}`);
  const data = await response.data.subject;

  return data === undefined ? null : data;
});

export const removeSubject = createAsyncThunk(
  'subjectApp/subject/removeSubejct',
  async ({ getState }) => {
    const { id } = getState().SubjectApp.subject;
    await axios.delete('http://ims-backend-4.test/api/subjects/'+id);  //http://ims-backend-4.test/api/subjects/2
    return id;
  }
);

export const saveSubject = createAsyncThunk(
  'subjectApp/subject/saveSubject',
  async (subjectData) => {

    const response = await axios.post('http://ims-backend-4.test/api/subjects', subjectData);
    const data = await response.data.subject;
    return data;
  }
);

export const updateSubject = createAsyncThunk(
  'subjectApp/subject/updateSubject',
  async (subjectData) => {
    const response = await axios.put('http://ims-backend-4.test/api/subjects/'+subjectData.id, subjectData);
    const data = await response.data.subject;
    return data;
  }
);

const subjectSlice = createSlice({
  name: 'subjectApp/subject',
  initialState: null,
  reducers: {
    resetSubject: () => null,
    newSubject: {
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
    [getSubject.fulfilled]: (state, action) => action.payload,
    [saveSubject.fulfilled]: (state, action) => action.payload,
    [updateSubject.fulfilled]: (state, action) => action.payload,
    [removeSubject.fulfilled]: (state, action) => null,
  },
});

export const { newSubject, resetSubject } = subjectSlice.actions;

export const selectSubject = ({ subjectApp }) => subjectApp.subject;

export default subjectSlice.reducer;
