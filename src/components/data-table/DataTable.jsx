import React from "react";
import styles from "./DataTable.module.css";
import { Tooltip, Typography } from "@mui/material";
const columnCellSx = {
  padding: "0 12px",
  alignContent: "center",
  color: "#86929E",
  fontWeight: "400",
  overflow: "hidden",
  paddingInlineStart: "12px",
  // overflow:" hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};
const DataTable = ({ rows, cols }) => {
  if (rows?.length == 0) return <p>No Items To Display.</p>;
  return (
    <div className={styles?.table_container}>
      <table>
        <thead>
          <tr>
            {cols.map((col, colIdx) => {
              const newCellSx = { ...columnCellSx };
              if (col?.width) {
                newCellSx["width"] = col.width;
                newCellSx["minWidth"] = col.width;
                newCellSx["maxWidth"] = col.width;
              }
              if (!col?.width) {
                newCellSx["flex"] = "1";
                // newCellSx["minWidth"] = "20ch";
              }
              newCellSx["backgroundColor"] = "#F9FCFF";
              newCellSx["padding"] = "16px 0";
              return (
                <th style={newCellSx} key={colIdx}>
                  {col.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => {
            return (
              <tr key={row?.id || rowIdx}>
                {cols.map((col, rowColIdx) => {
                  const newCellSx = { ...columnCellSx };

                  if (col?.width) {
                    newCellSx["width"] = col.width;
                    newCellSx["minWidth"] = col.width;
                    newCellSx["maxWidth"] = col.width;
                  }
                  if (!col?.width) {
                    newCellSx["flex"] = "1";
                    // newCellSx["minWidth"] = "20ch";
                  }
                  newCellSx["padding"] = "0px 12px";
                  newCellSx["backgroundColor"] = "#ffffff";
                  newCellSx["padding"] = "12px 0";
                  newCellSx["borderRadius"] = "6px";

                  return (
                    <Tooltip
                      key={rowColIdx}
                      title={col?.renderCell ? col?.label : row[col.dataKey]}
                    >
                      <td style={newCellSx}>
                        {col?.renderCell
                          ? col.renderCell(row)
                          : row[col.dataKey]}
                      </td>
                    </Tooltip>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
