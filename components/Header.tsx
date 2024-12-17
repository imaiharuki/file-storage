import React from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <LogOut width={24} height={24} className="w-6 text-error" />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
