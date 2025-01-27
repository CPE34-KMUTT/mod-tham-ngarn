import { MyDialog } from '@components/MyDiaLog';
import { OrderModal } from '@components/order/OrderModal';
import { UpdateOrderStatusModal } from '@components/order/UpdateOrderStatusModal';
import { ExternalLinkIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { MaintenancePart } from "@models/MaintenancePart";
import { Order } from '@models/Order';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TableHead } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import fetch from "@utils/Fetch";
import moment from 'moment';
import Router from "next/router";
import * as React from "react";
import Swal from "sweetalert2";

function Row(props: { row: Order }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [isClick, setIsClick] = React.useState(false);

  const openModal = () => setIsClick(true);
  const closeModal = () => setIsClick(false);

  const [isClickUpdate, setIsClickUpdate] = React.useState(false);

  const openUpdateModal = () => setIsClickUpdate(true);
  const closeUpdateModal = () => setIsClickUpdate(false);

  const deleteOrder = async (orderId: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch
          .delete(`/bill/${row.billId}/order/${orderId}`)
          .then(() => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            Router.reload();
          })
          .catch((error: any) => Swal.fire("Failed", error.response?.data.message, "error"));
      }
    });
  };

  const handleOrderStatus = () => {
    Swal.fire('Error', 'Not implemented yet', 'error');
  }

  return (
    <React.Fragment>
      <TableRow style={{ width: "auto" }}>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.orderId}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.machineId}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.partId}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.billId}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.price}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {moment(row.arrivalDate).format('ddd D MMM YYYY')}
        </TableCell>
        <TableCell style={{ width: 160, color: 'white' }} className="text-white">
          {row.status}
        </TableCell>

        <TableCell>
          <div className="flex flex-row space-x-4">
            <button
              className="w-10 h-10 p-2 mx-2 text-teal-500 bg-transparent rounded-md ring-1 ring-teal-500 hover:bg-teal-500 hover:text-white"
              onClick={() => openUpdateModal()}
            >
              <ExternalLinkIcon />
            </button>
            <button
              className="w-10 h-10 p-2 text-red-500 bg-transparent rounded-md ring-1 ring-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => deleteOrder(row.orderId)}
            >
              <TrashIcon />
            </button>
          </div>
        </TableCell>
        {/* <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            style={{ color: 'rgb(161, 161, 170)' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
      </TableRow>
      <TableRow className="w-full bg-gray-800">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="text-white" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: 'white' }}>Date</TableCell>
                    <TableCell style={{ color: 'white' }}>Customer</TableCell>
                    <TableCell style={{ color: 'white' }}>Amount</TableCell>
                    <TableCell style={{ color: 'white' }}>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>{/* เนิ้อหา */}</TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <MyDialog<Order> isModalOpen={isClick} close={closeModal} action={'edit'} current={row} >
        <OrderModal />
      </MyDialog>
      <MyDialog<Order> isModalOpen={isClickUpdate} close={closeUpdateModal} action={'I just want to be happy'} current={row} >
        <UpdateOrderStatusModal billId={row.billId} orderId={row.orderId}/>
      </MyDialog>
    </React.Fragment>
  );
}

export const OrderItems = ({
  rows,
}: {
  rows: Array<Order>;
}) => {
  const rowElements = rows.map((row, i) => {
    return <Row key={i} row={row} />;
  });
  return <>{rowElements}</>;
};
