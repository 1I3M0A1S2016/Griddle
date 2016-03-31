## Adding records at the end of the table and navigating to last page

To be able to add records to the end of the table and navigate to the last page, you need to pass
navigateToLastPageOnNewItem=true to the Griddle definition.

Please note that to be able to correctly navigate to the
last page, where new row is added, filter and sorting must be also reset (it is done automatically when specifying
mentioned attribute).

Also you need to make sure, that values passed to the griddle are not passed by reference - you
need to pass new value, so Griddle can correctly compare previous and new values - see example below, how to correctly
create new object.

```

addNewRow: function() {
    var id = this.getRandomInt(1000, 5000);

    this.setState({
        // make sure to pass new object - if you just push to the original array,
        // value will be passed via reference and Griddle can not compare this.props.results and
        // prevProps.results - it will be always same object.
        data: [...this.state.data].concat({
            "id": id,
            "name": "Name " + id,
            "city": "City " + id
        })
    });
},

render: function(){
    var rowMetadata = {
        "key": "id"
    };

    return (
            <div>
                <button onClick={this.addNewRow}>Add New Row</button>
                <Griddle ref="griddle"
                         results={this.state.data}
                         columns={["name", "city"]}
                         rowMetadata={rowMetadata}
                         showFilter={true}
                         rowsExpandedByDefault={false}
                         navigateToLastPageOnNewItem={true}
                />
            </div>
    );
}

```

@@include('./addingRecords/addingRecords.html')