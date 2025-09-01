import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Button, Spinner, Card, CardBody } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import FormField from '@components/form-field'
import { useAuthCtx } from '@context/authContext'

import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import ChangePasswordForm from '../../@core/components/change-password'

const ChangePassword = () => {
  const { userData, getAuth, updatePassword } = useAuthCtx()
  const chagePasswordSchema = yup.object().shape({
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
    resolver: yupResolver(chagePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    getAuth()
  }, [isSubmitting])

  if (userData && userData?.hasResetPassword) {
    if (userData.onboarding?.isSkipped || userData.onboarding?.isCompleted) {
      return <Navigate to="/" />
    } else {
      return <Navigate to="/onboarding" />
    }
  }

  const onSubmit = async (value) => {
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
