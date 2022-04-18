import { ErrorMessage, Form, Formik } from 'formik'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Header, Label } from 'semantic-ui-react'
import MyTextInput from '../../app/common/form/MyTextInput'
import { useStore } from '../../app/stores/store'

export default observer (function LoginForm () {
    const {userStore} = useStore();
    return (
        <Formik initialValues={{email: '', password: '', error: null}} onSubmit={(values, {setErrors}) => 
        userStore.login(values).catch(error=> setErrors({error: error.response.data}))}>
            {({handleSubmit, isSubmitting, errors}) =>(
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    <Header mobile={16} tablet={8} computer={5} as='h2' content='Sign In' color='teal' textAlign='center'/>
                    <MyTextInput name='email' placeholder='Email'/>
                    <MyTextInput name='password' placeholder='Password' type='password'/>
                    <ErrorMessage name='error' render={() => <Label mobile={16} tablet={8} computer={5} style={{marginBottom: 10}} basic color='red' content={errors.error}/>}/>
                    <Button mobile={16} tablet={8} computer={5} loading={isSubmitting} positive content='Sign in' type='submit' fluid/>
                </Form>
            )}
        </Formik>
    )
})
