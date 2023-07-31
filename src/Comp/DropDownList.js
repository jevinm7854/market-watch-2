import AppBar from "./AppBar";
import Stat from "../stat";
import DDL_BuySell from "./DDL_BuySell";
import io from "socket.io-client";
import DDL_Comp from "./DDL_Comp";
import { DashboardLayoutComponent } from "@syncfusion/ej2-react-layouts";
import { useState } from "react";
import { setAttribute } from "@syncfusion/ej2/barcode-generator";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

function DropDownList() {
  const cellSpacing = [5, 5];
  const [axis, setAxis] = useState("x");
  let resize = ["e-south"];
  let resize1 = ["e-west", "e-east", "e-south"];
  let dashboardObj;
  const sio = io.connect("http://150.0.0.70:3005");
  let count = 5;
  const remPan = (args) => {
    dashboardObj.removePanel("three");
  };

  const ddlBS = () => {
    return (
      <div>
        <DDL_BuySell />
        <ButtonComponent onClick={remPan}>Close</ButtonComponent>
      </div>
    );
  };
  let pan = [
    {
      id: "six",
      sizeX: 20,
      sizeY: 2,
      row: 14,
      col: 0,
      content: ddlBS,
    },
  ];

  const addPan = (args) => {
    dashboardObj.addPanel(pan[0]);
    console.log(pan[0]);
  };

  return (
    <>
      <AppBar />
      {/* <DashboardLayoutComponent
        id="default_dashboard13"
        columns={20}
        cellSpacing={cellSpacing}
        allowResizing={true}
        // resizableHandles={resize}
        allowDragging={true}
      > */}
      <DashboardLayoutComponent
        id="default_dashboard1"
        columns={20}
        cellSpacing={cellSpacing}
        allowResizing={true}
        // resizableHandles={resize}
        allowDragging={true}
      >
        <div
          id="one"
          className="e-panel"
          data-row="0"
          data-col="0"
          data-sizeX="20"
          data-sizeY="1"
        >
          {/* <div className="e-panel-container"> */}

          <DDL_Comp />

          {/* </div> */}
        </div>
      </DashboardLayoutComponent>
      <div style={{ marginTop: "2px" }}></div>
      <DashboardLayoutComponent
        id="default_dashboard12"
        columns={20}
        cellSpacing={cellSpacing}
        allowResizing={true}
        resizableHandles={resize}
        allowDragging={true}
      >
        <div
          id="two"
          className="e-panel"
          data-row="2"
          data-col="0"
          data-sizeX="20"
          data-sizeY="3"
        >
          <Stat sio={sio} />
        </div>
      </DashboardLayoutComponent>
      <div style={{ marginTop: "5px" }}></div>
      {/* </DashboardLayoutComponent> */}

      <DashboardLayoutComponent
        id="default_dashboard2"
        columns={20}
        cellSpacing={cellSpacing}
        allowResizing={true}
        resizableHandles={resize1}
        allowDragging={true}
        allowFloating={true}
        showGridLines={true}
        ref={(s) => (dashboardObj = s)}
      >
        {/* <div
          id="four"
          className="e-panel "
          data-row="0"
          data-col="0"
          data-sizeX="13"
          data-sizeY="5"
        > */}
        <div
          id="four"
          className="e-panel "
          data-row="0"
          data-col="0"
          data-sizeX="20"
          data-sizeY="3"
        >
          <table>
            <tr>
              <td style={{ border: "solid", width: "50%", height: "205px" }}>
                <Stat />
              </td>
              <td style={{ border: "solid", height: "205px" }}>
                <Stat />
              </td>
              <td>
                <ButtonComponent onClick={addPan}>Buy Bar</ButtonComponent>
              </td>
            </tr>
          </table>
        </div>

        {/* <div
          id="five"
          className="e-panel "
          data-row="6"
          data-col="14"
          data-sizeX="7"
          data-sizeY="5"
        > */}

        {/* </div> */}

        {/* </DashboardLayoutComponent>
      <DashboardLayoutComponent
        id="default_dashboard2"
        columns={20}
        cellSpacing={cellSpacing}
        allowResizing={true}
        // resizableHandles={resize}
        allowDragging={true}
        allowFloating={true}
      > */}
        <div
          id="three"
          className="e-panel"
          data-row="14"
          data-col="0"
          data-sizeX="20"
          data-sizeY="2"
        >
          <div className="e-panel-container">{ddlBS()}</div>
        </div>
      </DashboardLayoutComponent>
    </>
  );
}

export default DropDownList;
