import React, { useState } from "react";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

import { MessageComponent } from "@syncfusion/ej2-react-notifications";

function Buttons() {
  const [visDel, setvisDel] = useState(false);
  const [visSucc, setvisSucc] = useState(false);

  const btnDelete = () => {
    setvisDel(true);
    setTimeout(() => {
      setvisDel(false);
      console.log("Inside timeout");
    }, 3500);
  };

  const btnSucc = () => {
    setvisSucc(true);
    setTimeout(() => {
      setvisSucc(false);
      console.log("Inside timeout");
    }, 3500);
  };

  return (
    <>
      <div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <ButtonComponent
            cssClass="e-success"
            onClick={btnSucc}
            style={{ width: "45%", fontSize: "1.4rem" }}
          >
            Add
          </ButtonComponent>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
            marginRight: 0,
          }}
        >
          <ButtonComponent cssClass="e-danger" onClick={btnDelete}>
            Delete
          </ButtonComponent>
        </div>
      </div>
      {visDel && (
        <MessageComponent
          content="You Deleted"
          id="msg_warning"
          severity="Error"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            marginRight: 50,
            marginLeft: 50,
          }}
          showCloseIcon={false}
        ></MessageComponent>
      )}
      {visSucc && (
        <MessageComponent
          content="Successfully Added"
          id="msg_success"
          severity="Success"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 30,
            marginRight: 50,
            marginLeft: 50,
          }}
          showCloseIcon={false}
        ></MessageComponent>
      )}
    </>
  );
}

export default Buttons;
