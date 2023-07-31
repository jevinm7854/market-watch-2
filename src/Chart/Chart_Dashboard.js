import { createRoot } from "react-dom/client";
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import "../index.css";
import * as React from "react";
import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { DashboardLayoutComponent } from "@syncfusion/ej2-react-layouts";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import Stat from "../stat";
import ChartOld from "./chartOld";
import AppBar from "../Comp/AppBar";
import { Socket } from "socket.io-client";
import { registerLicense } from "@syncfusion/ej2-base";
import { sizeProperty } from "@syncfusion/ej2/office-chart";
import { useNavigate } from "react-router-dom";
import { getAttributeOrDefault } from "@syncfusion/ej2/base";

const Chart_Dashboard = () => {
  // registerLicense(
  //   "ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5VdkBjX35ecHFdTmdY"
  // );
  // const sio = io.connect("http://150.0.0.70:3005");
  const navigate = useNavigate();
  const [ab, setAb] = React.useState("");
  const resizehandles = ["e-west", "e-east"];
  const dashboardObj = useRef(null);
  const cellSpacing = [5, 5];
  let count = 3;
  const onCloseIconHandler = (event) => {
    console.warn("eventttt", event);
    // let a = document.getElementById("one111");
    // a.setAttribute("data-sizeX", "5");
    setAb("100%");
    if (event.cancelable === true) {
      // sio.off("fromServer");
      //   sio.close();
      //   alert("closed");
    }
    // navigate("/addwid");
    let panel = event.target;
    if (panel.offsetParent) {
      dashboardObj.current.removePanel(panel.offsetParent.id);
    }
  };
  const btnClick = () => {
    let panel = [
      {
        id: count.toString() + "_layout",
        sizeX: 1,
        sizeY: 1,
        row: 0,
        col: 0,
        content:
          '<span id="close" class="e-close-icon e-clear-icon"></span><div class="text-align">' +
          count.toString() +
          "</div>",
      },
    ];
    dashboardObj.current.addPanel(panel[0]);
    let closeIcon = document
      .getElementById(count.toString() + "_layout")
      .querySelector(".e-clear-icon");
    closeIcon.addEventListener("click", onCloseIconHandler.bind(this));
    count = count + 1;
  };

  // let headerText = [
  //   { text: "Order" },
  //   { text: "Net Position" },
  //   { text: "Holding" },
  // ];

  // const content0 = () => {
  //   return (
  //     <div>
  //       Twitter is an online social networking service that enables users to
  //       send and read short 140-character messages called "tweets". Registered
  //       users can read and post tweets, but those who are unregistered can only
  //       read them. Users access Twitter through the website interface, SMS or
  //       mobile device app Twitter Inc. is based in San Francisco and has more
  //       than 25 offices around the world. Twitter was created in March 2006 by
  //       Jack Dorsey, Evan Williams, Biz Stone, and Noah Glass and launched in
  //       July 2006. The service rapidly gained worldwide popularity, with more
  //       than 100 million users posting 340 million tweets a day in 2012.The
  //       service also handled 1.6 billion search queries per day.
  //     </div>
  //   );
  // };
  // const content1 = () => {
  //   return (
  //     <div>
  //       Facebook is an online social networking service headquartered in Menlo
  //       Park, California. Its website was launched on February 4, 2004, by Mark
  //       Zuckerberg with his Harvard College roommates and fellow students
  //       Eduardo Saverin, Andrew McCollum, Dustin Moskovitz and Chris Hughes.The
  //       founders had initially limited the website membership to Harvard
  //       students, but later expanded it to colleges in the Boston area, the Ivy
  //       League, and Stanford University. It gradually added support for students
  //       at various other universities and later to high-school students.
  //     </div>
  //   );
  // };
  // const content2 = () => {
  //   return (
  //     <div>
  //       WhatsApp Messenger is a proprietary cross-platform instant messaging
  //       client for smartphones that operates under a subscription business
  //       model. It uses the Internet to send text messages, images, video, user
  //       location and audio media messages to other users using standard cellular
  //       mobile numbers. As of February 2016, WhatsApp had a user base of up to
  //       one billion,[10] making it the most globally popular messaging
  //       application. WhatsApp Inc., based in Mountain View, California, was
  //       acquired by Facebook Inc. on February 19, 2014, for approximately
  //       US$19.3 billion.
  //     </div>
  //   );
  // };

  return (
    <div>
      <AppBar />
      {/* <TabComponent heightAdjustMode="Auto">
        <TabItemsDirective>
          <TabItemDirective header={headerText[0]} content={content0} />
          <TabItemDirective header={headerText[1]} content={content1} />
          <TabItemDirective header={headerText[2]} content={content2} />
        </TabItemsDirective>
      </TabComponent> */}
      <div id="default_target" className="control-section">
        {/* <div className="addContainer">
          <ButtonComponent
            id="add"
            cssClass="e-info"
            onClick={btnClick.bind(this)}
          >
            Add Panel
          </ButtonComponent>
        </div> */}
        <DashboardLayoutComponent
          id="default_dashboard"
          columns={5}
          ref={dashboardObj}
          cellSpacing={cellSpacing}
          allowResizing={true}
          allowDragging={false}
          resizableHandles={resizehandles}
        >
          <div
            id="one111"
            className="e-panel"
            data-row="0"
            data-col="0"
            data-sizeX="3"
            data-sizeY="2"
            style={{ width: ab }}
          >
            <Stat />
          </div>

          <div
            id="two"
            className="e-panel"
            data-row="0"
            data-col="3"
            data-sizeX="2"
            data-sizeY="2"
          >
            <span
              id="close"
              className="e-close-icon e-clear-icon"
              onClick={onCloseIconHandler.bind(this)}
            />
            {/* className="e-panel-container"> */}
            {/* <div> */}
            <div className="text-align" style={{ overflow: "auto" }}>
              <ChartOld />
            </div>
            {/* </div> */}
          </div>
        </DashboardLayoutComponent>
      </div>
    </div>
  );
};
export default Chart_Dashboard;
