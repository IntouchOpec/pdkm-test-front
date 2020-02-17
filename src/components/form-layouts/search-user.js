import React from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";

export default ({searchUser}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = datas => {
    searchUser(datas)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="m-1 col-md-12 col-sm-12">
            <Form.Control
              placeholder="id"
              name="id"
              ref={register}
            />
        </div>
        <div className="m-1 col-md-12 col-sm-12">
            <Form.Control
              placeholder="ชื่อ"
              name="first_name"
              ref={register}
            />
       </div>
       <div className="m-1 col-md-12 col-sm-12">
            <Form.Control
              placeholder="นามสกุล"
              name="last_name"
              ref={register}
            />
       </div>
       
       <div className="m-1 col-md-12 col-sm-12">
            <Form.Control
              placeholder="อีเมล์"
              ref={register}
              name="email"
            />
       </div>
       <div className="m-1 col-md-5 col-sm-5">
            <Form.Control
              placeholder="จากอายุ"
              ref={register}
              name="min_age"
            />
       </div>
       <div className="m-1 col-md-5 col-sm-5">
            <Form.Control
              placeholder="ถึงอายุ"
              ref={register}
              name="max_age"              
            />
       </div>
        <div className="m-1 col-md-12 col-sm-12">
          <Form.Control name="gender" as="select" ref={register} >
            <option value="">เพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </Form.Control>
       </div>
       <div className="col-md-12 col-sm-12">
        <Button type="submit" className="m-1" variant="primary"><FontAwesomeIcon icon={faSearch} />Search</Button>
      </div>
    </div>
    </form>
  );
}
