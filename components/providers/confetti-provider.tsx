"use client";

import ReactConfetti from "react-confetti";

import { useCreateStoreModal } from "@/hooks/use-create-store";

export const ConfettiProvider = () => {
  const { isFirstCreate } = useCreateStoreModal();

  if (!isFirstCreate) return null;

  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
    />
  );
};
