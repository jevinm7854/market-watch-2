import * as React from "react";
import io from "socket.io-client";
import "./index.css";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  VirtualScroll,
} from "@syncfusion/ej2-react-grids";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { getTradeData } from "./data";


function RandomData() {
  const [num, setNum] = React.useState([]);

  const sio = io.connect("http://150.0.0.70:3005");

  React.useEffect(() => {
    sio.emit("sendServer", "hi");
    let arr = [];
    sio.on("fromServer", (arg) => {
      // world
      console.log("**********  ", arg);
      if (arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arg.id === arr[i].id) {
            console.log("Matcheddddddddd", arr[0]);
            setNum(arr[0]);
          } else {
            arr.push(arg);
            setNum(arr[0]);
          }
        }
      } else {
        arr.push(arg);
        console.log("Elseee First", arr[0]);
        setNum(arr[0]);

        //setNum(arr);
      }
    });
  }, [num]);

  console.log(num);

  return (
    <>
      <GridComponent
        id="livestream"
        dataSource={num}
        enableVirtualization={true}
        enableVirtualMaskRow={false}
        enableHover={false}
        rowHeight={38}
        height={500}
        // ref={(g) => {
        //   grid = g;
        // }}
        allowSelection={false}
        //   queryCellInfo={queryCellInfo}
        //   load={load}
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
          {/* <ColumnDirective
              field="Rating"
              width="150"
              headerText="Technical Rating 1D"
            /> */}
        </ColumnsDirective>
        <Inject services={[VirtualScroll]} />
      </GridComponent>
    </>
  );
}
export default RandomData;
