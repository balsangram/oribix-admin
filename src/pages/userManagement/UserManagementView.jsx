import React from "react";
import UserManagement_A from "./components/UserManagement_A";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { P } from "../../components/basicComponents/Paragraph";

function UserManagementView() {
  return (
    <B_CARD>
      <H1 className="mb-1 text-xl">User Management</H1>
      <P className="mb-3 text-sm">
        Create sub-admins and assign page-level permissions.
      </P>
      <UserManagement_A />
    </B_CARD>
  );
}

export default UserManagementView;
