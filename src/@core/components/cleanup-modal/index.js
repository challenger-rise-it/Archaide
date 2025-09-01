import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import SubmitButton from '@components/submit-button'
import { X } from 'react-feather'

const cleanupModal = ({
  removeConfirmModalOpen,
  setRemoveConfirmModalOpen,
  handleSubmit,
  label,
  isloading,
}) => {
  return (
    <Modal
      isOpen={removeConfirmModalOpen}
      toggle={() => setRemoveConfirmModalOpen(false)}
    >
      <ModalHeader
        toggle={() => setRemoveConfirmModalOpen(false)}
        close={
          <X
            className="cursor-pointer"
            size={15}
            onClick={() => setRemoveConfirmModalOpen(false)}
          />
        }
        tag="div"
      >
        Confirm
      </ModalHeader>
      <ModalBody className={'flex-grow-1'}>
        Are you sure to remove this {label ?? ''}?
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setRemoveConfirmModalOpen(false)}>Cancel</Button>
        <SubmitButton
          isSubmitting={isloading}
          disabled={isloading}
          onClick={() => handleSubmit()}
        >
          Continue
        </SubmitButton>
      </ModalFooter>
    </Modal>
  )
}

export default cleanupModal
