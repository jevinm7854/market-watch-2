import { createRoot } from "react-dom/client";
import "../../src/index.css";
/**
 * Sample for Dynamic Stock Chart
 */
import * as React from "react";

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


// import { updateSampleSection } from "./sample-base";
const SAMPLE_CSS = `
 .control-fluid {
     padding: 0px !important;
 }
     .charts { 
         align :center
     }`;
let series1 = [];
let point1;
let value = 80;
let i;
for (i = 1; i < 1440; i++) {
  if (Math.random() > 0.5) {
    value += Math.random();
  } else {
    value -= Math.random();
  }
  point1 = { x: new Date(2000, 1, 1, 0, i), y: value.toFixed(1) };
  series1.push(point1);
}
function Intra() {
  //   React.useEffect(() => {
  //     updateSampleSection();
  //   }, []);
  return (
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
          load={load.bind(this)}
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
  function load(args) {
    let selectedTheme = window.location.hash.split("/")[1];
    selectedTheme = selectedTheme ? selectedTheme : "Material";
    args.stockChart.theme = (
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)
    ).replace(/-dark/i, "Dark");
  }
}
export default Intra;
