import { createRoot } from "react-dom/client";
import "../index.css";
import AppBar from "./AppBar";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import {
  DashboardLayoutComponent,
  PanelsDirective,
  PanelDirective,
} from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  Inject,
  AccumulationLegend,
  PieSeries,
  AccumulationTooltip,
  ColumnSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  AccumulationDataLabel,
  ChartComponent,
  Legend,
  Category,
  Tooltip,
  DataLabel,
  SplineAreaSeries,
  DateTime,
} from "@syncfusion/ej2-react-charts";
import DDL_Comp from "./DDL_Comp";
import Stat from "../stat";
import DDL_BuySell from "./DDL_BuySell";
var count = 4;
const DynamicWidget = () => {
  let btnobj = useRef(null);
  let dashboardObj = useRef(null);
  let lineObj = useRef(null);
  let pieObj = useRef(null);
  let splineObj = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setResizing] = useState(false);
  const [btnContent, setBtnContent] = useState("Edit");
  const [icon, setIcon] = useState("edit");
  const [display, setDisplay] = useState("none");
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleRem, setIsVisibleRem] = useState(false);
  // var count = 4;
  const cellSpacing = [10, 10];
  let loc = window.location;
  const btnClick = () => {
    if (btnobj.current.element.classList.contains("e-active")) {
      setIsDragging(true);
      setResizing(true);
      setBtnContent("Save");
      setIcon("save");
      setDisplay("block");
    } else {
      setIsDragging(false);
      setResizing(false);
      setBtnContent("Edit");
      setIcon("edit");
      setDisplay("none");
    }
  };
  const onPanelResize = (args) => {
    if (
      args.element &&
      args.element.querySelector(".e-panel-container .e-panel-content div div")
    ) {
      let chartObj = args.element.querySelector(
        ".e-panel-container .e-panel-content div div"
      ); //.ej2_instances[0];
      chartObj.height = "95%";
      chartObj.width = "100%";
      //chartObj.refresh();
    }
  };

  const dlgClickRem = () => {
    setIsVisibleRem(true);
    dashboardObj.current.removeAll();
    // dashboardObj.current.removePanel("_layout3");
    // dashboardObj.current.removePanel("_layout4");
  };

  const dlgClick = () => {
    setIsVisible(true);
    lineObj.current.onclick = () => {
      //Add_Delete Marketwatch

      let countValue = count.toString();
      let panel = [
        {
          id: "_layout" + countValue,
          sizeX: 20,
          sizeY: 2,
          row: 0,
          col: 0,
          header: "<div>Add/Delete</div>",
          content: lineTemplate.bind(this),
        },
      ];
      count = count + 1;
      dashboardObj.current.addPanel(panel[0]);
      console.log(count);

      setIsVisible(false);
      document
        .getElementById("_layout" + countValue)
        .querySelector(".e-control.e-chart");
      //.ej2_instances[0].refresh();
    };
    pieObj.current.onclick = () => {
      //Market Watch
      let countValue = count.toString();
      let panel = [
        {
          id: "_layout" + countValue,
          sizeX: 20,
          sizeY: 10,
          row: 0,
          col: 0,
          header: "<div>Market Watch</div>",
          content: pieTemplate.bind(this),
        },
      ];
      count = count + 1;
      dashboardObj.current.addPanel(panel[0]);
      console.log(count);
      setIsVisible(false);
      document
        .getElementById("_layout" + countValue)
        .querySelector(".e-control.e-accumulationchart");
      //.ej2_instances[0].refresh();
    };
    splineObj.current.onclick = () => {
      //Buy_Sell
      let countValue = count.toString();
      let panel = [
        {
          id: "_layout" + countValue,
          sizeX: 20,
          sizeY: 3,
          row: 0,
          col: 0,
          header: "<div>Buy/Sell</div>",
          content: splineTemplate.bind(this),
        },
      ];
      count = count + 1;
      dashboardObj.current.addPanel(panel[0]);
      console.log(count);

      setIsVisible(false);
      document
        .getElementById("_layout" + countValue)
        .querySelector(".e-control.e-chart");
      // .ej2_instances[0].refresh();
    };
  };
  const load = (args) => {
    let selectedTheme = loc.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.chart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark");
  };
  const Pieload = (args) => {
    let selectedTheme = loc.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.accumulation.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark");
  };
  const content = () => {
    return (
      <div id="dialogcontent">
        <div>
          <div id="linetemplate" ref={lineObj}>
            <p className="dialog-text">Add/Delete from MarketWatch </p>
          </div>
          <div id="pietemplate" ref={pieObj}>
            <p className="dialog-text">Market Watch </p>
          </div>
          <div id="splinetemplate" ref={splineObj}>
            <p className="dialog-text">Buy/Sell </p>
          </div>
        </div>
      </div>
    );
  };

  const contentRem = () => {
    return (
      <div id="dialogcontent">
        <div>
          <div id="linetemplate" ref={lineObj}>
            <p className="dialog-text">Add/Delete from MarketWatch </p>
          </div>
          <div id="pietemplate" ref={pieObj}>
            <p className="dialog-text">Market Watch </p>
          </div>
          <div id="splinetemplate" ref={splineObj}>
            <p className="dialog-text">Buy/Sell </p>
          </div>
        </div>
      </div>
    );
  };
  const splineTemplate = () => {
    return (
      <div>
        <DDL_BuySell />
      </div>
    );
  };
  const lineTemplate = () => {
    return (
      <div>
        <DDL_Comp />
      </div>
    );
  };
  const pieTemplate = () => {
    return (
      <div>
        <Stat />
      </div>
    );
  };
  return (
    <div>
      <div id="edit_target" className="control-section">
        <div>
          <div
            style={{
              width: "100%",
              marginBottom: "10px",
              marginTop: "10px",
              height: "30px",
            }}
          >
            <ButtonComponent
              cssClass="e-outline e-flat e-primary"
              ref={btnobj}
              iconCss={icon}
              isToggle={true}
              onClick={btnClick.bind(this)}
              style={{ float: "right", width: "75px" }}
            >
              {btnContent}
            </ButtonComponent>
          </div>
          <div
            style={{ padding: "5px", marginBottom: "5px", textAlign: "end" }}
          >
            <div
              id="dialogBtn"
              className="add-widget-button e-control e-btn e-lib"
              style={{ display: display }}
              onClick={dlgClick.bind(this)}
            >
              Add New Widget
            </div>
          </div>
        </div>
        {/* <Draggable
          defaultPosition={{ x: 20, y: 280 }}
          bounds={{ left: 5, right: 60, bottom: 900, top: 5 }}
        >
          <div
            style={{
              border: "solid",
              height: "13em",
              width: "95%",
              position: "absolute",
              zIndex: 2000,
              backgroundColor: "#FFFFFF",
            }}
          >
            <DDL_BuySell />
          </div>
        </Draggable> */}
        <DashboardLayoutComponent
          id="edit_dashboard"
          columns={20}
          cellSpacing={cellSpacing}
          ref={dashboardObj}
          resizeStop={onPanelResize.bind(this)}
          allowResizing={isResizing}
          allowDragging={isDragging}
          allowFloating={true}
        >
          <PanelsDirective>
            <PanelDirective
              sizeX={20}
              sizeY={2}
              row={0}
              col={0}
              content={lineTemplate.bind(this)}
              header="<div>Add/Delete to Market Watch</div>"
            ></PanelDirective>
            <PanelDirective
              sizeX={20}
              sizeY={10}
              row={3}
              col={0}
              content={pieTemplate.bind(this)}
              header="<div>Market Watch</div>"
            ></PanelDirective>
            <PanelDirective
              sizeX={20}
              sizeY={3}
              row={14}
              col={0}
              content={splineTemplate.bind(this)}
              header="<div>Buy/Sell</div>"
            ></PanelDirective>
          </PanelsDirective>
        </DashboardLayoutComponent>
      </div>

      <DialogComponent
        id="listdialog"
        width="500px"
        height="260px"
        visible={isVisible}
        header={"Add a widget"}
        showCloseIcon={true}
        animationSettings={{ effect: "Zoom" }}
        isModal={true}
        target="#edit_target"
        content={content}
      />
      {/* <DialogComponent
        id="listdialog2"
        width="500px"
        height="260px"
        visible={isVisibleRem}
        header={"Add a widget"}
        showCloseIcon={true}
        animationSettings={{ effect: "Zoom" }}
        isModal={true}
        target="#edit_target"
        content={contentRem}
      /> */}
    </div>
  );
};
export default DynamicWidget;
