import FormField from '@components/form-field'
import ReactSelect from 'react-select'
import { Input } from 'reactstrap'
import { Controller } from 'react-hook-form'

// eslint-disable-next-line react/prop-types
const BotEditForm = ({ brokersOptions, control, errors }) => {
  return (
    <>
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
          <Controller
            name="brokerId"
            control={control}
            defaultValue={brokersOptions[0]}
            render={({ field }) => (
              <ReactSelect
                defaultValue={brokersOptions[0]}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={brokersOptions}
                placeholder="Select Broker"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
                {...field}
              />
            )}
          />
        )}
      />
    </>
  )
}

export default BotEditForm
