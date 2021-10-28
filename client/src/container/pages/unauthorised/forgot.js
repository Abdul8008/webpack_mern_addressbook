import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import M from 'materialize-css'

import { Formik, Form } from 'formik';
import { Link, useHistory } from 'react-router-dom';

import Input from '../../../components/Input'
import ButtonContained from '../../../components/button';
// import { loginSchema } from '../../../validation/validationSchema';

import AppContext from '../../../store/context/context'
//auth
import { fakeAuth } from '../../../components/protected'

const Forgot = (props) => {
    const history = useHistory();
    const { state, userData } = useContext(AppContext)
    
    return (
        <Formik
            // validationSchema={ ForgotSchema }
            initialValues={{
                email: '',
            }}
            onSubmit={(values, { resetForm }) => {
                const formBody = {
                    email: values.email,
                }
                console.log(formBody, ' fff')
                axios.post('http://localhost:5000/forgotpassword', formBody)
                .then(res => {
                    if(res.status == 200){
                        console.log(res, ' ress')
                        // userData(res.data.user)
                        // fakeAuth.authenticate()
                        // localStorage.setItem('jwt', res.data.token)
                        // localStorage.setItem('user', JSON.stringify(res.data.user))
                        // fakeAuth.authenticate()
                        M.toast({html: res.data.message, classes: '#43a047 green darken-1' });
                        // history.push('/login')
                    }
                })
                 .catch(err => err && M.toast({html: err.response.data.error, classes: '#c62828 red darken' }))   
                // resetForm()
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
                isSubmitting,
                setFieldValue

            }) => {

                return (
                    <div>
                        {/* <button onClick={() => console.log(state, ' sss')}>USER</button> */}
                        <div className="card mx-auto" style={{ width: '60%', margin: '20px auto', padding: '20px' }}>
                            <h2 style={{ fontFamily: `Grand Hotel, cursive` }} className="center">Forgot Password</h2>

                            {/* form */}
                            <div className="row mx-auto col-sm-12" style={{ border: '', width: '80%' }}>
                                <Form className="col-sm-12 col-md-12" onSubmit={handleSubmit}>

                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>Email {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <Input
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                type="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                error={touched.email && errors.email}
                                                errorText={errors.email}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>

                                    <ButtonContained buttonName="Reset"
                                        disabled={isSubmitting} />

                                </Form>
                            </div>

                        </div>

                    </div>
                )
            }}
        </Formik>
    )
}
export default Forgot