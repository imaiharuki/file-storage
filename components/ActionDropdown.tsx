"use client";

import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Models } from "node-appwrite";
import { EllipsisVertical, Loader, LucideNavigation } from "lucide-react";
import { actionsDropdownItems } from "@/constants";
import { ActionType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  // const [name, setName] = useState(file.name);
  // const [isLoading, setisLoading] = useState(false);

  const closeAllModals = () => {
    // event.stopPropagation();
    setisModalOpen(false);
    setisDropdownOpen(false);
    setAction(null);
    // setName(file.name);
    // setEmails([])
    console.log("click closeAllModals");
  };

  const handleAction = async () => {
    // console.log("ActionDropdown : action | ");
  };

  const renderDialogContent = () => {
    console.log("ActionDropdown : action | ", action);
    if (!action) return null;

    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
            {`ActionDropdown : value | ${value}`}
          </DialogTitle>
          {value === "rename" && (
            // <Input
            //   type="text"
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            // />
            <div>hello</div>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {/* {isLoading && (
                <Loader width={24} height={24} className="animate-spin" />
              )} */}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setisDropdownOpen}>
        <DropdownMenuTrigger className="shad-no-focus">
          <EllipsisVertical width={34} height={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-x-[200px] truncate">
            {file.name}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setisModalOpen(true);
                  {
                    ("hello");
                  }
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    width={24}
                    height={24}
                    alt={actionItem.label}
                    className="bg-blue-100"
                  />
                  <p className="pl-3">{actionItem.label}</p>
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    width={24}
                    height={24}
                    alt={actionItem.label}
                    className="bg-blue-100"
                  />
                  <p className="pl-3">{actionItem.label}</p>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
