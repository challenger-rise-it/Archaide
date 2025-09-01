import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import { useSkin } from '@hooks/useSkin'
import { useNavigate } from 'react-router-dom'

import _ from 'lodash'
import { PlusCircle } from 'react-feather'
import { useAuthCtx } from '@context/authContext'

const Home = () => {
  const [skin] = useSkin()
  const { goCreateBot, userData, updateProfile, getAuth } = useAuthCtx()
  const navigate = useNavigate()

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
      <Card style={{ minHeight: '500px' }}>
        <CardHeader>
          <CardTitle>
            <h2 className="text-capitalize">Live Chart</h2>
          </CardTitle>
          <Button
            className="rounded-pill align-self-center"
            color="primary"
            onClick={handleCreate}
          >
            <PlusCircle /> Create A New Bot
          </Button>
        </CardHeader>
        <CardBody style={{ minHeight: '600px' }}>
          <div className="tradingview-container">
            <TradingViewWidget
              symbol="NASDAQ:AAPL"
              theme={skin === 'dark' ? Themes.DARK : Themes.LIGHT}
              height="637px"
              width="100%"
            />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
