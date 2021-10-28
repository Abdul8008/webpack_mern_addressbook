import React from 'react';

const DelModal = ({
    singleData,
    toggleDeleteModal,
    //
    deletePost
}) => {
    return (
        <div className="Modal">
            <section 
                className="Modal-main"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column"
                }}    
            >
                <h5>{`Are you sure want to delete ${ singleData?.firstName } ${ singleData?.lastName }  ?`}</h5>
                <div>
                    <button
                        className="waves-effect waves-light btn"
                        onClick={ _ => toggleDeleteModal() }
                    >Close</button>
                    <button
                        className="waves-effect waves-light btn red"
                        style={{ marginLeft: "10px"}}
                        onClick={ _ => deletePost(singleData?._id, toggleDeleteModal) }
                    >DELETE</button>
                </div>

            </section>            
        </div>
    )
}

export default DelModal
