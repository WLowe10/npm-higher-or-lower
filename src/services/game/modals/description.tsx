import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Spinner,
} from '@chakra-ui/react'

type Props = {
  name: string
  description?: string,
  open: boolean,
  onClose: () => void, 
};

export const DescriptionModal = ({ name, description, open, onClose }: Props) => {
  return (
      <Modal isOpen={open} isCentered={true} onClose={onClose} size={"xs"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {
              name
            }
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {
              description || <Spinner />
            }
          </ModalBody>

          <ModalFooter justifyContent={"center"} alignItems={"center"}>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}