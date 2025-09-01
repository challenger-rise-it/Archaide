import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from 'reactstrap'
import { useNavigate } from 'react-router-dom'

import { PlusCircle } from 'react-feather'
import _ from 'lodash'
import { useAuthCtx } from '@context/authContext'

const Home = () => {
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
      <Card>
        <CardHeader>
          <CardTitle>
            <h2 className="text-capitalize">Community</h2>
          </CardTitle>
          <Button
            className="rounded-pill align-self-center"
            color="primary"
            onClick={handleCreate}
          >
            <PlusCircle /> Create A New Bot
          </Button>
        </CardHeader>
        <CardBody>
          <iframe
            src="https://e.widgetbot.io/channels/977229858478370866/977229858478370871"
            height="637px"
            width="100%"
          ></iframe>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
