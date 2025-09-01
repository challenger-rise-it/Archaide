import { useContext, useEffect, useState } from 'react'
import Proptypes from 'prop-types'
import { useAuthCtx } from '@context/authContext'
import { useForm } from 'react-hook-form'
import { Button, Form, Input, Row, Col } from 'reactstrap'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Sidebar from '@components/sidebar'
import FormField from '@components/form-field'
import { Loader } from 'react-feather'
import { useProfileInfoCtx } from '@context/user/profileInfoContext'
import { useParams, useLocation } from 'react-router-dom'
import { PHONE_REGEX } from '@src/constants'

const SidebarNewUsers = ({ open, toggleSidebar, user, isCreate }) => {
  const { overview, usersInfo } = useProfileInfoCtx()
  const { userData, handleRegister } = useAuthCtx()
  const location = useLocation()
  const { id } = useParams()
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required().email(),
      phone: yup
        .string()
        .required()
        .matches(PHONE_REGEX, 'Not a valid phone number'),
      role: yup.string().required(),
      status: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'User',
      status: 'Active',
    },
  })

  const onSubmit = async (info) => {
    toggleSidebar()
    if (isCreate) {
      await handleRegister(info)
    } else {
      let userId = id !== undefined ? id : usersInfo.users.id
      if (location.pathname == '/admin/list') {
        usersInfo.updateUser(info, userData._id)
      } else {
        usersInfo.updateUser(info, userId)
      }
    }
  }

  useEffect(() => {
    if (user || isCreate) {
      setValue('name', isCreate ? '' : user.name)
      setValue('email', isCreate ? '' : user.email)
      setValue('phone', isCreate ? '' : user.phone)
      setValue('status', isCreate ? '' : user.status)
      setValue('role', isCreate ? '' : user.role)
    }
  }, [user])

  return (
    <Sidebar
      size="lg"
      open={open}
      title="Edit User"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form
        className="auth-register-form mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormField
          label="Full Name"
          name="name"
          control={control}
          error={errors.name}
          render={({ field }) => (
            <Input
              autoFocus
              type="text"
              placeholder="John Doe"
              invalid={!!errors.name}
              {...field}
            />
          )}
        />
        <Row>
          <Col>
            <FormField
              label="Email"
              name="email"
              control={control}
              error={errors.email}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="john@example.com"
                  invalid={!!errors.email}
                  {...field}
                />
              )}
            />
          </Col>
          <Col>
            <FormField
              label="Phone"
              name="phone"
              control={control}
              error={errors.phone}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="(+1)555-5555-5555"
                  invalid={!!errors.phone}
                  {...field}
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormField
              label="Role"
              name="role"
              control={control}
              error={errors.role}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="select"
                  invalid={!!errors.role}
                  {...field}
                >
                  <option value={'user'}>User</option>
                  <option value={'admin'}>Admin</option>
                  <option value={'superadmin'}>SuperAdmin</option>
                </Input>
              )}
            />
          </Col>
          <Col>
            <FormField
              label="Status"
              name="status"
              control={control}
              error={errors.status}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="select"
                  invalid={!!errors.status}
                  {...field}
                >
                  <option value={'active'}>Active</option>
                  <option value={'inactive'}>Inactive</option>
                </Input>
              )}
            />
          </Col>
        </Row>
        <Button.Ripple type="submit" block color="primary">
          {isSubmitting ? (
            <Loader className="spinner" size={18} />
          ) : isCreate ? (
            'Create'
          ) : (
            'Update'
          )}
        </Button.Ripple>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers

SidebarNewUsers.propTypes = {
  open: Proptypes.bool.isRequired,
  toggleSidebar: Proptypes.func.isRequired,
}
