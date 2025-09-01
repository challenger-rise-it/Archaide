import FormField from '@components/form-field'
import { Input } from 'reactstrap'

// eslint-disable-next-line react/prop-types
const BrokerEditForm = ({ brokerageData, control, errors, editingBroker }) => {
  return (
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
      {brokerageData?.formMeta?.fields.map((fieldData) => {
        return (
          (!editingBroker || fieldData.label == 'status') && (
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
          )
        )
      })}
    </>
  )
}

export default BrokerEditForm
