import { Disclosure, Transition } from '@headlessui/react';
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { TableHead } from "@mui/material";
import { MyDialog } from "@components/MyDiaLog";
import axios, { AxiosResponse } from "axios";
import { TableColumms } from '@components/table/TableColumns';
import { Entity } from '@models/Entity';
import { MaintenanceLog } from '@models/MaintenanceLog';
import { ChevronDoubleRightIcon } from '@heroicons/react/solid';
import { ChevronDoubleDownIcon } from '@heroicons/react/solid';

export const MaintenanceLogItems = ({ rows }: { rows: Array<MaintenanceLog> }) => {
  const rowElements = rows.map((row, i) => {
    return (
      <TableRow key={row.maintenanceId}>
        {/* <Disclosure>
          {({ open }) => (
          <>
            <Disclosure.Button>
              <div className="w-4">
                <ChevronDoubleRightIcon
                  className={`${open ? "transform rotate-90" : ""}`}
                />
              </div>
            </Disclosure.Button>

            <Disclosure.Panel>{"hello"}</Disclosure.Panel>
          </>
          )}
        </Disclosure> */}
        <TableCell key={i} style={{ width: 160 }}>{row.maintenanceId}</TableCell>
        <TableCell key={i} style={{ width: 160 }}>{row.machineId}</TableCell>
        <TableCell key={i} style={{ width: 160 }}>{row.status}</TableCell>
        <TableCell key={i} style={{ width: 160 }}>{row.reporterId}</TableCell>
        <TableCell key={i} style={{ width: 160 }}>{row.reportDate.toString()}</TableCell>
        <TableCell key={i} style={{ width: 160 }}>{row.maintenanceDate.toString()}</TableCell>
        <div className="space-x-3">
          <button className="p-2 font-semibold bg-green-400 rounded-md">
            Edit
          </button>
          <button className="p-2 font-semibold bg-red-400 rounded-md">
            Delete
          </button>
        </div>
      </TableRow>
    );
  })
  return (
    <>
      {rowElements}
    </>
  );
}

