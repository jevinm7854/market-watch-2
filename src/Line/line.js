import * as React from "react";
import * as ReactDOM from "react-dom";
import io from "socket.io-client";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  LineSeries,
  StockChartSeriesCollectionDirective,
  StockChartSeriesDirective,
} from "@syncfusion/ej2-react-charts";
import { Browser } from "@syncfusion/ej2-base";

import {
  StockChartComponent,
  EmaIndicator,
  RsiIndicator,
  BollingerBands,
  StripLine,
  Tooltip,
  CandleSeries,
  Category,
  DateTime,
  Logarithmic,
  Crosshair,
  TmaIndicator,
  MomentumIndicator,
  SplineSeries,
  SmaIndicator,
  AtrIndicator,
  AccumulationDistributionIndicator,
  HiloOpenCloseSeries,
  HiloSeries,
  RangeAreaSeries,
  MacdIndicator,
  StochasticIndicator,
  Export,
  Trendlines,
  IndicatorsDirective,
  IndicatorDirective,
} from "@syncfusion/ej2-react-charts";
import { toHaveDisplayValue } from "@testing-library/jest-dom/matchers";
function Line() {
  var chart;
  var intervalId;
  var series1 = [];
  var value = 10;
  var setTimeoutValue = 1000;
  var today = new Date();
  const SAMPLE_CSS = `
 .control-fluid {
     padding: 0px !important;
 }
     .charts { 
         align :center
     }`;

  const sio = io.connect("http://150.0.0.70:3005");

  React.useEffect(() => {
    sio.emit("sendChart", "hi");

    sio.on("fromChart", (arg) => {
      // console.warn("arggggg", arg);
      series1.push(arg);
      series1.shift();
    });
  }, []);

  // for (var i = 0; i < 50; i++) {
  //   if (Math.random() > 0.5) {
  //     value += Math.random() * 1.5;
  //   } else {
  //     value -= Math.random() * 1.5;
  //   }
  //   series1[i] = { x: i, y: value };
  // }
  let i, point1;
  for (i = 1; i < 1440; i++) {
    if (Math.random() > 0.5) {
      value += Math.random() * 2.5;
    } else {
      value -= Math.random() * 2.5;
    }
    point1 = { x: new Date(2023, 1, 1, 0, i), y: value.toFixed(2) };
    series1.push(point1);
    console.log(series1);
  }
  // console.log("Out of for");
  chart = chart;
  function loaded(args) {
    console.warn("Inside loaded", args);
    intervalId = setTimeout(() => {
      if (chart === null) {
        clearInterval(intervalId);
      } else {
        // if (Math.random() > 0.5) {
        //   value += Math.random() * 2.0;
        // } else {
        //   value -= Math.random() * 2.0;
        // }
        // i++;
        // series1.shift();
        args.stockChart.series[0].dataSource = series1;
        // series1.shift();
        // console.warn("Shiftttt", series1);
      }
    }, setTimeoutValue);
  }
  const primaryxAxis = {
    valueType: "DateTime",
    // intervalType: "Seconds",
    majorGridLines: { width: 0 },
    crosshairTooltip: { enable: true },
  };
  const primaryyAxis = {
    title: "Price",
    labelFormat: "Rs{value}",
    // minimum: 30,
    // maximum: 180,
    // interval: 30,
    crosshairTooltip: { enable: true },
    lineStyle: { width: 0 },
  };
  const animation = { enable: true };
  const chartarea = { border: { width: 0 } };
  const crosshair = { enable: true };
  // const tooltip = { enable: true, shared: true };
  const upperline = { color: "#ffb735", width: 1 };
  const lowerline = { color: "#f2ec2f", width: 1 };
  const lines = { width: 0 };
  return (
    // <ChartComponent id="charts" loaded={loaded.bind(this)}>
    //   <Inject services={[LineSeries, BollingerBands, RangeAreaSeries]} />
    //   <SeriesCollectionDirective>
    //     <SeriesDirective
    //       dataSource={series1}
    //       xName="x"
    //       yName="y"
    //       type="Line"
    //     ></SeriesDirective>
    //   </SeriesCollectionDirective>
    //   <IndicatorsDirective>
    //     <IndicatorDirective
    //       type="BollingerBands"
    //       field="Close"
    //       seriesName="Apple Inc"
    //       fill="#606eff"
    //       period={14}
    //       animation={animation}
    //       upperLine={upperline}
    //       lowerLine={lowerline}
    //     ></IndicatorDirective>
    //   </IndicatorsDirective>
    // </ChartComponent>

    //Added
    <div className="control-pane">
      <style>{SAMPLE_CSS}</style>
      <div className="control-section">
        <StockChartComponent
          id="stockchartperiod"
          primaryXAxis={{
            valueType: "DateTime",
            majorGridLines: { color: "transparent" },
            crosshairTooltip: { enable: true },
          }}
          primaryYAxis={{
            lineStyle: { color: "transparent" },
            majorTickLines: { color: "transparent", width: 0 },
            crosshairTooltip: { enable: true },
          }}
          loaded={loaded.bind(this)}
          seriesType={[]}
          indicatorType={[]}
          exportType={[]}
          trendlineType={[]}
          title="AAPL stock price by minutes"
          periods={[
            { intervalType: "Minutes", interval: 1, text: "1m" },
            { intervalType: "Minutes", interval: 30, text: "30m" },
            { intervalType: "Hours", interval: 1, text: "1H" },
            {
              intervalType: "Hours",
              interval: 12,
              text: "12H",
              selected: true,
            },
            { text: "1D" },
          ]}
          crosshair={{ enable: true }}
          chartArea={{ border: { width: 0 } }}
        >
          <Inject
            services={[
              DateTime,
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
            ]}
          />
          <StockChartSeriesCollectionDirective>
            <StockChartSeriesDirective
              dataSource={series1}
              xName="x"
              yName="y"
              type="Line"
            ></StockChartSeriesDirective>
          </StockChartSeriesCollectionDirective>
        </StockChartComponent>
      </div>
    </div>
  );
}
export default Line;
