'use strict';
/**
 * Tests for app/js/components/catalog.js.
 */
jest.setMock('../../stores/catalog-store.js', {
    addChangeListener: jest.genMockFunction(),
    getCatalog: jest.genMockFunction(),
    register: jest.genMockFunction()
});

/**
 * Tests for top-level Catalog table nodes.
 */
describe('Catalog', function() {
    it('is a <table> with <tbody> and no children when catalog is empty', function() {
        jest.dontMock('../catalog.js');
        var React = require('react/addons');
        var Catalog = require('../catalog.js');
        var TestUtils = React.addons.TestUtils;

        // Get mocked store to return needed values.
        var CatalogStore = require('../../stores/catalog-store.js');
        CatalogStore.getCatalog.mockReturnValue([]);

        // Render component and get needed nodes for asserts.
        var dom = TestUtils.renderIntoDocument(<Catalog/>);
        var component = TestUtils.findRenderedComponentWithType(dom, Catalog).getDOMNode();
        var tbody = component.firstChild;

        // Assert nodes are as expected.
        expect(component.tagName).toEqual('TABLE');
        expect(component.className).toEqual('table table-condensed table-hover table-responsive table-striped');
        expect(tbody.tagName).toEqual('TBODY');
        expect(tbody.className).toEqual('');
        expect(tbody.children.length).toEqual(0);
    });
});

/**
 * Tests for Catalog.tbody children.
 */
describe('Catalog', function() {
    it('has a <tbody> with expected children based on catalog items', function() {
        jest.dontMock('../catalog.js');
        jest.dontMock('../addtocart.js');
        var React = require('react/addons');
        var Catalog = require('../catalog.js');
        var TestUtils = React.addons.TestUtils;
        var item = {_id: 'testingid', title: 'TestItem', cost: 5};

        // Get mocked store to return needed values.
        // var CatalogStore = require('../../stores/catalog-store.js');
        // CatalogStore.getCatalog.mockImplementation(function() {
        //     for (var i in Catalog.type) {console.log(i);}
        //     Catalog.__prototype__._onChange([item]);
        // });
        Catalog.getInitialState = function() {return {items: [item]};};

        // Render component and get needed nodes for asserts.
        var dom = TestUtils.renderIntoDocument(<Catalog/>);
        var component = TestUtils.findRenderedComponentWithType(dom, Catalog).getDOMNode();
        var tbody = component.firstChild;
        console.log(tbody.tagName);
        console.log(tbody.children.length);

        // Get catalog item and children for asserts.
        var catalogItem = tbody.firstChild,
            catalogItemTitle = catalogItem.firstChild,
            catalogItemCost = catalogItem.firstChild.nextSibling,
            catalogItemControls = catalogItem.lastChild;

        // Assert nodes are as expected.
        expect(catalogItem.tagName).toEqual('TR');
        expect(catalogItemTitle.tagName).toEqual('TD');
        expect(catalogItemTitle.textContent).toEqual('TestItem');

        expect(catalogItemCost.tagName).toEqual('TD');
        expect(catalogItemCost.textContent).toEqual('$5');

        expect(catalogItemControls.length).toEqual(1);
        expect(catalogItemControls[0].nodeName).toEqual('BUTTON');
    });
});
