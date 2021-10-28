import React, { useState, useCallback } from 'react';
//cmps
import EditModal from '../editModal';
import DeleteModal from '../delModal';

const TableListing = ({
    allAddressData,
    //
    updatePost,
    deletePost
}) => {

    //state
    const [ isShowEditModal, setIsShowEditModal ] = useState(false);
    const [ isShowDeleteModal, setIsShowDeleteModal ] = useState(false);
    const [ singleData, setSingleData ] = useState(null);
    //click n func
    const toggleEditModal = useCallback( _ => {
        setIsShowEditModal(prev => !prev)
    }, [ isShowEditModal ])
 
    const toggleDeleteModal = useCallback( _ => {
        setIsShowDeleteModal(prev => !prev)
    }, [ isShowDeleteModal ])

    return (
        <>
        
            <table className="striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Birth Date</th>
                        <th>Description</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
                        <th>DELETE</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        allAddressData?.map( data => {
                            const { _id, firstName, lastName, birthDate, description, email, phone } = data;
                            return (
                                <tr key={ _id }>
                                    <td>{ firstName }</td>
                                    <td>{ lastName }</td>
                                    <td>{ birthDate }</td>
                                    <td>{ description }</td>
                                    <td>{ email }</td>
                                    <td>{ phone }</td>
                                    <td
                                        onClick={ _ => {
                                            toggleEditModal();
                                            setSingleData(data)
                                        } }
                                    >{ "EDIT" }</td>
                                    <td
                                        onClick={ _ => {
                                            toggleDeleteModal();
                                            setSingleData(data)
                                        } }
                                    >{ "DELETE" }</td>
                                </tr>
                            )
                        } )
                    }
                </tbody>
            </table>
                {
                    isShowEditModal && <EditModal 
                        toggleEditModal = { toggleEditModal }
                        singleData={ singleData }
                        updatePost={ updatePost }
                        // deletePost={ deletePost }
                    />
                }
                {
                    isShowDeleteModal && <DeleteModal 
                        toggleDeleteModal = { toggleDeleteModal }
                        singleData={ singleData }
                        deletePost={ deletePost }
                        // deletePost={ deletePost }
                    />
                }
        </>
    )
}

export default TableListing
