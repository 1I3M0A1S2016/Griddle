﻿/** @jsx React.DOM */

/*
   Griddle - Simple Grid Component for React
   https://github.com/DynamicTyped/Griddle
   Copyright (c) 2014 Ryan Lanciaux | DynamicTyped

   See License / Disclaimer https://raw.githubusercontent.com/DynamicTyped/Griddle/master/LICENSE
*/
var React = require('react/addons');
var _ = require('underscore');

var GridRow = React.createClass({
    getDefaultProps: function(){
      return {
        "isChildRow": false,
        "showChildren": false,
        "data": {},
        "metadataColumns": [],
        "hasChildren": false
      }
    },
    handleClick: function(){
      this.props.toggleChildren(); 
    },
    render: function() {
        var that = this;

        var nodes = _.toArray(_.omit(this.props.data, this.props.metadataColumns)).map(function(col, index) {
            return <td onClick={that.handleClick}>{col}</td>
        });

        //this is kind of hokey - make it better
        var className = "standard-row";

        if(that.props.isChildRow){
            className = "child-row";
        } else if (that.props.hasChildren){
            className = that.props.showChildren ? "parent-row expanded" : "parent-row";
        }

        return (<tr className={className}>{nodes}</tr>);
    }
});

module.exports = GridRow;
