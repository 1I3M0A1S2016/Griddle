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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _gridTitleJsx = require('./gridTitle.jsx');

var _gridTitleJsx2 = _interopRequireDefault(_gridTitleJsx);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _lodashFlattendeep = require('lodash.flattendeep');

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
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // After the subsequent renders, see if we need to load additional pages.
            this.gridScroll();
        }
    }, {
        key: 'gridScroll',
        value: function gridScroll() {
            if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
                // If the scroll height is greater than the current amount of rows displayed, update the page.
                var scrollable = this.refs.scrollable;
                var scrollTop = scrollable.scrollTop;
                var scrollHeight = scrollable.scrollHeight;
                var clientHeight = scrollable.clientHeight;

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

                // If we have a row height specified, only render what's going to be visible.
                if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && this.refs.scrollable !== undefined) {
                    var adjustedHeight = this.getAdjustedRowHeight();
                    var visibleRecordCount = Math.ceil(this.state.clientHeight / adjustedHeight);

                    // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
                    var displayStart = Math.max(0, Math.floor(this.state.scrollTop / adjustedHeight) - visibleRecordCount * 0.25);
                    var displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

                    // Split the amount of nodes.
                    nodeData = nodeData.slice(displayStart, displayEnd + 1);

                    // Set the above and below nodes.
                    var aboveSpacerRowStyle = { height: displayStart * adjustedHeight + "px" };
                    aboveSpacerRow = _react2['default'].createElement('tr', { key: 'above-' + aboveSpacerRowStyle.height, style: aboveSpacerRowStyle });
                    var belowSpacerRowStyle = { height: (this.props.data.length - displayEnd) * adjustedHeight + "px" };
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
                    var colSpan = this.props.columnSettings.getVisibleColumnCount();
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
                    "overflowY": "scroll",
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

                return _react2['default'].createElement('div', null, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading), _react2['default'].createElement('div', { ref: 'scrollable', onScroll: this.gridScroll.bind(this), style: gridStyle }, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, nodes, loadingContent, pagingContent)));
            }

            return _react2['default'].createElement('div', { ref: 'scrollable', onScroll: this.gridScroll.bind(this), style: gridStyle }, _react2['default'].createElement('table', { className: this.props.className, style: this.props.useGriddleStyles && tableStyle || null }, tableHeading, nodes, loadingContent, pagingContent));
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
