import { Fragment, useState } from 'react'
import Tabs from './tabs'
import Breadcrumbs from '@components/breadcrumbs'
import About from './about'
import ChangePassword from './change-password'
import { useLocation } from 'react-router-dom'
import { TabContent, TabPane, Card, CardBody } from 'reactstrap'

import '@styles/react/pages/page-account-settings.scss'

const AccountSettings = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(
    location.state ? location.state : '1',
  )

  const toggleTab = (tab) => {
    setActiveTab(tab)
  }
  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle="Account Settings"
        items={[
          { label: 'Home', link: '/home' },
          { label: 'Account Settings', link: '/account-settings' },
        ]}
      />
      <Tabs activeTab={activeTab} toggleTab={toggleTab} />
      <Card>
        <CardBody>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <About />
            </TabPane>
            <TabPane tabId="2">
              <ChangePassword />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AccountSettings
