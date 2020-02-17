import React, { useEffect, useState } from "react";
import { userDetailURL, userModel } from "endpoint"
import axios from "axios";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTable, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";

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
      const deleteUser = id => {
        Swal.fire({
          title: 'ต้องการลบผู้ใช้งาน?',
          text: "ยืนยันการลบผู้ใช้งาน!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
            axios({ method:'DELETE', url:  userDetailURL.replace(":id", id)}).then(res =>{
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'ลบผู้ใช้งานเรียบร้อย',
                showConfirmButton: false,
                timer: 1500
              })
              history.replace(`/`)
            }).catch(error => { Swal.fire({ title: 'Error!', text: 'ไม่สามารถเชื่อมต่อ server ได้', icon: 'error', confirmButtonText: 'Cool'})})
          }
        })
      }
    return <div>
        <Card>
            <Card.Header as="h5">User Detail</Card.Header>
            <Card.Body>
                <Card.Title>{data.first_name} {data.last_name}</Card.Title>
                <Card.Text>
                    <div>email: {data.email}</div>
                    <div>gender: {data.gender}</div>
                    <div>age: {data.age} year</div>
                </Card.Text>
                <Link to={`/${userModel}`}><Button className="m-1" variant="success"><FontAwesomeIcon icon={faTable} />Table</Button></Link>
                <Link to={`/${userModel}/${data.id}/edit`}><Button className="m-1" variant="warning"><FontAwesomeIcon icon={faEdit} />Edit</Button></Link>
                <Button onClick={() => deleteUser(data.id)} className="m-1" variant="danger"><FontAwesomeIcon icon={faTrashAlt} />Delete</Button>
            </Card.Body>
        </Card>
    </div>
}

