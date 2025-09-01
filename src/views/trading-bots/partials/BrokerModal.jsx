// ** Third Party Components
import { X } from 'react-feather'
import Proptypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Form, Input } from 'reactstrap'
import FormField from '@components/form-field'
import { buildYup } from 'json-schema-to-yup'
import { useAppDataCtx } from '@context/app/appDataContext'
import SubmitButton from '@components/submit-button'

const BrokerModal = (props) => {
  // ** Props
  const { toggleSidebar, brokerageData, editingBroker } = props
  if (!brokerageData) return ''

  const { brokers } = useAppDataCtx()

  // ** If user passes custom close btn render that else default close btn
  const renderCloseBtn = (
    <X className="cursor-pointer" size={15} onClick={toggleSidebar} />
  )
  const yupSchema = {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Trading Bot Registration Form',
    type: 'object',
    required: ['name', ...brokerageData.formMeta.required],
    properties: {
      name: {
        type: 'string',
      },
      ...brokerageData.formMeta.yup,
    },
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(buildYup(yupSchema)),
    defaultValues: editingBroker
      ? {
          name: editingBroker.name,
          ...editingBroker.details,
          status: editingBroker.status,
        }
      : brokerageData.formMeta.fields.reduce(
          (obj, field) => {
            obj[field.name] = ''
            return obj
          },
          { name: '' },
        ),
  })

  const onSubmit = (value) => {
    value.brokerageId = brokerageData?.id
    if (!editingBroker) {
      brokers.create(value, toggleSidebar)
    } else {
      brokers.update(editingBroker._id, value, toggleSidebar)
    }
  }

  return (
    <Modal isOpen={true} toggle={toggleSidebar}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader toggle={toggleSidebar} close={renderCloseBtn} tag="div">
          <h5 className="modal-title">
            <span className="align-middle">
              {editingBroker
                ? 'Edit ' + editingBroker.name
                : brokerageData?.formMeta?.title || ''}
            </span>
          </h5>
        </ModalHeader>
        <ModalBody>
          {brokerageData && (
            <>
              <FormField
                label={'Broker Name'}
                name={'name'}
                control={control}
                error={errors.name}
                render={({ field }) => (
                  <Input
                    autoFocus
                    type={'text'}
                    placeholder={'Put the name of this connection'}
                    invalid={!!errors.name}
                    {...field}
                  />
                )}
              />
              {brokerageData.formMeta.fields.map((fieldData) => (
                <FormField
                  key={fieldData.name}
                  label={fieldData.label}
                  name={fieldData.name}
                  control={control}
                  error={errors[fieldData.name]}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type={fieldData.input}
                      placeholder={fieldData.placeholder}
                      invalid={!!errors[fieldData.name]}
                      {...field}
                    />
                  )}
                />
              ))}

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
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            isSubmitting={brokers.loading}
            disabled={brokers.loading}
          >
            Save
          </SubmitButton>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default BrokerModal

// ** PropTypes
BrokerModal.propTypes = {
  toggleSidebar: Proptypes.func.isRequired,
  brokerageData: Proptypes.object,
}
