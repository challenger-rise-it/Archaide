import { Fragment, useEffect, useState } from 'react'
import { Clock, Edit, MoreHorizontal, Trash2 } from 'react-feather'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Media,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Dropdown,
  Button,
  Modal,
  ModalBody,
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import Proptypes from 'prop-types'
import Avatar from '@components/avatar'
import { useAppDataCtx } from '@context/app/appDataContext'
import CleanupModal from '@components/cleanup-modal'
import { useAuthCtx } from '@context/authContext'
import { toast } from 'react-toastify'
import { API_ENDPOINT } from '@src/@core/config'
import TradingViewJsonForm from '@components/tradingViewJson-form'

async function copyToClipboard(textToCopy) {
  // Navigator clipboard api needs a secure context (https)
  if (!navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy)
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement('textarea')
    textArea.value = textToCopy
    // Move textarea out of the viewport so it's not visible
    textArea.style.position = 'absolute'
    textArea.style.left = '-999999px'
    document.body.prepend(textArea)
    textArea.select()
    try {
      document.execCommand('copy')
    } catch (error) {
      console.error(error)
    } finally {
      textArea.remove()
    }
  }
}

const BotCard = (props) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { bots } = useAppDataCtx()
  const [removeConfirmModalOpen, setRemoveConfirmModalOpen] = useState(false)
  const [botdata, setBotdata] = useState([])
  const { userData } = useAuthCtx()
  const [modal, setModal] = useState(false)
  const toggle = () => setModal(!modal)

  useEffect(async () => {
    // setBotdata(bots.get(props.bot._id))
    setBotdata(await bots.get_info(props.bot._id))
  }, [])

  useEffect(() => {
    console.log(botdata)
  }, [botdata])
  return (
    <Fragment>
      <CleanupModal
        removeConfirmModalOpen={removeConfirmModalOpen}
        setRemoveConfirmModalOpen={setRemoveConfirmModalOpen}
        handleSubmit={() =>
          bots.remove(props.bot._id, () => {
            setRemoveConfirmModalOpen(false)
          })
        }
        label="Bot"
        isloading={bots.loading}
      />
      <Card>
        <CardHeader>
          <CardTitle tag="h4">
            <Media>
              <img
                src={props.bot.image}
                className="mr-2"
                height={50}
                width={50}
              />
              <Media className="my-auto" body>
                <CardTitle className="font-weight-bolder mb-0">
                  {props.bot.name}
                </CardTitle>
                <CardText className="mb-0">{props.bot.brokerName}</CardText>
                <CardText className="font-small-3 mb-0">Long</CardText>
              </Media>
              {props.bot.status == 'active' ? (
                <Avatar
                  className="rounded ml-1"
                  color={'light-success'}
                  content={'Active'}
                  contentStyles={{ width: 50, height: 20 }}
                />
              ) : (
                <Avatar
                  className="rounded ml-1"
                  color={'light-danger'}
                  content={'Inactive'}
                  contentStyles={{ width: 60, height: 20 }}
                />
              )}
            </Media>{' '}
          </CardTitle>
          <div className="d-flex justify-content-between flex-column align-self-stretch align-items-end">
            <Dropdown
              isOpen={menuOpen}
              toggle={() => setMenuOpen(!menuOpen)}
              direction={'down'}
            >
              <DropdownToggle className="nav-link" tag="a">
                <MoreHorizontal
                  size={18}
                  className="text-muted cursor-pointer"
                />
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    props.onEdit()
                  }}
                >
                  <Edit /> Edit
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    props.onLog()
                  }}
                >
                  <FontAwesomeIcon icon={faHistory} size="xl" /> Logs
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => {
                    setRemoveConfirmModalOpen(true)
                  }}
                >
                  <Trash2 /> Remove
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <span>
              Created:{' '}
              {new Date(props.bot.createdAt)
                .toDateString()
                .split(' ')
                .slice(1)
                .join(' ')}{' '}
            </span>
          </div>
        </CardHeader>
        <CardBody className="border-top pb-0">
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">Symbol</span>
            {/* <div>
              <img
                className="mr-1"
                src={props.bot.image}
                height={16}
                width={16}
              />
              <span className="font-weight-bolder">TRX/USDT</span>
            </div> */}
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">% of Your Portfolio</span>
            <div>
              <span className="">{Math.round(botdata.portfolio_percent, 2)}% USD</span>
            </div>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">Portfolio value</span>
            <div>
              <span className="">$5.000</span>
            </div>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">License ID</span>
            <div>
              <span className="">{userData._id}</span>
            </div>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">Webhook URL</span>
            <div>
              <span className="">
                http://********{' '}
                <Button
                  size="sm"
                  className="ml-1"
                  onClick={() => {
                    toast('Webhook Copied!', { type: 'success' })
                    copyToClipboard(
                      API_ENDPOINT + '/robots/' + props.bot.webhookKey + '?licenseId=' + userData._id,
                    )
                  }}
                >
                  Copy
                </Button>
              </span>
            </div>
          </div>
          <div className="d-flex justify-content-between my-1">
            <span className="font-weight-bolder">TradingView JSON</span>
            <div>
              <Button
                size="sm"
                className="ml-1"
                onClick={() => toggle()}
              >
                Generate
              </Button>
            </div>
          </div>
        </CardBody>
        <div className="divider">
          <div className="divider-text">Active Trade</div>
        </div>
        <Row className="text-center mx-0">
          <Col xs="4" className="border-right py-1">
            <CardText className="mb-0">Archaide Ratio</CardText>
            <h2 className="font-weight-bolder mb-0">{Math.round(botdata.archaide_ratio, 2)}%</h2>
          </Col>
          <Col xs="4" className="border-right py-1">
            <CardText className="mb-0">Return On Investment</CardText>
            <h2 className="font-weight-bolder mb-0 text-success">{Math.round(botdata.roi, 2)}%</h2>
          </Col>
          <Col xs="4" className="py-1">
            <CardText className="mb-0">Win Rate</CardText>
            <h2 className="font-weight-bolder mb-0 text-danger">{Math.round(botdata.win_rate, 2)}%</h2>
          </Col>
        </Row>
      </Card>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <TradingViewJsonForm toggle={toggle} />
        </ModalBody>
      </Modal>
    </Fragment >
  )
}
export default BotCard

// ** PropTypes
BotCard.propTypes = {
  bot: Proptypes.object.isRequired,
  onEdit: Proptypes.func.isRequired,
}
