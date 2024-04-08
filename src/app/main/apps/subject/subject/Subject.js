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
import { getSubject, newSubject, resetSubject, selectSubject } from '../store/subjectSlice';
import reducer from '../store';
import SubjectHeader from './SubjectHeader';
import BasicInfoTab from './tabs/BasicInfoTab';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a Subject name')
    .min(5, 'The Subject name must be at least 5 characters'),
});

function Subject(props) {
  const dispatch = useDispatch();
  const subject = useSelector(selectSubject);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  const routeParams = useParams();

  const [tabValue, setTabValue] = useState(0);
  const [noSubject, setNoSubject] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateSubjectState() {

      const { subjectId } = routeParams;

      if (subjectId === 'new') {
        /**
         * Create New Subject data
         */
        dispatch(newSubject());
      } else {
        /**
         * Get Subject data
         */
        dispatch(getSubject(subjectId)).then((action) => {
          /**
           * If the requested Subject is not exist show message
           */
          if (!action.payload) {
            setNoSubject(true);
          }
        });
      }
    }

    updateSubjectState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!subject) {
      return;
    }
    /**
     * Reset the form on subject state changes
     */
    reset(subject);
  }, [subject, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Subject on component unload
       */
      dispatch(resetSubject());
      setNoSubject(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested subjects is not exists
   */
  if (noSubject) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such subject!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/subject/Subjects"
          color="inherit"
        >
          Go to Subjects Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while Subject data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (subject && routeParams.subjectId != subject.id && routeParams.subjectId != 'new')
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
      <FusePageCarded
        header={<SubjectHeader />}
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

export default withReducer('SubjectApp', reducer)(Subject);
