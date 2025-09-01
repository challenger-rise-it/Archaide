import { Button, Col, Row } from 'reactstrap'
import ReactPlayer from 'react-player'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const OnboardingFinal = ({ onNext }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center text-uppercase mt-3 mb-2">
        Great Job!!!
        <br />
        You just launched your first bot!!!
      </h2>
      <Row>
        <Col className="col-12 col-sm-auto mx-auto">
          <ReactPlayer url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
        </Col>
      </Row>
      <Button.Ripple
        color="primary"
        type="button"
        className="mt-1"
        onClick={onNext}
      >
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon="fa-solid fa-party-horn" />
          <span className="font-weight-bold ml-1" style={{ fontSize: '2rem' }}>
            Go To Dashboard
          </span>
        </div>
      </Button.Ripple>
    </div>
  )
}

export default OnboardingFinal
