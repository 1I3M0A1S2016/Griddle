(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"), require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["React", "_"], factory);
	else if(typeof exports === 'object')
		exports["Griddle"] = factory(require("React"), require("_"));
	else
		root["Griddle"] = factory(root["React"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)p
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var React = __webpack_require__(2);
	var GridTable = __webpack_require__(3);
	var GridFilter = __webpack_require__(9);
	var GridPagination = __webpack_require__(10);
	var GridSettings = __webpack_require__(11);
	var GridNoData = __webpack_require__(12);
	var GridRow = __webpack_require__(13);
	var CustomRowComponentContainer = __webpack_require__(15);
	var CustomPaginationContainer = __webpack_require__(16);
	var CustomFilterContainer = __webpack_require__(17);
	var ColumnProperties = __webpack_require__(6);
	var RowProperties = __webpack_require__(18);
	var deep = __webpack_require__(14);
	var _ = __webpack_require__(5);

	var Griddle = React.createClass({
	    displayName: 'Griddle',

	    statics: {
	        GridTable: GridTable,
	        GridFilter: GridFilter,
	        GridPagination: GridPagination,
	        GridSettings: GridSettings,
	        GridRow: GridRow
	    },
	    columnSettings: null,
	    rowSettings: null,
	    getDefaultProps: function getDefaultProps() {
	        return {
	            "columns": [],
	            "gridMetadata": null,
	            "columnMetadata": [],
	            "rowMetadata": null,
	            "results": [], // Used if all results are already loaded.
	            "initialSort": "",
	            "initialSortAscending": true,
	            "gridClassName": "",
	            "tableClassName": "",
	            "customRowComponentClassName": "",
	            "settingsText": "Settings",
	            "filterPlaceholderText": "Filter Results",
	            "nextText": "Next",
	            "previousText": "Previous",
	            "maxRowsText": "Rows per page",
	            "enableCustomFormatText": "Enable Custom Formatting",
	            //this column will determine which column holds subgrid data
	            //it will be passed through with the data object but will not be rendered
	            "childrenColumnName": "children",
	            //Any column in this list will be treated as metadata and will be passed through with the data but won't be rendered
	            "metadataColumns": [],
	            "showFilter": false,
	            "showSettings": false,
	            "useCustomRowComponent": false,
	            "useCustomGridComponent": false,
	            "useCustomPagerComponent": false,
	            "useCustomFilterer": false,
	            "useCustomFilterComponent": false,
	            "useGriddleStyles": true,
	            "useGriddleIcons": true,
	            "customRowComponent": null,
	            "customGridComponent": null,
	            "customPagerComponent": {},
	            "customFilterComponent": null,
	            "customFilterer": null,
	            "globalData": null,
	            "enableToggleCustom": false,
	            "noDataMessage": "There is no data to display.",
	            "noDataClassName": "griddle-nodata",
	            "customNoDataComponent": null,
	            "showTableHeading": true,
	            "showPager": true,
	            "useFixedHeader": false,
	            "useExternal": false,
	            "externalSetPage": null,
	            "externalChangeSort": null,
	            "externalSetFilter": null,
	            "externalSetPageSize": null,
	            "externalMaxPage": null,
	            "externalCurrentPage": null,
	            "externalSortColumn": null,
	            "externalSortAscending": true,
	            "externalLoadingComponent": null,
	            "externalIsLoading": false,
	            "enableInfiniteScroll": false,
	            "bodyHeight": null,
	            "paddingHeight": 5,
	            "rowHeight": 25,
	            "infiniteScrollLoadTreshold": 50,
	            "useFixedLayout": true,
	            "isSubGriddle": false,
	            "enableSort": true,
	            "onRowClick": null,
	            /* css class names */
	            "sortAscendingClassName": "sort-ascending",
	            "sortDescendingClassName": "sort-descending",
	            "parentRowCollapsedClassName": "parent-row",
	            "parentRowExpandedClassName": "parent-row expanded",
	            "settingsToggleClassName": "settings",
	            "nextClassName": "griddle-next",
	            "previousClassName": "griddle-previous",
	            "headerStyles": {},
	            /* icon components */
	            "sortAscendingComponent": " ▲",
	            "sortDescendingComponent": " ▼",
	            "sortDefaultComponent": null,
	            "parentRowCollapsedComponent": "▶",
	            "parentRowExpandedComponent": "▼",
	            "settingsIconComponent": "",
	            "nextIconComponent": "",
	            "previousIconComponent": "",
	            "isMultipleSelection": false, //currently does not support subgrids
	            "selectedRowIds": [],
	            "uniqueIdentifier": "id",
	            "rowsExpandedByDefault": true,
	            "expandedRowsDictionary": undefined,
	            "resetToLastPage": false,
	            "resetToFirstPage": false,
		    "bodyScrolling": false
	        };
	    },
	    propTypes: {
	        isMultipleSelection: React.PropTypes.bool,
	        selectedRowIds: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.number), React.PropTypes.arrayOf(React.PropTypes.string)]),
	        uniqueIdentifier: React.PropTypes.string
	    },
	    defaultFilter: function defaultFilter(results, filter) {
	        var colMetadata = (this.columnSettings.columnMetadata || []).reduce(function (previous, current) {
	            previous[current.columnName] = current;
	            return previous;
	        }, {});

	        return _.filter(results, function (item) {
	            var arr = deep.keys(item);
	            for (var i = 0; i < arr.length; i++) {
	                var toDisplayValueFn = colMetadata[arr[i]] && colMetadata[arr[i]].toDisplayValue;
	                if ((toDisplayValueFn ? toDisplayValueFn(item[arr[i]], item, arr[i]) : deep.getAt(item, arr[i]) || "").toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
	                    return true;
	                }
	            }
	            return false;
	        });
	    },
	    filterByColumnFilters: function filterByColumnFilters(columnFilters) {
	        var that = this;
	        var filteredResults = Object.keys(columnFilters).reduce(function (previous, current, index) {
	            return _.filter(previous, function (item) {
	                var currentColMetadata = _.find(that.columnSettings.columnMetadata || [], function (cm) {
	                    return cm.columnName == current;
	                });
	                var toDisplayValueFn = currentColMetadata && currentColMetadata.toDisplayValue;
	                if ((toDisplayValueFn ? toDisplayValueFn(item[current], item, current, index) : deep.getAt(item, current || "")).toString().toLowerCase().indexOf(columnFilters[current].toLowerCase()) >= 0) {
	                    return true;
	                }

	                return false;
	            });
	        }, this.props.results);

	        var newState = {
	            columnFilters: columnFilters
	        };

	        if (columnFilters) {
	            newState.filteredResults = filteredResults;
	            newState.maxPage = this.getMaxPage(newState.filteredResults);
	        } else if (this.state.filter) {
	            newState.filteredResults = this.props.useCustomFilterer ? this.props.customFilterer(this.props.results, filter) : this.defaultFilter(this.props.results, filter);
	        } else {
	            newState.filteredResults = null;
	        }

	        this.setState(newState);
	    },
	    filterByColumn: function filterByColumn(filter, column) {
	        var columnFilters = this.state.columnFilters;

	        //if filter is "" remove it from the columnFilters object
	        if (columnFilters.hasOwnProperty(column) && !filter) {
	            columnFilters = _.omit(columnFilters, column);
	        } else {
	            var newObject = {};
	            newObject[column] = filter;
	            columnFilters = _.extend({}, columnFilters, newObject);
	        }

	        this.filterByColumnFilters(columnFilters);
	    },
	    /* if we have a filter display the max page and results accordingly */
	    setFilter: function setFilter(filter) {
	        if (this.props.useExternal) {
	            this.props.externalSetFilter(filter);
	            return;
	        }

	        var that = this,
	            updatedState = {
	            page: 0,
	            filter: filter
	        };

	        // Obtain the state results.
	        updatedState.filteredResults = this.props.useCustomFilterer ? this.props.customFilterer(this.props.results, filter) : this.defaultFilter(this.props.results, filter);

	        // Update the max page.
	        updatedState.maxPage = that.getMaxPage(updatedState.filteredResults);

	        //if filter is null or undefined reset the filter.
	        if (_.isUndefined(filter) || _.isNull(filter) || _.isEmpty(filter)) {
	            updatedState.filter = filter;
	            updatedState.filteredResults = null;
	        }

	        // Set the state.
	        that.setState(updatedState);

	        this._resetSelectedRows();
	    },
	    setPageSize: function setPageSize(size) {
	        if (this.props.useExternal) {
	            this.props.externalSetPageSize(size);
	            return;
	        }

	        //make this better.
	        this.state.resultsPerPage = size;
	        this.setMaxPage();
	    },
	    toggleColumnChooser: function toggleColumnChooser() {
	        this.setState({
	            showColumnChooser: !this.state.showColumnChooser
	        });
	    },
	    toggleCustomComponent: function toggleCustomComponent() {
	        if (this.state.customComponentType === "grid") {
	            this.setProps({
	                useCustomGridComponent: !this.props.useCustomGridComponent
	            });
	        } else if (this.state.customComponentType === "row") {
	            this.setProps({
	                useCustomRowComponent: !this.props.useCustomRowComponent
	            });
	        }
	    },
	    getMaxPage: function getMaxPage(results, totalResults) {
	        if (this.props.useExternal) {
	            return this.props.externalMaxPage;
	        }

	        if (!totalResults) {
	            totalResults = (results || this.getCurrentResults()).length;
	        }
	        var maxPage = Math.ceil(totalResults / this.state.resultsPerPage);
	        return maxPage;
	    },
	    setMaxPage: function setMaxPage(results) {
	        var maxPage = this.getMaxPage(results);
	        //re-render if we have new max page value
	        if (this.state.maxPage !== maxPage) {
	            this.setState({ maxPage: maxPage, filteredColumns: this.columnSettings.filteredColumns });
	        }
	    },
	    setPage: function setPage(number) {
	        if (this.props.useExternal) {
	            this.props.externalSetPage(number);
	            return;
	        }

	        //check page size and move the filteredResults to pageSize * pageNumber
	        if (number * this.state.resultsPerPage <= this.state.resultsPerPage * this.state.maxPage) {
	            var that = this,
	                state = {
	                page: number
	            };

	            that.setState(state);
	        }

	        //When infinite scrolling is enabled, uncheck the "select all" checkbox, since more unchecked rows will be appended at the end
	        if (this.props.enableInfiniteScroll) {
	            this.setState({
	                isSelectAllChecked: false
	            });
	        } else {
	            //When the paging is done on the server, the previously selected rows on a certain page might not
	            // coincide with the new rows on that exact page page, if moving back and forth. Better reset the selection
	            this._resetSelectedRows();
	        }
	    },
	    setColumns: function setColumns(columns) {
	        this.columnSettings.filteredColumns = _.isArray(columns) ? columns : [columns];

	        this.setState({
	            filteredColumns: this.columnSettings.filteredColumns
	        });
	    },
	    nextPage: function nextPage() {
	        var currentPage = this.getCurrentPage();
	        if (currentPage < this.getCurrentMaxPage() - 1) {
	            this.setPage(currentPage + 1);
	        }
	    },
	    previousPage: function previousPage() {
	        var currentPage = this.getCurrentPage();
	        if (currentPage > 0) {
	            this.setPage(currentPage - 1);
	        }
	    },
	    changeSort: function changeSort(sort) {
	        if (this.props.enableSort === false) {
	            return;
	        }
	        if (this.props.useExternal) {
	            this.props.externalChangeSort(sort, this.props.externalSortColumn === sort ? !this.props.externalSortAscending : true);
	            return;
	        }

	        var that = this,
	            state = {
	            page: 0,
	            sortColumn: sort,
	            sortAscending: true
	        };

	        // If this is the same column, reverse the sort.
	        if (this.state.sortColumn == sort) {
	            state.sortAscending = !this.state.sortAscending;
	        }

	        this.setState(state);

	        //When the sorting is done on the server, the previously selected rows might not correspond with the new ones.
	        //Better reset the selection
	        this._resetSelectedRows();
	    },
	    prevColumns: [],
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setMaxPage(nextProps.results);

	        if (nextProps.results.length > 0) {
	            var deepKeys = deep.keys(nextProps.results[0]);

	            var is_same = this.columnSettings.allColumns.length == deepKeys.length && this.columnSettings.allColumns.every(function (element, index) {
	                return element === deepKeys[index];
	            });

	            if (!is_same) {
	                this.columnSettings.allColumns = deepKeys;
	            }
	        } else if (this.columnSettings.allColumns.length > 0) {
	            this.columnSettings.allColumns = [];
	        }
		
		/*Prevent reseting the filtered columns (in grid settings) to the initial ones when setting the state in the parent component of the griddle*/
	        if(this.prevColumns.length !== (nextProps.columns || []).length || !_.isEqual(this.prevColumns.sort(),(nextProps.columns || []).sort()))
	        {
	            this.columnSettings.filteredColumns = (nextProps.columns || []).slice();
			this.setState({
			    filteredColumns: this.columnSettings.filteredColumns
			});			
        	    this.prevColumns = (nextProps.columns || []).slice();
	        }

	        if (nextProps.selectedRowIds) {
	            var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true);

	            this.setState({
	                isSelectAllChecked: this._getAreAllRowsChecked(nextProps.selectedRowIds, _.pluck(visibleRows, this.props.uniqueIdentifier)),
	                selectedRowIds: nextProps.selectedRowIds
	            });
	        }
	        
	        if (nextProps.resetToFirstPage) {
	            this.setPage(0);
	        }
	        if (nextProps.resetToLastPage) {
	            this.resetOrdering();
	            var lastPage = this.getMaxPage(nextProps.results) - 1;
	            this.setState({ page: lastPage });
	        }	        

	        // update column metadata
	        this.columnSettings.columnMetadata = nextProps.columnMetadata;
	    },

	    getInitialState: function getInitialState() {
	        var state = {
	            maxPage: 0,
	            page: 0,
	            filteredResults: null,
	            filteredColumns: [],
	            filter: "",
	            //this sets the individual column filters
	            columnFilters: {},
	            resultsPerPage: this.props.resultsPerPage || 5,
	            sortColumn: this.props.initialSort,
	            sortAscending: this.props.initialSortAscending,
	            showColumnChooser: false,
	            isSelectAllChecked: false,
	            selectedRowIds: this.props.selectedRowIds
	        };

	        return state;
	    },
	    resetOrdering: function resetOrdering() {
	        this.setState({
	            sortColumn: this.props.initialSort,
	            sortAscending: this.props.initialSortAscending
	        });
	    },
	    componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
	        this.props.onGriddleWillUpdate && this.props.onGriddleWillUpdate((this.state.filteredColumns || []).slice(), (nextState.filteredColumns || []).slice());
	    },
	    componentWillMount: function componentWillMount() {
	        this.verifyExternal();
	        this.verifyCustom();

	        this.columnSettings = new ColumnProperties(this.props.availableColumns || this.props.columns || (this.props.results.length > 0 ? deep.keys(this.props.results[0]) : []), this.props.columns, this.props.childrenColumnName, this.props.columnMetadata, this.props.metadataColumns);

	        this.rowSettings = new RowProperties(this.props.rowMetadata, this.props.useCustomTableRowComponent && this.props.customTableRowComponent ? this.props.customTableRowComponent : GridRow, this.props.useCustomTableRowComponent);

	        this.setMaxPage();

	        //don't like the magic strings
	        if (this.props.useCustomGridComponent === true) {
	            this.setState({
	                customComponentType: "grid"
	            });
	        } else if (this.props.useCustomRowComponent === true) {
	            this.setState({
	                customComponentType: "row"
	            });
	        } else {
	            this.setState({
	                filteredColumns: this.columnSettings.filteredColumns
	            });
	        }
	    },
	    //todo: clean these verify methods up
	    verifyExternal: function verifyExternal() {
	        if (this.props.useExternal === true) {
	            //hooray for big ugly nested if
	            if (this.props.externalSetPage === null) {
	                console.error("useExternal is set to true but there is no externalSetPage function specified.");
	            }

	            if (this.props.externalChangeSort === null) {
	                console.error("useExternal is set to true but there is no externalChangeSort function specified.");
	            }

	            if (this.props.externalSetFilter === null) {
	                console.error("useExternal is set to true but there is no externalSetFilter function specified.");
	            }

	            if (this.props.externalSetPageSize === null) {
	                console.error("useExternal is set to true but there is no externalSetPageSize function specified.");
	            }

	            if (this.props.externalMaxPage === null) {
	                console.error("useExternal is set to true but externalMaxPage is not set.");
	            }

	            if (this.props.externalCurrentPage === null) {
	                console.error("useExternal is set to true but externalCurrentPage is not set. Griddle will not page correctly without that property when using external data.");
	            }
	        }
	    },
	    verifyCustom: function verifyCustom() {
	        if (this.props.useCustomGridComponent === true && this.props.customGridComponent === null) {
	            console.error("useCustomGridComponent is set to true but no custom component was specified.");
	        }
	        if (this.props.useCustomRowComponent === true && this.props.customRowComponent === null) {
	            console.error("useCustomRowComponent is set to true but no custom component was specified.");
	        }
	        if (this.props.useCustomGridComponent === true && this.props.useCustomRowComponent === true) {
	            console.error("Cannot currently use both customGridComponent and customRowComponent.");
	        }
	        if (this.props.useCustomFilterer === true && this.props.customFilterer === null) {
	            console.error("useCustomFilterer is set to true but no custom filter function was specified.");
	        }
	        if (this.props.useCustomFilterComponent === true && this.props.customFilterComponent === null) {
	            console.error("useCustomFilterComponent is set to true but no customFilterComponent was specified.");
	        }
	    },
	    getDataForRender: function getDataForRender(data, cols, pageList) {
	        var that = this;
	        //get the correct page size
	        if (this.state.sortColumn !== "" || this.props.initialSort !== "") {
	            var columnMetadata = _.where(this.props.columnMetadata, { columnName: this.state.sortColumn });

	            var sortProperty = columnMetadata.length > 0 && columnMetadata[0].hasOwnProperty("sortProperty") && columnMetadata[0]["sortProperty"] || null;
	            var toDisplayValueFn = columnMetadata.length > 0 && columnMetadata[0].hasOwnProperty("toDisplayValue") && columnMetadata[0]["toDisplayValue"] || null;

	            data = _.sortBy(data, function (item, index) {
	                var sortByValue = sortProperty ? deep.getAt(item, that.state.sortColumn || that.props.initialSort)[sortProperty] : deep.getAt(item, that.state.sortColumn || that.props.initialSort);
	                if (toDisplayValueFn) {
	                    sortByValue = toDisplayValueFn(sortByValue, item, that.state.sortColumn || that.props.initialSort, index);
	                }
	                return sortByValue;
	            });

	            if (this.state.sortAscending === false) {
	                data.reverse();
	            }
	        }

	        var currentPage = this.getCurrentPage();

	        if (!this.props.useExternal && pageList && this.state.resultsPerPage * (currentPage + 1) <= this.state.resultsPerPage * this.state.maxPage && currentPage >= 0) {
	            if (this.isInfiniteScrollEnabled()) {
	                // If we're doing infinite scroll, grab all results up to the current page.
	                data = _.first(data, (currentPage + 1) * this.state.resultsPerPage);
	            } else {
	                //the 'rest' is grabbing the whole array from index on and the 'initial' is getting the first n results
	                var rest = _.drop(data, currentPage * this.state.resultsPerPage);
	                data = (_.dropRight || _.initial)(rest, rest.length - this.state.resultsPerPage);
	            }
	        }

	        var meta = this.columnSettings.getMetadataColumns;

	        var transformedData = [];

	        for (var i = 0; i < data.length; i++) {
	            var mappedData = data[i];

	            if (typeof mappedData[that.props.childrenColumnName] !== "undefined" && mappedData[that.props.childrenColumnName].length > 0) {
	                //internally we're going to use children instead of whatever it is so we don't have to pass the custom name around
	                mappedData["children"] = that.getDataForRender(mappedData[that.props.childrenColumnName], cols, false);

	                if (that.props.childrenColumnName !== "children") {
	                    delete mappedData[that.props.childrenColumnName];
	                }
	            }

	            transformedData.push(mappedData);
	        }
	        return transformedData;
	    },
	    //this is the current results
	    getCurrentResults: function getCurrentResults() {
	        return this.state.filteredResults || this.props.results;
	    },
	    getCurrentPage: function getCurrentPage() {
	        return this.props.externalCurrentPage || this.state.page;
	    },
	    getCurrentSort: function getCurrentSort() {
	        return this.props.useExternal ? this.props.externalSortColumn : this.state.sortColumn;
	    },
	    getCurrentSortAscending: function getCurrentSortAscending() {
	        return this.props.useExternal ? this.props.externalSortAscending : this.state.sortAscending;
	    },
	    getCurrentMaxPage: function getCurrentMaxPage() {
	        return this.props.useExternal ? this.props.externalMaxPage : this.state.maxPage;
	    },
	    //This takes the props relating to sort and puts them in one object
	    getSortObject: function getSortObject() {
	        return {
	            enableSort: this.props.enableSort,
	            changeSort: this.changeSort,
	            sortColumn: this.getCurrentSort(),
	            sortAscending: this.getCurrentSortAscending(),
	            sortAscendingClassName: this.props.sortAscendingClassName,
	            sortDescendingClassName: this.props.sortDescendingClassName,
	            sortAscendingComponent: this.props.sortAscendingComponent,
	            sortDescendingComponent: this.props.sortDescendingComponent,
	            sortDefaultComponent: this.props.sortDefaultComponent
	        };
	    },
	    _toggleSelectAll: function _toggleSelectAll() {

	        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
	            newIsSelectAllChecked = !this.state.isSelectAllChecked,
	            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

	        _.each(visibleRows, function (row) {
	            this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, newIsSelectAllChecked);
	        }, this);

	        this.setState({
	            isSelectAllChecked: newIsSelectAllChecked,
	            selectedRowIds: newSelectedRowIds
	        });
	    },
	    _toggleSelectRow: function _toggleSelectRow(row, isChecked) {

	        var visibleRows = this.getDataForRender(this.getCurrentResults(), this.columnSettings.getColumns(), true),
	            newSelectedRowIds = JSON.parse(JSON.stringify(this.state.selectedRowIds));

	        this._updateSelectedRowIds(row[this.props.uniqueIdentifier], newSelectedRowIds, isChecked);

	        this.setState({
	            isSelectAllChecked: this._getAreAllRowsChecked(newSelectedRowIds, _.pluck(visibleRows, this.props.uniqueIdentifier)),
	            selectedRowIds: newSelectedRowIds
	        });
	    },
	    _updateSelectedRowIds: function _updateSelectedRowIds(id, selectedRowIds, isChecked) {

	        var isFound;

	        if (isChecked) {
	            isFound = _.find(selectedRowIds, function (item) {
	                return id === item;
	            });

	            if (isFound === undefined) {
	                selectedRowIds.push(id);
	            }
	        } else {
	            selectedRowIds.splice(selectedRowIds.indexOf(id), 1);
	        }
	    },
	    _getIsSelectAllChecked: function _getIsSelectAllChecked() {

	        return this.state.isSelectAllChecked;
	    },
	    _getAreAllRowsChecked: function _getAreAllRowsChecked(selectedRowIds, visibleRowIds) {

	        var i, isFound;

	        if (selectedRowIds.length !== visibleRowIds.length) {
	            return false;
	        }

	        for (i = 0; i < selectedRowIds.length; i++) {
	            isFound = _.find(visibleRowIds, function (visibleRowId) {
	                return selectedRowIds[i] === visibleRowId;
	            });

	            if (isFound === undefined) {
	                return false;
	            }
	        }

	        return true;
	    },
	    _getIsRowChecked: function _getIsRowChecked(row) {

	        return this.state.selectedRowIds.indexOf(row[this.props.uniqueIdentifier]) > -1 ? true : false;
	    },
	    getSelectedRowIds: function getSelectedRowIds() {

	        return this.state.selectedRowIds;
	    },
	    _resetSelectedRows: function _resetSelectedRows() {

	        this.setState({
	            isSelectAllChecked: false,
	            selectedRowIds: []
	        });
	    },
	    //This takes the props relating to multiple selection and puts them in one object
	    getMultipleSelectionObject: function getMultipleSelectionObject() {

	        return {
	            isMultipleSelection: _.find(this.props.results, function (result) {
	                return 'children' in result;
	            }) ? false : this.props.isMultipleSelection, //does not support subgrids
	            toggleSelectAll: this._toggleSelectAll,
	            getIsSelectAllChecked: this._getIsSelectAllChecked,

	            toggleSelectRow: this._toggleSelectRow,
	            getSelectedRowIds: this.getSelectedRowIds,
	            getIsRowChecked: this._getIsRowChecked
	        };
	    },
	    isInfiniteScrollEnabled: function isInfiniteScrollEnabled() {
	        // If a custom pager is included, don't allow for infinite scrolling.
	        if (this.props.useCustomPagerComponent) {
	            return false;
	        }

	        // Otherwise, send back the property.
	        return this.props.enableInfiniteScroll;
	    },
	    getClearFixStyles: function getClearFixStyles() {
	        return {
	            clear: "both",
	            display: "table",
	            width: "100%"
	        };
	    },
	    getSettingsStyles: function getSettingsStyles() {
	        return {
	            "float": "left",
	            width: "50%",
	            textAlign: "right"
	        };
	    },
	    getFilterStyles: function getFilterStyles() {
	        return {
	            "float": "left",
	            width: "50%",
	            textAlign: "left",
	            color: "#222",
	            minHeight: "1px"
	        };
	    },
	    getFilter: function getFilter() {
	        return this.props.showFilter && this.props.useCustomGridComponent === false ? this.props.useCustomFilterComponent ? React.createElement(CustomFilterContainer, { changeFilter: this.setFilter, placeholderText: this.props.filterPlaceholderText, customFilterComponent: this.props.customFilterComponent, results: this.props.results, currentResults: this.getCurrentResults() }) : React.createElement(GridFilter, { changeFilter: this.setFilter, placeholderText: this.props.filterPlaceholderText, value: this.state.filter }) : "";
	    },
	    getSettings: function getSettings() {
	        return this.props.showSettings ? React.createElement('button', { type: 'button', className: this.props.settingsToggleClassName, onClick: this.toggleColumnChooser,
	            style: this.props.useGriddleStyles ? { background: "none", border: "none", padding: 0, margin: 0, fontSize: 14 } : null }, this.props.settingsText, this.props.settingsIconComponent) : "";
	    },
	    getTopSection: function getTopSection(filter, settings) {
	        if (this.props.showFilter === false && this.props.showSettings === false) {
	            return "";
	        }

	        var filterStyles = null,
	            settingsStyles = null,
	            topContainerStyles = null;

	        if (this.props.useGriddleStyles) {
	            filterStyles = this.getFilterStyles();
	            settingsStyles = this.getSettingsStyles();

	            topContainerStyles = this.getClearFixStyles();
	        }

	        return React.createElement('div', { className: 'top-section', style: topContainerStyles }, React.createElement('div', { className: 'griddle-filter', style: filterStyles }, filter), React.createElement('div', { className: 'griddle-settings-toggle', style: settingsStyles }, settings));
	    },
	    getPagingSection: function getPagingSection(currentPage, maxPage) {
	        if ((this.props.showPager && !this.isInfiniteScrollEnabled() && !this.props.useCustomGridComponent) === false) {
	            return undefined;
	        }

	        return React.createElement('div', { className: 'griddle-footer' }, this.props.useCustomPagerComponent ? React.createElement(CustomPaginationContainer, { next: this.nextPage, previous: this.previousPage, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText, customPagerComponent: this.props.customPagerComponent }) : React.createElement(GridPagination, { useGriddleStyles: this.props.useGriddleStyles, next: this.nextPage, previous: this.previousPage, nextClassName: this.props.nextClassName, nextIconComponent: this.props.nextIconComponent, previousClassName: this.props.previousClassName, previousIconComponent: this.props.previousIconComponent, currentPage: currentPage, maxPage: maxPage, setPage: this.setPage, nextText: this.props.nextText, previousText: this.props.previousText }));
	    },
	    getColumnSelectorSection: function getColumnSelectorSection(keys, cols) {
	        return this.state.showColumnChooser ? React.createElement(GridSettings, { columns: keys, selectedColumns: cols, setColumns: this.setColumns, settingsText: this.props.settingsText,
	            settingsIconComponent: this.props.settingsIconComponent, maxRowsText: this.props.maxRowsText, setPageSize: this.setPageSize,
	            showSetPageSize: !this.props.useCustomGridComponent, resultsPerPage: this.state.resultsPerPage, enableToggleCustom: this.props.enableToggleCustom,
	            toggleCustomComponent: this.toggleCustomComponent, useCustomComponent: this.props.useCustomRowComponent || this.props.useCustomGridComponent,
	            useGriddleStyles: this.props.useGriddleStyles, enableCustomFormatText: this.props.enableCustomFormatText, columnMetadata: this.props.columnMetadata }) : "";
	    },
	    getCustomGridSection: function getCustomGridSection() {
	        return React.createElement(this.props.customGridComponent, _extends({ data: this.props.results, className: this.props.customGridComponentClassName }, this.props.gridMetadata));
	    },
	    getCustomRowSection: function getCustomRowSection(data, cols, meta, pagingContent, globalData) {
	        return React.createElement('div', null, React.createElement(CustomRowComponentContainer, { data: data, columns: cols, metadataColumns: meta, globalData: globalData,
	            className: this.props.customRowComponentClassName, customComponent: this.props.customRowComponent,
	            style: this.props.useGriddleStyles ? this.getClearFixStyles() : null }), this.props.showPager && pagingContent);
	    },
	    getStandardGridSection: function getStandardGridSection(data, cols, meta, pagingContent, hasMorePages) {
	        var sortProperties = this.getSortObject();
	        var multipleSelectionProperties = this.getMultipleSelectionObject();
	        // no data section
	        var showNoData = this.shouldShowNoDataSection(data);
	        var noDataSection = this.getNoDataSection();

	        return React.createElement('div', { className: 'griddle-body' }, React.createElement(GridTable, { useGriddleStyles: this.props.useGriddleStyles,
            	    shouldGriddleRowUpdate: this.props.shouldGriddleRowUpdate,
	            columnSettings: this.columnSettings,
	            rowSettings: this.rowSettings,
	            sortSettings: sortProperties,
	            multipleSelectionSettings: multipleSelectionProperties,
	            filterByColumn: this.filterByColumn,
	            isSubGriddle: this.props.isSubGriddle,
	            useGriddleIcons: this.props.useGriddleIcons,
	            useFixedLayout: this.props.useFixedLayout,
	            showPager: this.props.showPager,
	            pagingContent: pagingContent,
	            data: data,
	            className: this.props.tableClassName,
	            enableInfiniteScroll: this.isInfiniteScrollEnabled(),
	            nextPage: this.nextPage,
	            showTableHeading: this.props.showTableHeading,
	            useFixedHeader: this.props.useFixedHeader,
	            parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
	            parentRowExpandedClassName: this.props.parentRowExpandedClassName,
	            parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
	            parentRowExpandedComponent: this.props.parentRowExpandedComponent,
	            bodyHeight: this.props.bodyHeight,
	            paddingHeight: this.props.paddingHeight,
	            rowHeight: this.props.rowHeight,
	            infiniteScrollLoadTreshold: this.props.infiniteScrollLoadTreshold,
	            externalLoadingComponent: this.props.externalLoadingComponent,
	            externalIsLoading: this.props.externalIsLoading,
	            hasMorePages: hasMorePages,
	            onRowClick: this.props.onRowClick,
	            rowsExpandedByDefault: this.props.rowsExpandedByDefault,
	            expandedRowsDictionary: this.props.expandedRowsDictionary,
	            noDataSection: noDataSection,
	            showNoData: showNoData,
	            gridId: this.props.gridId,
	            bodyScrolling: this.props.bodyScrolling,
	            bodyScrollTop: this.props.bodyScrollTop,
	            bodyClientHeight: this.props.bodyClientHeight,
	            bodyScrollHeight: this.props.bodyScrollHeight,
	            aboveGridContentHeight: this.props.aboveGridContentHeight,
	            underGridContentHeight: this.props.underGridContentHeight
	        }));
	    },
	    getContentSection: function getContentSection(data, cols, meta, pagingContent, hasMorePages, globalData) {
	        if (this.props.useCustomGridComponent && this.props.customGridComponent !== null) {
	            return this.getCustomGridSection();
	        } else if (this.props.useCustomRowComponent) {
	            return this.getCustomRowSection(data, cols, meta, pagingContent, globalData);
	        } else {
	            return this.getStandardGridSection(data, cols, meta, pagingContent, hasMorePages);
	        }
	    },
	    getNoDataSection: function getNoDataSection() {
	        if (this.props.customNoDataComponent != null) {
	            return React.createElement('div', { className: this.props.noDataClassName }, React.createElement(this.props.customNoDataComponent, null));
	        }
	        return React.createElement(GridNoData, { noDataMessage: this.props.noDataMessage });
	    },
	    shouldShowNoDataSection: function shouldShowNoDataSection(results) {
	        return this.props.useExternal === false && (typeof results === 'undefined' || results.length === 0) || this.props.useExternal === true && this.props.externalIsLoading === false && results.length === 0;
	    },
	    render: function render() {
	        var that = this,
	            results = this.getCurrentResults(); // Attempt to assign to the filtered results, if we have any.

	        var headerTableClassName = this.props.tableClassName + " table-header";

	        //figure out if we want to show the filter section
	        var filter = this.getFilter();
	        var settings = this.getSettings();

	        //if we have neither filter or settings don't need to render this stuff
	        var topSection = this.getTopSection(filter, settings);

	        var keys = [];
	        var cols = this.columnSettings.getColumns();

	        //figure out which columns are displayed and show only those
	        var data = this.getDataForRender(results, cols, true);

	        var meta = this.columnSettings.getMetadataColumns();

	        /*
	        Previously, the list of columns was calculated by flattening the first item in the results, which was leading to
	        columns like User.Id , User.Name for nested JSONs like {Id: 1, User: {Id: 1, Name: "Some Username"}}
	        */
	        keys = this.props.availableColumns || this.props.columns ? _.omit(this.props.availableColumns || this.props.columns, meta) : deep.keys(_.omit(results[0], meta));

	        // sort keys by order
	        keys = this.columnSettings.orderColumns(keys);

	        // Grab the current and max page values.
	        var currentPage = this.getCurrentPage();
	        var maxPage = this.getCurrentMaxPage();

	        // Determine if we need to enable infinite scrolling on the table.
	        var hasMorePages = currentPage + 1 < maxPage;

	        // Grab the paging content if it's to be displayed
	        var pagingContent = this.getPagingSection(currentPage, maxPage);

	        var resultContent = this.getContentSection(data, cols, meta, pagingContent, hasMorePages, this.props.globalData);

	        var columnSelector = this.getColumnSelectorSection(keys, cols);

	        var gridClassName = this.props.gridClassName.length > 0 ? "griddle " + this.props.gridClassName : "griddle";
	        //add custom to the class name so we can style it differently
	        gridClassName += this.props.useCustomRowComponent ? " griddle-custom" : "";

	        return React.createElement('div', { className: gridClassName }, topSection, columnSelector, React.createElement('div', { className: 'griddle-container', style: this.props.useGriddleStyles && !this.props.isSubGriddle ? { border: "1px solid #DDD" } : null }, resultContent));
	    }
	});

	module.exports = Griddle;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	var _get = function get(_x2, _x3, _x4) {
	    var _again = true;_function: while (_again) {
	        var object = _x2,
	            property = _x3,
	            receiver = _x4;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	            var parent = Object.getPrototypeOf(object);if (parent === null) {
	                return undefined;
	            } else {
	                _x2 = parent;_x3 = property;_x4 = receiver;_again = true;desc = parent = undefined;continue _function;
	            }
	        } else if ('value' in desc) {
	            return desc.value;
	        } else {
	            var getter = desc.get;if (getter === undefined) {
	                return undefined;
	            }return getter.call(receiver);
	        }
	    }
	};

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError('Cannot call a class as a function');
	    }
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== 'function' && superClass !== null) {
	        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _gridTitleJsx = __webpack_require__(4);

	var _gridTitleJsx2 = _interopRequireDefault(_gridTitleJsx);

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _lodashFlattendeep = __webpack_require__(7);

	var _lodashFlattendeep2 = _interopRequireDefault(_lodashFlattendeep);

	var GridTable = (function (_React$Component) {
	    _inherits(GridTable, _React$Component);

	    function GridTable(props) {
	        _classCallCheck(this, GridTable);

	        _get(Object.getPrototypeOf(GridTable.prototype), 'constructor', this).call(this, props);

	        this.state = {
	            scrollTop: 0,
	            scrollHeight: this.props.bodyHeight,
	            clientHeight: this.props.bodyHeight,
	            expandedRows: {}
	        };
	    }

	    _createClass(GridTable, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            // After the initial render, see if we need to load additional pages.
	            this.gridScroll();
	        }
	    },{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            this.gridId = (this.props.gridId !== undefined ? this.props.gridId : new Date().getTime()).toString();
	        }
	    }, {
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            if (this.props.bodyScrolling) {
	                if (nextProps.bodyHeight !== this.props.bodyHeight || nextProps.bodyScrollTop !== this.props.bodyScrollTop || nextProps.bodyClientHeight !== this.props.bodyClientHeight || nextProps.bodyScrollHeight !== this.props.bodyScrollHeight || nextProps.aboveGridContentHeight !== this.props.aboveGridContentHeight || nextProps.underGridContentHeight !== this.props.underGridContentHeight) {
	                    this.gridScroll(nextProps);
	                }
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(prevProps, prevState) {
	            // After the subsequent renders, see if we need to load additional pages.
	            this.gridScroll();
	        }
	    },  {
	        key: 'gridScroll',
	        value: function gridScroll(nextProps) {
	            if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
	                // If the scroll height is greater than the current amount of rows displayed, update the page.
	                var scrollable = this.refs.scrollable;
	                var scrollTop;
	                var scrollHeight;
	                var clientHeight;

	                if (this.props.bodyScrolling) {
	                    scrollTop = nextProps ? nextProps.bodyScrollTop : document.documentElement && document.documentElement.scrollTop || document.body.scrollTop || 0;
	                    scrollHeight = nextProps ? nextProps.bodyScrollHeight : document.documentElement && document.documentElement.scrollHeight || document.body.scrollHeight || 0;
	                    clientHeight = nextProps ? nextProps.bodyClientHeight : document.documentElement && document.documentElement.clientHeight || document.body.clientHeight || 0;
	                } else {
	                    scrollTop = scrollable.scrollTop;
	                    scrollHeight = scrollable.scrollHeight;
	                    clientHeight = scrollable.clientHeight;
	                }

	                // If the scroll position changed and the difference is greater than a row height
	                if (this.props.rowHeight !== null && this.state.scrollTop !== scrollTop && Math.abs(this.state.scrollTop - scrollTop) >= this.getAdjustedRowHeight()) {
	                    var newState = {
	                        scrollTop: scrollTop,
	                        scrollHeight: scrollHeight,
	                        clientHeight: clientHeight
	                    };

	                    // Set the state to the new state
	                    this.setState(newState);
	                }

	                // Determine the diff by subtracting the amount scrolled by the total height, taking into consideratoin
	                // the spacer's height.
	                var scrollHeightDiff = scrollHeight - (scrollTop + clientHeight) - this.props.infiniteScrollLoadTreshold;

	                // Make sure that we load results a little before reaching the bottom.
	                var compareHeight = scrollHeightDiff * 0.6;

	                if (compareHeight <= this.props.infiniteScrollLoadTreshold) {
	                    this.props.nextPage();
	                }
	            }
	        }
	    }, {
	        key: 'getAdjustedRowHeight',
	        value: function getAdjustedRowHeight() {
	            return this.props.rowHeight + this.props.paddingHeight * 2; // account for padding.
	        }

	        /**
	         * Converts data to nodeContent (rows)
	         * @param nodeData
	         * @param nestingLevel
	         * @returns {*} Array of rows
	         */
	    }, {
	        key: 'getNodeContent',
	        value: function getNodeContent(nodeData) {
	            var _this = this;

	            var nestingLevel = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
	            if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
	                 //let nodeData = this.props.data;
	                var aboveSpacerRow = null;
	                var belowSpacerRow = null;
	                var scrollable = this.props.bodyScrolling ? document.body : this.refs.scrollable;

	                // If we have a row height specified, only render what's going to be visible.
	                if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && scrollable !== undefined) {
	                    var adjustedHeight = this.getAdjustedRowHeight();
	                    var aboveGridContentHeight = this.props.aboveGridContentHeight || 0;
	                    var underGridContentHeight = this.props.underGridContentHeight || 0;

	                    var dynamicBodyScrollExtraRecords = (aboveGridContentHeight + underGridContentHeight) / adjustedHeight;
	                    var extraRecordsCount = this.state.scrollTop == 0 ? dynamicBodyScrollExtraRecords : -1 * dynamicBodyScrollExtraRecords;

	                    var visibleRecordCount = Math.ceil(this.state.clientHeight / adjustedHeight + extraRecordsCount);

	                    // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
	                    var displayStart = Math.max(0, Math.floor(this.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
	                    var displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

	                    // Split the amount of nodes.
	                    nodeData = nodeData.slice(displayStart, displayEnd + 1);

	                    // Set the above and below nodes.
	                    var aboveSpacerRowStyle = { height: displayStart * adjustedHeight + "px" };
	                    aboveSpacerRow = _react2['default'].createElement('tr', { key: 'above-' + aboveSpacerRowStyle.height, style: aboveSpacerRowStyle });
	                    var belowSpacerRowStyle = { height: (this.props.data.length - displayEnd) * adjustedHeight + underGridContentHeight + "px" };
	                    belowSpacerRow = _react2['default'].createElement('tr', { key: 'below-' + belowSpacerRowStyle.height, style: belowSpacerRowStyle });
	                }

	                var nodes = nodeData.map(function (row, index) {

	                    // array with all nodes and it's children
	                    var nodesWithChildren = [];

	                    var hasChildren = typeof row["children"] !== "undefined" && row["children"].length > 0;
	                    var uniqueId = _this.props.rowSettings.getRowKey(row);
	                    var showChildren = hasChildren && (!_this.props.rowsExpandedByDefault && _this.props.expandedRowsDictionary && _this.props.expandedRowsDictionary[uniqueId] === true || !_this.props.expandedRowsDictionary && _this.props.rowsExpandedByDefault === true && _this.state.expandedRows[uniqueId] !== false || _this.props.rowsExpandedByDefault === false && !_this.props.expandedRowsDictionary && _this.state.expandedRows[uniqueId] === true);

	                    var columns = _this.props.columnSettings.getColumns();

	                    // render rows directly - this could return one row or multiple rows
	                    nodesWithChildren.push(_react2['default'].createElement(_this.props.rowSettings.rowComponent, {
                        	shouldGriddleRowUpdate: _this.props.shouldGriddleRowUpdate,
	                        useGriddleStyles: _this.props.useGriddleStyles,
	                        isSubGriddle: _this.props.isSubGriddle,
	                        data: row,
	                        rowData: _this.props.rowSettings.isCustom ? _this.props.data : null,
	                        columnSettings: _this.props.columnSettings,
	                        rowSettings: _this.props.rowSettings,
	                        hasChildren: hasChildren,
	                        toggleChildren: _this.toggleChildren.bind(_this, uniqueId),
	                        showChildren: showChildren,
	                        key: uniqueId,
	                        useGriddleIcons: _this.props.useGriddleIcons,
	                        parentRowExpandedClassName: _this.props.parentRowExpandedClassName,
	                        parentRowCollapsedClassName: _this.props.parentRowCollapsedClassName,
	                        parentRowExpandedComponent: _this.props.parentRowExpandedComponent,
	                        parentRowCollapsedComponent: _this.props.parentRowCollapsedComponent,
	                        paddingHeight: _this.props.paddingHeight,
	                        rowHeight: _this.props.rowHeight,
	                        onRowClick: _this.props.onRowClick,
	                        multipleSelectionSettings: _this.props.multipleSelectionSettings,
	                        nestingLevel: nestingLevel,
	                        isChildRow: nestingLevel > 0 ? true : false
	                    }));

	                    // At least one item in the group has children and row is expanded, continue with rendering of nested rows
	                    /*
	                    Nested rows should be rendered only in two cases:
	                    - if rows are set to be expanded by default, render them if they are not explicitly collapsed
	                    - if rows are set to be not expanded by default, render them only if they are explicitly expanded
	                     */
	                    if (showChildren) {
	                        var children = row["children"];
	                        nodesWithChildren.push(_this.getNodeContent(children, nestingLevel + 1));
	                    }

	                    return nodesWithChildren;
	                });

	                if (this.props.showNoData) {
			    //fix IE bug - it throws exception for colSpan 0
	                    var colSpan = this.props.columnSettings.getVisibleColumnCount() || 1;
	                    nodes.push(_react2['default'].createElement('tr', { key: 'no-data-section' }, _react2['default'].createElement('td', { colSpan: colSpan }, this.props.noDataSection)));
	                }

	                // Add the spacer rows for nodes we're not rendering.
	                if (aboveSpacerRow) {
	                    nodes.unshift(aboveSpacerRow);
	                }
	                if (belowSpacerRow) {
	                    nodes.push(belowSpacerRow);
	                }

	                // Send back the nodes.
	                return nodes;
	            } else {
	                return null;
	            }
	        }
	    }, {
	        key: 'toggleChildren',
	        value: function toggleChildren(key) {
	            // decide if component is expanded or not
	            var isExpanded = this.state.expandedRows[key] || false;

	            if (this.props.rowsExpandedByDefault && this.state.expandedRows[key] !== false) {
	                isExpanded = true;
	            }

	            if (isExpanded) {
	                this.state.expandedRows[key] = false;
	            } else {
	                this.state.expandedRows[key] = true;
	            }

	            // Re-render the grid - it is safe to assume, when row is expanded or collapsed, that we can re-render.
	            // Please note, that this will skip shouldComponentUpdate (might cause some issues)
	            this.forceUpdate();
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var nodes = [];

	            // Grab the nodes to render
	            var nodeContent = this.getNodeContent(this.props.data);
	            var flattenedContent = (0, _lodashFlattendeep2['default'])(nodeContent);

	            if (nodeContent) {
	                nodes = _react2['default'].createElement('tbody', null, flattenedContent);
	            }

	            var gridStyle = null;
	            var loadingContent = null;

	            var tableStyle = {
	                width: "100%"
	            };

	            if (this.props.useFixedLayout) {
	                tableStyle.tableLayout = "fixed";
	            }

	            if (this.props.enableInfiniteScroll) {
	                // If we're enabling infinite scrolling, we'll want to include the max height of the grid body + allow scrolling.
	                gridStyle = {
	                    "position": "relative",
	                    "overflowY": this.props.bodyScrolling ? "initial" : "scroll",
	                    "height": this.props.bodyHeight + "px",
	                    "width": "100%"
	                };
	            }

	            // If we're currently loading, populate the loading content
	            if (this.props.externalIsLoading) {
	                var defaultLoadingStyle = null;
	                var defaultColSpan = null;

	                if (this.props.useGriddleStyles) {
	                    defaultLoadingStyle = {
	                        textAlign: "center",
	                        paddingBottom: "40px"
	                    };

	                    defaultColSpan = this.props.columnSettings.getVisibleColumnCount();
	                }

	                var loadingComponent = this.props.externalLoadingComponent ? _react2['default'].createElement(this.props.externalLoadingComponent, null) : _react2['default'].createElement('div', null, 'Loading...');

	                loadingContent = _react2['default'].createElement('tbody', null, _react2['default'].createElement('tr', null, _react2['default'].createElement('td', { style: defaultLoadingStyle, colSpan: defaultColSpan }, loadingComponent)));
	            }

	            // Construct the table heading component
	            var tableHeading = this.props.showTableHeading ? _react2['default'].createElement(_gridTitleJsx2['default'], { useGriddleStyles: this.props.useGriddleStyles, useGriddleIcons: this.props.useGriddleIcons,
	                sortSettings: this.props.sortSettings,
	                multipleSelectionSettings: this.props.multipleSelectionSettings,
	                columnSettings: this.props.columnSettings,
	                filterByColumn: this.props.filterByColumn,
	                rowSettings: this.props.rowSettings }) : undefined;

	            var pagingContent = _react2['default'].createElement('tbody', null);
	            if (this.props.showPager) {
	                var pagingStyles = this.props.useGriddleStyles ? {
	                    padding: "0",
	                    backgroundColor: "#EDEDED",
	                    border: "0",
	                    color: "#222"
	                } : null;

	                pagingContent = _react2['default'].createElement('tbody', null, _react2['default'].createElement('tr', null, _react2['default'].createElement('td', { colSpan: this.props.multipleSelectionSettings.isMultipleSelection ? this.props.columnSettings.getVisibleColumnCount() + 1 : this.props.columnSettings.getVisibleColumnCount(),
	                    style: pagingStyles, className: 'footer-container' }, this.props.pagingContent)));
	            }

	            // If we have a fixed header, split into two tables.
	            if (this.props.useFixedHeader) {
	                if (this.props.useGriddleStyles) {
	                    tableStyle.tableLayout = "fixed";
	                }

	                return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { id: this.gridId + "fixed-header", className: 'fixed-header-wrapper' }, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading)), _react2['default'].createElement('div', { ref: 'scrollable', id: this.gridId + "griddle-table-wrapper", className: 'griddle-table-wrapper', onScroll: this.gridScroll.bind(this), style: gridStyle }, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, nodes, loadingContent)), pagingContent);
	            }

	            return _react2['default'].createElement('div', null, _react2['default'].createElement('div', { ref: 'scrollable', id: this.gridId + "griddle-table-wrapper", className: 'griddle-table-wrapper', onScroll: this.gridScroll.bind(this), style: gridStyle }, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading, nodes, loadingContent)), pagingContent);
	        }
	    }]);

	    return GridTable;
	})(_react2['default'].Component);

	GridTable.propTypes = {
	    columnSettings: _react2['default'].PropTypes.object.isRequired,
	    rowSettings: _react2['default'].PropTypes.object.isRequired
	};

	GridTable.defaultProps = {
	    "data": [],
	    "columnSettings": null,
	    "rowSettings": null,
	    "sortSettings": null,
	    "multipleSelectionSettings": null,
	    "className": "",
	    "enableInfiniteScroll": false,
	    "nextPage": null,
	    "hasMorePages": false,
	    "useFixedHeader": false,
	    "useFixedLayout": true,
	    "paddingHeight": null,
	    "rowHeight": null,
	    "filterByColumn": null,
	    "infiniteScrollLoadTreshold": null,
	    "bodyHeight": null,
	    "useGriddleStyles": true,
	    "useGriddleIcons": true,
	    "isSubGriddle": false,
	    "parentRowCollapsedClassName": "parent-row",
	    "parentRowExpandedClassName": "parent-row expanded",
	    "parentRowCollapsedComponent": "▶",
	    "parentRowExpandedComponent": "▼",
	    "externalLoadingComponent": null,
	    "externalIsLoading": false,
	    "onRowClick": null,
	    "rowsExpandedByDefault": true
	};

	exports['default'] = GridTable;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	 */
	'use strict';

	var _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	        var source = arguments[i];for (var key in source) {
	            if (Object.prototype.hasOwnProperty.call(source, key)) {
	                target[key] = source[key];
	            }
	        }
	    }return target;
	};

	var React = __webpack_require__(2);
	var _ = __webpack_require__(5);
	var ColumnProperties = __webpack_require__(6);

	var DefaultHeaderComponent = React.createClass({
	    displayName: 'DefaultHeaderComponent',

	    render: function render() {
	        return React.createElement('span', null, this.props.displayName);
	    }
	});

	var GridTitle = React.createClass({
	    displayName: 'GridTitle',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "columnSettings": null,
	            "filterByColumn": function filterByColumn() {},
	            "rowSettings": null,
	            "sortSettings": null,
	            "multipleSelectionSettings": null,
	            "headerStyle": null,
	            "useGriddleStyles": true,
	            "useGriddleIcons": true,
	            "headerStyles": {}
	        };
	    },
	    componentWillMount: function componentWillMount() {
	        this.verifyProps();
	    },
	    sort: function sort(column) {
	        var that = this;
	        return function (event) {
	            that.props.sortSettings.changeSort(column);
	        };
	    },
	    toggleSelectAll: function toggleSelectAll(event) {
	        this.props.multipleSelectionSettings.toggleSelectAll();
	    },
	    handleSelectionChange: function handleSelectionChange(event) {
	        //hack to get around warning message that's not helpful in this case
	        return;
	    },
	    verifyProps: function verifyProps() {
	        if (this.props.columnSettings === null) {
	            console.error("gridTitle: The columnSettings prop is null and it shouldn't be");
	        }

	        if (this.props.sortSettings === null) {
	            console.error("gridTitle: The sortSettings prop is null and it shouldn't be");
	        }
	    },
	    render: function render() {
	        this.verifyProps();
	        var that = this;
	        var titleStyles = null;

	        var nodes = this.props.columnSettings.getColumns().map(function (col, index) {
	            var columnSort = "";
	            var columnIsSortable = that.props.columnSettings.getMetadataColumnProperty(col, "sortable", true);
	            var sortComponent = columnIsSortable ? that.props.sortSettings.sortDefaultComponent : null;

	            if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortAscending) {
	                columnSort = that.props.sortSettings.sortAscendingClassName;
	                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortAscendingComponent;
	            } else if (that.props.sortSettings.sortColumn == col && that.props.sortSettings.sortAscending === false) {
	                columnSort += that.props.sortSettings.sortDescendingClassName;
	                sortComponent = that.props.useGriddleIcons && that.props.sortSettings.sortDescendingComponent;
	            }

	            var meta = that.props.columnSettings.getColumnMetadataByName(col);
	            var displayName = that.props.columnSettings.getMetadataColumnProperty(col, "displayName", col);
	            var HeaderComponent = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponent", DefaultHeaderComponent);
	            var headerProps = that.props.columnSettings.getMetadataColumnProperty(col, "customHeaderComponentProps", {});

	            columnSort = meta == null ? columnSort : (columnSort && columnSort + " " || columnSort) + that.props.columnSettings.getMetadataColumnProperty(col, "cssClassName", "");

	            if (that.props.useGriddleStyles) {
	                titleStyles = {
	                    backgroundColor: "#EDEDEF",
	                    border: "0",
	                    borderBottom: "1px solid #DDD",
	                    color: "#222",
	                    padding: "5px",
	                    cursor: columnIsSortable ? "pointer" : "default"
	                };
	            }

	            return React.createElement('th', { onClick: columnIsSortable ? that.sort(col) : null, 'data-title': col, className: columnSort, key: displayName, style: titleStyles }, React.createElement(HeaderComponent, _extends({ columnName: col, displayName: displayName, filterByColumn: that.props.filterByColumn }, headerProps)), sortComponent);
	        });

	        if (nodes && this.props.multipleSelectionSettings.isMultipleSelection) {
	            nodes.unshift(React.createElement('th', { key: 'selection', onClick: this.toggleSelectAll, style: titleStyles }, React.createElement('input', { type: 'checkbox', checked: this.props.multipleSelectionSettings.getIsSelectAllChecked(), onChange: this.handleSelectionChange })));
	        }

	        //Get the row from the row settings.
	        var className = that.props.rowSettings && that.props.rowSettings.getHeaderRowMetadataClass() || null;

	        return React.createElement('thead', null, React.createElement('tr', {
	            className: className,
	            style: this.props.headerStyles }, nodes));
	    }
	});

	module.exports = GridTitle;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ = __webpack_require__(5);

	var ColumnProperties = (function () {
	  function ColumnProperties() {
	    var allColumns = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var filteredColumns = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	    var childrenColumnName = arguments.length <= 2 || arguments[2] === undefined ? "children" : arguments[2];
	    var columnMetadata = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
	    var metadataColumns = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];

	    _classCallCheck(this, ColumnProperties);

	    this.allColumns = allColumns;
	    this.filteredColumns = filteredColumns;
	    this.childrenColumnName = childrenColumnName;
	    this.columnMetadata = columnMetadata;
	    this.metadataColumns = metadataColumns;
	  }

	  _createClass(ColumnProperties, [{
	    key: "getMetadataColumns",
	    value: function getMetadataColumns() {
	      var meta = _.map(_.where(this.columnMetadata, { visible: false }), function (item) {
	        return item.columnName;
	      });
	      if (meta.indexOf(this.childrenColumnName) < 0) {
	        meta.push(this.childrenColumnName);
	      }
	      return meta.concat(this.metadataColumns);
	    }
	  }, {
	    key: "getVisibleColumnCount",
	    value: function getVisibleColumnCount() {
	      return this.getColumns().length;
	    }
	  }, {
	    key: "getColumnMetadataByName",
	    value: function getColumnMetadataByName(name) {
	      return _.findWhere(this.columnMetadata, { columnName: name });
	    }
	  }, {
	    key: "hasColumnMetadata",
	    value: function hasColumnMetadata() {
	      return this.columnMetadata !== null && this.columnMetadata.length > 0;
	    }
	  }, {
	    key: "getMetadataColumnProperty",
	    value: function getMetadataColumnProperty(columnName, propertyName, defaultValue) {
	      var meta = this.getColumnMetadataByName(columnName);

	      //send back the default value if meta isn't there
	      if (typeof meta === "undefined" || meta === null) return defaultValue;

	      return meta.hasOwnProperty(propertyName) ? meta[propertyName] : defaultValue;
	    }
	  }, {
	    key: "orderColumns",
	    value: function orderColumns(cols) {
	      var _this = this;

	      var ORDER_MAX = 100;

	      var orderedColumns = _.sortBy(cols, function (item) {
	        var metaItem = _.findWhere(_this.columnMetadata, { columnName: item });

	        if (typeof metaItem === 'undefined' || metaItem === null || isNaN(metaItem.order)) {
	          return ORDER_MAX;
	        }

	        return metaItem.order;
	      });

	      return orderedColumns;
	    }
	  }, {
	    key: "getColumns",
	    value: function getColumns() {
	      //if we didn't set default or filter
	      var filteredColumns = this.filteredColumns.length === 0 ? this.allColumns : this.filteredColumns;

	      filteredColumns = _.difference(filteredColumns, this.metadataColumns);

	      filteredColumns = this.orderColumns(filteredColumns);

	      return filteredColumns;
	    }
	  }]);

	  return ColumnProperties;
	})();

	module.exports = ColumnProperties;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * lodash 4.2.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	var baseFlatten = __webpack_require__(8);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Recursively flattens `array`.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Array
	 * @param {Array} array The array to flatten.
	 * @returns {Array} Returns the new flattened array.
	 * @example
	 *
	 * _.flattenDeep([1, [2, [3, [4]], 5]]);
	 * // => [1, 2, 3, 4, 5]
	 */
	function flattenDeep(array) {
	  var length = array ? array.length : 0;
	  return length ? baseFlatten(array, INFINITY) : [];
	}

	module.exports = flattenDeep;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value);
	}

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = baseFlatten;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var GridFilter = React.createClass({
	    displayName: "GridFilter",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "placeholderText": ""
	        };
	    },
	    handleChange: function handleChange(event) {
	        this.props.changeFilter(event.target.value);
	    },
	    render: function render() {
	        return React.createElement("div", { className: "filter-container" }, React.createElement("input", { type: "text", name: "filter", placeholder: this.props.placeholderText, className: "form-control", onChange: this.handleChange, value: this.props.value }));
	    }
	});

	module.exports = GridFilter;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var _ = __webpack_require__(5);

	//needs props maxPage, currentPage, nextFunction, prevFunction
	var GridPagination = React.createClass({
	    displayName: 'GridPagination',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "maxPage": 0,
	            "nextText": "",
	            "previousText": "",
	            "currentPage": 0,
	            "useGriddleStyles": true,
	            "nextClassName": "griddle-next",
	            "previousClassName": "griddle-previous",
	            "nextIconComponent": null,
	            "previousIconComponent": null
	        };
	    },
	    pageChange: function pageChange(event) {
	        this.props.setPage(parseInt(event.target.value, 10) - 1);
	    },
	    render: function render() {
	        var previous = "";
	        var next = "";

	        if (this.props.currentPage > 0) {
	            previous = React.createElement('button', { type: 'button', onClick: this.props.previous, style: this.props.useGriddleStyles ? { "color": "#222", border: "none", background: "none", margin: "0 0 0 10px" } : null }, this.props.previousIconComponent, this.props.previousText);
	        }

	        if (this.props.currentPage !== this.props.maxPage - 1) {
	            next = React.createElement('button', { type: 'button', onClick: this.props.next, style: this.props.useGriddleStyles ? { "color": "#222", border: "none", background: "none", margin: "0 10px 0 0" } : null }, this.props.nextText, this.props.nextIconComponent);
	        }

	        var leftStyle = null;
	        var middleStyle = null;
	        var rightStyle = null;

	        if (this.props.useGriddleStyles === true) {
	            var baseStyle = {
	                "float": "left",
	                minHeight: "1px",
	                marginTop: "5px"
	            };

	            rightStyle = _.extend({ textAlign: "right", width: "34%" }, baseStyle);
	            middleStyle = _.extend({ textAlign: "center", width: "33%" }, baseStyle);
	            leftStyle = _.extend({ width: "33%" }, baseStyle);
	        }

	        var options = [];

	        for (var i = 1; i <= this.props.maxPage; i++) {
	            options.push(React.createElement('option', { value: i, key: i }, i));
	        }

	        return React.createElement('div', { style: this.props.useGriddleStyles ? { minHeight: "35px" } : null }, React.createElement('div', { className: this.props.previousClassName, style: leftStyle }, previous), React.createElement('div', { className: 'griddle-page', style: middleStyle }, React.createElement('select', { value: this.props.currentPage + 1, onChange: this.pageChange }, options), ' / ', this.props.maxPage), React.createElement('div', { className: this.props.nextClassName, style: rightStyle }, next));
	    }
	});

	module.exports = GridPagination;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	'use strict';

	var React = __webpack_require__(2);
	var _ = __webpack_require__(5);

	var GridSettings = React.createClass({
	    displayName: 'GridSettings',

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "columns": [],
	            "columnMetadata": [],
	            "selectedColumns": [],
	            "settingsText": "",
	            "maxRowsText": "",
	            "resultsPerPage": 0,
	            "enableToggleCustom": false,
	            "useCustomComponent": false,
	            "useGriddleStyles": true,
	            "toggleCustomComponent": function toggleCustomComponent() {}
	        };
	    },
	    setPageSize: function setPageSize(event) {
	        var value = parseInt(event.target.value, 10);
	        this.props.setPageSize(value);
	    },
	    handleChange: function handleChange(event) {
	        var columnName = event.target.dataset ? event.target.dataset.name : event.target.getAttribute('data-name');
	        if (event.target.checked === true && _.contains(this.props.selectedColumns, columnName) === false) {
	            this.props.selectedColumns.push(columnName);
	            this.props.setColumns(this.props.selectedColumns);
	        } else {
	            /* redraw with the selected columns minus the one just unchecked */
	            this.props.setColumns(_.without(this.props.selectedColumns, columnName));
	        }
	    },
	    render: function render() {
	        var that = this;

	        var nodes = [];
	        //don't show column selector if we're on a custom component
	        if (that.props.useCustomComponent === false) {
	            nodes = this.props.columns.map(function (col, index) {
	                var checked = _.contains(that.props.selectedColumns, col);
	                //check column metadata -- if this one is locked make it disabled and don't put an onChange event
	                var meta = _.findWhere(that.props.columnMetadata, { columnName: col });
	                var displayName = col;

	                if (typeof meta !== "undefined" && typeof meta.displayName !== "undefined" && meta.displayName != null) {
	                    displayName = meta.displayName;
	                }

	                if (typeof meta !== "undefined" && meta != null && meta.locked) {
	                    return React.createElement('div', { className: 'column checkbox' }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', disabled: true, name: 'check', checked: checked, 'data-name': col }), displayName));
	                } else if (typeof meta !== "undefined" && meta != null && typeof meta.visible !== "undefined" && meta.visible === false) {
	                    return null;
	                }
	                return React.createElement('div', { className: 'griddle-column-selection checkbox', key: col, style: that.props.useGriddleStyles ? { "float": "left", width: "20%" } : null }, React.createElement('label', null, React.createElement('input', { type: 'checkbox', name: 'check', onChange: that.handleChange, checked: checked, 'data-name': col }), displayName));
	            });
	        }

	        var toggleCustom = that.props.enableToggleCustom ? React.createElement('div', { className: 'form-group' }, React.createElement('label', { htmlFor: 'maxRows' }, React.createElement('input', { type: 'checkbox', checked: this.props.useCustomComponent, onChange: this.props.toggleCustomComponent }), ' ', this.props.enableCustomFormatText)) : "";

	        var setPageSize = this.props.showSetPageSize ? React.createElement('div', null, React.createElement('label', { htmlFor: 'maxRows' }, this.props.maxRowsText, ':', React.createElement('select', { onChange: this.setPageSize, value: this.props.resultsPerPage }, React.createElement('option', { value: '5' }, '5'), React.createElement('option', { value: '10' }, '10'), React.createElement('option', { value: '25' }, '25'), React.createElement('option', { value: '50' }, '50'), React.createElement('option', { value: '100' }, '100')))) : "";

	        return React.createElement('div', { className: 'griddle-settings', style: this.props.useGriddleStyles ? { backgroundColor: "#FFF", border: "1px solid #DDD", color: "#222", padding: "10px", marginBottom: "10px" } : null }, React.createElement('h6', null, this.props.settingsText), React.createElement('div', { className: 'griddle-columns', style: this.props.useGriddleStyles ? { clear: "both", display: "table", width: "100%", borderBottom: "1px solid #EDEDED", marginBottom: "10px" } : null }, nodes), setPageSize, toggleCustom);
	    }
	});

	module.exports = GridSettings;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var GridNoData = React.createClass({
	    displayName: "GridNoData",

	    getDefaultProps: function getDefaultProps() {
	        return {
	            "noDataMessage": "No Data"
	        };
	    },
	    render: function render() {
	        var that = this;

	        return React.createElement("div", null, this.props.noDataMessage);
	    }
	});

	module.exports = GridNoData;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () {
	    function defineProperties(target, props) {
	        for (var i = 0; i < props.length; i++) {
	            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	        }
	    }return function (Constructor, protoProps, staticProps) {
	        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	    };
	})();

	var _get = function get(_x, _x2, _x3) {
	    var _again = true;_function: while (_again) {
	        var object = _x,
	            property = _x2,
	            receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	            var parent = Object.getPrototypeOf(object);if (parent === null) {
	                return undefined;
	            } else {
	                _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
	            }
	        } else if ('value' in desc) {
	            return desc.value;
	        } else {
	            var getter = desc.get;if (getter === undefined) {
	                return undefined;
	            }return getter.call(receiver);
	        }
	    }
	};

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	        throw new TypeError('Cannot call a class as a function');
	    }
	}

	function _inherits(subClass, superClass) {
	    if (typeof superClass !== 'function' && superClass !== null) {
	        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _underscore = __webpack_require__(5);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _deepJs = __webpack_require__(14);

	var _deepJs2 = _interopRequireDefault(_deepJs);

	var GridRow = (function (_React$Component) {
	    _inherits(GridRow, _React$Component);

	    function GridRow(props) {
	        _classCallCheck(this, GridRow);

	        _get(Object.getPrototypeOf(GridRow.prototype), 'constructor', this).call(this, props);
	    }

	    _createClass(GridRow, [{
	        key: 'handleClick',
	        value: function handleClick(e) {
	            if (this.props.onRowClick !== null && _underscore2['default'].isFunction(this.props.onRowClick)) {
	                this.props.onRowClick(this, e);
	            }
	        }
	    }, {
	        key: 'handleExpandRows',
	        value: function handleExpandRows(e) {
	            e.stopPropagation();
	            if (this.props.hasChildren) {
	                this.props.toggleChildren(this.props.key);
	            }
	        }
	    }, {
	        key: 'handleSelectionChange',
	        value: function handleSelectionChange(e) {
	            //hack to get around warning that's not super useful in this case
	            return;
	        }
	    }, {
	        key: 'handleSelectClick',
	        value: function handleSelectClick(e) {
	            if (this.props.multipleSelectionSettings.isMultipleSelection) {
	                if (e.target.type === "checkbox") {
	                    this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.checked);
	                } else {
	                    this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked);
	                }
	            }
	        }
	    }, {
	        key: '_getColumnStyle',
	        value: function _getColumnStyle() {
	            return {
	                margin: "0",
	                padding: this.props.paddingHeight + "px 5px " + this.props.paddingHeight + "px 5px",
	                height: this.props.rowHeight ? this.props.rowHeight - this.props.paddingHeight * 2 + "px" : null,
	                backgroundColor: "#FFF",
	                borderTopColor: "#DDD",
	                color: "#222"
	            };
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextRowProps, nextRowState) {
	            if (this.props.shouldGriddleRowUpdate) {
	                return this.props.shouldGriddleRowUpdate(this.props.data, nextRowProps.data);
	            }
	            return true;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this = this;

	            var columns = this.props.columnSettings.getColumns();

	            // make sure that all the columns we need have default empty values
	            // otherwise they will get clipped
	            var defaults = _underscore2['default'].object(columns, []);

	            // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
	            var dataView = _underscore2['default'].extend(this.props.data);

	            _underscore2['default'].defaults(dataView, defaults);
	            var data = _underscore2['default'].pairs(_deepJs2['default'].pick(dataView, _underscore2['default'].without(columns, 'children')));

	            var nodes = data.map(function (col, index) {

	                var columnStyle = _this.props.useGriddleStyles ? _this._getColumnStyle() : null;

	                var returnValue = null;
	                var meta = _this.props.columnSettings.getColumnMetadataByName(col[0]);

	                // Set styles for expander and row offset
	                var expanderStyles = _this.props.useGriddleStyles ? { fontSize: "10px" } : null;
	                if (index === 0 && _this.props.useGriddleStyles) {
	                    if (_this.props.hasChildren) {
	                        _underscore2['default'].extend(expanderStyles, { marginRight: "5px" /*, width: "8px", display: "inline-block"*/ });
	                    }
	                    _underscore2['default'].extend(columnStyle, { paddingLeft: 5 + 25 * _this.props.nestingLevel + "px" });
	                }

	                //todo: Make this not as ridiculous looking
	                // add icon for expanding/collapsing
	                var firstColAppend = index === 0 && _this.props.hasChildren && _this.props.showChildren === false && _this.props.useGriddleIcons ? _react2['default'].createElement('span', { onClick: _this.handleExpandRows.bind(_this), style: expanderStyles }, _this.props.parentRowCollapsedComponent) : index === 0 && _this.props.hasChildren && _this.props.showChildren && _this.props.useGriddleIcons ? _react2['default'].createElement('span', { onClick: _this.handleExpandRows.bind(_this), style: expanderStyles }, _this.props.parentRowExpandedComponent) : _react2['default'].createElement('span', { style: expanderStyles });

	                if (_this.props.columnSettings.hasColumnMetadata() && typeof meta !== "undefined") {
	                    var colData = typeof meta.customComponent === 'undefined' || meta.customComponent === null ? col[1] : _react2['default'].createElement(meta.customComponent, { data: col[1], rowData: dataView, metadata: meta });
	                    returnValue = meta == null ? returnValue : _react2['default'].createElement('td', { onClick: _this.handleClick.bind(_this), className: meta.cssClassName, key: index,
	                        style: columnStyle }, colData);
	                }

	                return returnValue || _react2['default'].createElement('td', { onClick: _this.handleClick.bind(_this), key: index,
	                    style: columnStyle }, firstColAppend, col[1]);
	            });

	            var columnStyle = this.props.useGriddleStyles ? this._getColumnStyle() : null;

	            if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
	                var selectedRowIds = this.props.multipleSelectionSettings.getSelectedRowIds();

	                nodes.unshift(_react2['default'].createElement('td', { key: 'selection', style: columnStyle }, _react2['default'].createElement('input', {
	                    type: 'checkbox',
	                    checked: this.props.multipleSelectionSettings.getIsRowChecked(dataView),
	                    onChange: this.handleSelectionChange,
	                    ref: 'selected' })));
	            }

	            //Get the row from the row settings.
	            var className = this.props.rowSettings && this.props.rowSettings.getBodyRowMetadataClass(this.props.data) || "standard-row";

	            if (this.props.isChildRow) {
	                className = "child-row" + (!this.props.useGriddleStyles ? "-" + this.props.nestingLevel : "");
	            } else if (this.props.hasChildren) {
	                className = this.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
	            }

	            return _react2['default'].createElement('tr', { onClick: this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick.bind(this) : null,
	                className: className
	            }, nodes);
	        }
	    }]);

	    return GridRow;
	})(_react2['default'].Component);

	GridRow.propTypes = {
	    columnSettings: _react2['default'].PropTypes.object.isRequired
	};

	GridRow.defaultProps = {
	    "key": "",
	    "isChildRow": false,
	    "showChildren": false,
	    "data": {},
	    "columnSettings": null,
	    "rowSettings": null,
	    "hasChildren": false,
	    "useGriddleStyles": true,
	    "useGriddleIcons": true,
	    "isSubGriddle": false,
	    "paddingHeight": null,
	    "rowHeight": null,
	    "parentRowCollapsedClassName": "parent-row",
	    "parentRowExpandedClassName": "parent-row expanded",
	    "parentRowCollapsedComponent": "▶",
	    "parentRowExpandedComponent": "▼",
	    "onRowClick": null,
	    "multipleSelectionSettings": null,
	    "nestingLevel": 0
	};

	exports['default'] = GridRow;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _ = __webpack_require__(5);

	// Credits: https://github.com/documentcloud/underscore-contrib
	// Sub module: underscore.object.selectors
	// License: MIT (https://github.com/documentcloud/underscore-contrib/blob/master/LICENSE)
	// https://github.com/documentcloud/underscore-contrib/blob/master/underscore.object.selectors.js

	// Will take a path like 'element[0][1].subElement["Hey!.What?"]["[hey]"]'
	// and return ["element", "0", "1", "subElement", "Hey!.What?", "[hey]"]
	function keysFromPath(path) {
	  // from http://codereview.stackexchange.com/a/63010/8176
	  /**
	   * Repeatedly capture either:
	   * - a bracketed expression, discarding optional matching quotes inside, or
	   * - an unbracketed expression, delimited by a dot or a bracket.
	   */
	  var re = /\[("|')(.+)\1\]|([^.\[\]]+)/g;

	  var elements = [];
	  var result;
	  while ((result = re.exec(path)) !== null) {
	    elements.push(result[2] || result[3]);
	  }
	  return elements;
	}

	// Gets the value at any depth in a nested object based on the
	// path described by the keys given. Keys may be given as an array
	// or as a dot-separated string.
	function getPath(obj, ks) {
	  ks = typeof ks == "string" ? keysFromPath(ks) : ks;

	  var i = -1,
	      length = ks.length;

	  // If the obj is null or undefined we have to break as
	  // a TypeError will result trying to access any property
	  // Otherwise keep incrementally access the next property in
	  // ks until complete
	  while (++i < length && obj != null) {
	    obj = obj[ks[i]];
	  }
	  return i === length ? obj : void 0;
	}

	// Based on the origin underscore _.pick function
	// Credit: https://github.com/jashkenas/underscore/blob/master/underscore.js
	function powerPick(object, keys) {
	  var result = {},
	      obj = object,
	      iteratee;
	  iteratee = function (key, obj) {
	    return key in obj;
	  };

	  obj = Object(obj);

	  for (var i = 0, length = keys.length; i < length; i++) {
	    var key = keys[i];
	    if (iteratee(key, obj)) result[key] = getPath(obj, key);
	  }

	  return result;
	}

	// Gets all the keys for a flattened object structure.
	// Doesn't flatten arrays.
	// Input:
	// {
	//  a: {
	//    x: 1,
	//    y: 2
	//  },
	//  b: [3, 4],
	//  c: 5
	// }
	// Output:
	// [
	//  "a.x",
	//  "a.y",
	//  "b",
	//  "c"
	// ]
	function getKeys(obj, prefix) {
	  var keys = [];

	  _.each(obj, function (value, key) {
	    var fullKey = prefix ? prefix + "." + key : key;
	    if (_.isObject(value) && !_.isArray(value) && !_.isFunction(value)) {
	      keys = keys.concat(getKeys(value, fullKey));
	    } else {
	      keys.push(fullKey);
	    }
	  });

	  return keys;
	}

	module.exports = {
	  pick: powerPick,
	  getAt: getPath,
	  keys: getKeys
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var CustomRowComponentContainer = React.createClass({
	  displayName: "CustomRowComponentContainer",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      "data": [],
	      "metadataColumns": [],
	      "className": "",
	      "customComponent": {},
	      "globalData": {}
	    };
	  },
	  render: function render() {
	    var that = this;

	    if (typeof that.props.customComponent !== 'function') {
	      console.log("Couldn't find valid template.");
	      return React.createElement("div", { className: this.props.className });
	    }

	    var nodes = this.props.data.map(function (row, index) {
	      return React.createElement(that.props.customComponent, { data: row, metadataColumns: that.props.metadataColumns, key: index, globalData: that.props.globalData });
	    });

	    var footer = this.props.showPager && this.props.pagingContent;
	    return React.createElement("div", { className: this.props.className, style: this.props.style }, nodes);
	  }
	});

	module.exports = CustomRowComponentContainer;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   Griddle - Simple Grid Component for React
	   https://github.com/DynamicTyped/Griddle
	   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var CustomPaginationContainer = React.createClass({
	  displayName: "CustomPaginationContainer",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      "maxPage": 0,
	      "nextText": "",
	      "previousText": "",
	      "currentPage": 0,
	      "customPagerComponent": {}
	    };
	  },
	  render: function render() {
	    var that = this;

	    if (typeof that.props.customPagerComponent !== 'function') {
	      console.log("Couldn't find valid template.");
	      return React.createElement("div", null);
	    }

	    return React.createElement(that.props.customPagerComponent, { maxPage: this.props.maxPage, nextText: this.props.nextText, previousText: this.props.previousText, currentPage: this.props.currentPage, setPage: this.props.setPage, previous: this.props.previous, next: this.props.next });
	  }
	});

	module.exports = CustomPaginationContainer;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
	   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
	*/
	"use strict";

	var React = __webpack_require__(2);

	var CustomFilterContainer = React.createClass({
	  displayName: "CustomFilterContainer",

	  getDefaultProps: function getDefaultProps() {
	    return {
	      "placeholderText": ""
	    };
	  },
	  render: function render() {
	    var that = this;

	    if (typeof that.props.customFilterComponent !== 'function') {
	      console.log("Couldn't find valid template.");
	      return React.createElement("div", null);
	    }

	    return React.createElement(that.props.customFilterComponent, {
	      changeFilter: this.props.changeFilter,
	      results: this.props.results,
	      currentResults: this.props.currentResults,
	      placeholderText: this.props.placeholderText });
	  }
	});

	module.exports = CustomFilterContainer;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _ = __webpack_require__(5);

	var RowProperties = (function () {
	  function RowProperties() {
	    var rowMetadata = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var rowComponent = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	    var isCustom = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	    _classCallCheck(this, RowProperties);

	    this.rowMetadata = rowMetadata;
	    this.rowComponent = rowComponent;
	    this.isCustom = isCustom;
	  }

	  _createClass(RowProperties, [{
	    key: 'getRowKey',
	    value: function getRowKey(row) {
	      var uniqueId;

	      if (this.hasRowMetadataKey()) {
	        uniqueId = row[this.rowMetadata.key];
	      } else {
	        uniqueId = _.uniqueId("grid_row");
	      }

	      //todo: add error handling

	      return uniqueId;
	    }
	  }, {
	    key: 'hasRowMetadataKey',
	    value: function hasRowMetadataKey() {
	      return this.hasRowMetadata() && this.rowMetadata.key !== null && this.rowMetadata.key !== undefined;
	    }
	  }, {
	    key: 'getBodyRowMetadataClass',
	    value: function getBodyRowMetadataClass(rowData) {
	      if (this.hasRowMetadata() && this.rowMetadata.bodyCssClassName !== null && this.rowMetadata.bodyCssClassName !== undefined) {
	        if (typeof this.rowMetadata.bodyCssClassName === 'function') {
	          return this.rowMetadata.bodyCssClassName(rowData);
	        } else {
	          return this.rowMetadata.bodyCssClassName;
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'getHeaderRowMetadataClass',
	    value: function getHeaderRowMetadataClass() {
	      return this.hasRowMetadata() && this.rowMetadata.headerCssClassName !== null && this.rowMetadata.headerCssClassName !== undefined ? this.rowMetadata.headerCssClassName : null;
	    }
	  }, {
	    key: 'hasRowMetadata',
	    value: function hasRowMetadata() {
	      return this.rowMetadata !== null;
	    }
	  }]);

	  return RowProperties;
	})();

	module.exports = RowProperties;


/***/ }
/******/ ])
});
;
