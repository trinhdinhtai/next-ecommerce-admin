"use client"

import { useCreateStoreModal } from "@/hooks/use-create-store"
import Modal from "@/components/ui/modal"
import CreateStoreForm from "@/components/forms/create-store-form"

export default function DeleteModal() {
  const { isOpen, onClose } = useCreateStoreModal()
  return (
    <Modal
      title="Create new store"
      description="Add a new store to manage products and categories."
      isOpen={isOpen}
      onClose={onClose}
    >
      <CreateStoreForm />
    </Modal>
  )
}
