To start application:

1. Backend -> nodemon ser.js / node ser.js
2. Front end -> npm start / npm run build

Different routes for url :

1. / -> marketwatch with live data
2. /stat -> Improved version of marketwatch with live data and added styles
3. /chart -> Stock chart with indicators and trendlines and export options with date frame of a year
4. /chartold -> Same as "/chart"
5. /line -> Line chart with data frame of 24 hrs
6. /intra -> Same as "/line"
7. /ddl -> Dashboard with 3 marketwatch ( 2 side by side ), Add/delete to marketwatch, Buy/Sell draggable bar and Appbar on top
8. /btns -> Add and delete buttons and a prompt disappearing in 3.5 seconds telling the user about their action
9. /appbar -> shows the appbar with different menus and dropdowns
10. /widget -> Dynamic dashboard that lets the user user add widgets and reorder panels that saves when clicked on save button
11. /addwid -> Opening page that shows appbar and marketwatch
12. /ddlbs -> Draggable component which shows dropdowns and text boxes for BuySell bar
13. /chartdash -> Dashboard component that shows marketwatch and chart side by side with options to resize and close chart
14. /tabcomp -> Lets the user add new tabs. Useful when making different wachlist like auto, IT, banks. User can add the name of watchlist. Also demostrates the minimize function when clicked get converted into a tab

Components used in -

1. /addwid -> Appbar, Stat, Chartold, DDL_BuySell,Chart_Dashboard
2. /ddl -> Appbar, DDL_Comp, DDL_BuySell, Stat

Built using Syncfusion
