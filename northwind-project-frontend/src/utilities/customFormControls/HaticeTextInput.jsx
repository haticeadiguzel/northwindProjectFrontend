import { useField } from "formik";
import React from "react";
import { FormField, Label } from "semantic-ui-react";

export default function HaticeTextInput({ ...props }) {
  //reflect api
  const [field, meta] = useField(props);
  return (
    <div>
      <FormField error={meta.touched && !!meta.error}>
        <input {...field} {...props} />
        {meta.touched && !!meta.error ? (
          <Label pointing basic color="red" content={meta.error}></Label>
        ) : null}
      </FormField>
    </div>
  );
}
