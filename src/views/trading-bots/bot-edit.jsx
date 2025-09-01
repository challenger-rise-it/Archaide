// ** Third Party Components
import { X } from 'react-feather'
import Proptypes from 'prop-types'
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardFooter,
  Row,
  Col,
  Spinner,
} from 'reactstrap'

import { useForm } from 'react-hook-form'
import { Form, Input } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '@components/form-field'
import SubmitButton from '@components/submit-button'
import ReactSelect from 'react-select'
import { useEffect, Fragment, useState } from 'react'
import useBrokers from '../../utility/hooks/useBrokers'
import { useAppDataCtx } from '@context/app/appDataContext'
import { broker_schema } from '../../const/broker'
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom'
import BotEditForm from '../../@core/components/botedit-form'

const BotEditPage = () => {
  // ** Props
  const { bots } = useAppDataCtx()
  const brokers = useBrokers()
  const { id } = useParams()
  const navigate = useNavigate()
  const [editBotLoading, setEditBotLoading] = useState(!!id)

  useEffect(() => {
    brokers.load()
  }, [])

  useEffect(() => {
    if (id) {
      setEditBotLoading(true)
      bots.get(id)
    }
  }, [id])

  const editingBot = id && bots.selected

  const brokersOptions =
    brokers?.data?.map((broker) => ({
      value: broker._id,
      label: broker.name,
    })) || []

  if (editingBot?.broker)
    editingBot.brokerId = {
      value: editingBot.broker._id,
      label: editingBot.broker.name,
    }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(broker_schema),
  })

  useEffect(() => {
    if (id && bots.selected) {
      const botSelected = bots.selected
      botSelected.brokerId = {
        value: botSelected.brokerId,
        label: brokersOptions.filter(
          (item) => item.value == editingBot.brokerId,
        )[0]?.label,
      }
      reset(botSelected)
      setEditBotLoading(false)
    }
  }, [bots.selected])

  const onClose = () => navigate('/trading-bots')

  const onSubmit = (info) => {
    info.brokerId = info.brokerId.value
    if (!editingBot) bots.create(info, onClose)
    else bots.update(editingBot._id, info, onClose)
  }

  if (!brokers.data) return null

  return editBotLoading ? (
    <div className="table-loader-container">
      <Spinner className="spinner" />
    </div>
  ) : (
    <Fragment>
      <div className="d-flex justify-content-between">
        <h1 className="mt-3 mb-2">
          {!editingBot ? 'Create A New Bot' : 'Update Bot'}
        </h1>
      </div>
      <Row>
        <Col xs="12" md="6">
          <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <CardBody className={'flex-grow-1'}>
                <BotEditForm
                  brokersOptions={brokersOptions}
                  control={control}
                  errors={errors}
                  editingBot={editingBot}
                />
                {editingBot && (
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
              </CardBody>
              <CardFooter>
                <SubmitButton
                  isSubmitting={bots.loading}
                  disabled={bots.loading}
                >
                  Save
                </SubmitButton>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </Fragment>
  )
}

export default BotEditPage

// ** PropTypes
BotEditPage.propTypes = {
  open: Proptypes.bool,
}
