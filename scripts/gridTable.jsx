/*
 See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
 */
import React from 'react';
import GridTitle from './gridTitle.jsx';
import _  from 'underscore';
import flattenDeep from 'lodash.flattendeep';

class GridTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollTop: 0,
            scrollHeight: this.props.bodyHeight,
            clientHeight: this.props.bodyHeight,
            expandedRows: {}
        }
    }

    componentDidMount() {
        // After the initial render, see if we need to load additional pages.
        this.gridScroll();
    }

    componentWillMount(){
        this.gridId = (this.props.gridId !== undefined ? this.props.gridId : new Date().getTime()).toString();
    }

    componentDidUpdate(prevProps, prevState) {
        // After the subsequent renders, see if we need to load additional pages.
        this.gridScroll();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.bodyScrolling){
                if(
                     nextProps.bodyHeight !== this.props.bodyHeight 
                     || nextProps.bodyScrollTop !== this.props.bodyScrollTop
                     || nextProps.bodyClientHeight !== this.props.bodyClientHeight
                     || nextProps.bodyScrollHeight !== this.props.bodyScrollHeight
                     || nextProps.aboveGridContentHeight !== this.props.aboveGridContentHeight
                     || nextProps.underGridContentHeight !== this.props.underGridContentHeight){
                    this.gridScroll(nextProps);
                }
            }
    } 
 
    gridScroll(nextProps) {
        if (this.props.enableInfiniteScroll && !this.props.externalIsLoading) {
            // If the scroll height is greater than the current amount of rows displayed, update the page.
            var scrollable = this.refs.scrollable;
            var scrollTop;
            var scrollHeight;
            var clientHeight;
            
            if(this.props.bodyScrolling) {
                    scrollTop = nextProps ? nextProps.bodyScrollTop :((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop || 0);
                    scrollHeight = nextProps ? nextProps.bodyScrollHeight : ((document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight || 0);
                    clientHeight = nextProps ? nextProps.bodyClientHeight : ((document.documentElement && document.documentElement.clientHeight) || document.body.clientHeight || 0);
            }
            else{
                scrollTop = scrollable.scrollTop;
                scrollHeight = scrollable.scrollHeight;
                clientHeight = scrollable.clientHeight;
            }

            // If the scroll position changed and the difference is greater than a row height
            if (this.props.rowHeight !== null &&
                this.state.scrollTop !== scrollTop &&
                Math.abs(this.state.scrollTop - scrollTop) >= this.getAdjustedRowHeight()) {
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

    getAdjustedRowHeight() {
        return this.props.rowHeight + this.props.paddingHeight * 2; // account for padding.
    }

    /**
     * Converts data to nodeContent (rows)
     * @param nodeData
     * @param nestingLevel
     * @returns {*} Array of rows
     */
    getNodeContent(nodeData, nestingLevel = 0) {

        // If the data is still being loaded, don't build the nodes unless this is an infinite scroll table.
        if (!this.props.externalIsLoading || this.props.enableInfiniteScroll) {
             //let nodeData = this.props.data;
            let aboveSpacerRow = null;
            let belowSpacerRow = null;
            let scrollable = this.props.bodyScrolling  ? document.body : this.refs.scrollable;

            // If we have a row height specified, only render what's going to be visible.
            if (this.props.enableInfiniteScroll && this.props.rowHeight !== null && scrollable !== undefined) {
                let adjustedHeight = this.getAdjustedRowHeight();
                let aboveGridContentHeight = this.props.aboveGridContentHeight || 0;
                let underGridContentHeight = this.props.underGridContentHeight || 0;
                
                let dynamicBodyScrollExtraRecords =  (aboveGridContentHeight + underGridContentHeight)/adjustedHeight;
                let extraRecordsCount = this.state.scrollTop == 0 ? dynamicBodyScrollExtraRecords : (-1* dynamicBodyScrollExtraRecords);
                
                let visibleRecordCount = Math.ceil(this.state.clientHeight / adjustedHeight + extraRecordsCount);

                // Inspired by : http://jsfiddle.net/vjeux/KbWJ2/9/
                let displayStart = Math.max(0, Math.floor((this.state.scrollTop) / adjustedHeight) - visibleRecordCount * 0.25);
                let displayEnd = Math.min(displayStart + visibleRecordCount * 1.25, this.props.data.length - 1);

                // Split the amount of nodes.
                nodeData = nodeData.slice(displayStart, displayEnd + 1);

                // Set the above and below nodes.
                let aboveSpacerRowStyle = {height: (displayStart * adjustedHeight) + "px"};
             
             
               let colNames =  this.props.columnSettings.getColumns();
               let tds = [];
               colNames.map(function(col,index){
                let meta = this.props.columnSettings.getColumnMetadataByName(col);
                let style = {padding: 0 };

                if(meta.width !== undefined) {
                 style.width = (typeof(meta.width) === "number"  ? meta.width + "px" : meta.width); 
                }
                
                tds.push(<td className={meta && meta.cssClassName} style={style}></td>);
               });
               
                aboveSpacerRow = (<tr key={'above-' + aboveSpacerRowStyle.height} style={aboveSpacerRowStyle} className="above-space-row">{tds}</tr>);
                let belowSpacerRowStyle = {height: ((this.props.data.length - displayEnd) * adjustedHeight) + underGridContentHeight  + "px"};
                belowSpacerRow = (<tr key={'below-' + belowSpacerRowStyle.height} style={belowSpacerRowStyle} className="below-space-row"></tr>);
            }

            let nodes = nodeData.map((row, index) => {

                // array with all nodes and it's children
                let nodesWithChildren = [];

                let hasChildren = (typeof row["children"] !== "undefined") && row["children"].length > 0;
                let uniqueId = this.props.rowSettings.getRowKey(row);
                let showChildren = hasChildren &&
                    (
                      (!this.props.rowsExpandedByDefault && this.props.expandedRowsDictionary && this.props.expandedRowsDictionary[uniqueId] === true)
                      ||
                      (!this.props.expandedRowsDictionary && this.props.rowsExpandedByDefault === true  && this.state.expandedRows[uniqueId] !== false)
                        ||
                      (this.props.rowsExpandedByDefault === false && !this.props.expandedRowsDictionary && this.state.expandedRows[uniqueId] === true)
                    );

                var columns = this.props.columnSettings.getColumns();

                // render rows directly - this could return one row or multiple rows
                nodesWithChildren.push(

                    <this.props.rowSettings.rowComponent
                        shouldGriddleRowUpdate = {this.props.shouldGriddleRowUpdate}
                        useGriddleStyles={this.props.useGriddleStyles}
                        isSubGriddle={this.props.isSubGriddle}
                        data={row}
                        rowData={this.props.rowSettings.isCustom ? this.props.data : null }
                        columnSettings={this.props.columnSettings}
                        rowSettings={this.props.rowSettings}
                        hasChildren={hasChildren}
                        toggleChildren={this.toggleChildren.bind(this, uniqueId)}
                        showChildren={showChildren}
                        key={uniqueId}
                        useGriddleIcons={this.props.useGriddleIcons}
                        parentRowExpandedClassName={this.props.parentRowExpandedClassName}
                        parentRowCollapsedClassName={this.props.parentRowCollapsedClassName}
                        parentRowExpandedComponent={this.props.parentRowExpandedComponent}
                        parentRowCollapsedComponent={this.props.parentRowCollapsedComponent}
                        paddingHeight={this.props.paddingHeight}
                        rowHeight={this.props.rowHeight}
                        onRowClick={this.props.onRowClick}
                        multipleSelectionSettings={this.props.multipleSelectionSettings}
                        nestingLevel={nestingLevel}
                        isChildRow={nestingLevel > 0 ? true : false}
                        rowIndex={index}
                        onRowMouseDown= {this.props.onRowMouseDown}
                        onRowMouseMove= {this.props.onRowMouseMove}
                        onRowMouseOut= {this.props.onRowMouseOut}
                        onRowMouseUp= {this.props.onRowMouseUp}
                    />
                );

                // At least one item in the group has children and row is expanded, continue with rendering of nested rows
                /*
                Nested rows should be rendered only in two cases:
                - if rows are set to be expanded by default, render them if they are not explicitly collapsed
                - if rows are set to be not expanded by default, render them only if they are explicitly expanded
                 */
                if (showChildren) {
                    let children = row["children"];
                    nodesWithChildren.push(this.getNodeContent(children, nestingLevel + 1));
                }

                return nodesWithChildren;
            });

            if (this.props.showNoData) {
                var colSpan = this.props.columnSettings.getVisibleColumnCount();
                nodes.push(<tr key="no-data-section"><td colSpan={colSpan}>{this.props.noDataSection}</td></tr>);
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

    toggleChildren(key) {
        // decide if component is expanded or not
        let isExpanded = this.state.expandedRows[key] || false;

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
    };


    render() {

        let nodes = [];

        // Grab the nodes to render
        let nodeContent = this.getNodeContent(this.props.data);
        let flattenedContent = flattenDeep(nodeContent);

        if (nodeContent) {
            nodes = (
                <tbody>{flattenedContent}</tbody>
            );
        }

        let gridStyle = null;
        let loadingContent = null;

        let tableStyle = {
            width: "100%"
        };

        if (this.props.useFixedLayout) {
            tableStyle.tableLayout = "fixed";
        }

        if (this.props.enableInfiniteScroll ||  this.props.useFixedHeader) {
            // If we're enabling infinite scrolling or fixed header, we'll want to include the max height of the grid body + allow scrolling.
            gridStyle = {
                "position": "relative",
                "overflowY": this.props.bodyScrolling ? "initial" : "scroll",
                "width": "100%"
            };
            if(this.props.enableInfiniteScroll){
              //for infinite scrolling, we only use height
              gridStyle.height = this.props.bodyHeight + "px";
            }
            else {
               //height takes priority over maxHeight, we can't have both
               gridStyle.height = this.props.bodyHeight  ? (this.props.bodyHeight + "px") : undefined;
               gridStyle.maxHeight = gridStyle.height === undefined ? this.props.maxBodyHeight : undefined;
            }
        }

        // If we're currently loading, populate the loading content
        if (this.props.externalIsLoading) {
            let defaultLoadingStyle = null;
            let defaultColSpan = null;

            if (this.props.useGriddleStyles) {
                defaultLoadingStyle = {
                    textAlign: "center",
                    paddingBottom: "40px"
                };

                defaultColSpan = this.props.columnSettings.getVisibleColumnCount();
            }

            let loadingComponent = this.props.externalLoadingComponent ?
                (<this.props.externalLoadingComponent/>) :
                (<div>Loading...</div>);

            loadingContent = (
                <tbody>
                <tr>
                    <td style={defaultLoadingStyle} colSpan={defaultColSpan}>{loadingComponent}</td>
                </tr>
                </tbody>
            );
        }

        // Construct the table heading component
        let tableHeading = (this.props.showTableHeading ?
            <GridTitle useGriddleStyles={this.props.useGriddleStyles} useGriddleIcons={this.props.useGriddleIcons}
                       sortSettings={this.props.sortSettings}
                       multipleSelectionSettings={this.props.multipleSelectionSettings}
                       columnSettings={this.props.columnSettings}
                       filterByColumn={this.props.filterByColumn}
                       rowSettings={this.props.rowSettings}/>
            : undefined);

        let pagingContent = <div />;
        if (this.props.showPager) {
            let pagingStyles = this.props.useGriddleStyles ? {
                padding: "0",
                backgroundColor: "#EDEDED",
                border: "0",
                color: "#222"
            } : null;

            pagingContent = (<div className="footer-container" style={pagingStyles}>
              {this.props.pagingContent}
            </div>);
        }

        // If we have a fixed header, split into two tables.
        if (this.props.useFixedHeader) {
            let headerWrapperClassName = 'fixed-header-wrapper' + (this.props.enableInfiniteScroll ? " with-infinite-scrolling" : "");
            if (this.props.useGriddleStyles) {
                tableStyle.tableLayout = "fixed";
            }

            return <div>
                <div id={this.gridId + "fixed-header"} className={headerWrapperClassName}>
                    <table className={this.props.className} style={(this.props.useGriddleStyles&&tableStyle)||null}>
                        {tableHeading}
                    </table>
                </div>
                <div ref="scrollable" id={this.gridId + "griddle-table-wrapper"} className="griddle-table-wrapper" onScroll={this.gridScroll.bind(this)} style={gridStyle}>
                 <div className="inner-table-wrapper">
                  <div className="col-resize-indicator-left"></div>
                   <table className={this.props.className} style={(this.props.useGriddleStyles&&tableStyle)||null}>
                        {nodes}
                        {loadingContent}
                    </table>
                  <div className="col-resize-indicator-right"></div>
                 </div>
                </div>
                {pagingContent}
            </div>;
        }

        return <div>
          <div ref="scrollable" className="griddle-table-wrapper" onScroll={this.gridScroll.bind(this)} style={gridStyle}>
           <div className="inner-table-wrapper">
             <div className="col-resize-indicator-left"></div>
             <table className={this.props.className} style={(this.props.useGriddleStyles&&tableStyle)||null}>
                   {tableHeading}
                   {nodes}
                   {loadingContent}
               </table>
             <div className="col-resize-indicator-right"></div>
           </div>
          </div>
          {pagingContent}
        </div>;
    }
}

GridTable.propTypes = {
    columnSettings: React.PropTypes.object.isRequired,
    rowSettings: React.PropTypes.object.isRequired
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

export default GridTable;
