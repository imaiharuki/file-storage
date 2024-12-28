"use client";

import React, { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Models } from "node-appwrite";
import { EllipsisVertical, Loader } from "lucide-react";
import { actionsDropdownItems } from "@/constants";
import { ActionType } from "@/types";
import Image from "next/image";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Dropdown from "react-dropdown";
import {
  deleteFile,
  renameFile,
  updateFileUsers,
} from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { set } from "zod";
import { FileDetails, ShareInput } from "./ActionsModalContent";

const ActionDropdown = ({ file }: { file: Models.Document }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isDropdownOpen, setisDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setisLoading] = useState(false);
  const [emails, setEmails] = useState<string[]>([]);

  const path = usePathname();

  const closeAllModals = () => {
    setisModalOpen(false);
    // setisDropdownOpen(false);
    setAction(null);
    setName(file.name);
    // setEmails([])
    console.log("click closeAllModals");
  };

  const handleAction = async () => {
    // console.log("ActionDropdown : action | ");
    if (!action) return null;

    setisLoading(true);

    let success = false;

    const actions = {
      rename: async () => {
        await renameFile({
          fileId: file.$id,
          name,
          extension: file.extension,
          path,
        });
        return true;
      },
      share: async () => {
        updateFileUsers({ fileId: file.$id, emails, path });
        return true;
      },
      delete: async () => {
        deleteFile({ fileId: file.$id, bucketFileId: file.bucketFileId, path });
        return true;
      },
    };

    success = await actions[action.value as keyof typeof actions]();

    if (success) closeAllModals();

    setisLoading(false);
  };

  const handleSelect = (selectedOption: {
    value: string;
    label: ReactNode;
  }) => {
    const actionItem = actionsDropdownItems.find(
      (item) => item.value === selectedOption.value
    );

    if (!actionItem) return null;

    if (["rename", "share", "delete", "details"].includes(actionItem.value)) {
      setAction(actionItem);
      setisModalOpen(true);
    } else if (actionItem.value === "download") {
      window.location.href = constructDownloadUrl(file.bucketFileId);
    }
  };

  const handleRemoveUser = async (email: string) => {
    const updatedEmails = emails.filter((e) => e !== email);

    const success = await updateFileUsers({
      fileId: file.$id,
      emails: updatedEmails,
      path,
    });

    if (success) setEmails(updatedEmails);
    closeAllModals();
  };

  const renderDialogContent = () => {
    // console.log("ActionDropdown : action | ", action);
    if (!action) return null;

    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">
            {label}
            {/* {`ActionDropdown : value | ${value}`} */}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          {value === "details" && <FileDetails file={file} />}
          {value === "share" && (
            <ShareInput
              file={file}
              onInputChange={setEmails}
              onRemove={handleRemoveUser}
            />
          )}
          {value === "delete" && (
            <p className="delete-configuration">
              Are you sure you want to delete{" "}
              <span className="delete-file-name">{file.name}</span>?
            </p>
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3">
            <Button onClick={closeAllModals} className="modal-cancel-button">
              Cancel
            </Button>

            <Button onClick={handleAction} className="modal-submit-button">
              <p className="capitalize">{value}</p>
              {isLoading && (
                <Loader width={24} height={24} className="animate-spin" />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  const options = actionsDropdownItems.map((actionItem) => ({
    value: actionItem.value,
    label: (
      <div className="flex items-center mt-2 mb-2">
        <Image
          src={actionItem.icon}
          width={24}
          height={24}
          alt={actionItem.label}
          className="text-blue"
        />
        <span className="ml-2">{actionItem.label}</span>
      </div>
    ),
  }));

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={setisModalOpen}>
        <Dropdown
          options={options}
          value={undefined}
          placeholder={""}
          className="flex items-end flex-col "
          placeholderClassName="hidden"
          controlClassName=""
          arrowClassName=""
          onChange={handleSelect}
          arrowOpen={<EllipsisVertical width={34} height={34} />}
          arrowClosed={<EllipsisVertical width={34} height={34} />}
        />

        {renderDialogContent()}
      </Dialog>
    </div>
  );
};

export default ActionDropdown;
