import { Fragment, useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Progress, Row } from 'reactstrap'
import { X } from 'react-feather'
import OnboardingIntro from './onboarding-intro'
import OnboardingDisclaimer from './disclaimer'
import BrokerChoose from './broker-choose'
import BrokerForm from './broker-form'
import BrokerConnect from './broker-connect'
import BotForm from './bot-form'
import BotLaunch from './bot-launch'
import OnboardingFinal from './onboarding-final'
import { useAuthCtx } from '@context/authContext'
import LoadingSpinner from '@components/spinner/Loading-spinner'

const Onboarding = () => {
  const [step, setStep] = useState('intro')
  const [progress, setProgress] = useState(0)
  const [brokerageId, setBrokerageId] = useState()
  const { userData, loading, getAuth, updateProfile } = useAuthCtx()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData?.onboarding) {
      setBrokerageId(userData.onboarding.brokerageId)
      setStep(userData.onboarding.step ?? 'intro')
    }
  }, [userData])

  useEffect(() => {
    if (step === 'disclaimer') {
      setProgress(25)
    } else if (step === 'broker-choose' || step === 'bot-form') {
      setProgress(50)
    } else if (step === 'broker-form') {
      setProgress(75)
    } else if (step === 'broker-connect' || step === 'bot-launch') {
      setProgress(99)
    }
  }, [step])

  if (
    (userData?.onboarding?.isCompleted || userData?.onboarding?.isSkipped) &&
    userData?.onboarding?.isfirst
  ) {
    console.log('---------------------------')
    return <Navigate to="/" />
  }

  const getTitle = () => {
    return step === 'disclaimer'
      ? 'Archaide Welcome Webflow'
      : ['broker-choose', 'broker-form', 'broker-connect'].includes(step)
      ? 'Connect A Broker Webflow'
      : ['bot-form', 'bot-launch'].includes(step)
      ? 'Create A New Bot Webflow'
      : ''
  }

  const isShowCloseIcon = () => {
    return ['disclaimer', 'broker-choose', 'broker-form', 'bot-form'].includes(
      step,
    )
  }

  const handleStep = (step, brokerageid) => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step,
          isCompleted: false,
          isSkipped: false,
          brokerageId: step === 'broker-form' ? brokerageid : brokerageId,
          isfirst: userData?.onboarding?.isfirst ?? true,
        },
      }
      updateProfile(data)
      getAuth()
    }
  }

  const handleSkip = async () => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step,
          isCompleted: false,
          isSkipped: true,
          brokerageId: brokerageId,
          isfirst: false,
        },
      }
      await updateProfile(data)
      await getAuth()
      if (userData.onboarding.isfirst) {
        if (step == 'disclaimer')
          navigate('/trading-bots', { state: { active: '2' } })
        else navigate('/')
      } else {
        if (['broker-choose', 'broker-form', 'broker-connect'].includes(step)) {
          navigate('/trading-bots', { state: { active: '2' } })
        } else if (['bot-form', 'bot-launch'].includes(step)) {
          navigate('/trading-bots')
        }
      }
    }
  }

  const handleComplete = () => {
    if (userData?._id) {
      const data = {
        email: userData.email,
        onboarding: {
          step,
          isCompleted: true,
          isSkipped: false,
          brokerageId: brokerageId,
          isfirst: false,
        },
      }
      updateProfile(data)
      navigate('/')
    }
  }

  const handleBrokerChoose = async (brokerageid) => {
    setBrokerageId(brokerageid)
    handleStep('broker-form', brokerageid)
  }

  if (loading) {
    return (
      <div style={{ height: '100vh' }}>
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <Fragment>
      <Card style={{ minHeight: '100vh' }} className="align-items-center mb-0">
        <CardBody
          className="position-relative w-100"
          style={{ maxWidth: '1388px' }}
        >
          <Row>
            {getTitle() && (
              <Col className="col-12 col-sm-auto mx-auto">
                <h1 className="text-center mt-3 mb-2">{getTitle()}</h1>
                <Progress value={progress}>{progress}%</Progress>
              </Col>
            )}
          </Row>
          {isShowCloseIcon() && (
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-primary cursor-pointer position-absolute"
              style={{
                width: '24px',
                height: '24px',
                top: '20px',
                right: '20px',
              }}
              onClick={handleSkip}
            >
              <X size={18} style={{ color: 'white' }} />
            </div>
          )}

          {step === 'intro' && (
            <OnboardingIntro
              onNext={() => handleStep('disclaimer')}
              onSkip={handleSkip}
            />
          )}
          {step === 'disclaimer' && (
            <OnboardingDisclaimer
              onAgree={() => handleStep('broker-choose')}
              onDisagree={handleSkip}
            />
          )}
          {step === 'broker-choose' && (
            <BrokerChoose onSelect={handleBrokerChoose} />
          )}
          {step === 'broker-form' && (
            <BrokerForm
              onNext={() => handleStep('broker-connect')}
              brokerageId={brokerageId}
            />
          )}
          {step === 'broker-connect' && (
            <BrokerConnect
              onNext={() =>
                userData?.onboarding?.isfirst
                  ? handleStep('bot-form')
                  : handleSkip()
              }
              onSkip={handleSkip}
            />
          )}
          {step === 'bot-form' && (
            <BotForm onNext={() => handleStep('bot-launch')} />
          )}
          {step === 'bot-launch' && (
            <BotLaunch
              onNext={() =>
                userData?.onboarding?.isfirst
                  ? handleStep('final')
                  : handleSkip()
              }
            />
          )}
          {step === 'final' && <OnboardingFinal onNext={handleComplete} />}
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default Onboarding
