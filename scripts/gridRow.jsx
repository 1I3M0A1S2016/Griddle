/*
 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
 */
import React from 'react';
import _ from 'underscore';
import deep from './deep.js';

class GridRow extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        if (this.props.onRowClick !== null && _.isFunction(this.props.onRowClick)) {
            this.props.onRowClick(this, e);
        }
    }

    handleExpandRows(e) {
        e.stopPropagation();
        if (this.props.hasChildren) {
            this.props.toggleChildren(this.props.key);
        }
    }

    handleSelectionChange(e) {
        //hack to get around warning that's not super useful in this case
        return;
    }

    handleSelectClick(e) {
        if (this.props.multipleSelectionSettings.isMultipleSelection) {
            if (e.target.type === "checkbox") {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, this.refs.selected.checked);
            } else {
                this.props.multipleSelectionSettings.toggleSelectRow(this.props.data, !this.refs.selected.checked)
            }
        }
    }

    _getColumnStyle() {
        return {
            margin: "0",
            padding: this.props.paddingHeight + "px 5px " + this.props.paddingHeight + "px 5px",
            height: this.props.rowHeight ? this.props.rowHeight - this.props.paddingHeight * 2 + "px" : null,
            backgroundColor: "#FFF",
            borderTopColor: "#DDD",
            color: "#222"
        };
    }

    render() {

        let columns = this.props.columnSettings.getColumns();

        // make sure that all the columns we need have default empty values
        // otherwise they will get clipped
        let defaults = _.object(columns, []);

        // creates a 'view' on top the data so we will not alter the original data but will allow us to add default values to missing columns
        let dataView = _.extend(this.props.data);

        _.defaults(dataView, defaults);
        let data = _.pairs(deep.pick(dataView, _.without(columns, 'children')));

        let nodes = data.map((col, index) => {

            let columnStyle = this.props.useGriddleStyles ? this._getColumnStyle() : null;

            let returnValue = null;
            let meta = this.props.columnSettings.getColumnMetadataByName(col[0]);

            // Set styles for expander and row offset
            let expanderStyles = this.props.useGriddleStyles ? {fontSize: "10px"} : null;
            if (index === 0 && this.props.useGriddleStyles) {
                if (this.props.hasChildren) {
                    _.extend(expanderStyles, {marginRight:"5px"/*, width: "8px", display: "inline-block"*/});
                }
                _.extend(columnStyle, {paddingLeft: 5 + 25 * this.props.nestingLevel + "px" });
            }

            //todo: Make this not as ridiculous looking
            // add icon for expanding/collapsing
            let firstColAppend = (index === 0 && this.props.hasChildren && this.props.showChildren === false && this.props.useGriddleIcons) ?
                <span onClick={this.handleExpandRows.bind(this)} style={expanderStyles}>
                    {this.props.parentRowCollapsedComponent}
                </span>
                :
                index === 0 && this.props.hasChildren && this.props.showChildren && this.props.useGriddleIcons ?
                    <span onClick={this.handleExpandRows.bind(this)} style={expanderStyles}>
                        {this.props.parentRowExpandedComponent}
                    </span> : <span style={expanderStyles}></span>;


            if (this.props.columnSettings.hasColumnMetadata() && typeof meta !== "undefined") {
                let colData = (typeof meta.customComponent === 'undefined' || meta.customComponent === null) ? col[1] :
                    <meta.customComponent data={col[1]} rowData={dataView} metadata={meta}/>;
                returnValue = (meta == null ? returnValue :
                    <td onClick={this.handleClick.bind(this)} className={meta.cssClassName} key={index}
                        style={columnStyle}>{colData}</td>);
            }

            return returnValue || (<td onClick={this.handleClick.bind(this)} key={index}
                                       style={columnStyle}>{firstColAppend}{col[1]}</td>);
        });


        let columnStyle = this.props.useGriddleStyles ? this._getColumnStyle() : null;

        if (nodes && this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection) {
            let selectedRowIds = this.props.multipleSelectionSettings.getSelectedRowIds();

            nodes.unshift(
                <td key="selection" style={columnStyle}>
                    <input
                        type="checkbox"
                        checked={this.props.multipleSelectionSettings.getIsRowChecked(dataView)}
                        onChange={this.handleSelectionChange}
                        ref="selected"/>
                </td>
            );
        }

        //Get the row from the row settings.
        let className = this.props.rowSettings && this.props.rowSettings.getBodyRowMetadataClass(this.props.data) || "standard-row";

        if (this.props.isChildRow) {
            className = "child-row";
        } else if (this.props.hasChildren) {
            className = this.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName;
        }

        return (
            <tr onClick={this.props.multipleSelectionSettings && this.props.multipleSelectionSettings.isMultipleSelection ? this.handleSelectClick.bind(this) : null}
                className={className}
            >
                {nodes}
            </tr>
        );
    }
}

GridRow.propTypes = {
    columnSettings: React.PropTypes.object.isRequired
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

export default GridRow;
