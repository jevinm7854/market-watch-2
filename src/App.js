import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DataGrid from "./Datagrid";
import RandomData from "./randomData";
import Stat from "./stat";
import Chart from "./Chart/chart";
import ChartOld from "./Chart/chartOld";
import Line from "./Line/line";
import Intra from "./Intraday/intra";
import DropDownList from "./Comp/DropDownList";
import Buttons from "./Comp/Buttons";
import AppBar from "./Comp/AppBar";
// import Test from "./Chart/test";

import DynamicWidget from "./Comp/DynamicWidget";
import AddedDyWid from "./Comp/AddedDyWid";
import DDL_BuySell from "./Comp/DDL_BuySell";
import Chart_Dashboard from "./Chart/Chart_Dashboard";
import { registerLicense } from "@syncfusion/ej2-base";
import TabComp from "./Comp/TabComp";

function App() {
  // registerLicense()
  //   
  //"ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkBjX35ecHFdTmdY"
  // );
  // registerLicense()
  //  
  //"Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhed3RQRmFeWU13WEc="
  // );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataGrid />} />
          {/* <Route path="/random" element={<RandomData />} /> Not Useful */}
          <Route path="/stat" element={<Stat />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/chartold" element={<ChartOld />} />
          <Route path="/line" element={<Line />} />
          <Route path="/ddl" element={<DropDownList />} />
          <Route path="/btns" element={<Buttons />} />
          <Route path="/appbar" element={<AppBar />} />
          <Route path="/widget" element={<DynamicWidget />} />
          <Route path="/addwid" element={<AddedDyWid />} />
          <Route path="/ddlbs" element={<DDL_BuySell />} />
          <Route path="/chartdash" element={<Chart_Dashboard />} />
          <Route path="/tabcomp" element={<TabComp />} />
          <Route path="/intra" element={<Intra />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
