
import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { GoHomeFill } from "react-icons/go";
import { BiSolidCategory } from "react-icons/bi";
import { MdRestaurantMenu } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const Myside = ({ collapsed }) => {
  return (
    <div className="bg-(--white) text-(--black)">
      <Sidebar
        collapsed={collapsed}
        transitionDuration={1000}
        className="h-screen"
        rootStyles={{
          backgroundColor: "var(--white)",
          color: "var(--black)",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              color: "var(--black)",
            },
          }}
        >
          <MenuItem icon={<GoHomeFill />} component={<Link to="/home" />}>
            Dashboard
          </MenuItem>

          <SubMenu label="Category" icon={<BiSolidCategory />}>
            <MenuItem
              icon={<MdRestaurantMenu />}
              component={<Link to="/listcategory" />}
            >
              All Categories
            </MenuItem>

            <MenuItem icon={<FaPlus />} component={<Link to="/addcategory" />}>
              Add Category
            </MenuItem>
          </SubMenu>

          <SubMenu label="Menu" icon={<BiFoodMenu />}>
            <MenuItem
              icon={<IoFastFoodSharp />}
              component={<Link to="/listfoodmenu" />}
            >
              Food Menu
            </MenuItem>

            <MenuItem icon={<FaPlus />} component={<Link to="/addfood" />}>
              Add Food
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default Myside;
