import CommandModal from "@/components/modals/CommandModal";
import CreateStoreModal from "@/components/modals/CreateStoreModal";

const ModalProvider = () => {
  return (
    <>
      <CreateStoreModal />
      <CommandModal />
    </>
  );
};

export default ModalProvider;
