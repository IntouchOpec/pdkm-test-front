import React from "react";
import { FormFeedback, FormGroup, Label } from "reactstrap";
import Select from "react-select";
import SelectIcon from "../../../public/assets/icons/select.svg";

export default ({ field : { name, value }, label, field, form: { touched, errors }, placeholder }) => {
    const isError = touched && errors[name];
    const customStyles = {
        control: (base, state) => ({
          ...base,
          padding: "5px 8px !important",
          borderRadius: "0px",
          borderColor: state.isFocused ? "#e9ecef" : isError ? "#fa5838" : "#e9ecef",
          "&:hover": {
            borderColor: state.isFocused ? "#e9ecef" : isError ? "#fa5838" : "#e9ecef"
          }
        }),
        indicatorSeparator: (base, state) => ({})
    };
    return (
        <FormGroup>
          {label && <Label htmlFor={`${name}-${label}`}>{label}</Label>}
          <Select
            placeholder={placeholder}
            components={{ DropdownIndicator }}
            id={`${name}-${label}`}
            styles={customStyles}
            onBlur={() => field.onBlur(field.value)}
          />
          {isError && (
            <FormFeedback className="d-block" invalid>
              {errors[name]}
            </FormFeedback>
          )}
        </FormGroup>
    );   
}

const DropdownIndicator = props => {
    return (
      <div className="box-search-with-icon">
        <SelectIcon
          className="icon-search"
        />
      </div>
      
    );
};
