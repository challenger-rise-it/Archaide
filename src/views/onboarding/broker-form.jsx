import { Col, Form, Input, Row } from 'reactstrap'
import { Check } from 'react-feather'
import { useForm } from 'react-hook-form'
import { broker_schema } from '../../const/broker'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '@components/form-field'
import { buildYup } from 'json-schema-to-yup'
import SubmitButton from '@components/submit-button'
import { useEffect } from 'react'
import BrokerEditForm from '../../@core/components/brokeredit-form'
import { useAppDataCtx } from '@context/app/appDataContext'
import LoadingSpinner from '@components/spinner/Loading-spinner'

const BrokerForm = ({ onNext, brokerageId }) => {
  const { brokers, brokerages } = useAppDataCtx()
  useEffect(() => {
    if (!brokers.data) brokers.load()
    if (!brokerages.data) brokerages.load()
  }, [])

  const brokerageData = brokerages.data
    ? brokerages.data.find((dat) => dat.id == brokerageId)
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
    defaultValues: brokerageData
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

  if (brokerages.loading) {
    return <LoadingSpinner />
  }
  const onSubmit = (value) => {
    value.brokerageId = brokerageData?.id
    brokers.create(value, onNext)
  }

  return (
    <div>
      <h2 className="mt-3 mb-2">Enter {brokerageData?.id} Account Details</h2>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BrokerEditForm
              brokerageData={brokerageData}
              control={control}
              errors={errors}
              editingBroker={false}
            />
            <div className="d-flex justify-content-center mt-2">
              <SubmitButton isSubmitting={isSubmitting} disabled={isSubmitting}>
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-white text-primary mr-1"
                    style={{ width: '50px', height: '50px' }}
                  >
                    <Check size={32} style={{ color: '#2D8CFF' }} />
                  </div>
                  <span
                    className="font-weight-bold"
                    style={{ fontSize: '2rem' }}
                  >
                    Connect This Broker
                  </span>
                </div>
              </SubmitButton>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default BrokerForm
