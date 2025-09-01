import FormField from '@components/form-field'
import {
  Input,
  Row,
  CardFooter,
  CardBody,
  Label,
  Button,
  Card,
} from 'reactstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { buildYup } from 'json-schema-to-yup'
import SubmitButton from '@components/submit-button'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (!navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy)
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    // Move textarea out of the viewport so it's not visible
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'
    document.body.prepend(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

// eslint-disable-next-line react/prop-types
const tradingViewJsonForm = (props) => {
  const yupSchema = {
    $id: 'https://example.com/person.schema.json',
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Trading Bot Registration Form',
    type: 'object',
    required: ['type'],
    properties: {
      type: {
        type: 'string',
        enum: [
          'market_order',
          'limit_order',
          'stop_market_order',
          'stop_limit_order',
          'cancel',
          'update',
        ],
      },
      action: {
        type: 'string',
        enum: ['buy', 'sell'],
        default: 'buy',
      },
      ticker: {
        type: 'string',
        nullable: true,
      },
      orderId: {
        type: 'string',
      },
      price: {
        type: 'number',
      },
      quantity: {
        type: 'number',
        nullable: true,
      },
    },
    if: {
      properties: {
        type: {
          enum: [
            'market_order',
            'limit_order',
            'stop_market_order',
            'stop_limit_order',
          ],
        },
      },
    },
    then: {
      required: ['orderId'],
    },
  }
  const [jsonData, setJsonData] = useState({})
  const [type, setType] = useState({})
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reso,
  } = useForm({
    resolver: yupResolver(buildYup(yupSchema)),
    defaultValues: {
      type: 'market_order',
      orderId: '',
      ticker: '',
      price: '',
      quantity: 1,
    },
  })

  const handleJson = (value) => {
    const result = {}
    Object.keys(value).map((item, key) => {
      if (
        ['cancel', 'update'].includes(value.type) &&
        ['orderId', 'action'].includes(item)
      ) {
        return
      }
      if (!value[item] == '') {
        result[item] = value[item]
      }
      return
    })
    return result
  }
  const onSubmit = (value) => {
    setJsonData(handleJson(value))
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h2 className="mt-3 mb-2">Tradingview JSON</h2>
      </div>

      <CardBody>
        <>
          <FormField
            label={'Type'}
            name={'type'}
            control={control}
            error={errors.type}
            render={({ field }) => (
              <Input
                autoFocus
                type="select"
                invalid={!!errors.status}
                {...field}
                onChange={(val) => {
                  field.onChange(val)
                  handleSubmit(onSubmit)()
                  setType(val.target.value)
                }}
              >
                <option value={'market_order'}>market_order</option>
                <option value={'limit_order'}>limit_order</option>
                <option value={'stop_market_order'}>stop_market_order</option>
                <option value={'stop_limit_order'}>stop_limit_order</option>
                <option value={'cancel'}>cancel</option>
                <option value={'update'}>update</option>
              </Input>
            )}
          />
          {!['cancel', 'update'].includes(type) && (
            <FormField
              label={'Action'}
              name={'action'}
              control={control}
              error={errors.action}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="select"
                  invalid={!!errors.status}
                  {...field}
                  onChange={(val) => {
                    field.onChange(val)
                    handleSubmit(onSubmit)()
                  }}
                >
                  <option value={'buy'}>Buy</option>
                  <option value={'sell'}>Sell</option>
                </Input>
              )}
            />
          )}
          <FormField
            label="Ticker"
            name="ticker"
            control={control}
            placeholder=""
            error={errors.ticker}
            render={({ field }) => (
              <Input
                autoFocus
                type="text"
                invalid={!!errors.ticker}
                {...field}
                onChange={(val) => {
                  field.onChange(val)
                  handleSubmit(onSubmit)()
                }}
              />
            )}
          />
          {!['cancel', 'update'].includes(type) && (
            <FormField
              label="OrderId"
              name="orderId"
              control={control}
              error={errors.orderId}
              render={({ field }) => (
                <Input
                  autoFocus
                  type="text"
                  invalid={!!errors.orderId}
                  {...field}
                  onChange={(val) => {
                    field.onChange(val)
                    handleSubmit(onSubmit)()
                  }}
                />
              )}
            />
          )}
          <FormField
            label="Price"
            name="price"
            control={control}
            error={errors.price}
            render={({ field }) => (
              <Input
                autoFocus
                type="text"
                placeholder=""
                invalid={!!errors.price}
                {...field}
                onChange={(val) => {
                  field.onChange(val)
                  handleSubmit(onSubmit)()
                }}
              />
            )}
          />
          <FormField
            label="Quantity"
            name="quantity"
            control={control}
            error={errors.quantity}
            render={({ field }) => (
              <Input
                autoFocus
                type="text"
                placeholder=""
                invalid={!!errors.quantity}
                {...field}
                onChange={(val) => {
                  field.onChange(val)
                  handleSubmit(onSubmit)()
                }}
              />
            )}
          />
        </>
      </CardBody>
      <CardBody>
        <Label className="form-label">JSON</Label>
        <pre style={{ height: '100%' }} className="square border border-2">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </CardBody>
      <CardFooter
        className="d-flex"
        style={{ justifyContent: 'center', gap: '30px' }}
      >
        <SubmitButton
          onClick={() => {
            toast('JSON Copied!', { type: 'success' })
            copyToClipboard(JSON.stringify(jsonData, null, 2))
          }}
        >
          Copy
        </SubmitButton>
        <Button
          onClick={() => {
            props.toggle()
          }}
        >
          Close
        </Button>
      </CardFooter>
    </>
  )
}

export default tradingViewJsonForm
