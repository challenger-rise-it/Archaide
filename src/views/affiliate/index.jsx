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

const Affiliate = () => {
  const { goCreateBot, userData, updateProfile, getAuth } = useAuthCtx()
  const navigate = useNavigate()
  const data = `
    <div style="width:100%; min-height:220px;">
      <groovesell-promo-tools permalink="cc584405086c2ff9fa3e083f969c442d">
      </groovesell-promo-tools>
    </div>
  `

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
            {' '}
            <h2 className="text-capitalize">Affliate</h2>
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
          {/* <CardText className="text-center font-large-2">
            Welcome to Trading Bots Page 🚀
          </CardText> */}
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </CardBody>
      </Card>
    </div >
  )
}

export default Affiliate
