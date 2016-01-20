/**
 * Implementation of rendering of nestedRows.
 */
import React from 'react';
import GridRowContainer from './gridRowContainer.jsx';

class NestedGridRowContainer extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        const key = this.props.rowSettings.getRowKey(this.props.rowData);
        const tableStyle = {
            width: "100%"
        };

        return (
            <tr key={key} style={{paddingLeft: 5}}>
                <td colSpan={this.props.columnSettings.getVisibleColumnCount()}
                    className="griddle-parent"
                    style={this.props.useGriddleStyles ? {border: "none", "padding": "0 0 0 5px"} : null}>

                    <table style={tableStyle}>
                        <GridRowContainer
                            rowSettings={this.props.rowSettings}
                            useGriddleStyles={this.props.useGriddleStyles}
                            columnSettings={this.props.columnSettings}
                            data={this.props.rowData}
                            isSubGriddle={true}
                            hasChildren={this.props.hasChildren}
                            uniqueId={key + '-container'}
                            parentRowExpandedClassName={this.props.parentRowExpandedClassName}
                            parentRowCollapsedClassName={this.props.parentRowCollapsedClassName}
                            parentRowExpandedComponent={this.props.parentRowExpandedComponent}
                            parentRowCollapsedComponent={this.props.parentRowCollapsedComponent}
                        />
                    </table>
                </td>
            </tr>
        );
    }
}

NestedGridRowContainer.propTypes = {
    key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    rowData: React.PropTypes.object.isRequired,
    rowSettings: React.PropTypes.object.isRequired,
    columnSettings: React.PropTypes.object.isRequired,
    hasChildren: React.PropTypes.bool.isRequired,

    // optional
    useGriddleStyles: React.PropTypes.bool,
    useGriddleIcons: React.PropTypes.bool,
    parentRowCollapsedClassName: React.PropTypes.string,
    parentRowExpandedClassName: React.PropTypes.string,
    parentRowCollapsedComponent: React.PropTypes.string,
    parentRowExpandedComponent: React.PropTypes.string
};

NestedGridRowContainer.defaultProps = {
    useGriddleStyles: true,
    useGriddleIcons: true,
    parentRowCollapsedClassName: "parent-row",
    parentRowExpandedClassName: "parent-row expanded",
    parentRowCollapsedComponent: "▶",
    parentRowExpandedComponent: "▼"
};

export default NestedGridRowContainer;