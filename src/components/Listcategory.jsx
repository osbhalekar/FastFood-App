
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";
const API_URL = `${URL}/foodCategory`;

const Listcategory = () => {
  const navigate = useNavigate();
  const [categoryRow, setCategoryRow] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((res) => {
        console.log("fetched categories:", res.data);
        setCategoryRow(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [update]);

  const columns = [
    { field: "id", headerName: "Id", width: 80 },
    { field: "cname", headerName: "Name", width: 150 },
    {
      field: "cimage",
      headerName: "Image",
      width: 100,
      sortable: false,
      renderCell: ({ row: { cimage } }) => (
        <img
          src={cimage}
          alt="category"
          width={50}
          height={50}
          className="rounded-full"
        />
      ),
    },
    {
      field: "cdescription",
      headerName: "Description",
      width: 400,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row: { id, cname } }) => [
        <Link key={`view-${id}`} to={`/listcategory/${id}`}>
          <GridActionsCellItem icon={<VisibilityIcon />} label="View" />
        </Link>,
        <GridActionsCellItem
          key={`edit-${id}`}
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/editcategory/${id}`)}
        />,
        <GridActionsCellItem
          key={`delete-${id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const confirmation = window.confirm(
              `Do you want to delete ${cname} category?`,
            );
            if (confirmation) {
              axios
                .delete(`${API_URL}/${id}`)
                .then((response) => {
                  console.log(response);
                  setUpdate((u) => u + 1);
                })
                .catch((e) => {
                  console.error(e);
                });
            }
          }}
        />,
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={categoryRow}
        columns={columns}
        loading={loading}
        showToolbar
      />
    </Box>
  );
}

export default Listcategory;