// ** Third Party Components
import { X } from 'react-feather'
import Proptypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { useForm } from 'react-hook-form'
import { Form, Input } from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import FormField from '@components/form-field'
import SubmitButton from '@components/submit-button'
import ReactSelect from 'react-select'
import { useEffect } from 'react'
import useBrokers from '../../../utility/hooks/useBrokers'
import { useAppDataCtx } from '@context/app/appDataContext'
import * as yup from 'yup'

const BotModal = (props) => {
  // ** Props
  const { onClose, edit } = props

  const brokers = useBrokers()

  useEffect(() => {
    brokers.load()
  }, [])

  const brokersOptions =
    brokers?.data?.map((broker) => ({
      value: broker._id,
      label: broker.name,
    })) || []

  const { bots } = useAppDataCtx()

  const editingBot = edit
  if (editingBot?.broker)
    editingBot.brokerId = {
      value: editingBot.broker._id,
      label: editingBot.broker.name,
    }
  console.log(editingBot)

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = (
    <X className="cursor-pointer" size={15} onClick={onClose} />
  )
  const schema = yup
    .object({
      name: yup.string().required(),
      brokerId: yup.object().required(),
      // status: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editingBot,
  })

  const onSubmit = (info) => {
    info.brokerId = info.brokerId.value
    if (!editingBot) bots.create(info, onClose)
    else bots.update(editingBot._id, info, onClose)
  }

  if (!brokers.data) return null

  return (
    <Modal isOpen={true} toggle={onClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={onClose} close={renderCloseBtn} tag="div">
          <h5 className="modal-title">
            <span className="align-middle">
              {!editingBot ? 'Create A New Bot' : 'Update Bot'}
            </span>
          </h5>
        </ModalHeader>
        <ModalBody className={'flex-grow-1'}>
          <FormField
            label="Bot Name"
            name="name"
            control={control}
            error={errors.name}
            render={({ field }) => (
              <Input
                autoFocus
                type="text"
                placeholder="Name of Bot"
                invalid={!!errors.name}
                {...field}
              />
            )}
          />
          <FormField
            label="Broker"
            name="brokerId"
            control={control}
            error={errors.brokerId}
            render={({ field }) => (
              <ReactSelect
                defaultValue={field.value}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={brokersOptions}
                placeholder="Select Broker"
                menuPortalTarget={document.body}
                styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                {...field}
              />
            )}
          />
          {edit && (
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
        </ModalBody>
        <ModalFooter>
          <SubmitButton isSubmitting={bots.loading} disabled={bots.loading}>
            Save
          </SubmitButton>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default BotModal

// ** PropTypes
BotModal.propTypes = {
  open: Proptypes.bool,
}
