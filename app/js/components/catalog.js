/** @jsx React.DOM */
'use strict';
/**
 * The catalog component.
 */
var React = require('react');
var CatalogStore = require('../stores/catalog-store.js');
var AddToCart = require('./addtocart.js');

/**
 * Build React nodes from given array of objects.
 * @param {Object[]} catalogItems - The array of objects to build React nodes from.
 */
function buildItems(catalogItems) {
    var items = catalogItems.map(function(item) {
        return (
            <tr key={item._id}>
                <td>{item.title}</td>
                <td>${item.cost}</td>
                <td><AddToCart item={item}/></td>
            </tr>
        );
    });
    return items;
}

/**
 * Catalog component.
 */
var Catalog = React.createClass({
    componentWillMount: function() {
        CatalogStore.addChangeListener(this._onChange);
        CatalogStore.getCatalog();
    },
    getInitialState: function() {
        return {items: []};
    },
    _onChange: function(data) {
        this.setState({items: data});
    },
    render: function() {
        var items = buildItems(this.state.items);
        return (
            <table className="table table-condensed table-hover table-responsive table-striped">
                <tbody>
                    {items}
                </tbody>
            </table>
        );
    }
});

module.exports = Catalog;
