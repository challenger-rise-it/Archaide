import { Fragment, useState } from 'react'
import { TabContent, TabPane } from 'reactstrap'
import Tabs from './tabs'
import Bots from './bots'
import Brokers from './brokers'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const active = location.state?.active || '1'
  const [activeTab, setActiveTab] = useState(active)
  const toggleTab = (tab) => {
    setActiveTab(tab)
  }
  return (
    <Fragment>
      <Tabs activeTab={activeTab} toggleTab={toggleTab} />
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Bots />
        </TabPane>
        <TabPane tabId="2">
          <Brokers />
        </TabPane>
      </TabContent>
    </Fragment>
  )
}

export default Home
