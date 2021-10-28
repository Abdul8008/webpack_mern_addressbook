import React, { useEffect, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import M from 'materialize-css';
//cmps
import TableListing from '../../../components/tableListing';
//loader
import AppContext from '../../../store/context/context';
//api
import { api } from '../../../../api';

export default function Home({ }) {
    const { state: { user }, updateData } = useContext(AppContext);
    const [allAddressData, setAllAddressData] = useState([]);
    const [inpChange, setInpChange] = useState("");

    const deletePost = (postId, cb) => {
        api.home.deletePost(postId)
            .then(res => {
                if (res?.status == 200) {
                    const newData = allAddressData.filter(i => i._id !== res.data.data._id);
                    M.toast({ html: res.data.message, classes: '#43a047 red darken-1' });
                    setAllAddressData(newData);
                    cb();
                }
            }).catch(err => console.log(err, ' errr'))
    }

    const updatePost = (data, cb) => {
        api.home.updatePost(data)
            .then(res => {
                console.log(res, ' ressss')
                if (res?.status == 200) {
                    const newData = allAddressData.map((i => {
                        if (i._id == res.data.data._id) {
                            return res.data.data
                        } else {
                            return i
                        }
                    }));
                    M.toast({ html: res.data.message, classes: '#43a047 green darken-1' });
                    setAllAddressData(newData);
                    cb();
                }
            }).catch(err => console.log(err, ' errr'))
    }

    const filterAllAddress = useMemo(
        () =>
            allAddressData.filter(items => {
                return (
                    items.firstName
                        ?.replace(/\s+/g, '')
                        .toLowerCase()
                        .indexOf(inpChange.replace(/\s+/g, '').toLowerCase()) !== -1 ||
                    items.lastName
                        ?.replace(/\s+/g, '')
                        .toLowerCase()
                        .indexOf(inpChange.replace(/\s+/g, '').toLowerCase()) !== -1 ||
                    items.email
                        ?.replace(/\s+/g, '')
                        .toLowerCase()
                        .indexOf(inpChange.replace(/\s+/g, '').toLowerCase()) !== -1 ||
                    items.phone
                        ?.replace(/\s+/g, '')
                        .toLowerCase()
                        .indexOf(inpChange.replace(/\s+/g, '').toLowerCase()) !== -1
                );
            }),
        [allAddressData, inpChange]
    );

    //async
    useEffect(_ => {
        axios.get('http://localhost:5000/mypost', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
            // api.home.allPost()
            // api.home.individualPost()
            .then(res => {
                if (res.status == 200) {
                    setAllAddressData(res.data.result)
                }
            }).catch(err => {
                if (err) {
                    console.log(err, ' all post')
                }
            })
    }, [])

    console.log(filterAllAddress, ' filterAllAddress')
    return (
        <div className="" style={{ position: "relative" }}>
            <div style={{ width: "80%", margin: "0 auto 20px auto"}}>
                <input
                    type="text"
                    value={inpChange}
                    onChange={e => setInpChange(e.target.value)}
                    placeholder="Search by FirstName, LastName, Email or Phone Number"
                />
            </div>

            <div>
                <TableListing
                    // allAddressData={ allAddressData }
                    allAddressData={filterAllAddress}
                    //
                    updatePost={updatePost}
                    deletePost={deletePost}
                />
            </div>

        </div>
    )
}