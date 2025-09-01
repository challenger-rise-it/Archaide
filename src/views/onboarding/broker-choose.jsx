import { useEffect, useState } from 'react'
import {
  Card,
  CardTitle,
  CardText,
  Col,
  Media,
  Row,
  Modal,
  ModalBody,
} from 'reactstrap'
import { useAppDataCtx } from '@context/app/appDataContext'
import logo from '@src/assets/images/logo/logo.jpeg'
import BrokerWaitlist from '@components/broker-waitlist'

const BrokerChoose = ({ onSelect }) => {
  const { brokerages } = useAppDataCtx()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  useEffect(() => {
    if (!brokerages.data) brokerages.load()
  }, [])

  return (
    <div>
      <h2 className="mt-3 mb-2">Choose A Broker From Below</h2>
      <Row>
        {brokerages.data &&
          brokerages.data.map(
            (brokerage) =>
              brokerage.ready && (
                <Col key={brokerage.id} xl="4" md="6">
                  <Card
                    className="bg-primary mb-3 cursor-pointer"
                    inverse
                    onClick={() => onSelect(brokerage.id)}
                  >
                    <Media className="m-2">
                      <img
                        src={brokerage.image}
                        className="mr-2"
                        width={100}
                        height={100}
                      />
                      <Media className="my-auto" body>
                        <CardTitle className="font-weight-bolder mb-0">
                          {brokerage.name}
                        </CardTitle>
                        <CardText className="font-small-3 mb-0">
                          {brokerage.description}
                        </CardText>
                      </Media>
                    </Media>
                  </Card>
                </Col>
              ),
          )}
      </Row>
      <h2 className="mt-3 mb-2">Don’t See Your Broker Above?</h2>
      <Row>
        <Col xl="4" md="6">
          <Card className="mb-3" onClick={() => toggle()}>
            <Media className="m-2 cursor-pointer">
              <img src={logo} className="mr-2" height={100} width={100} />
              <Media className="my-auto" body>
                <h4 className="font-weight-bolder mb-0">
                  Join A Broker Waitlist
                </h4>
                <CardText className="font-small-3 mb-0">
                  Join a waitlist to let us know what broker(s) you want to see
                  next!
                </CardText>
              </Media>
            </Media>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <BrokerWaitlist />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default BrokerChoose
