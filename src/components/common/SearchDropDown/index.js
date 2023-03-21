import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./dropdown.css";

function SearchDropDown({
  options,
  onChange,
  onDelete,
  values,
  required,
  disabled,
}) {
  return (
    <div>
      <Autocomplete
        disabled={disabled}
        required={required}
        disablePortal
        id="combo-box-demo"
        options={options || []}
        size="small"
        fullWidth
        renderInput={(params) => <TextField {...params} />}
        onChange={(event, value) => onChange(value)}
      />
      <div className="dropdown-values">
        {values.map((value) => {
          return (
            <div disabled={disabled} onClick={() => onDelete(value, "delete")}>
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchDropDown;
