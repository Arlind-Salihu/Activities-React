import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, Segment, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptionsLaptopat } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Laptopi } from "../../../app/models/laptopi";

export default observer(function LaptopiForm() {
  const history = useHistory();
  const { laptopiStore } = useStore();
  const { createLaptopi, updateLaptopi,
    loading, loadLaptopi, loadingInitial,} = laptopiStore;
  const { id } = useParams<{ id: string }>();

  const [laptopi, setLaptopi] = useState<Laptopi>({
    id: '',
    emri: '',
    kategoria: '',
    brendi: '',
    data: null,
    pershkrimi: '',
    cmimi: null
  });

  const validationSchema = Yup.object({
    emri: Yup.string().required('Fusha per Emrin e laptopit është e nevojshme!'),
    kategoria: Yup.string().required('Fusha per Kategorine e laptopit është e nevojshme!'),
    data: Yup.string().required('Fusha per Datën e laptopit është e nevojshme!').nullable(),
    brendi: Yup.string().required(),
    pershkrimi: Yup.string().required(),
    cmimi: Yup.number().required()
  })

  useEffect(() => {
    if (id) loadLaptopi(id).then(laptopi => setLaptopi(laptopi!));
  }, [id, loadLaptopi]);

  function handleFormSubmit(laptopi: Laptopi) {
    if (laptopi.id.length === 0) {
      let newLaptopi = {
        ...laptopi,
        id: uuid(),
      };
      createLaptopi(newLaptopi).then(() =>
        history.push(`/laptopat/${newLaptopi.id}`)
      );
    } else {
      updateLaptopi(laptopi).then(() =>
        history.push(`/laptopat/${laptopi.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Te dhenat e laptopit jane duke u hapur!"/>

  return (
    <Segment clearing>
      <Header content={"Te Dhenat e Laptopit"} sub color='teal'/>
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={laptopi} onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='emri' placeholder='Emri i Laptopit'/>
            <MySelectInput options={categoryOptionsLaptopat} placeholder="Kategoria e Laptopit" name="kategoria"/>
            <MyTextInput placeholder="Brendi i Laptopit" name="brendi"/>
            <MyDateInput  placeholderText="Data" name="data" showTimeSelect timeCaption='time' dateFormat='d MMMM, yyyy h:mm aa'/>
            <MyTextArea rows={3} placeholder="Pershkrimi i Laptopit" name="pershkrimi"/>
            <MyTextInput placeholder="Cmimi i Laptopit" name="cmimi"/>
            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit"/>
            <Button as={Link} to='/laptopat' floated="right" type="button" content="Cancel"/>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
