import React, { useEffect, useState } from "react";
import {
  AppBarComponent,
  MenuComponent,
} from "@syncfusion/ej2-react-navigations";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { useNavigate } from "react-router-dom";
import DDL_BuySell from "./DDL_BuySell";

function AppBar() {
  const navigate = useNavigate();

  const [BsVisible, SetBsVisible] = useState(false);
  // useEffect = () => {
  //   let x = localStorage.getItem("BS");
  //   SetBsVisible(x === "true");
  // };
  const companyMenuItems = [
    {
      text: "BuySell",
      // items: [
      //   { text: "About Us" },
      //   { text: "Customers" },
      //   { text: "Blog" },
      //   { text: "Careers" },
      // ],
    },
  ];
  const productMenuItems = [
    {
      text: "Positions",
      items: [
        { text: "Developer" },
        { text: "Analytics" },
        { text: "Reporting" },
        { text: "Help Desk" },
      ],
    },
  ];
  const aboutMenuItems = [
    {
      text: "Holdings",
      //   items: [{ text: "Developer" }],
    },
  ];
  const carrerMenuItems = [
    {
      text: "Chart",
    },
  ];
  const avMenuItems = [
    {
      text: "JM",
      items: [
        {
          text: "Log In",
        },
        { text: "Sign Out" },
      ],
    },
  ];

  const marketMenuItems = [{ text: "MarketWatch" }];

  const navChart = () => {
    navigate("/chartdash");
  };

  const navMarket = () => {
    navigate("/addwid");
  };

  const navBuySell = () => {
    SetBsVisible(!BsVisible);
    localStorage.setItem("BS", !BsVisible);
  };

  const sportsData = [
    "Badminton",
    "Basketball",
    "Cricket",
    "Rugby",
    "Snooker",
    "Tennis",
    "Football",
    "Golf",
    "Hockey",
    "Swimming",
    "Archery",
    "Athletics",
    "Squash",
    "Chess",
    "Polo",
  ];

  return (
    <div className="control-container">
      <AppBarComponent colorMode="Dark" isSticky="true">
        <ButtonComponent
          cssClass="e-inherit"
          iconCss="e-icons e-menu"
        ></ButtonComponent>
        <MenuComponent
          cssClass="e-inherit"
          items={companyMenuItems}
          onClick={navBuySell}
        ></MenuComponent>
        <MenuComponent
          cssClass="e-inherit"
          items={productMenuItems}
        ></MenuComponent>
        <MenuComponent
          cssClass="e-inherit"
          items={aboutMenuItems}
        ></MenuComponent>
        <MenuComponent
          cssClass="e-inherit"
          items={carrerMenuItems}
          onClick={navChart}
        ></MenuComponent>
        <MenuComponent
          cssClass="e-inherit"
          items={marketMenuItems}
          onClick={navMarket}
        ></MenuComponent>

        <div className="e-appbar-spacer"></div>

        <MenuComponent
          // className=" e-avatar e-avatar-small "
          cssClass="e-custom"
          items={avMenuItems}
          id="abc"
        ></MenuComponent>
        <div style={{ marginRight: 10 }}></div>
        {/* <div className="e-appbar-spacer"></div> */}
        {/* <MenuComponent></MenuComponent> */}
        {/* <span className="e-avatar e-avatar-xsmall"></span> */}
        {/* <ButtonComponent cssClass="e-inherit">Login</ButtonComponent>
        <ButtonComponent cssClass="e-inherit">Sign Out</ButtonComponent> */}
      </AppBarComponent>
      {BsVisible && <DDL_BuySell />}
    </div>
  );
}

export default AppBar;
