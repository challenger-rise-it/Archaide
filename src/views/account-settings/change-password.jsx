import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Button, Spinner, Card, CardBody } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import FormField from '@components/form-field'

import { useAuthCtx } from '@context/authContext'
import ChangePasswordForm from '../../@core/components/change-password'

const ChangePassword = () => {
  const { updatePassword } = useAuthCtx()
  const SignupSchema = yup.object().shape({
    password: yup.string().required().min(5, 'Must be more than 5 characters.'),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref(`password`), null], 'Passwords must match'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (value) => {
    updatePassword({ password: value.password })
  }

  return (
    <Card>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ChangePasswordForm
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        </Form>
      </CardBody>
    </Card>
  )
}

export default ChangePassword
