"use client";
import useAuthUser from "@/hooks/useAuthUser";
import { Button } from "./ui/button";
import { logoutUserAction } from "@/actions/AuthAction";

export default function AccountHeader() {
  const user = useAuthUser();
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold my-5">
        {user ? `${user.firstName} ${user.lastName}'s ` : "Your "}
        Account
      </h3>
      <Button
        variant="link"
        onClick={async () => {
          await logoutUserAction();
          window.location.reload();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
