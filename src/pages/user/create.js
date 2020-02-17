import React from "react";
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import Form from "components/form-layouts/user.js"
import { userModel, userURL } from "endpoint"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTable } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default () => {
    let history = useHistory()
    const onSubmit = data => {
        data.age = parseInt(data.age, 10)
        axios({
            method:'post',
            data,
            url: userURL,
        }).then(function(res){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'เพิ่มผู้ใช้งานเรียบร้อย',
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
                <Card.Header as="h5"><Link to={`/${userModel}`}><Button className="m-1" variant="success"><FontAwesomeIcon icon={faTable} />Table</Button></Link>Create User</Card.Header>
                <Card.Body>
                    <Card.Title>เพิ่มผู้ใช้งาน</Card.Title>
                    <Form submit={onSubmit}/>
                </Card.Body>

            </Card>
        </div>
    )
}
