import {
  DropDownListComponent,
  MultiSelectComponent,
  Inject,
  CheckBoxSelection,
} from "@syncfusion/ej2-react-dropdowns";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { MDBCol, MDBRow, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";

function DDL_Comp() {
  // define the array of data
  const w = 100; //Width for box and dropdown
  const divStyle = {
    margin: 100,
    width: 50,
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

  const Exchange = ["NSE", "BSE"];

  const instrType = ["EQUITY", "OPTIDX", "OPTSTK", "FUTIDX", "FUTSTK"];

  const opType = ["CE", "PE"];

  const [sport, setSport] = React.useState([]);
  const [exch, SetExch] = useState("");
  const [instr, SetInstr] = useState("");
  const [symbVal, setSymbVal] = React.useState("");
  const [oType, setOType] = useState("");
  const [expVal, setExpVal] = useState("");
  const [strVal, setStrVal] = useState([]);
  const [disStr, setDisStr] = useState(false);
  const [disOp, setDisOp] = useState(false);
  const [disExp, setDisExp] = useState(false);

  React.useEffect(() => {
    setSport(sportsData);
  }, []);

  const ddlSelect = (args) => {
    console.log(args.itemData.value); //Will give the selected option
  };

  let mul = [];
  const ddlSelectMulti = (args) => {
    mul.push(args.itemData);
    setStrVal(mul);
    console.log(mul);
  };

  const ddlSelectMultiRemoved = (args) => {
    let ind = mul.indexOf(args.itemData);
    mul.splice(ind, 1);
    setStrVal(mul);
    console.log(mul);
  };

  const symbChange = (args) => {
    if (args.value !== null) {
      setDisExp(true);
      setDisStr(true);
      setDisOp(true);
    } else {
      setDisExp(false);
      setDisStr(false);
      setDisOp(false);
    }
    setSymbVal(args.value);
  };

  const exchChange = (args) => {
    SetExch(args.value);
  };

  const instrChange = (args) => {
    SetInstr(args.value);
  };

  const opChange = (args) => {
    setOType(args.value);
  };

  const expChange = (args) => {
    setExpVal(args.value);
  };

  const addButn = () => {
    console.log(
      "Exchange: ",
      exch,
      " ,Instrument Type: ",
      instr,
      " ,Symbol: ",
      symbVal,
      " ,Option Type: ",
      oType,
      " ,Expiry ",
      expVal,
      " ,Strike Price: ",
      strVal
    );
  };

  return (
    // specifies the tag for render the DropDownList component
    <>
      {/* <div className="ddl-div "> */}

      <MDBContainer className="mt-0 px-5 wert ">
        <MDBRow className="gx-2 " style={{ lineHeight: 1 }}>
          <MDBCol className="col-md-1 ">
            <DropDownListComponent
              id="ddlelement"
              dataSource={Exchange}
              // cssClass="e-cs"
              popupHeight="250px"
              popupWidth={w}
              placeholder="Exchange"
              showClearButton={true}
              sortOrder="Ascending"
              // allowFiltering={true}
              select={ddlSelect}
              onChange={exchChange}
            />
          </MDBCol>
          <MDBCol className="col-md-2">
            <DropDownListComponent
              id="ddlelement"
              dataSource={instrType}
              popupHeight="200px"
              popupWidth={w}
              placeholder="Instrument Type"
              showClearButton={true}
              sortOrder="Ascending"
              // allowFiltering={true}
              select={ddlSelect}
              onChange={instrChange}
            />
          </MDBCol>
          <MDBCol className="col-md-2 ">
            <DropDownListComponent
              id="ddlelement"
              dataSource={sportsData}
              popupWidth={w + 50}
              placeholder="Symbol"
              popupHeight="250px"
              showClearButton={true}
              sortOrder="Ascending"
              allowFiltering={true}
              select={ddlSelect}
              onChange={symbChange}
            />
          </MDBCol>
          <MDBCol className="col-md-1 ">
            <DropDownListComponent
              id="ddlelement"
              enabled={disOp}
              dataSource={opType}
              popupHeight="200px"
              popupWidth={w}
              placeholder="Option Type"
              showClearButton={true}
              sortOrder="Ascending"
              // allowFiltering={true}
              select={ddlSelect}
              onChange={opChange}
            />
          </MDBCol>
          <MDBCol className="col-md-2">
            <DropDownListComponent
              id="ddlelement"
              // disabled={disExp}
              enabled={disExp}
              dataSource={sport}
              popupHeight="200px"
              popupWidth={w}
              placeholder="Expiry"
              showClearButton={true}
              sortOrder="Ascending"
              allowFiltering={true}
              //select={ddlSelect}
              onChange={expChange}
            />
          </MDBCol>
          <MDBCol className="col-md-2">
            <MultiSelectComponent
              id="checkbox"
              dataSource={sportsData}
              popupWidth="150"
              enabled={disStr}
              mode="CheckBox"
              showDropDownIcon={true}
              placeholder="Strike Price"
              select={ddlSelectMulti}
              removed={ddlSelectMultiRemoved}
              showClearButton={false}
              enableSelectionOrder={true}
              sortOrder="Ascending"
            >
              <Inject services={[CheckBoxSelection]} />
            </MultiSelectComponent>
          </MDBCol>

          <MDBCol className="col-md-2  ">
            <ButtonComponent
              cssClass="e-success"
              onClick={addButn}
              style={{ marginRight: "2%", width: " 45%", fontSize: "1.4rem" }}
            >
              Add
            </ButtonComponent>

            <ButtonComponent cssClass="e-danger">Delete</ButtonComponent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default DDL_Comp;
