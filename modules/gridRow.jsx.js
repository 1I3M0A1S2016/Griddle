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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _deepJs = require('./deep.js');

var _deepJs2 = _interopRequireDefault(_deepJs);

var GridRow = (function (_React$Component) {
    _inherits(GridRow, _React$Component);

    function GridRow(props) {
        _classCallCheck(this, GridRow);

        _get(Object.getPrototypeOf(GridRow.prototype), 'constructor', this).call(this, props);
    }

    _createClass(GridRow, [{
        key: 'handleMouseUp',
        value: function handleMouseUp(e) {
            if (this.props.onRowMouseUp  && _underscore2['default'].isFunction(this.props.onRowMouseUp)) {
                this.props.onRowMouseUp(this, e);
            }
        }
    },{
        key: 'handleMouseOut',
        value: function handleMouseOut(e) {
            if (this.props.onRowMouseOut  && _underscore2['default'].isFunction(this.props.onRowMouseOut)) {
                this.props.onRowMouseOut(this, e);
            }
        }
    },{
        key: 'handleMouseMove',
        value: function handleMouseMove(e) {
            if (this.props.onRowMouseMove  && _underscore2['default'].isFunction(this.props.onRowMouseMove)) {
                this.props.onRowMouseMove(this, e);
            }
        }
    },{
        key: 'handleMouseDown',
        value: function handleMouseDown(e) {
            if (this.props.onRowMouseDown  && _underscore2['default'].isFunction(this.props.onRowMouseDown)) {
                this.props.onRowMouseDown(this, e);
            }
        }
    }, {
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
	    // always return true for first row in the grid ; first might be the fake row in case we have infinite scrolling, or the first data row in the results
            // no matter which one, we need it always updated in case we change the columns width outside and we need the first row to adjust the layout for the entire table (with layout = fixed)
            if (this.props.shouldGriddleRowUpdate && nextRowProps.rowIndex > 0) {
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
                        // We are using inline widths of the columns only for tables with fixed layout. So, setting the column width only on the first row is enough
                        // The rows that follow will adjust to the first one's layout
                  					if(meta.width !== undefined  && _this.props.rowIndex === 0){
                       columnStyle = columnStyle || {};
                       columnStyle.width = (typeof(meta.width) === "number"  ? meta.width + "px" : meta.width); 
					               }

                 
                     var colData = typeof meta.customComponent === 'undefined' || meta.customComponent === null ? col[1] : _react2['default'].createElement(meta.customComponent, { data: col[1], rowData: dataView, metadata: meta });
                    returnValue = meta == null ? returnValue : _react2['default'].createElement('td', { onMouseUp: _this.handleMouseUp.bind(_this), onMouseOut: _this.handleMouseOut.bind(_this), onMouseMove: _this.handleMouseMove.bind(_this), onMouseDown: _this.handleMouseDown.bind(_this), onClick: _this.handleClick.bind(_this), className: meta.cssClassName, key: index,
                        style: columnStyle }, colData);
                }

                return returnValue || _react2['default'].createElement('td', { onMouseUp: _this.handleMouseUp.bind(_this), onMouseOut: _this.handleMouseOut.bind(_this), onMouseMove: _this.handleMouseMove.bind(_this), onMouseDown: _this.handleMouseDown.bind(_this), onClick: _this.handleClick.bind(_this), className: meta && meta.cssClassName || "", key: index,
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
                className += (" child-row" + (!this.props.useGriddleStyles ? "-" + this.props.nestingLevel : ""));
            } else if (this.props.hasChildren) {
                className += (this.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName);
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
