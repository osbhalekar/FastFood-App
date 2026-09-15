import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const URL = "https://6a71d7b7f687776c13f0b4ea.mockapi.io/dashboard";
const API_URL = `${URL}/foodMenu`;
const C_URL = `${URL}/foodCategory`;

const Listfoodmenu = () => {
  const navigate = useNavigate();
  const [foodMenuRow, setFoodMenuRow] = useState([]);
  const [categories, setCategories] = useState([]);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([axios.get(API_URL), axios.get(C_URL)])
      .then(([foodRes, catRes]) => {
        console.log("fetched food menu:", foodRes.data);
        setFoodMenuRow(foodRes.data);
        setCategories(catRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [update]);

  const categoryName = (categoryId) =>
    categories.find((c) => String(c.id) === String(categoryId))?.cname ||
    "—";

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    {
      field: "imageurl",
      headerName: "Image",
      width: 90,
      sortable: false,
      renderCell: ({ row: { imageurl } }) => (
        <img
          src={imageurl}
          alt="food"
          width={50}
          height={50}
          className="rounded-full"
        />
      ),
    },
    { field: "foodName", headerName: "Name", width: 170 },
    {
      field: "foodCategoryId",
      headerName: "Category",
      width: 130,
      renderCell: ({ row: { foodCategoryId } }) =>
        categoryName(foodCategoryId),
    },
    {
      field: "foodDescription",
      headerName: "Description",
      width: 280,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      width: 90,
      renderCell: ({ row: { price } }) => `₹${price}`,
    },
    {
      field: "discount",
      headerName: "Discount",
      width: 90,
      renderCell: ({ row: { discount } }) => (discount ? `${discount}%` : "—"),
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 90,
      renderCell: ({ row: { calories } }) => calories ?? "—",
    },
    {
      field: "spicy",
      headerName: "Spicy",
      width: 90,
      renderCell: ({ row: { spicy } }) =>
        spicy ? (
          <Chip label="Spicy" size="small" color="error" variant="outlined" />
        ) : (
          "—"
        ),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ row: { id, foodName } }) => [
        <Link key={`view-${id}`} to={`/viewfoodmenu/${id}`}>
          <GridActionsCellItem icon={<VisibilityIcon />} label="View" />
        </Link>,
        <GridActionsCellItem
          key={`edit-${id}`}
          icon={<EditIcon />}
          label="Edit"
          onClick={() => navigate(`/editfoodmenu/${id}`)}
        />,
        <GridActionsCellItem
          key={`delete-${id}`}
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            const confirmation = window.confirm(
              `Do you want to delete ${foodName} from the menu?`,
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
        rows={foodMenuRow}
        columns={columns}
        loading={loading}
        showToolbar
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default Listfoodmenu;