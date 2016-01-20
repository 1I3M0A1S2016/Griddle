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

var _columnPropertiesJs = require('./columnProperties.js');

var _columnPropertiesJs2 = _interopRequireDefault(_columnPropertiesJs);

var _nestedGridRowContainerJsx = require('./nestedGridRowContainer.jsx');

var _nestedGridRowContainerJsx2 = _interopRequireDefault(_nestedGridRowContainerJsx);

var GridRowContainer = (function (_React$Component) {
    _inherits(GridRowContainer, _React$Component);

    function GridRowContainer(props) {
        _classCallCheck(this, GridRowContainer);

        _get(Object.getPrototypeOf(GridRowContainer.prototype), 'constructor', this).call(this, props);

        this.state = {
            "data": {},
            "showChildren": false
        };
    }

    _createClass(GridRowContainer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            // this.setShowChildren(false);
        }
    }, {
        key: 'toggleChildren',
        value: function toggleChildren() {
            this.setShowChildren(this.state.showChildren === false);
        }
    }, {
        key: 'setShowChildren',
        value: function setShowChildren(visible) {
            this.setState({
                showChildren: visible
            });
        }
    }, {
        key: 'verifyProps',
        value: function verifyProps() {
            if (this.props.columnSettings === null) {
                console.error("gridRowContainer: The columnSettings prop is null and it shouldn't be");
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.verifyProps();
            var that = this;
            if (typeof this.props.data === "undefined") {
                return _react2['default'].createElement('tbody', null);
            }
            var arr = [];

            var columns = this.props.columnSettings.getColumns();

            arr.push(_react2['default'].createElement(this.props.rowSettings.rowComponent, {
                useGriddleStyles: this.props.useGriddleStyles,
                isSubGriddle: this.props.isSubGriddle,
                data: this.props.rowSettings.isCustom ? _.pick(this.props.data, columns) : this.props.data,
                rowData: this.props.rowSettings.isCustom ? this.props.data : null,
                columnSettings: this.props.columnSettings,
                rowSettings: this.props.rowSettings,
                hasChildren: that.props.hasChildren,
                toggleChildren: that.toggleChildren.bind(this),
                showChildren: that.state.showChildren,
                key: that.props.uniqueId,
                useGriddleIcons: that.props.useGriddleIcons,
                parentRowExpandedClassName: this.props.parentRowExpandedClassName,
                parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
                parentRowExpandedComponent: this.props.parentRowExpandedComponent,
                parentRowCollapsedComponent: this.props.parentRowCollapsedComponent,
                paddingHeight: that.props.paddingHeight,
                rowHeight: that.props.rowHeight,
                onRowClick: that.props.onRowClick,
                multipleSelectionSettings: this.props.multipleSelectionSettings }));

            var children = null;

            if (that.state.showChildren) {
                children = that.props.hasChildren && this.props.data["children"].map(function (row, index) {
                    if (typeof row["children"] !== "undefined") {

                        return _react2['default'].createElement(_nestedGridRowContainerJsx2['default'], {
                            key: that.props.rowSettings.getRowKey(row),
                            rowData: row,
                            rowSettings: that.props.rowSettings,
                            columnSettings: that.props.columnSettings,
                            hasChildren: true
                        });
                    }

                    return _react2['default'].createElement(that.props.rowSettings.rowComponent, { useGriddleStyles: that.props.useGriddleStyles,
                        isSubGriddle: that.props.isSubGriddle,
                        data: row,
                        columnSettings: that.props.columnSettings,
                        isChildRow: true,
                        columnMetadata: that.props.columnSettings.columnMetadata,
                        key: that.props.rowSettings.getRowKey(row) });
                });
            }

            return that.props.hasChildren === false ? _react2['default'].createElement('tbody', null, arr[0]) : _react2['default'].createElement('tbody', null, that.state.showChildren ? arr.concat(children) : arr);
        }
    }]);

    return GridRowContainer;
})(_react2['default'].Component);

GridRowContainer.propTypes = {};

GridRowContainer.defaultProps = {
    "useGriddleStyles": true,
    "useGriddleIcons": true,
    "isSubGriddle": false,
    "columnSettings": null,
    "rowSettings": null,
    "paddingHeight": null,
    "rowHeight": null,
    "parentRowCollapsedClassName": "parent-row",
    "parentRowExpandedClassName": "parent-row expanded",
    "parentRowCollapsedComponent": "▶",
    "parentRowExpandedComponent": "▼",
    "onRowClick": null,
    "multipleSelectionSettings": null
};

exports['default'] = GridRowContainer;
module.exports = exports['default'];
