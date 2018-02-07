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
 
    handleMouseUp(e) {
        if (this.props.onRowMouseUp  && _.isFunction(this.props.onRowMouseUp)) {
            this.props.onRowMouseUp(this, e);
        }
    }
 
    handleMouseOut(e) {
        if (this.props.onRowMouseOut  && _.isFunction(this.props.onRowMouseOut)) {
            this.props.onRowMouseOut(this, e);
        }
    }
 
    handleMouseMove(e) {
        if (this.props.onRowMouseMove  && _.isFunction(this.props.onRowMouseMove)) {
            this.props.onRowMouseMove(this, e);
        }
    }
 
    handleMouseDown(e) {
        if (this.props.onRowMouseDown  && _.isFunction(this.props.onRowMouseDown)) {
            this.props.onRowMouseDown(this, e);
        }
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
   shouldComponentUpdate(nextRowProps, nextRowState){
    // always return true for first row in the grid ; first might be the fake row in case we have infinite scrolling, or the first data row in the results
    // no matter which one, we need it always updated in case we change the columns width outside and we need the first row to adjust the layout for the entire table (with layout = fixed)
  			if(this.props.shouldGriddleRowUpdate && nextRowProps.rowIndex > 0){
  				return this.props.shouldGriddleRowUpdate(this.props.data, nextRowProps.data);
  			}
  			return true;
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
                 // We are using inline withs of the columns only for tables with fixed layout. So, setting the column width only on the first row is enough
                 // The rows that follow will adjust to the first one's layout
                if(meta.width !== undefined  && this.props.rowIndex === 0){
                 columnStyle = columnStyle || {};
                 columnStyle.width = (typeof(meta.width) === "number"  ? meta.width + "px" : meta.width); 
                }
                let colData = (typeof meta.customComponent === 'undefined' || meta.customComponent === null) ? col[1] :
                    <meta.customComponent data={col[1]} rowData={dataView} metadata={meta}/>;
                returnValue = (meta == null ? returnValue :
                    <td onMouseUp={this.handleMouseUp.bind(this)} 
                        onMouseOut={this.handleMouseOut.bind(this)} 
                        onMouseMove={this.handleMouseMove.bind(this)} 
                        onMouseDown={this.handleMouseDown.bind(this)} 
                        onClick={this.handleClick.bind(this)} className={meta.cssClassName} key={index}
                        style={columnStyle}>{colData}</td>);
            }

            return returnValue || (<td onMouseUp={this.handleMouseUp.bind(this)} 
                                       onMouseOut={this.handleMouseOut.bind(this)} 
                                       onMouseMove={this.handleMouseMove.bind(this)} 
                                       onMouseDown={this.handleMouseDown.bind(this)} 
                                       onClick={this.handleClick.bind(this)} key={index}
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
            className += (" child-row" + (!this.props.useGriddleStyles ?  ("-" +this.props.nestingLevel) : ""));
        } else if (this.props.hasChildren) {
            className += (this.props.showChildren ? this.props.parentRowExpandedClassName : this.props.parentRowCollapsedClassName);
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
