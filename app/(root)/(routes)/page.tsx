"use client";

import { useCreateStoreModal } from "@/hooks/useCreateStoreModal";
import { useEffect } from "react";

const RootPage = () => {
  const isOpen = useCreateStoreModal((state) => state.isOpen);
  const onOpen = useCreateStoreModal((state) => state.onOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default RootPage;
