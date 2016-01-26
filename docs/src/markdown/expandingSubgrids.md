## Expanding subgrids without unnecessary re-renders

To expand subgrids without unnecessary re-rendering follow next example:

```

// Provide data for the grid - each of the data records should have unique identifier - in this case it is "id"
var fakeDataForKeys = [{
      "id": 0,
      "name": "Name 0",
      "city": "Kapowsin",
      "children": [
          {
              "id": 2,
              "name": "Name 2",
              "city": "Vienna",
              "children": [
                  {
                      "id": 5,
                      "name": "Name 5",
                      "city": "Munich"
                  }
              ]
          }, {
              "id": 3,
              "name": "Name 3",
              "city": "Ohio"
          }, {
              "id": 4,
              "name": "Name 4",
              "city": "New York"
          }
      ]
  }, {
      "id": 1,
      "name": "Name 1",
      "city": "Frankfurt"
  }];
    
// and render component with "key" defined - use name of the column containing unique identifier. Please remember, 
// that if no key is defined, Griddle will generate one for you with every render (which will cause row to always re-render)

render: function(){
            var rowMetadata = {
                "key": "id"
            };

            return (
                    <div>
                        <button onClick={this.addNewRow}>Add New Row</button>
                        <Griddle results={fakeDataForKeys} columns={["name", "city"]} 
                            rowMetadata={rowMetadata} 
                            showFilter={true} 
                            rowsExpandedByDefault={false} />
                    </div>
            );
        }
        
```

@@include('./expandingSubgrids/expandableRowsPersistent.html')