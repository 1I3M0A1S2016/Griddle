Griddle
=======
#### [Take a brief look at what's coming in Griddle v1.0](https://github.com/GriddleGriddle/Griddle/issues/276) ####
----------

Join us here [![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/DynamicTyped/Griddle?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Build Status](https://travis-ci.org/GriddleGriddle/Griddle.svg?branch=master)](https://travis-ci.org/GriddleGriddle/Griddle)

----------

Griddle is a simple grid Component for use with React. It depends on [underscore.js](http://underscorejs.org/) and [React](http://facebook.github.io/react/).

Please check out the [documentation and examples](http://dynamictyped.github.io/Griddle).

To use Griddle:

`npm install griddle-react`

***Or***

download and reference griddle.js from the build directory (npm is preferred).

----------

To run from source, type the following commands into a terminal:

1. `npm install -g grunt-cli` if you don't have grunt.
2. `npm install`
3. `grunt`
4. That's it!

----------

Griddle is not yet version 1. There are likely some areas that will change and some issues that you may encounter. Please submit issues / pull requests for anything you run into.

----------
###Contributing:###

Please feel free submit any bugs or suggestions as issues. If you are having problems getting up and running please post in the [Gitter chat](https://gitter.im/DynamicTyped/Griddle) and we'll try to help out. Pull requests are welcome but if you have an idea please post as an issue first to make sure everyone is on the same-page (and to help avoid duplicate work). If you are looking to help out but don't know where to start, please take a look at [approved issues that don't have anyone assigned](https://github.com/GriddleGriddle/Griddle/issues?q=is%3Aopen+label%3Aapproved+no%3Aassignee).

----------
###Changelog:###

0.4.8
- sorting now takes into account a displayed data, via 'toDisplayValue' function, if provided in columnMetadata
- filtering is now also using 'toDisplayValue' function, instead of now unsupported 'toFilterableString'

0.4.7
- Added expandedRowsDictionary property to the griddle. It has to have the format {rowKeyProperty: true/false}, where rowKeyProperty is the "key" property provided in rowMetadata of the griddle.
- If provided, it will completely disregard the internal griddle state referring to the collapsed/expanded state of the rows. It will also ignore the rowsExpandedByDefault value.

0.4.6 
- Fix search bug introduced by the previous release

0.4.5 
- Same release as 0.4.4
- Included two missing files from the release (griddle.jsx.js and gridRow.jsx.js)

0.4.4
- This release was only made because the griddle.js file was forgotten when doing 0.4.3 release
- It Includes :
- a. when griddle styles are turned off, add to every child row a class "child-row-{rowIndex}" to be able to make the identation by css rules
- b. when we have nested JSON as data input to the grid, the available columns in the settings section were calculated by flattening the first row data in the result, thus leading to additional columns like User.Id, User.Name, User.IsActive etc. So we introduced an aditional grid property  called availableColumns from which the columns are computed. If it is not specified, they are computed by using the "columns" property of the griddle. If "columns" are not specified, then the columns are calculated the old way
- c. when having nested JSONs as data or id columns on the basis of which we render a display value, the search does not work. So we introduced an aditional toFilterableString property of type function that can be passed via columnMetadata, which is returning the searchable value of the column data. It gets as parameters the data, rowData, columnName,rowIndex. Both global search and column search will use it if it is present. Otherwise the old search is performed.

0.4.3
- fixes to columnFiltering
- customization of what is shown in settings
- fixes to Griddle styles for rows

0.4.2

- added attribute "navigateToLastPageOnNewItem". By default it is set to false. If enabled, anytime new record is added to the Griddle, filters and sorting is reset and Griddle displays last page with new record.

0.4.1

This version contains fixes to be able to add new records to end of the Griddle data, manually navigate to the last page and reset filters and ordering of the table.
- Fixed setMaxPage: function no longer sets this.state.page, which conflicted with manually setting the page.
- Added function resetOrdering.
- Value of filter from griddle state object is now passed to the GridFilter, so it is updated, when setting filter programmatically.
- Added examples of adding new records to the end of the table records, navigating to the last page and resetting of the ordering and filter.


0.4.0

This version contains merged functionality from original Griddle:
- Bumped version to 0.4.0
- Merged: Update docs regarding filterByColumn
- Merged: addColumnFilters
- Merged: customHeaderComponent
- Merged: make non-sortable column default icon hidden
- Merged: add docs for custom filter function and component


0.3.5

- columnMetadata are now correctly updated in Griddle.componentWillReceiveProps. This was necessary for cases, where columnMetadata were loaded asynchronously, which not resulted in proper update (re-render).

0.3.4

- Refactored GridTable and GridRow to ES6 implementation
- Refactored Rendering of the rows to avoid GridRowContainer complempletely (it was removed)
- Changed behavior of row expanding. OnRowClick in now independent of expanding rows. Rows can be expanded by clicking on icon for expanding, instead of clicking on whole row. If you wish to expand rows by clicking anywhere in the row, you need to implement onRowClick.
- Added new Griddle property "rowsExpandedByDefault". This is by default set to true, so if not overriden and table contains nested columns, these will be expanded by default.
- Updated/fixed rendering of nested column offset. Only first column renders offset.

0.3.0

- Pulling the React 0.14 update into a larger version update to prevent npm from assuming it's safe to update.

0.2.16

- Reverted to prevent an auto-upgrade to React 0.14.

0.2.15

- Upgrade to React 0.14 - big thanks to Sajin Shrestha (@sajinshrestha) on nearly single-handedly taking on this effort!

0.2.13
- Numerous bug fixes, additions.
- Additional notes will be added soon.
...

0.2.1 - 0.2.3
- Tweaks surrounding package.json dependencies.

0.2.0

1. __Styling__ - Griddle now renders as a single HTML table by default. Additionally, if you don't want to use Griddle's styles they can be turned off with a property `useGriddleStyles={false}`. [See more on styling](http://dynamictyped.github.io/Griddle/styling.html).
1. __External Results__ - External data should now be passed in via props rather than a callback. The Griddle callback is still available for those that wish to use it but it's now in a separate module. [More on External Data](http://dynamictyped.github.io/Griddle/externalData.html)
1. __Custom Components__ - In addition to swapping out the column or row with a custom component, it's now possible to switch out the entire grid with a custom component. For example, the data could initially be rendered as a chart. The data that makes up the chart could be displayed by clicking on settings and unchecking the `Enable Custom Formatting` option. [Customization docs](http://dynamictyped.github.io/Griddle/customization.html#custom-grid-format)
1. __Infinite Scrolling__ - Infinite scrolling can be toggled instead of the default pagination. [View infinite scrolling docs](http://dynamictyped.github.io/Griddle/infiniteScroll.html)  
1. __New Documentation Site__ - The documentation site is a bit more thorough and no longer a single page. [Check it out here](http://dynamictyped.github.io/Griddle)

__Breaking Changes:__

1. Updated the following properties:
 - **useCustomFormat** changed to **useCustomRowComponent**
 - **useCustomPager** changed to **useCustomPagerComponent**
 - **customFormat** changed to **customRowComponent**
 - **customPager** changed to **customPagerComponent**
 - **customFormatClassName** changed to **customRowComponentClassName**
 - **allowToggleCustom** to **enableToggleCustom**
 - **customNoData** changed to **customNoDataComponent**
 - *Significantly* changed **getExternalResults**. See the note below.
2. The **getExternalResults** property and loading data from an external source has been updated quite a bit.
 - Rather than exposing a single method to load data, a series of 'external' properties are available to pass data to Griddle.
 - For those that wish to use a callback and to support implementations before v0.2.0 using **getExternalResults** method, the `GriddleWithCallback` component was created. For more on GriddleWithCallback, [view the documentation here.](http://dynamictyped.github.io/Griddle/externalData.html#griddle-with-callback)
 - [Check out the entire external data documentation to read more.](http://dynamictyped.github.io/Griddle/externalData.html)


0.1.19:

1. Updated some of the documentation to note forthcoming changes to ExternalResults etc.
2. Custom cell components now have a property  `rowData` as well as the `data`. [See here for more info](https://github.com/DynamicTyped/Griddle/issues/32)
3. Components reference just `React` now instead of `React/Addons`.

0.1.18:

1. Fixed a bug where initialSort property wasn't getting used
2. Added initialSortAscending prop (defaults to true)
3. Removed references to bootstrap
4. Fixed an issue with filtering and external results
5. External Results fixes/enhancements
6. Metadata enhancements
