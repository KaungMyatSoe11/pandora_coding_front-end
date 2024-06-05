"use client";
import { useSession } from "next-auth/react";

const AdminLayout = ({ children }) => {
  const { data } = useSession();
  return (
    <div
      className="h-[86vh] overflow-scroll"
      style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
    >
      {data?.user ? <>{children}</> : <p>loading...</p>}
    </div>
  );
};

export default AdminLayout;
