"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function LineLoginButton() {
  return (
    <button
      onClick={() => signIn("line")}
      className="flex w-full items-center justify-center gap-2 rounded-lg font-semibold border border-gray-400 text-green-500 cursor-pointer px-4 py-2 shadow-md"
    >
      <Image src="/line.svg" alt="LINE icon" width={20} height={20} />
      <span>Line</span>
    </button>
  );
}

export function LoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/login")}
      className="flex w-full items-center justify-center rounded-lg transition-colors cursor-pointer"
    >
      <Image
        src="/account_circle.svg"
        alt="Login icon"
        width={24}
        height={24}
      />
    </button>
  );
}

export function LogoutButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <Button onPress={onOpen}>
        <Image src="/logout.svg" alt="Logout icon" width={24} height={24} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    handleLogout();
                    onClose();
                  }}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
