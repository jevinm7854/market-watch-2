import { useRef } from "react";
import { addClass, removeClass } from "@syncfusion/ej2-base";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import DDL_BuySell from "../Comp/DDL_BuySell";
import DDL_Comp from "./DDL_Comp";
import Stat from "../stat";
import Draggable from "react-draggable";
import io from "socket.io-client";
import { Button } from "bootstrap";
import { registerLicense } from "@syncfusion/ej2-base";
import { useEffect } from "react";
import { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Reorder,
  VirtualScroll,
  ContextMenu,
  ColumnMenu,
  Filter,
  Resize,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { getTradeData } from "../data";
const TabComp = () => {
  // registerLicense(
  //   "ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkBjX35ecHFdTmdY"
  // );
  const navigate = useNavigate();
  const location = useLocation();
  let { state } = useLocation();

  const [diag, SetDiag] = React.useState(false);
  const [minim, SetMinim] = React.useState(false);
  // const sio = io.connect("http://150.0.0.70:3005");
  const [nameMar, SetNameMar] = React.useState("");
  const tabObj = useRef(null);
  const Dropdown = (props) => {
    return (
      <div>
        <DropDownListComponent
          dataSource={props.data}
          placeholder="Select a game"
        />
      </div>
    );
  };

  // useEffect(() => {
  //   SetMinim(state);
  // });

  const addButtonClicked = (e) => {
    // const newTabItem = [
    //   {
    //     header: { text: "DynamicTabItem" },
    //     content: thirdDropdownTemplate,
    //   },
    // ];
    // tabObj.current.addTab(newTabItem, 1);
    SetDiag(true);
  };
  // useEffect(() => {
  //   SetMinim(state);
  // }, [state]);
  // console.warn(minim);

  const NameSub = (e) => {
    const newTabItem = [
      {
        header: { text: nameMar },
        content: DDL_Comp,
      },
    ];
    tabObj.current.addTab(newTabItem, 1);
    console.log(e);
    e.preventDefault();
    SetDiag(false);
    // state = false;
  };
  const miniButtonClicked = (e) => {
    // tabObj.current.removeTab(1);
    SetMinim(true);
  };

  const minButton = (e) => {
    const newTabItem = [
      {
        header: { text: "Test" },
        content: DDL_Comp,
      },
    ];
    SetMinim(false);
    tabObj.current.addTab(newTabItem, 1);
    // console.log(minim);
    e.preventDefault();
    console.warn(tabObj);
  };

  const cancWatch = () => {
    SetDiag(false);
  };

  let tabItemsHeaderText = [
    { text: "Default" },
    // { text: "MarketWatch +/-" },
    // { text: "Reused Dropdown" },
  ];
  // const sio = io.connect("http://150.0.0.70:3005");
  // function Stat() {
  //   // const sio = io.connect("http://150.0.0.70:3005");
  //   // const [minim, SetMinim] = React.useState(true);
  //   const navigate = useNavigate();
  //   const [num, setNum] = React.useState([]);
  //   let sio;

  //   React.useEffect(() => {
  //     const sio = io.connect("http://150.0.0.70:3005");

  //     sio.emit("sendServer", "hi");

  //     sio.on("fromServer", (arg) => {
  //       setNum(arg);
  //     });
  //     return () => {
  //       console.warn("socket close");
  //     };
  //   }, []);

  //   const queryCellInfo = (args) => {
  //     if (args.column?.field === "Change") {
  //       if (args.data["Change"] < 0) {
  //         updateCellDetails(args.cell, "below-0");
  //       } else {
  //         updateCellDetails(args.cell, "above-0");
  //       }
  //     } else if (args.column?.field === "Net") {
  //       if (args.data["Net"] < 0) {
  //         updateCellDetails(args.cell, "below-0");
  //       } else {
  //         updateCellDetails(args.cell, "above-0");
  //       }
  //     } else if (args.column?.field === "Rating") {
  //       args.cell.innerHTML = "";
  //       const span = document.createElement("span");
  //       const span2 = document.createElement("span");
  //       if (args.data["Change"] === 0) {
  //         span.classList.add("e-icons");
  //         span.classList.add("e-intermediate-state-2");
  //         span.classList.add("neutral");
  //         span.classList.add("ic");
  //         span.classList.add("side-space");
  //         span2.classList.add("neutral");
  //         span2.innerText = "Neutral";
  //         args.cell?.appendChild(span);
  //         args.cell?.appendChild(span2);
  //       } else if (args.data["Change"] < -2 && args.data["Net"] < 0) {
  //         span.classList.add("e-negc");
  //         span.classList.add("e-icons");
  //         span.classList.add("e-chevron-down-double");
  //         span.classList.add("below-0");
  //         span.classList.add("ic");
  //         span.classList.add("side-space");
  //         span2.classList.add("below-0");
  //         span2.innerText = "Strongly Sell";
  //         args.cell?.appendChild(span);
  //         args.cell?.appendChild(span2);
  //       } else if (args.data["Net"] < 0) {
  //         span.classList.add("e-negc");
  //         span.classList.add("e-icons");
  //         span.classList.add("e-chevron-down");
  //         span.classList.add("below-0");
  //         span.classList.add("ic");
  //         span.classList.add("side-space");
  //         span2.classList.add("below-0");
  //         span2.innerText = "Sell";
  //         args.cell?.appendChild(span);
  //         args.cell?.appendChild(span2);
  //       } else if (args.data["Change"] > 5 && args.data["Net"] > 10) {
  //         span.classList.add("e-posc");
  //         span.classList.add("e-icons");
  //         span.classList.add("e-chevron-up-double");
  //         span.classList.add("above-0");
  //         span.classList.add("ic");
  //         span.classList.add("side-space");
  //         span2.classList.add("above-0");
  //         span2.innerText = "Strongly Buy";
  //         args.cell?.appendChild(span);
  //         args.cell?.appendChild(span2);
  //       } else {
  //         span.classList.add("e-posc");
  //         span.classList.add("e-icons");
  //         span.classList.add("e-chevron-up");
  //         span.classList.add("above-0");
  //         span.classList.add("ic");
  //         span.classList.add("side-space");
  //         span2.classList.add("above-0");
  //         span2.innerText = "Buy";
  //         args.cell?.appendChild(span);
  //         args.cell?.appendChild(span2);
  //       }
  //     }
  //   };
  //   const updateCellDetails = (cell, className) => {
  //     const div = document.createElement("div");
  //     const span1 = document.createElement("span");
  //     span1.classList.add("rowcell-left");
  //     div.classList.add(className);
  //     span1.innerHTML = cell.innerHTML;
  //     cell.innerHTML = "";
  //     div.appendChild(span1);
  //     cell.appendChild(div);
  //   };

  //   let flag = false;
  //   let gridInstance;
  //   let ToolbarInstance;
  //   function click(e) {
  //     if (!flag) {
  //       return;
  //     }
  //     let element = e.target;
  //     if (
  //       !element.classList.contains("e-tbar-btn-text") &&
  //       !element.classList.contains("e-tbar-btn")
  //     ) {
  //       return;
  //     }
  //     element =
  //       element.tagName === "BUTTON" ? element.firstElementChild : element;
  //     flag = false;
  //     let hidden = element.classList.contains("e-ghidden");
  //     let classFn = hidden ? removeClass : addClass;
  //     classFn([element], "e-ghidden");
  //     if (hidden) {
  //       gridInstance.showColumns(element.innerHTML);
  //     } else {
  //       gridInstance.hideColumns(element.innerHTML);
  //     }
  //     flag = true;
  //   }
  //   function dataBound() {
  //     flag = true;
  //   }
  //   //   const updateCellValues = () => {
  //   //     grid?.setCellValue(
  //   //       grid?.currentViewData[i]["id"],
  //   //       "Change",
  //   //       parseFloat(newValue.toFixed(2))
  //   //     );
  //   //   };

  //   const groupOptions = { showGroupedColumn: true };
  //   const filterSettings = { type: "CheckBox" };

  //   let num1 = getTradeData;

  //   const contextMenuItems = [
  //     { text: "BuySell", target: ".e-content", id: "BuySell" },
  //     { text: "Order", target: ".e-content", id: "order" },
  //     { text: "MBP", target: ".e-content", id: "mbp" },
  //     { text: "Position", target: ".e-content", id: "position" },
  //     { text: "Holding", target: ".e-content", id: "holding" },
  //     { text: "Chart", target: ".e-content", id: "chart" },

  //     //buysell,order,mbp,position,holding
  //   ];
  //   // const [b, setb] = React.useState(false);
  //   const contextMenuClick = (args) => {
  //     if (gridInstance && args.item.id === "mbp") {
  //       // gridInstance.copy(true);
  //       // setb(true);
  //       SetMinim(true);
  //       // localStorage.setItem("mini", "true");

  //       // navigate("/tabcomp", { state: true });
  //     }
  //     // console.log(args.rowInfo.rowData);
  //   };
  //   const RowSelection = () => {
  //     if (gridInstance) {
  //       // const selectedrowindex = gridInstance.getSelectedRowIndexes();
  //       // /** Get the selected records. */
  //       const selectedrecords = gridInstance.getSelectedRecords();
  //       // navigate("/tabcomp", { state: true });
  //       // //  setData(selectedrecords);
  //       // console.log("selectedrecords", selectedrecords[0]);
  //     }
  //   };

  //   return (
  //     <>
  //       {/* <div className="e-statustext">
  //         Select column name to toggle visibility
  //       </div> */}
  //       {/* <ToolbarComponent
  //         id="toolbar"
  //         ref={(toolbar) => (ToolbarInstance = toolbar)}
  //         onClick={click.bind(this)}
  //       >
  //         <ItemsDirective>
  //           <ItemDirective text="Ticker" />
  //           <ItemDirective text="Change % 1D" />
  //           <ItemDirective text="Net" />
  //           <ItemDirective text="Technical Rating 1D" />
  //         </ItemsDirective>
  //       </ToolbarComponent> */}
  //       {/* <br /> */}
  //       {/* <div className="control-pane">
  //         <div className="control-section"> */}

  //       <GridComponent
  //         id="livestream"
  //         dataSource={num}
  //         allowReordering={true}
  //         enableVirtualization={true}
  //         enableVirtualMaskRow={false}
  //         enableHover={true}
  //         rowHeight={38}
  //         contextMenuItems={contextMenuItems}
  //         contextMenuClick={contextMenuClick}
  //         // height={300}
  //         dataBound={dataBound.bind(this)}
  //         allowSelection={true}
  //         // recordClick={RowSelection}
  //         rowSelected={RowSelection}
  //         queryCellInfo={queryCellInfo}
  //         allowPaging={true}
  //         allowGrouping={false}
  //         allowSorting={true}
  //         allowFiltering={true}
  //         showColumnMenu={true}
  //         groupSettings={groupOptions}
  //         filterSettings={filterSettings}
  //         ref={(grid) => (gridInstance = grid)}
  //         style={{ overflow: "scroll", width: "100%", height: "100%" }}
  //       >
  //         <ColumnsDirective>
  //           <ColumnDirective
  //             field="id"
  //             headerText="ID"
  //             width="140"
  //             isPrimaryKey={true}
  //             visible={false}
  //           />
  //           <ColumnDirective
  //             field="ticker"
  //             headerText="Ticker"
  //             width="100"
  //             format="N0"
  //             textAlign="Center"
  //             showInColumnChooser={false}
  //           />

  //           <ColumnDirective
  //             field="Change"
  //             headerText="Change % 1D"
  //             width="100"
  //             format="C2"
  //             textAlign="Center"
  //           />

  //           <ColumnDirective
  //             field="Net"
  //             headerText="Net"
  //             width="100"
  //             format="C2"
  //             type="number"
  //             textAlign="Center"
  //           />
  //           <ColumnDirective
  //             field="Rating"
  //             width="150"
  //             headerText="Technical Rating 1D"
  //             textAlign="Center"
  //           />
  //           {/* <ColumnDirective
  //               field="Rating"
  //               width="150"
  //               headerText="Technical Rating 1D"
  //             /> */}
  //         </ColumnsDirective>

  //         <Inject
  //           services={[
  //             Reorder,
  //             VirtualScroll,
  //             Resize,
  //             // Group,
  //             Sort,
  //             ColumnMenu,
  //             Filter,
  //             Page,
  //             ContextMenu,
  //           ]}
  //         />
  //       </GridComponent>

  //       {/* <div className="text-align" anchorEl={b}>
  //         <ChartOld />
  //       </div> */}
  //       {/* <ContextMenuComponent
  //         target="#livestream"
  //         items={menuItems}
  //         animationSettings={animationSettings}
  //         beforeItemRender={addDisabled}
  //       /> */}
  //       {/* </div>
  //       </div> */}
  //     </>
  //   );
  // }

  return (
    <div id="container">
      <div style={{ textAlign: "right" }}>
        <button
          id="add"
          className="e-btn"
          style={{ marginRight: "1%" }}
          onClick={addButtonClicked}
        >
          Watchlist +
        </button>
        <button
          id="remove"
          className="e-btn"
          style={{ marginRight: "1%" }}
          onClick={miniButtonClicked}
        >
          Minimize Test
        </button>
      </div>

      <TabComponent id="tabElement" ref={tabObj} showCloseButton={true}>
        <TabItemsDirective>
          <TabItemDirective header={tabItemsHeaderText[0]} content={Stat} />
          {/* <TabItemDirective header={tabItemsHeaderText[1]} content={DDL_Comp} />
          <TabItemDirective
            header={tabItemsHeaderText[2]}
            content={secondDropdownTemplate}
          /> */}
        </TabItemsDirective>
      </TabComponent>
      {diag && (
        <Draggable
        // style={{ border: "solid 1px" }}
        // bounds={{ left: 5, right: 550, bottom: 480, top: 5 }}
        >
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              zIndex: 2000,
              backgroundColor: "#FFFFFF",
              margin: "2em 2em",
              width: "52%",
              boxShadow: " 1px 1px 8px 3px grey",

              // boxShadow: " -1px 5px 30px -8px grey",
            }}
          >
            <form
              style={{ padding: 20, margin: 50, fontSize: 15 }}
              onSubmit={NameSub}
              autoComplete="off"
            >
              <label style={{ marginRight: 12 }}>Watchlist Name : </label>
              <input
                style={{ marginRight: 12 }}
                id="MarName"
                type="text"
                onChange={(event) => SetNameMar(event.target.value)}
                autoFocus={true}
                // placeholder="Enter watchlist name here"
              ></input>
              <button type="submit" style={{ marginRight: 12 }}>
                Submit
              </button>
              <button onClick={cancWatch}>Cancel</button>
            </form>
          </div>
        </Draggable>
      )}

      {minim && (
        <Draggable
        // style={{ border: "solid 1px" }}
        // bounds={{ left: 5, right: 550, bottom: 480, top: 5 }}
        >
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "10%",
              zIndex: 2000,
              backgroundColor: "#FFFFFF",
              margin: "2em 2em",
              width: "52%",
              boxShadow: " 1px 1px 8px 3px grey",
              padding: "2%",
              // boxShadow: " -1px 5px 30px -8px grey",
            }}
          >
            <button
              onClick={minButton}
              style={{ margin: "1%", float: "right", padding: " 1% 2%" }}
            >
              -
            </button>
            <h2>Click here to minimize and turn into tab -{">"} </h2>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default TabComp;
