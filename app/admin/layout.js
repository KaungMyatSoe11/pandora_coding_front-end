"use client";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
  const { data } = useSession();
  return (
    <>
      {data?.user ? (
        <div>
          admin
          {children}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
};

export default AdminLayout;
