import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { getCourse, newCourse, resetCourse, selectCourse } from '../store/courseSlice';
import reducer from '../store';
import CourseHeader from './CourseHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a Course name')
    .min(5, 'The Course name must be at least 5 characters'),
});

function Course(props) {
  const dispatch = useDispatch();
  const course = useSelector(selectCourse);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();

  const [tabValue, setTabValue] = useState(0);
  const [noCourse, setNoCourse] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateCourseState() {

      const { courseId } = routeParams;

      if (courseId === 'new') {
        /**
         * Create New Course data
         */
        dispatch(newCourse());
      } else {
        /**
         * Get Course data
         */
        dispatch(getCourse(courseId)).then((action) => {
          /**
           * If the requested Course is not exist show message
           */
          if (!action.payload) {
            setNoCourse(true);
          }
        });
      }
    }

    updateCourseState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!course) {
      return;
    }
    /**
     * Reset the form on course state changes
     */
    reset(course);
  }, [course, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Course on component unload
       */
      dispatch(resetCourse());
      setNoCourse(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested courses is not exists
   */
  if (noCourse) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such course!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/Courses"
          color="inherit"
        >
          Go to Courses Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while Course data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (course && routeParams.courseId != course.id && routeParams.courseId != 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<CourseHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: 'w-full h-64 border-b-1' }}
            >
              <Tab className="h-64" label="Basic Info" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? 'hidden' : ''}>
                <BasicInfoTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? 'normal' : 'content'}
      />
    </FormProvider>
  );
}

export default withReducer('CourseApp', reducer)(Course);
