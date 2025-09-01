import { Fragment } from 'react'
import { Button, Col, Row, Spinner } from 'reactstrap'
import BotCard from '@components/BotCard'
import { useAppDataCtx } from '@context/app/appDataContext'
import { useAuthCtx } from '@context/authContext'
import { useEffect } from 'react'
import { PlusCircle } from 'react-feather'
import BotModal from './partials/BotModal'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Bots = () => {
  const { bots } = useAppDataCtx()
  const { userData, loading, getAuth, updateProfile } = useAuthCtx()
  const [botModalOpen, setBotModalOpen] = useState(false)
  const [editingBot, setEditingBot] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!bots.data) bots.load()
  }, [])

  useEffect(() => {
    if (!userData?.onboarding?.isCompleted && !userData?.onboarding?.isSkipped)
      navigate('/onboarding')
  }, [userData.onboarding])

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
  }

  return (
    <Fragment>
      {botModalOpen && (
        <BotModal
          open={botModalOpen}
          onClose={() => setBotModalOpen(false)}
          edit={editingBot}
        />
      )}
      <div className="d-flex justify-content-between">
        <h1 className="mt-3 mb-2">Trading Bots</h1>
        <Button
          className="rounded-pill align-self-center"
          color="primary"
          onClick={handleCreate}
        >
          <PlusCircle /> Create A New Bot
        </Button>
      </div>
      {bots.loading ? (
        <div className="table-loader-container">
          <Spinner className="spinner" />
        </div>
      ) : (
        <Row>
          {bots.data &&
            bots.data.map((bot) => (
              <Col key={bot._id} xs="12" md="6">
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
    </Fragment>
  )
}

export default Bots
