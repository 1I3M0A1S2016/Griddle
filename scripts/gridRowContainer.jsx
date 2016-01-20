/*
 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
 */
import React from 'react';
import ColumnProperties from './columnProperties.js';
import NestedGridRowContainer from './nestedGridRowContainer.jsx';

class GridRowContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            "data": {},
            "showChildren": false
        }
    }

    componentWillReceiveProps() {
        // this.setShowChildren(false);
    }

    toggleChildren() {
        this.setShowChildren(this.state.showChildren === false);
    }

    setShowChildren(visible) {
        this.setState({
            showChildren: visible
        });
    }

    verifyProps() {
        if (this.props.columnSettings === null) {
            console.error("gridRowContainer: The columnSettings prop is null and it shouldn't be");
        }
    }

    render() {
        this.verifyProps();
        var that = this;
        if (typeof this.props.data === "undefined") {
            return (<tbody></tbody>);
        }
        var arr = [];

        var columns = this.props.columnSettings.getColumns();

        arr.push(<this.props.rowSettings.rowComponent
            useGriddleStyles={this.props.useGriddleStyles}
            isSubGriddle={this.props.isSubGriddle}
            data={this.props.rowSettings.isCustom ? _.pick(this.props.data, columns) : this.props.data}
            rowData={this.props.rowSettings.isCustom ? this.props.data : null }
            columnSettings={this.props.columnSettings}
            rowSettings={this.props.rowSettings}
            hasChildren={that.props.hasChildren}
            toggleChildren={that.toggleChildren.bind(this)}
            showChildren={that.state.showChildren}
            key={that.props.uniqueId}
            useGriddleIcons={that.props.useGriddleIcons}
            parentRowExpandedClassName={this.props.parentRowExpandedClassName}
            parentRowCollapsedClassName={this.props.parentRowCollapsedClassName}
            parentRowExpandedComponent={this.props.parentRowExpandedComponent}
            parentRowCollapsedComponent={this.props.parentRowCollapsedComponent}
            paddingHeight={that.props.paddingHeight}
            rowHeight={that.props.rowHeight}
            onRowClick={that.props.onRowClick}
            multipleSelectionSettings={this.props.multipleSelectionSettings}/>
        );

        var children = null;

        if (that.state.showChildren) {
            children = that.props.hasChildren && this.props.data["children"].map(function (row, index) {
                    if (typeof row["children"] !== "undefined") {

                        return (
                            <NestedGridRowContainer
                                key={that.props.rowSettings.getRowKey(row)}
                                rowData={row}
                                rowSettings={that.props.rowSettings}
                                columnSettings={that.props.columnSettings}
                                hasChildren={true}
                            />
                        );

                    }

                    return <that.props.rowSettings.rowComponent useGriddleStyles={that.props.useGriddleStyles}
                                                                isSubGriddle={that.props.isSubGriddle}
                                                                data={row}
                                                                columnSettings={that.props.columnSettings}
                                                                isChildRow={true}
                                                                columnMetadata={that.props.columnSettings.columnMetadata}
                                                                key={that.props.rowSettings.getRowKey(row)}/>
                });
        }

        return that.props.hasChildren === false ? <tbody>{arr[0]}</tbody> :
            <tbody>{that.state.showChildren ? arr.concat(children) : arr}</tbody>
    }
}

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

export default GridRowContainer;
