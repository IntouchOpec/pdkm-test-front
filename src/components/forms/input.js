import React from "react";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

export default ({field, label, form: { touched, err }}) => {
    const isError = (touched && err)
    return (
        <FormGroup >
            {label && <Label htmlFor={`${field.name}-${label}`}>{label}</Label>}
            <Input {...field} {...this.props} id={`${field.name}-${label}`} invalid={isError} />
            {isError && <FormFeedback>{err}</FormFeedback>}
        </FormGroup>
    )
}
