import { createRoot } from "react-dom/client";
import "./index.css";
import * as React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  VirtualScroll,
  Inject,
} from "@syncfusion/ej2-react-grids";

import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { getTradeData } from "./data";
import { registerLicense } from "@syncfusion/ej2-base";

function DataGrid() {
  // React.useEffect(() => {
  //     updateSampleSection();
  // }, []);

  let grid;
  let isDataBound = true;
  let updateButton;
  let clearButton;
  let feedDelayInput;
  let timerID;
  let initial = true;
  const load = function (args) {
    this.on("data-ready", () => {
      if (initial) {
        document.getElementById("update1")?.click();
        initial = false;
        feedDelayInput.element.addEventListener("keypress", (e) => {
          if (
            e &&
            e.key === "Enter" &&
            feedDelayInput.element.parentElement.classList.contains(
              "e-input-focus"
            )
          ) {
            feedDelayInput.value = parseInt(feedDelayInput.element.value);
            feedDelayInput.focusOut();
            updateButton.element.click();
          }
        });
      }
    });
    this.on("destroy", function () {
      if (timerID) {
        clearInterval(timerID);
        timerID = undefined;
      }
    });
  };
  const queryCellInfo = (args) => {
    if (args.column?.field === "NetIncome") {
      if (args.data["Net"] < 0) {
        args.cell?.classList.remove("e-increase");
        args.cell?.classList.add("e-decrease");
      } else if (args.data["Net"] > 0) {
        args.cell?.classList.remove("e-decrease");
        args.cell?.classList.add("e-increase");
      }
    } else if (args.column?.field === "Change") {
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
    } else if (isDataBound) {
      if (args.column?.field === "Rating") {
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
    }
    isDataBound = true;
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
  const updateCellValues = () => {
    let oldValue;
    let newValue;
    for (let i = 0; grid && i < grid?.currentViewData.length; i++) {
      if (grid?.currentViewData[i] === undefined) {
        return;
      }
      let num = Math.floor(Math.random() * 99) + 1;
      num *= Math.floor(Math.random() * 2) === 1 ? 1 : -1;
      oldValue = grid?.currentViewData[i]["Net"];
      if (i % 2 === 0) {
        num = num * 0.25;
      } else if (i % 3 === 0) {
        num = num * 0.83;
      } else if (i % 5 === 0) {
        num = num * 0.79;
      } else if (i % 4 === 0) {
        num = num * 0.42;
      } else {
        num = num * 0.51;
      }
      isDataBound = true;
      grid?.setCellValue(
        grid?.currentViewData[i]["id"],
        "Net",
        parseFloat(num.toFixed(2))
      );
      isDataBound = true;
      newValue = parseFloat(
        (grid?.currentViewData[i]["Net"] - oldValue).toString().substring(0, 2)
      );
      grid?.setCellValue(
        grid?.currentViewData[i]["id"],
        "Change",
        parseFloat(newValue.toFixed(2))
      );
      isDataBound = true;
      const ratingValue = grid?.currentViewData[i]["Net"] < 0 ? "Sell" : "Buy";
      grid?.setCellValue(grid?.currentViewData[i]["id"], "Rating", ratingValue);
      const val = num + newValue;
      grid?.setCellValue(grid?.currentViewData[i]["id"], "NetIncome", val);
    }
  };
  const data = getTradeData;
  const updateClick = () => {
    if (!timerID) {
      updateButton.disabled = true;
      feedDelayInput.enabled = false;
      clearButton.disabled = false;
      timerID = setInterval(updateCellValues, feedDelayInput.value);
    }
  };
  const clearClick = () => {
    if (timerID) {
      updateButton.disabled = false;
      feedDelayInput.enabled = true;
      clearButton.disabled = true;
      clearInterval(timerID);
      timerID = undefined;
    }
  };
  return (
    <div className="control-pane">
      <div className="control-section row">
        <div style={{ marginBottom: "10px" }}>
          <h4
            style={{
              display: "inline-block",
              fontSize: "14px",
              paddingLeft: "5px",
            }}
          >
            Feed Delay(ms):
          </h4>
          <NumericTextBoxComponent
            format="N0"
            value={1000}
            min={10}
            max={5000}
            step={1}
            width={"150px"}
            style={{ marginLeft: "7px" }}
            ref={(scope) => {
              feedDelayInput = scope;
            }}
          />
          <ButtonComponent
            id="update1"
            ref={(scope) => {
              updateButton = scope;
            }}
            onClick={updateClick}
            style={{ marginLeft: "10px" }}
          >
            Start Data Update
          </ButtonComponent>
          <ButtonComponent
            id="clear"
            ref={(scope) => {
              clearButton = scope;
            }}
            onClick={clearClick}
            style={{ marginLeft: "10px" }}
          >
            Stop Data Update
          </ButtonComponent>
        </div>
        <GridComponent
          id="livestream"
          dataSource={data}
          enableVirtualization={true}
          enableVirtualMaskRow={false}
          enableHover={false}
          rowHeight={38}
          height={500}
          ref={(g) => {
            grid = g;
          }}
          allowSelection={false}
          queryCellInfo={queryCellInfo}
          load={load}
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
              field="CountryCode"
              headerText="Ticker"
              width="70"
            />
            <ColumnDirective
              field="Change"
              headerText="Change % 1D"
              width="100"
              format="N0"
              textAlign="Right"
            />
            <ColumnDirective
              field="Net"
              headerText="Net"
              width="100"
              format="C2"
              type="number"
              textAlign="Right"
            />
            <ColumnDirective
              field="Rating"
              width="150"
              headerText="Technical Rating 1D"
            />
            <ColumnDirective
              field="NetIncome"
              headerText="Net Income"
              width="150"
              format="C2"
              type="number"
              textAlign="Right"
            />
            <ColumnDirective field="Sector" width="160" headerText="Sector" />
            <ColumnDirective
              field="EmployeeCount"
              width="130"
              headerText="Employee Count"
              textAlign="Right"
            />
          </ColumnsDirective>
          <Inject services={[VirtualScroll]} />
        </GridComponent>
      </div>
    </div>
  );
}



export default DataGrid;
