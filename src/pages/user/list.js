import React, { useEffect, useState, useCallback } from "react"
import SearchUser from "components/form-layouts/search-user.js"
import axios from "axios";
import { Table, Button, Spinner } from "react-bootstrap"
import { userURL, userModel, userDetailURL } from "endpoint"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Pagination from "components/table/pagination.js"

export default () => {
    const [rows, setRows] = useState([])
    const [loader, setLoader] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    let LIMIT = 10

    useEffect(() => {
      axios({ method:'get', url: userURL}).then(res =>{
        setRows(res.data || [])
        setLoader(!loader)
      }).catch(error => { Swal.fire({ title: 'Error!', text: 'ไม่สามารถเชื่อมต่อ server ได้', icon: 'error', confirmButtonText: 'Cool'})})
    },[])
    
    const onPageChanged = useCallback(
      (event, page) => {
        event.preventDefault();
        setCurrentPage(page);
      },
      [currentPage]
    )
    if (rows.length < LIMIT) {

    }
    const currentUsers = rows.slice(
      (currentPage - 1) * LIMIT,
      (currentPage - 1) * LIMIT + LIMIT
    )

    const searchUser = datas => {
      setLoader(true)
      let queryString = Object.keys(datas).filter(v => {
        return datas[v] !== ""
      }).map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(datas[key])
      }).join('&')
      axios({ method:'get', url: `${userURL}?${queryString}`}).then(res =>{
        setRows(res.data || [])
        setLoader(false)
        setCurrentPage(1)
      })
      .catch(error => { Swal.fire({ title: 'Error!', text: 'ไม่สามารถเชื่อมต่อ server ได้', icon: 'error', confirmButtonText: 'Cool'})})
    }
    
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
            setRows(rows.filter(value => value.id !== id))
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'ลบผู้ใช้งานเรียบร้อย',
              showConfirmButton: false,
              timer: 1500
            })
          }).catch(error => { Swal.fire({ title: 'Error!', text: 'ไม่สามารถเชื่อมต่อ server ได้', icon: 'error', confirmButtonText: 'Cool'})})
        }
      })
    }
    return <div>
    <div>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                ค้นหา
                <Link to={`/${userModel}/create`}><Button className="w-100" variant="success">Create User</Button></Link>
                </div>
                <div className="card-body">
                    <SearchUser searchUser={searchUser}/>
                </div>
            </div>
          </div>
          <div className="col-md-6">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>first_name</th>
                <th>last_name</th>
                <th>email</th>
                <th>gender</th>
                <th>age</th>
                <th/>
              </tr>
            </thead>
            <tbody>
              {loader && <tr><td className="text-center" colSpan="7"><Spinner animation="border" /></td></tr>}
              {currentUsers.map(row => (
                <RowComponent key={row.first_name+row.last_name} row={row} deleteUser={deleteUser}/>
              ))}
            </tbody>
          </Table>
          <Pagination 
            totalRecords={rows.length}
            pageLimit={LIMIT}
            pageNeighbours={1}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
          </div>
        </div>
      </div>
    </div>    
}

const RowComponent = ({row,deleteUser}) => (
  <tr>
    <td>{row.id}</td>
    <td>{row.first_name}</td>
    <td>{row.last_name}</td>
    <td>{row.email}</td>
    <td>{row.gender}</td>
    <td>{row.age}</td>
    <td>
      <Link to={`/${userModel}/${row.id}`}><Button className="m-1" variant="primary"><FontAwesomeIcon icon={faSearch} /></Button></Link>
      <Link to={`/${userModel}/${row.id}/edit`}><Button className="m-1" variant="warning"><FontAwesomeIcon icon={faEdit} /></Button></Link>
      <Button onClick={() =>deleteUser(row.id)} className="m-1" variant="danger"><FontAwesomeIcon icon={faTrashAlt} /></Button>
    </td>
  </tr>)