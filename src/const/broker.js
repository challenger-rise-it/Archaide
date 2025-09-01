import * as yup from 'yup'

export const broker_schema = yup
  .object({
    name: yup.string().required(),
    brokerId: yup.object().required(),
    // status: yup.string().required(),
  })
  .required()
