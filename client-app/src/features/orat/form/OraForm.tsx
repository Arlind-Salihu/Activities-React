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
import { categoryOptionsOrat } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Ora } from "../../../app/models/ora";

export default observer(function OraForm() {
  const history = useHistory();
  const { oraStore } = useStore();
  const { createOra, updateOra,
    loading, loadOra, loadingInitial,} = oraStore;
  const { id } = useParams<{ id: string }>();

  const [ora, setOra] = useState<Ora>({
    id: '',
    emri: '',
    kategoria: '',
    brendi: '',
    data: null,
    pershkrimi: '',
    cmimi: null
  });

  const validationSchema = Yup.object({
    emri: Yup.string().required('Fusha per Emrin e orat është e nevojshme!'),
    kategoria: Yup.string().required('Fusha per Kategorine e orat është e nevojshme!'),
    data: Yup.string().required('Fusha per Datën e orat është e nevojshme!').nullable(),
    brendi: Yup.string().required(),
    pershkrimi: Yup.string().required(),
    cmimi: Yup.number().required()
  })

  useEffect(() => {
    if (id) loadOra(id).then(ora => setOra(ora!));
  }, [id, loadOra]);

  function handleFormSubmit(ora: Ora) {
    if (ora.id.length === 0) {
      let newOra = {
        ...ora,
        id: uuid(),
      };
      createOra(newOra).then(() =>
        history.push(`/orat/${newOra.id}`)
      );
    } else {
      updateOra(ora).then(() =>
        history.push(`/orat/${ora.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Te dhenat e orat jane duke u hapur!"/>

  return (
    <Segment clearing>
      <Header content={"Te Dhenat e Ores"} sub color='teal'/>
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={ora} onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='emri' placeholder='Emri i Ores'/>
            <MySelectInput options={categoryOptionsOrat} placeholder="Kategoria e Ores" name="kategoria"/>
            <MyTextInput placeholder="Brendi i Orave" name="brendi"/>
            <MyDateInput  placeholderText="Data" name="data" showTimeSelect timeCaption='time' dateFormat='d MMMM, yyyy h:mm aa'/>
            <MyTextArea rows={3} placeholder="Pershkrimi i Ores" name="pershkrimi"/>
            <MyTextInput placeholder="Cmimi i Ores" name="cmimi"/>
            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit"/>
            <Button as={Link} to='/orat' floated="right" type="button" content="Cancel"/>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
