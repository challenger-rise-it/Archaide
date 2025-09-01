import { useEffect } from 'react'
import { Col, Form, Input, Row } from 'reactstrap'
import { Check } from 'react-feather'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '@components/form-field'
import SubmitButton from '@components/submit-button'
import ReactSelect from 'react-select'
import useBrokers from '../../utility/hooks/useBrokers'
import { broker_schema } from '../../const/broker'
import BotEditForm from '../../@core/components/botedit-form'
import { useAppDataCtx } from '@context/app/appDataContext'

const BotForm = ({ onNext }) => {
  const brokers = useBrokers()
  const { bots } = useAppDataCtx()

  useEffect(() => {
    brokers.load()
  }, [])

  const brokersOptions =
    brokers?.data?.map((broker) => ({
      value: broker._id,
      label: broker.name,
    })) || []

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(broker_schema),
  })

  const onSubmit = (value) => {
    value.brokerId = value.brokerId.value
    bots.create(value, onNext)
  }

  return (
    <div>
      <h2 className="mt-3 mb-2">Enter Bot Details</h2>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BotEditForm
              brokersOptions={brokersOptions}
              control={control}
              errors={errors}
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
                  <div className="d-flex flex-column align-items-center">
                    <span
                      className="font-weight-bold"
                      style={{ fontSize: '2rem' }}
                    >
                      Launch This Bot
                    </span>
                    <span>Bot Launches As Inactive</span>
                  </div>
                </div>
              </SubmitButton>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default BotForm
