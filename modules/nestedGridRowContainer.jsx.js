/**
 * Implementation of rendering of nestedRows.
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

var _gridRowContainerJsx = require('./gridRowContainer.jsx');

var _gridRowContainerJsx2 = _interopRequireDefault(_gridRowContainerJsx);

var NestedGridRowContainer = (function (_React$Component) {
    _inherits(NestedGridRowContainer, _React$Component);

    function NestedGridRowContainer(props) {
        _classCallCheck(this, NestedGridRowContainer);

        _get(Object.getPrototypeOf(NestedGridRowContainer.prototype), 'constructor', this).call(this, props);
    }

    _createClass(NestedGridRowContainer, [{
        key: 'render',
        value: function render() {
            var key = this.props.rowSettings.getRowKey(this.props.rowData);
            var tableStyle = {
                width: "100%"
            };

            return _react2['default'].createElement('tr', { key: key, style: { paddingLeft: 5 } }, _react2['default'].createElement('td', { colSpan: this.props.columnSettings.getVisibleColumnCount(),
                className: 'griddle-parent',
                style: this.props.useGriddleStyles ? { border: "none", "padding": "0 0 0 5px" } : null }, _react2['default'].createElement('table', { style: tableStyle }, _react2['default'].createElement(_gridRowContainerJsx2['default'], {
                rowSettings: this.props.rowSettings,
                useGriddleStyles: this.props.useGriddleStyles,
                columnSettings: this.props.columnSettings,
                data: this.props.rowData,
                isSubGriddle: true,
                hasChildren: this.props.hasChildren,
                uniqueId: key + '-container',
                parentRowExpandedClassName: this.props.parentRowExpandedClassName,
                parentRowCollapsedClassName: this.props.parentRowCollapsedClassName,
                parentRowExpandedComponent: this.props.parentRowExpandedComponent,
                parentRowCollapsedComponent: this.props.parentRowCollapsedComponent
            }))));
        }
    }]);

    return NestedGridRowContainer;
})(_react2['default'].Component);

NestedGridRowContainer.propTypes = {
    key: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    rowData: _react2['default'].PropTypes.object.isRequired,
    rowSettings: _react2['default'].PropTypes.object.isRequired,
    columnSettings: _react2['default'].PropTypes.object.isRequired,
    hasChildren: _react2['default'].PropTypes.bool.isRequired,

    // optional
    useGriddleStyles: _react2['default'].PropTypes.bool,
    useGriddleIcons: _react2['default'].PropTypes.bool,
    parentRowCollapsedClassName: _react2['default'].PropTypes.string,
    parentRowExpandedClassName: _react2['default'].PropTypes.string,
    parentRowCollapsedComponent: _react2['default'].PropTypes.string,
    parentRowExpandedComponent: _react2['default'].PropTypes.string
};

NestedGridRowContainer.defaultProps = {
    useGriddleStyles: true,
    useGriddleIcons: true,
    parentRowCollapsedClassName: "parent-row",
    parentRowExpandedClassName: "parent-row expanded",
    parentRowCollapsedComponent: "▶",
    parentRowExpandedComponent: "▼"
};

exports['default'] = NestedGridRowContainer;
module.exports = exports['default'];
