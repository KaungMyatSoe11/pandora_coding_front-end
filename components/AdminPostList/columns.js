import { truncateText } from "@/utils/truncateText";
import ActionColumn from "./ActionColumn";

export const columns = [
  {
    accessorKey: "id",
    header: "#",
    show: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => truncateText(row.getValue("content")),
  },
  {
    accessorKey: "user",
    header: "created By",
    cell: ({ row }) => row.getValue("user").name,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <ActionColumn post={row} />,
  },
];
