import {
  Card,
  CardText,
  Row,
  Col,
  Button,
  CardTitle,
  Modal,
  ModalBody,
} from 'reactstrap'
import { useAppDataCtx } from '@context/app/appDataContext'
import { useAuthCtx } from '@context/authContext'
import { Fragment, useEffect, useState } from 'react'
import { PlusCircle } from 'react-feather'
import BrokerModal from './partials/BrokerModal'
import BrokerCard from './partials/BrokerCard'
import { useNavigate } from 'react-router-dom'

const TradingBots = () => {
  const { brokerages, brokers } = useAppDataCtx()
  const { userData, loading, getAuth, updateProfile } = useAuthCtx()

  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState(false)
  const [selectedBrokerageData, setSelectedBrokerageData] = useState(null)
  const [editingBroker, setEditingBroker] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (!brokerages.data) brokerages.load()
    if (!brokers.data) brokers.load()
  }, [])

  useEffect(() => {
    if (!userData?.onboarding?.isCompleted && !userData?.onboarding?.isSkipped)
      navigate('/onboarding')
  }, [userData?.onboarding])

  const openJoinBrokerModal = (broker) => {
    setIsBrokerModalOpen(true)
    setSelectedBrokerageData(broker)
  }

  const handleCreate = () => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step: 'broker-choose',
          isCompleted: false,
          isSkipped: false,
          isfirst: false,
        },
      }
      updateProfile(data)
      getAuth()
    }
  }

  return (
    <Fragment>
      {isBrokerModalOpen && (
        <BrokerModal
          brokerageData={selectedBrokerageData}
          editingBroker={editingBroker}
          toggleSidebar={() => setIsBrokerModalOpen(false)}
        />
      )}
      <div className="d-flex justify-content-between">
        <h1 className="mt-3 mb-2">Connected Brokerages</h1>
        <Button
          className="rounded-pill align-self-center"
          color="primary"
          onClick={handleCreate}
        >
          <PlusCircle /> Connect A Brokerage
        </Button>
      </div>
      <Row>
        {brokers.data &&
          brokers.data.map((broker) => (
            <Col xl="4" md="6" key={broker._id}>
              <BrokerCard
                broker={broker}
                onEdit={() => {
                  navigate(
                    `/trading-bots/broker-edit/${broker.brokerageId}?id=${broker._id}`,
                  )
                  // setEditingBroker(broker)
                  // openJoinBrokerModal(
                  //   brokerages.data.find(
                  //     (brokerage) => brokerage.id == broker.brokerageId,
                  //   ),
                  // )
                }}
              />
            </Col>
          ))}
      </Row>
    </Fragment>
  )
}

export default TradingBots
