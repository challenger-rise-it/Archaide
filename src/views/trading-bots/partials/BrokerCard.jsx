import {
  Card,
  Media,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from 'reactstrap'
import { useAppDataCtx } from '@context/app/appDataContext'
import { Fragment, useEffect, useState } from 'react'
import { Edit, MoreHorizontal, Trash2, X } from 'react-feather'
import CleanupModal from '@components/cleanup-modal'
import Avatar from '@components/avatar'

const BrokerCard = ({ broker, onEdit }) => {
  const { brokerages, brokers } = useAppDataCtx()

  const [isBrokerModalOpen, setIsBrokerModalOpen] = useState(false)
  const [selectedBrokerData, setSelectedBrokerData] = useState(null)
  const [removeConfirmModalOpen, setRemoveConfirmModalOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!brokerages.data) brokerages.load()
    if (!brokers.data) brokers.load()
  }, [])

  return (
    <Fragment>
      <CleanupModal
        removeConfirmModalOpen={removeConfirmModalOpen}
        setRemoveConfirmModalOpen={setRemoveConfirmModalOpen}
        handleSubmit={() =>
          brokers.remove(broker._id, () => {
            setRemoveConfirmModalOpen(false)
          })
        }
        label="Broker"
        isloading={brokers.loading}
      />
      <Card className="mb-3">
        <div className="d-flex justify-content-between">
          <Media className="m-2">
            <img
              src={broker.brokerageImage}
              className="mr-2"
              height={100}
              width={100}
            />
            <Media className="my-auto" body>
              <CardTitle className="font-weight-bolder mb-0">
                {broker.name}
                {broker.status == 'active' ? (
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
              </CardTitle>
            </Media>
          </Media>

          <Dropdown
            isOpen={menuOpen}
            toggle={() => setMenuOpen(!menuOpen)}
            direction={'down'}
          >
            <DropdownToggle className="nav-link" tag="a">
              <MoreHorizontal size={18} className="text-muted cursor-pointer" />
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem
                className="w-100"
                onClick={() => {
                  onEdit()
                }}
              >
                <Edit /> Edit
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
        </div>
      </Card>
    </Fragment>
  )
}

export default BrokerCard
