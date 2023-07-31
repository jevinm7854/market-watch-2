/* eslint-disable */

/**
 * Sample for Stock Chart with Default
 */
import * as React from "react";
import io from "socket.io-client";
import { PropertyPane } from "./property-pane";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  StockChartComponent,
  StockChartSeriesCollectionDirective,
  StockChartSeriesDirective,
  Inject,
  DateTime,
  Tooltip,
  RangeTooltip,
  Crosshair,
  LineSeries,
  SplineSeries,
  CandleSeries,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  Trendlines,
} from "@syncfusion/ej2-react-charts";
import {
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  TmaIndicator,
  MomentumIndicator,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  MacdIndicator,
  StochasticIndicator,
  Export,
} from "@syncfusion/ej2-react-charts";
// import { chartData } from "./chartData";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";

const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
         .charts {
             align :center
         }
         .control-fluid {
          padding: 0px !important;
      }
      #btn-control {
          width: 100%;
          text-align: center;
      }
  
      .e-export-icon::before {
          content: '\\e728';
      }
      
      .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before  {
          content: '\\e710';
      }
      
      .e-view.bootstrap4 .e-export-icon::before {
          content: '\\e780';
      }
      
      .e-view.tailwind-dark .e-export-icon::before, .e-view.tailwind .e-export-icon::before {
          content: '\\e7bf';
      }
      
      .e-view.highcontrast .e-export-icon::before {
          content: '\\e710';
      }
      
      .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {
          content: '\\e72e';
      }    
         
         `;
export let tooltipRender = (args) => {
  if (args.text.split("<br/>")[4]) {
    let target = parseInt(
      args.text.split("<br/>")[4].split("<b>")[1].split("</b>")[0]
    );
    let value = (target / 100000000).toFixed(1) + "B";
    args.text = args.text.replace(
      args.text.split("<br/>")[4].split("<b>")[1].split("</b>")[0],
      value
    );
  }
};

function Chart() {
  // const [num, setNum] = React.useState([]);

  // const sio = io.connect("http://150.0.0.70:3005");

  // React.useEffect(() => {
  //   sio.emit("sendChart", "hi");

  //   sio.on("fromChart", (arg) => {
  //     // console.log("Arg", arg);
  //     setNum(arg);
  //     console.log("SEt Num", num);
  //   });
  // }, [num]);

  //Push Chart Data

  // chartData.push([
  //   {
  //     x: new Date("2012-06-09"),
  //     open: 80.2143,
  //     high: 82.9405,
  //     low: 78.3571,
  //     close: 82.9028,
  //     volume: 517577005,
  //   },
  //   {
  //     x: new Date("2012-06-11"),
  //     open: 83.96,
  //     high: 84.0714,
  //     low: 80.9571,
  //     close: 82.0185,
  //     volume: 499693120,
  //   },
  //   {
  //     x: new Date("2012-06-18"),
  //     open: 81.5657,
  //     high: 84.2857,
  //     low: 81.4814,
  //     close: 83.1571,
  //     volume: 442172142,
  //   },
  //   {
  //     x: new Date("2012-06-25"),
  //     open: 82.4714,
  //     high: 83.4285,
  //     low: 80.8014,
  //     close: 83.4285,
  //     volume: 371529102,
  //   },
  //   {
  //     x: new Date("2012-07-02"),
  //     open: 83.5328,
  //     high: 87.7628,
  //     low: 83.3714,
  //     close: 86.5543,
  //     volume: 385906790,
  //   },
  //   {
  //     x: new Date("2012-07-09"),
  //     open: 86.4714,
  //     high: 88.5528,
  //     low: 84.6685,
  //     close: 86.4243,
  //     volume: 524235196,
  //   },
  // ]);

  let series1 = [];
  let point1;
  let value = 80;
  let i, j, k;
  for (i = 1; i < 31; i++) {
    for (j = 1; j < 13; j++) {
      for (k = 1; k < 25; k++) {
        if (Math.random() > 0.5) {
          value += Math.random();
          // value.toFixed(2);
        } else {
          value -= Math.random();
          // value.toFixed(2);
        }
        point1 = {
          x: new Date(2000, j, i, k),
          open: Math.random() * 100,
          high: Math.random() * 100,
          low: Math.random() * 100,
          close: Math.random() * 100,
          volume: Math.random() * 1000000,
        };

        series1.push(point1);
      }
    }
  }

  let chartInstance;
  let mode;
  let type = [
    { value: "JPEG" },
    { value: "PNG" },
    { value: "SVG" },
    { value: "PDF" },
  ];

  return (
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <StockChartComponent
          id="stockchartdefault"
          primaryXAxis={{
            valueType: "DateTime",
            majorGridLines: { width: 0 },
            majorTickLines: { color: "transparent" },
            crosshairTooltip: { enable: true },
          }}
          primaryYAxis={{
            labelFormat: "n0",
            lineStyle: { width: 0 },
            rangePadding: "None",
            majorTickLines: { width: 0 },
          }}
          chartArea={{ border: { width: 0 } }}
          tooltip={{ enable: true, shared: true }}
          tooltipRender={tooltipRender}
          crosshair={{ enable: true }}
          load={load.bind(this)}
          title="AAPL Stock Price"
        >
          <Inject
            services={[
              DateTime,
              Tooltip,
              RangeTooltip,
              Crosshair,
              LineSeries,
              SplineSeries,
              CandleSeries,
              HiloOpenCloseSeries,
              HiloSeries,
              RangeAreaSeries,
              Trendlines,
              EmaIndicator,
              RsiIndicator,
              BollingerBands,
              TmaIndicator,
              MomentumIndicator,
              SmaIndicator,
              AtrIndicator,
              Export,
              AccumulationDistributionIndicator,
              MacdIndicator,
              StochasticIndicator,
              Export,
            ]}
          />
          <StockChartSeriesCollectionDirective>
            <StockChartSeriesDirective
              dataSource={series1}
              xName="x"
              type="Candle"
              animation={{ enable: true }}
            ></StockChartSeriesDirective>
          </StockChartSeriesCollectionDirective>
        </StockChartComponent>
      </div>
      <div className="col-md-4 property-section">
        <PropertyPane title="Properties">
          <table
            id="property"
            title="Properties"
            className="property-panel-table"
            style={{ width: "100%" }}
          >
            <tr style={{ height: "50px" }}>
              <td style={{ width: "30%" }}>Export Type:</td>
              <td style={{ width: "30%" }}>
                <DropDownListComponent
                  width={120}
                  id="etype"
                  value="JPEG"
                  ref={(d) => (mode = d)}
                  dataSource={type}
                  fields={{ text: "value", value: "value" }}
                  placeholder="JPEG"
                />
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td style={{ width: "40%" }}>File Name:</td>
              <td style={{ width: "40%" }}>
                <div
                  className="e-float-input"
                  style={{ width: 120, marginTop: "0px" }}
                >
                  <input
                    type="text"
                    defaultValue="Chart"
                    id="fileName"
                    style={{ marginLeft: "-10px" }}
                  />
                </div>
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td>
                <div id="btn-control" style={{ marginLeft: "60px" }}>
                  <ButtonComponent
                    onClick={onClick.bind(this)}
                    iconCss="e-icons e-export-icon"
                    cssClass="e-flat"
                    isPrimary={true}
                  >
                    Export
                  </ButtonComponent>
                </div>
              </td>
            </tr>
          </table>
        </PropertyPane>
      </div>
    </div>
  );
  function load(args) {
    let selectedTheme = location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.stockChart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark");
  }
  function onClick(e) {
    let fileName = document.getElementById("fileName").value;
    chartInstance.exportModule.export(mode.value, fileName);
  }
}

export default Chart;
