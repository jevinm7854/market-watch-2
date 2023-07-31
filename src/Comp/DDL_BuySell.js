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
import Draggable from "react-draggable";

function DDL_BuySell() {
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
  let dashboardObj;

  return (
    <>
      <Draggable
        // style={{ border: "solid 1px" }}
        bounds={{ left: 5, right: 150, bottom: 480, top: 5 }}
        
      >
        <div
          style={{
            position: "absolute",
            zIndex: 2000,
            backgroundColor: "#FFFFFF",
            margin: "2em 2em",
            width: "92%",
            boxShadow: " 1px 1px 8px 3px grey",
       
            // boxShadow: " -1px 5px 30px -8px grey",
          }}
        >
          <MDBContainer className="mt-0 px-5 wert ">
            <MDBRow className="gx-2 " style={{ lineHeight: 1 }}>
              <MDBCol className="col-md-1 ">
                <DropDownListComponent
                  id="ddlelement"
                  dataSource={Exchange}
                  // cssClass="e-cs"
                  popupHeight="250px"
                  // popupWidth={w}

                  placeholder="Exchange"
                  showClearButton={true}
                  sortOrder="Ascending"
                  // allowFiltering={true}
                  //   select={ddlSelect}
                  //   onChange={exchChange}
                  
                />
              </MDBCol>
              <MDBCol className="col-md-2">
                <DropDownListComponent
                  id="ddlelement"
                  dataSource={instrType}
                  popupHeight="200px"
                  // popupWidth={w}
                  placeholder="Instrument Type"
                  showClearButton={true}
                  sortOrder="Ascending"
                  
                  // allowFiltering={true}
                  //   select={ddlSelect}
                  //   onChange={instrChange}
                />
              </MDBCol>
              <MDBCol className="col-md-2 ">
                <DropDownListComponent
                  id="ddlelement"
                  dataSource={sportsData}
                  // popupWidth={w}
                  placeholder="Symbol"
                  popupHeight="250px"
                  showClearButton={true}
                  sortOrder="Ascending"
                  allowFiltering={true}
                  
                  //   select={ddlSelect}
                  //   onChange={symbChange}
                />
              </MDBCol>
              <MDBCol className="col-md-1 ">
                <DropDownListComponent
                  id="ddlelement"
                  //   enabled={disOp}
                  dataSource={opType}
                  popupHeight="200px"
                  // popupWidth={w}
                  placeholder="Option Type"
                  showClearButton={true}
                  sortOrder="Ascending"
                  
                  // allowFiltering={true}
                  //   select={ddlSelect}
                  //   onChange={opChange}
                />
              </MDBCol>
              <MDBCol className="col-md-2">
                <DropDownListComponent
                  id="ddlelement"
                  // disabled={disExp}
                  //   enabled={disExp}
                  dataSource={sportsData}
                  popupHeight="200px"
                  // popupWidth={w}
                  placeholder="Expiry"
                  showClearButton={true}
                  sortOrder="Ascending"
                  allowFiltering={true}
                  //select={ddlSelect}
                  //   onChange={expChange}
                  
                />
              </MDBCol>
              <MDBCol className="col-md-2">
                <MultiSelectComponent
                  id="checkbox"
                  dataSource={sportsData}
                  //   enabled={disStr}
                  mode="CheckBox"
                  showDropDownIcon={true}
                  placeholder="Strike Price"
                  //   select={ddlSelectMulti}
                  //   removed={ddlSelectMultiRemoved}
                  showClearButton={false}
                  enableSelectionOrder={true}
                  sortOrder="Ascending"
                  
                >
                  <Inject services={[CheckBoxSelection]} />
                </MultiSelectComponent>
              </MDBCol>

              <MDBCol className="col-md-2  ">
                <input
                  className="e-input"
                  type="text"
                  placeholder="Enter Name"
                  
                />
                {/* <DropDownListComponent
              id="ddlelement"
              // disabled={disExp}
              //   enabled={disExp}
              dataSource={sportsData}
              popupHeight="200px"
              // popupWidth={w}
              placeholder="Qty"
              showClearButton={true}
              sortOrder="Ascending"
              allowFiltering={true}
              //select={ddlSelect}
              //   onChange={expChange}
            /> */}
                {/* onClick={addButn}>*/}
                {/* <ButtonComponent cssClass="e-success"> 
              Add
            </ButtonComponent>

            <ButtonComponent cssClass="e-danger">Delete</ButtonComponent> */}
              </MDBCol>
            </MDBRow>
            <MDBRow className="gx-2 " style={{ lineHeight: 1 }}>
              <MDBCol className="col-md-1 ">
                <DropDownListComponent
                  id="ddlelement"
                  dataSource={Exchange}
                  // cssClass="e-cs"
                  popupHeight="250px"
                  // popupWidth={w}

                  placeholder="Market"
                  showClearButton={true}
                  sortOrder="Ascending"
                  
                  // allowFiltering={true}
                  //   select={ddlSelect}
                  //   onChange={exchChange}
                />
              </MDBCol>
              <MDBCol className="col-md-2">
                <input className="e-input" type="text" placeholder="Qty" />
                {/* <DropDownListComponent
              id="ddlelement"
              dataSource={instrType}
              popupHeight="200px"
              // popupWidth={w}
              placeholder="Instrument Type"
              showClearButton={true}
              sortOrder="Ascending"
              // allowFiltering={true}
              //   select={ddlSelect}
              //   onChange={instrChange}
            /> */}
              </MDBCol>
              <MDBCol className="col-md-2 ">
                <input className="e-input" type="text" placeholder="Price" />
              </MDBCol>
              <MDBCol className="col-md-2 ">
                <input
                  className="e-input"
                  type="text"
                  placeholder="Trigger"
                  
                />
              </MDBCol>
              <MDBCol className="col-md-2">
                <input className="e-input" type="text" placeholder="D-Qty" />
              </MDBCol>
              <MDBCol className="col-md-2">
                <DropDownListComponent
                  id="ddlelement"
                  dataSource={Exchange}
                  // cssClass="e-cs"
                  popupHeight="250px"
                  // popupWidth={w}

                  placeholder="Validity"
                  showClearButton={true}
                  sortOrder="Ascending"
                  
                  // allowFiltering={true}
                  //   select={ddlSelect}
                  //   onChange={exchChange}
                />
              </MDBCol>

              <MDBCol className="col-md-1  ">
                <ButtonComponent cssClass="e-primary">Buy</ButtonComponent>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </Draggable>
    </>
  );
}

export default DDL_BuySell;
