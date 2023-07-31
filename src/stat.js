import * as React from "react";
import io from "socket.io-client";
import "./index.css";
import { addClass, removeClass } from "@syncfusion/ej2-base";

import {
  Resize,
  Group,
  Sort,
  ColumnMenu,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Reorder,
  VirtualScroll,
  ContextMenu,
} from "@syncfusion/ej2-react-grids";

import { useNavigate } from "react-router-dom";

function Stat() {
  const [num, setNum] = React.useState([]);
  const sio = io.connect("http://localhost:3005");
  const [minim, SetMinim] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    sio.emit("sendServer", "hi");

    sio.on("fromServer", (arg) => {
      setNum(arg);
    });
    return () => {
      console.warn("socket close");
    };
  }, []);

  const queryCellInfo = (args) => {
    if (args.column?.field === "Change") {
      if (args.data["Change"] < 0) {
        updateCellDetails(args.cell, "below-0");
      } else {
        updateCellDetails(args.cell, "above-0");
      }
    } else if (args.column?.field === "Net") {
      if (args.data["Net"] < 0) {
        updateCellDetails(args.cell, "below-0");
      } else {
        updateCellDetails(args.cell, "above-0");
      }
    } else if (args.column?.field === "Rating") {
      args.cell.innerHTML = "";
      const span = document.createElement("span");
      const span2 = document.createElement("span");
      if (args.data["Change"] === 0) {
        span.classList.add("e-icons");
        span.classList.add("e-intermediate-state-2");
        span.classList.add("neutral");
        span.classList.add("ic");
        span.classList.add("side-space");
        span2.classList.add("neutral");
        span2.innerText = "Neutral";
        args.cell?.appendChild(span);
        args.cell?.appendChild(span2);
      } else if (args.data["Change"] < -2 && args.data["Net"] < 0) {
        span.classList.add("e-negc");
        span.classList.add("e-icons");
        span.classList.add("e-chevron-down-double");
        span.classList.add("below-0");
        span.classList.add("ic");
        span.classList.add("side-space");
        span2.classList.add("below-0");
        span2.innerText = "Strongly Sell";
        args.cell?.appendChild(span);
        args.cell?.appendChild(span2);
      } else if (args.data["Net"] < 0) {
        span.classList.add("e-negc");
        span.classList.add("e-icons");
        span.classList.add("e-chevron-down");
        span.classList.add("below-0");
        span.classList.add("ic");
        span.classList.add("side-space");
        span2.classList.add("below-0");
        span2.innerText = "Sell";
        args.cell?.appendChild(span);
        args.cell?.appendChild(span2);
      } else if (args.data["Change"] > 5 && args.data["Net"] > 10) {
        span.classList.add("e-posc");
        span.classList.add("e-icons");
        span.classList.add("e-chevron-up-double");
        span.classList.add("above-0");
        span.classList.add("ic");
        span.classList.add("side-space");
        span2.classList.add("above-0");
        span2.innerText = "Strongly Buy";
        args.cell?.appendChild(span);
        args.cell?.appendChild(span2);
      } else {
        span.classList.add("e-posc");
        span.classList.add("e-icons");
        span.classList.add("e-chevron-up");
        span.classList.add("above-0");
        span.classList.add("ic");
        span.classList.add("side-space");
        span2.classList.add("above-0");
        span2.innerText = "Buy";
        args.cell?.appendChild(span);
        args.cell?.appendChild(span2);
      }
    }
  };
  const updateCellDetails = (cell, className) => {
    const div = document.createElement("div");
    const span1 = document.createElement("span");
    span1.classList.add("rowcell-left");
    div.classList.add(className);
    span1.innerHTML = cell.innerHTML;
    cell.innerHTML = "";
    div.appendChild(span1);
    cell.appendChild(div);
  };

  let flag = false;
  let gridInstance;
  let ToolbarInstance;
  function click(e) {
    if (!flag) {
      return;
    }
    let element = e.target;
    if (
      !element.classList.contains("e-tbar-btn-text") &&
      !element.classList.contains("e-tbar-btn")
    ) {
      return;
    }
    element =
      element.tagName === "BUTTON" ? element.firstElementChild : element;
    flag = false;
    let hidden = element.classList.contains("e-ghidden");
    let classFn = hidden ? removeClass : addClass;
    classFn([element], "e-ghidden");
    if (hidden) {
      gridInstance.showColumns(element.innerHTML);
    } else {
      gridInstance.hideColumns(element.innerHTML);
    }
    flag = true;
  }
  function dataBound() {
    flag = true;
  }
  //   const updateCellValues = () => {
  //     grid?.setCellValue(
  //       grid?.currentViewData[i]["id"],
  //       "Change",
  //       parseFloat(newValue.toFixed(2))
  //     );
  //   };

  const groupOptions = { showGroupedColumn: true };
  const filterSettings = { type: "CheckBox" };

  const contextMenuItems = [
    { text: "BuySell", target: ".e-content", id: "BuySell" },
    { text: "Order", target: ".e-content", id: "order" },
    { text: "MBP", target: ".e-content", id: "mbp" },
    { text: "Position", target: ".e-content", id: "position" },
    { text: "Holding", target: ".e-content", id: "holding" },
    { text: "Chart", target: ".e-content", id: "chart" },

    //buysell,order,mbp,position,holding
  ];
  // const [b, setb] = React.useState(false);
  const contextMenuClick = (args) => {
    if (gridInstance && args.item.id === "mbp") {
      // gridInstance.copy(true);
      // setb(true);
      // SetMinim(false);
      // localStorage.setItem("mini", "true");
      // navigate("/tabcomp", { state: true });
    }
    // console.log(args.rowInfo.rowData);
  };
  const RowSelection = () => {
    if (gridInstance) {
      // const selectedrowindex = gridInstance.getSelectedRowIndexes();
      // /** Get the selected records. */
      const selectedrecords = gridInstance.getSelectedRecords();
      // navigate("/tabcomp", { state: true });
      // //  setData(selectedrecords);
      // console.log("selectedrecords", selectedrecords[0]);
    }
  };

  return (
    <>
      {/* <div className="e-statustext">
        Select column name to toggle visibility
      </div> */}
      {/* <ToolbarComponent
        id="toolbar"
        ref={(toolbar) => (ToolbarInstance = toolbar)}
        onClick={click.bind(this)}
      >
        <ItemsDirective>
          <ItemDirective text="Ticker" />
          <ItemDirective text="Change % 1D" />
          <ItemDirective text="Net" />
          <ItemDirective text="Technical Rating 1D" />
        </ItemsDirective>
      </ToolbarComponent> */}
      {/* <br /> */}
      {/* <div className="control-pane">
        <div className="control-section"> */}

      <GridComponent
        id="livestream"
        dataSource={num}
        allowReordering={true}
        enableVirtualization={true}
        enableVirtualMaskRow={false}
        enableHover={true}
        rowHeight={38}
        contextMenuItems={contextMenuItems}
        contextMenuClick={contextMenuClick}
        // height={300}
        dataBound={dataBound.bind(this)}
        allowSelection={true}
        // recordClick={RowSelection}
        rowSelected={RowSelection}
        queryCellInfo={queryCellInfo}
        allowPaging={true}
        allowGrouping={false}
        allowSorting={true}
        allowFiltering={true}
        showColumnMenu={true}
        groupSettings={groupOptions}
        filterSettings={filterSettings}
        ref={(grid) => (gridInstance = grid)}
        style={{ overflow: "scroll", width: "100%", height: "100%" }}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="id"
            headerText="ID"
            width="140"
            isPrimaryKey={true}
            visible={false}
          />
          <ColumnDirective
            field="ticker"
            headerText="Ticker"
            width="100"
            format="N0"
            textAlign="Center"
            showInColumnChooser={false}
          />

          <ColumnDirective
            field="Change"
            headerText="Change % 1D"
            width="100"
            format="C2"
            textAlign="Center"
          />

          <ColumnDirective
            field="Net"
            headerText="Net"
            width="100"
            format="C2"
            type="number"
            textAlign="Center"
          />
          <ColumnDirective
            field="Rating"
            width="150"
            headerText="Technical Rating 1D"
            textAlign="Center"
          />
          {/* <ColumnDirective
              field="Rating"
              width="150"
              headerText="Technical Rating 1D"
            /> */}
        </ColumnsDirective>

        <Inject
          services={[
            Reorder,
            VirtualScroll,
            Resize,
            // Group,
            Sort,
            ColumnMenu,
            Filter,
            Page,
            ContextMenu,
          ]}
        />
      </GridComponent>

      {/* <div className="text-align" anchorEl={b}>
        <ChartOld />
      </div> */}
      {/* <ContextMenuComponent
        target="#livestream"
        items={menuItems}
        animationSettings={animationSettings}
        beforeItemRender={addDisabled}
      /> */}
      {/* </div>
      </div> */}
    </>
  );
}

export default Stat;
