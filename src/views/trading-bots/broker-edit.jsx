// ** Third Party Components
import { X } from 'react-feather'
import Proptypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  CardBody,
  Card,
  Col,
  CardFooter,
  Spinner,
} from 'reactstrap'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Input } from 'reactstrap'
import FormField from '@components/form-field'
import { buildYup } from 'json-schema-to-yup'
import { useAppDataCtx } from '@context/app/appDataContext'
import SubmitButton from '@components/submit-button'
import LoadingSpinner from '@components/spinner/Loading-spinner'
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import BrokerEditForm from '../../@core/components/brokeredit-form'

const BrokerEditPage = () => {
  const navigate = useNavigate()
  const { brokers, brokerages } = useAppDataCtx()
  const { brokerageId } = useParams()
  const [searchParams] = useSearchParams()
  const brokerId = searchParams.get('id')

  useEffect(() => {
    if (!brokers.data) brokers.load()
    if (!brokerages.data) brokerages.load()
  }, [])

  const onClose = () => {
    navigate('/trading-bots', { state: { active: '2' } })
  }

  const brokerageData = brokerages.data
    ? brokerages.data.find((dat) => dat.id == brokerageId)
    : null
  const editingBroker = brokers.data
    ? brokers.data.find((dat) => dat._id == brokerId)
    : null

  const yupSchema = {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Trading Bot Registration Form',
    type: 'object',
    required: brokerageData
      ? ['name', ...brokerageData.formMeta.required]
      : ['name'],
    properties: brokerageData
      ? {
        name: {
          type: 'string',
        },
        ...brokerageData.formMeta.yup,
      }
      : {
        name: {
          type: 'string',
        },
      },
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reso,
  } = useForm({
    resolver: yupResolver(buildYup(yupSchema)),
    defaultValues: editingBroker
      ? {
        name: editingBroker.name,
        ...editingBroker.details,
        status: editingBroker.status,
      }
      : brokerageData
        ? brokerageData.formMeta.fields.reduce(
          (obj, field) => {
            obj[field.name] = ''
            return obj
          },
          { name: '' },
        )
        : {
          name: '',
          status: '',
        },
  })

  const onSubmit = (value) => {
    value.brokerageId = brokerageData?.id
    if (!editingBroker) {
      brokers.create(value, onClose)
    } else {
      brokers.update(editingBroker._id, value, onClose)
    }
  }

  if (brokers.loading || brokerages.loading) {
    return <LoadingSpinner />
  }

  if (!brokerages.data || !brokers.data) {
    onClose()
    return
  }
  if (!brokerageData) {
    onClose()
    return
  }

  return (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h1 className="mt-3 mb-2">
          {editingBroker
            ? 'Edit ' + editingBroker.name
            : brokerageData?.formMeta?.title || ''}
        </h1>
      </div>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <CardBody>
                {brokerageData && (
                  <>
                    <BrokerEditForm
                      brokerageData={brokerageData}
                      control={control}
                      errors={errors}
                      editingBroker={editingBroker}
                    />
                    {editingBroker && (
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
                    )}
                  </>
                )}
              </CardBody>
              <CardFooter>
                <SubmitButton
                  isSubmitting={brokers.loading}
                  disabled={brokers.loading}
                >
                  Save
                </SubmitButton>
              </CardFooter>
            </Form>{' '}
          </Card>{' '}
        </Col>
      </Row>
    </Fragment>
  )
}

export default BrokerEditPage
