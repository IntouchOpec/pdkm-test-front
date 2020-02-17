import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import Form from "components/form-layouts/user.js"
import axios from "axios";
import { useHistory } from "react-router-dom";
import { userModel, userDetailURL } from "endpoint"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default ({ match }) => {
    let history = useHistory()

    const [data, setData] = useState({})
    useEffect(() => {
        axios({
          method:'get',
          url: userDetailURL.replace(":id", match.params.id),
        }).then(function(res){
            setData(res.data)
        }).catch(function(error){
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        });
      },[])

    const submit = data => {
        data.age = parseInt(data.age, 10)

        axios({
            method:'put',
            data,
            url: userDetailURL.replace(":id", match.params.id),
        }).then(function(res){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'แก้ไขผู้ใช้งานเรียบร้อย',
                showConfirmButton: false,
                timer: 1500
            })
            history.replace(`/${userModel}/${res.data.id}`);
        }).catch(function(error){
            Swal.fire({
                title: 'Error!',
                text: 'Do you want to continue',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
        })
    }
    return (
        <div>
            <Card>
                <Card.Header as="h5"> <Link to={`/${userModel}`}><Button className="m-1" variant="success"><FontAwesomeIcon icon={faTable} />Table</Button></Link>Edit User</Card.Header>
                <Card.Body>
                    <Card.Title>แก้ไขข้อมูลผู้ใช้งาน</Card.Title>
                    <Form user={data} submit={submit}/>
                </Card.Body>
            </Card>
        </div>
    )
}
