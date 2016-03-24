## Adding records at the end of the table and navigating to last page

To be able to add records to the end of the table and navigate to the last page, you need to reset filter and ordering
and navigate to the last page manually. To do that, you need to implement following:

```

// Implement getMaxPage function - you cannot use getMaxPage from Griddle as at time of adding
// Griddle does not know about the new item and provides wrong result.
getMaxPage: function (griddleRef, data) {
    var totalResults = data.length;
    var maxPage = Math.ceil(totalResults / griddleRef.state.resultsPerPage);
    return maxPage;
},

// In handler for adding new row, push new record to the end of the array, reset ordering
// and filter and navigate to last page
addNewRow: function() {
    console.log("adding new row");

    var id = this.getRandomInt(1000, 5000);

    fakeDataForKeys.push({
        "id": id,
        "name": "Name " + id,
        "city": "City " + id
    });

    this.setState({
        data: fakeDataForKeys
    });

    // Reseting of the ordering and filter
    this.refs.griddle.resetOrdering();
    this.refs.griddle.setFilter("");

    // To navigate to last page, calculate maxPage and set the page for the griddle manually
    //(first page is 0, so need to do maxPage -1)
    var maxPage = this.getMaxPage(this.refs.griddle, fakeDataForKeys);
    this.refs.griddle.setPage(maxPage -1 );
},

// in render function, do not forget to set "ref" attribute for Griddle, to be able to call
// function on it.
render: function(){
    var rowMetadata = {
        "key": "id"
    };

    return (
            <div>
                <button onClick={this.addNewRow}>Add New Row</button>
                <Griddle ref="griddle" results={fakeDataForKeys} columns={["name", "city"]} rowMetadata={rowMetadata} showFilter={true} rowsExpandedByDefault={false} />
            </div>
    );
}

```

@@include('./addingRecords/addingRecords.html')