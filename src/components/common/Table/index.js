import moment from "moment/moment";
import React from "react";

const Table = ({ columns, data, handleActions }) => {
  return (
    <div>
      <div className="table-header">
        {columns.map((column) => {
          return <div style={column.style}>{column.Header}</div>;
        })}
      </div>
      <div>
        {data.map((row) => {
          return (
            <div className="table-row">
              {columns.map((column) => {
                if (column.type === "date") {
                  return (
                    <div style={column.style}>
                      {moment(row[column.datakey].format("MMM Do YY"))}
                    </div>
                  );
                } else if (column.type === "doc") {
                  return (
                    <div style={column.style}>
                      <button
                        className="resume-btn"
                        onClick={() => {
                          window.open(row[column.datakey]);
                        }}
                      >
                        Resume
                      </button>
                    </div>
                  );
                } else if (column.type === "action") {
                  return (
                    <div style={column.style}>
                      <button
                        disabled={row.status === "accepted" ? true : false}
                        style={{
                          opacity: row.status === "accepted" ? 0.5 : 1,
                        }}
                        className="accepted"
                        onClick={() => {
                          handleActions("accept", row);
                        }}
                      >
                        Accept
                      </button>
                      <button
                        disabled={row.status === "accepted" ? true : false}
                        style={{
                          opacity: row.status === "accepted" ? 0.5 : 1,
                        }}
                        className="rejected"
                        onClick={() => {
                          handleActions("reject", row);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  );
                }
                return <div style={column.style}>{row[column.datakey]}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Table;
