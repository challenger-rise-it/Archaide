import { Button, Col, Row } from 'reactstrap'
import ReactPlayer from 'react-player'

const OnboardingIntro = ({ onNext, onSkip }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <p className="text-center mt-3 mb-2">
        Howdy, Partner! 🤠
        <br />
        Congratulations & Welcome To Archiade! <br />
        It looks like you don't have any active bots yet... That really sucks...
        but don't worry, creating one is super easy <br />
        (especially for someone smart like you!) Watch the video below for a
        video tutorial :-)
      </p>
      <Row>
        <Col className="col-12 col-sm-auto mx-auto">
          <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </Col>
      </Row>
      <Button.Ripple
        color="primary"
        type="button"
        className="mt-1 mt-5"
        onClick={onNext}
      >
        <span className="font-weight-bold ml-1" style={{ fontSize: '2rem' }}>
          Connect Your First Brokerage
        </span>
      </Button.Ripple>
      <div className="mt-1">
        <span className="cursor-pointer" onClick={onSkip}>
          or skip for now
        </span>
      </div>
    </div>
  )
}

export default OnboardingIntro
