import { Fragment, useState, useEffect } from 'react'
import { useSkin } from '@hooks/useSkin'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useAuthCtx } from '@context/authContext'
import { Link, Navigate } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub, Loader } from 'react-feather'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
//** reactstrap */
import {
  Row,
  Col,
  CardTitle,
  CardText,
  FormGroup,
  Button,
  Form,
  Input,
  CustomInput,
  Label,
  Alert,
} from 'reactstrap'

import AppCollapse from '@components/app-collapse'
import _ from 'lodash'

import FormField from '@components/form-field'
import logo from '@src/assets/images/logo/archaide_logo.jpeg'
import { COUNTRIES, PHONE_REGEX } from '@src/constants'

const ReferrerCollapse = ({ data }) => (
  <AppCollapse data={data} className="p-0" />
)
const Register = () => {
  const [skin] = useSkin()
  const dispatch = useDispatch()
  const [fbMsg, setFbMsg] = useState(null)
  const [term, setTerm] = useState(false)
  const { handleRegister } = useAuthCtx()
  const { userData } = useAuthCtx()

  const schema = yup
    .object({
      name: yup
        .string()
        .matches(
          /^[a-z0-9\-_]+$/,
          'Only lower letters, numbers and underscore can be used',
        )
        .required(),
      email: yup.string().required().email(),
      phone: yup
        .string()
        .matches(PHONE_REGEX, 'Not a valid phone number')
        .required(),
      password: yup.string().required(),
    })
    .required()

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isValid, isSubmitting, errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
    },
  })

  const illustration =
      skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className="ml-25" href="/" onClick={(e) => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const onSubmit = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    }

    try {
      await handleRegister(formData)
    } catch (error) {
      setFbMsg(_.get(error, 'data.errors.msg', 'Server Error'))

      throw error
    }
  }
  if (userData) {
    if (isSubmitSuccessful) {
      return <Navigate to="/onboarding" />
    }
  }

  return (
    <>
      <div className="auth-wrapper auth-v2">
        <Row className="auth-inner m-0">
          <Link
            className="brand-logo"
            to="/"
            onClick={(e) => e.preventDefault()}
          >
            <img src={logo} alt="logo" width="200" />
          </Link>
          <Col
            className="d-none d-lg-flex align-items-start p-5 relative"
            lg="8"
            sm="12"
          >
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5 absolute">
              <img className="img-fluid " src={source} alt="Login V2" />
            </div>
          </Col>
          <Col
            className="d-flex align-items-center auth-bg px-2 p-lg-5"
            lg="4"
            sm="12"
          >
            <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
              <CardTitle tag="h2" className="font-weight-bold mb-1">
                Sign Up!
              </CardTitle>
              <hr className="mb-2" />
              <Alert
                color="danger"
                isOpen={!!fbMsg}
                toggle={() => {
                  setFbMsg(null)
                }}
                className="px-3 py-2"
              >
                Error occured while processing request!
              </Alert>
              {/* Referrer Information */}
              <Form className="auth-register-form mt-2"></Form>
              {/* My Information */}
              <Form
                className="auth-register-form mt-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h5 className="mb-2">Type your information</h5>
                <Row>
                  <Col>
                    <FormField
                      label="Username"
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
                  </Col>
                </Row>
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
                <FormField
                  label="Password"
                  name="password"
                  control={control}
                  error={errors.password}
                  render={({ field }) => (
                    <InputPasswordToggle
                      {...field}
                      invalid={!!errors.password}
                      placeholder="Enter password"
                    ></InputPasswordToggle>
                  )}
                />
                <FormGroup>
                  <CustomInput
                    type="checkbox"
                    id="terms"
                    name="terms"
                    label={<Terms />}
                    onChange={(e) => {
                      setTerm(e.target.value)
                    }}
                    invalid={!isValid}
                    className="custom-control-Primary"
                    placeholder="Confirm password"
                  />
                </FormGroup>
                <Button.Ripple
                  type="submit"
                  block
                  color="primary"
                  disabled={!term}
                >
                  {isSubmitting ? (
                    <Loader className="spinner" size={18} />
                  ) : (
                    'Sign up'
                  )}
                </Button.Ripple>
              </Form>
              <p className="text-center mt-2">
                <span className="mr-25">Already have an account?</span>
                <Link to="/login">
                  <span>Sign in instead</span>
                </Link>
              </p>
              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <Button.Ripple color="facebook">
                  <Facebook size={14} />
                </Button.Ripple>
                <Button.Ripple color="twitter">
                  <Twitter size={14} />
                </Button.Ripple>
                <Button.Ripple color="google">
                  <Mail size={14} />
                </Button.Ripple>
                <Button.Ripple className="mr-0" color="github">
                  <GitHub size={14} />
                </Button.Ripple>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Register
