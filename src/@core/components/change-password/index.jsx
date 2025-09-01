import { Form, Button, Spinner, Card, CardBody } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import FormField from '@components/form-field'

const ChangePasswordForm = ({ control, errors, isSubmitting }) => {
  return (
    <>
      <FormField
        label="New Password"
        name="password"
        control={control}
        error={errors.password}
        render={({ field }) => (
          <InputPasswordToggle
            className="input-group-merge"
            {...field}
            invalid={!!errors.password}
            placeholder="Enter new password"
          />
        )}
      />
      <FormField
        label="Confirm new Password"
        name="confirmPassword"
        control={control}
        error={errors.confirmPassword}
        render={({ field }) => (
          <InputPasswordToggle
            className="input-group-merge"
            {...field}
            invalid={!!errors.confirmPassword}
            placeholder="Confirm new password"
          />
        )}
      />
      <Button.Ripple type="submit" color="primary">
        <div className="d-flex aiign-items-cente">
          {isSubmitting && (
            <>
              <Spinner size="sm" />
              &nbsp;{' '}
            </>
          )}
          Update
        </div>
      </Button.Ripple>
    </>
  )
}

export default ChangePasswordForm
