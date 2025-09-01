import { Fragment, useState } from 'react'
import Breadcrumbs from '@components/breadcrumbs'
import ChangePassword from './change-password'
import { TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/pages/force-reset-password.scss'

const ResetPassword = () => {
  return (
    <Fragment>
      <CardBody
        className="mx-auto d-flex flex-column reset-body my-auto justify-content-center"
        style={{ width: '500px', height: '100vh' }}
      >
        <Breadcrumbs breadCrumbTitle="Reset Password" items={[]} />
        <Card>
          <CardBody>
            <ChangePassword />
          </CardBody>
        </Card>
      </CardBody>
    </Fragment>
  )
}

export default ResetPassword
