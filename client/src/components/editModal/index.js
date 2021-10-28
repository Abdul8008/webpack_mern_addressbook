import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
//
import { Formik, Form } from 'formik';
//
import Input from '../Input';
import TextArea from '../textArea';
import ButtonContained from '../button';
import { createPostSchema } from '../../validation/validationSchema';
//api
import { api } from '../../../api';

const EditModal = ({
    singleData,
    toggleEditModal,
    //
    updatePost
}) => {
    const history = useHistory();
    //loadr
    const [load, setLoad] = useState(false);
    return (
        <div
            className={"Modal"}>
            <section className="Modal-main">
                <div>
                    <Formik
                        validationSchema={createPostSchema}
                        initialValues={{
                            firstName: singleData?.firstName,
                            lastName: singleData?.lastName,
                            birthDate: singleData?.birthDate,
                            description: singleData?.description,
                            email: singleData?.email,
                            phone: singleData?.phone,
                        }}
                        onSubmit={(values, { resetForm }) => {
                            setLoad(true);
                            const { firstName, lastName, birthDate, description, email, phone } = values;
                            const formBody = {
                                postId: singleData?._id,
                                firstName,
                                lastName,
                                birthDate,
                                description,
                                email,
                                phone
                            }
                            updatePost(formBody, toggleEditModal);
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
                                    <div className="card mx-auto" style={{ width: '60%', margin: '20px auto', padding: '20px' }}>
                                        <h5 style={{ fontFamily: `Grand Hotel, cursive` }} className="center">Edit Post</h5>
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

                                                <ButtonContained buttonName="Update"
                                                    disabled={isSubmitting}
                                                    loading={load}
                                                />

                                            </Form>
                                        </div>

                                    </div>

                                </div>
                            )
                        }}
                    </Formik>

                </div>
            </section>
        </div>
    )
}

export default EditModal;
