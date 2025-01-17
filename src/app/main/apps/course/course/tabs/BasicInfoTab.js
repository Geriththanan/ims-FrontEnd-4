import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const routeParams = useParams();
  const { courseId } = routeParams;

  useEffect(()=>{
    console.log(courseId);
  },[courseId])

  return (
    <div>
      {courseId !== "new" && 
        <Controller
          name="id"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              disabled
              label="Course ID"
              autoFocus
              id="id"
              variant="outlined"
              fullWidth
            />
          )}
        />
      }
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
          />
        )}
      />
      
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />

    </div>
  );
}

export default BasicInfoTab;
