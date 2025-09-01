import { useAuthCtx } from '@context/authContext'
import { useAppDataCtx } from '@context/app/appDataContext'
import { Button, Card, Row, Col, Spinner } from 'reactstrap'
import { PlusCircle, Download } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv';

import _ from 'lodash'
import BotChart from './partials/BotChart'
import BotCard from '@components/BotCard'
import { useEffect } from 'react'

const UserHome = () => {
  const { userData, getAuth, updateProfile } = useAuthCtx()
  const { bots } = useAppDataCtx()
  const navigate = useNavigate()

  useEffect(() => {
    if (!bots.data) bots.load()
  }, [])

  const handleCreate = () => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step: 'bot-form',
          isCompleted: false,
          isSkipped: false,
          isfirst: false,
        },
      }
      updateProfile(data)
      getAuth()
    }

    navigate('/onboarding')
  }


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Button
          className="rounded-pill align-self-center mb-2"
          color="primary"
          onClick={handleCreate}
        >
          <PlusCircle /> Create A New Bot
        </Button>
        <CSVLink data={bots.balance?.docs ? bots.balance.docs : []} filename={`data_${new Date().toLocaleDateString('en-US')}_${new Date().toLocaleTimeString('en-US')}`}>
          <div className="d-flex flex-column align-items-center">
            <Download />
            Download
          </div>
        </CSVLink>
      </div>
      <BotChart />
      <div>
        {bots.loading ? (
          <div className="table-loader-container">
            <Spinner className="spinner" />
          </div>
        ) : (
          <Row>
            {bots.data &&
              bots.data.map((bot) => (
                <Col key={bot._id} xs="12" md="4">
                  <BotCard
                    bot={bot}
                    onEdit={() => {
                      navigate('/trading-bots/bot-edit/' + bot._id)
                      // setEditingBot(bot)
                      // setBotModalOpen(true)
                    }}
                    onLog={() => navigate('/trading-bots/bot-log/' + bot._id)}
                  ></BotCard>
                </Col>
              ))}
          </Row>
        )}
      </div>
    </div >
  )
}

export default UserHome
