import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import { Formik, Form } from 'formik';
//
import Input from '../../../components/Input';
import TextArea from '../../../components/textArea';
import ButtonContained from '../../../components/button';
import { createPostSchema } from '../../../validation/validationSchema';

import Loader from '../partials/loader';
//context
// import AppContext from '../../store/context/context'
//api
import { api } from '../../../../api'

export default function CreatePost(props) {
    const history = useHistory();
    //loadr
    const [load, setLoad] = useState(false);
    return (
        <Formik
            validationSchema={ createPostSchema }
            initialValues={{
                firstName: "",
                lastName: "",
                birthDate: "",
                description: "",
                email: "",
                phone: '',
            }}
            onSubmit={(values, { resetForm }) => {
                setLoad(true);
                const { firstName, lastName, birthDate, description, email, phone } = values;
                const formBody = {
                    firstName, 
                    lastName, 
                    birthDate, 
                    description, 
                    email, 
                    phone
                }
                // console.log(values, ' fff')
                console.log(formBody, ' fff')
                // axios.post('http://localhost:5000/createpost', formBody, {
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('jwt')}`
                // }
                // })
                api.home.createPost(formBody)
                .then(res => {
                    console.log(res, ' ress')
                    setLoad(false)
                    M.toast({ html: res.data.message, classes: '#43a047 green darken-1' });
                    resetForm()
                    history.push('/')
                })
                .catch(err => {
                    console.log(err, ' err')
                    err && M.toast({ html: err.response.data.error, classes: '#c62828 red darken' })
                    setLoad(false)
                })
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
                            <h2 style={{ fontFamily: `Grand Hotel, cursive` }} className="center">Create Post</h2>

                            {/* form */}
                            <div className="row mx-auto col-sm-12" style={{ border: '', width: '80%' }}>
                                <Form className="col-sm-12 col-md-12" onSubmit={handleSubmit}>

                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>FirstName {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                placeholder="FirstName"
                                                type="text"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                error={touched.firstName && errors.firstName}
                                                errorText={errors.firstName}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>LastName {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                placeholder="LastName"
                                                type="text"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                error={touched.lastName && errors.lastName}
                                                errorText={errors.lastName}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>BirthDate {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <Input
                                                id="birthDate"
                                                name="birthDate"
                                                placeholder="BirthDate"
                                                type="date"
                                                value={values.birthDate}
                                                onChange={handleChange}
                                                error={touched.birthDate && errors.birthDate}
                                                errorText={errors.birthDate}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>
                                    
                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>Description {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <TextArea
                                                id="description"
                                                name="description"
                                                placeholder="description"
                                                type="text"
                                                value={values.description}
                                                onChange={handleChange}
                                                error={touched.description && errors.description}
                                                errorText={errors.description}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>
                                    
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
                                    
                                    <div className="form-row">
                                        <label style={{ top: '26px' }} className="col-sm-3 col-form-label"><b>Phone {' '}: </b></label>
                                        <div className="form-group col-md-7">
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="Phone"
                                                type="number"
                                                value={values.phone}
                                                onChange={handleChange}
                                                error={touched.phone && errors.phone}
                                                errorText={errors.phone}
                                                disabled={isSubmitting} />
                                        </div>
                                    </div>

                                    <ButtonContained buttonName="Create"
                                        disabled={isSubmitting} 
                                        loading={ load }
                                        />

                                </Form>
                            </div>

                        </div>

                    </div>
                )
            }}
        </Formik>
    )
}