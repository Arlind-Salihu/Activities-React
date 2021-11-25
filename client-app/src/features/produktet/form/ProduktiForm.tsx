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
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Produkti } from "../../../app/models/produkti";

export default observer(function ProduktiForm() {
  const history = useHistory();
  const { produktiStore } = useStore();
  const { createProdukti, updateProdukti,
    loading, loadProdukti, loadingInitial,} = produktiStore;
  const { id } = useParams<{ id: string }>();

  const [produkti, setProdukti] = useState<Produkti>({
    id: '',
    emri: '',
    kategoria: '',
    brendi: '',
    data: null,
    pershkrimi: '',
    cmimi: null
  });

  const validationSchema = Yup.object({
    emri: Yup.string().required('Fusha per Emrin e produktit është e nevojshme!'),
    kategoria: Yup.string().required('Fusha per Kategorine e produktit është e nevojshme!'),
    data: Yup.string().required('Fusha per Datën e produktit është e nevojshme!').nullable(),
    brendi: Yup.string().required(),
    pershkrimi: Yup.string().required(),
    cmimi: Yup.number().required()
  })

  useEffect(() => {
    if (id) loadProdukti(id).then(produkti => setProdukti(produkti!));
  }, [id, loadProdukti]);

  function handleFormSubmit(produkti: Produkti) {
    if (produkti.id.length === 0) {
      let newProdukti = {
        ...produkti,
        id: uuid(),
      };
      createProdukti(newProdukti).then(() =>
        history.push(`/produktet/${newProdukti.id}`)
      );
    } else {
      updateProdukti(produkti).then(() =>
        history.push(`/produktet/${produkti.id}`)
      );
    }
  }

  if (loadingInitial) return <LoadingComponent content="Te dhenat e produktit jane duke u hapur!"/>

  return (
    <Segment clearing>
      <Header content={"Te Dhenat e Prduktit"} sub color='teal'/>
      <Formik validationSchema={validationSchema} enableReinitialize initialValues={produkti} onSubmit={values => handleFormSubmit(values)}>
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name='emri' placeholder='Emri'/>
            <MySelectInput options={categoryOptions} placeholder="Kategoria" name="kategoria"/>
            <MyTextInput placeholder="Brendi" name="brendi"/>
            <MyDateInput  placeholderText="Data" name="data" showTimeSelect timeCaption='time' dateFormat='d MMMM, yyyy h:mm aa'/>
            <MyTextArea rows={3} placeholder="Pershkrimi" name="pershkrimi"/>
            <MyTextInput placeholder="Cmimi" name="cmimi"/>
            <Button disabled={isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content="Submit"/>
            <Button as={Link} to='/produktet' floated="right" type="button" content="Cancel"/>
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
