import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

export default ({submit, user}) => {
  const { register, handleSubmit, setValue, errors } = useForm();
    if (user) {
      setValue("first_name", user.first_name)
      setValue("last_name", user.last_name)
      setValue("email", user.email)
      setValue("age", user.age)
      setValue("gender", user.gender)
    }
    const onSubmit = datas => {
        submit(datas)
    } 
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="m-1 col-md-5 col-sm-12">
            <Form.Control
              placeholder="ชื่อ"
              name="first_name"
              ref={register({ required: "Required" })}
            />
          {errors.first_name && errors.first_name.message}
       </div>
       <div className="m-1 col-md-6 col-sm-12">
            <Form.Control
              placeholder="นามสกุล"
              name="last_name"
              ref={register({ required: "Required" })}
            />
          {errors.last_name && errors.last_name.message}
       </div>
       
       <div className="m-1 col-md-5 col-sm-12">
            <Form.Control
              placeholder="อีเมล์"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "invalid email address"
                }
              })}
              name="email"
            />
            {errors.email && errors.email.message}
       </div>
       <div className="m-1 col-md-3 col-sm-5">
            <Form.Control
              placeholder="อายุ"
              ref={register({ required: "Required",pattern: {
                value: /^[0-9]/i,
                message: "invalid email address"
              } })}
              name="age"
            />
            {errors.age && errors.age.message}
       </div>
        <div className="m-1 col-md-3 col-sm-12">
          <Form.Control name="gender" as="select" ref={register({ required: "Required" })} >
            <option value="">เพศ</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
          </Form.Control>
          {errors.gender && errors.gender.message}
       </div>
       <div className="col-md-12 col-sm-12">
        <Button type="submit" className="m-1" variant="primary">Submit</Button>
      </div>
    </div>
    </form>
    )
}
