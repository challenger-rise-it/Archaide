import { Controller } from 'react-hook-form'
import Proptypes from 'prop-types'
import { FormGroup, Label, FormText } from 'reactstrap'

const FormField = ({ name, label, error, render, control }) => {
  return (
    <FormGroup>
      <Label className="form-label">{label}</Label>
      <Controller name={name} control={control} render={render} />
      <FormText color="danger">{error && error.message}</FormText>
    </FormGroup>
  )
}

export default FormField

FormField.propTypes = {
  name: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  error: Proptypes.object,
  control: Proptypes.any.isRequired,
  render: Proptypes.func,
}
