"use client";
import { useContext, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PostContext } from "@/store/postProvider";
import { columns } from "./columns";
import { useQuery } from "react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "../ui/button";
import CreateAdminForm from "./CreateAdminForm";

const AdminPostList = () => {
  const { getAllPostAdmin, pagination, setPagination } = useContext(
    PostContext
  );

  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const defaultData = useMemo(() => [], []);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-post", pagination],
    queryFn: () => getAllPostAdmin(pagination),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data?.posts ?? defaultData,
    columns,
    pageCount: data?.totalPage, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: data?.totalPosts, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  const handleCreate = () => {
    setIsCreatePostModalOpen(true);
  };
  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  console.log(table.getPageCount());
  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Button onClick={handleCreate}>Create Post</Button>
      </div>
      <div className="rounded-md border mt-5">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </tr>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center gap-2 mt-5 float-end">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
      </div>

      <CreateAdminForm
        handleCloseCreatePostModal={handleCloseCreatePostModal}
        isCreatePostModalOpen={isCreatePostModalOpen}
      />
    </>
  );
};

export default AdminPostList;
