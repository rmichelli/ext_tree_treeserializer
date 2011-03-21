/**
* @class Ext.tree.TreeSerializer
* A base class for implementations which provide serialization of an
* {@link Ext.tree.TreePanel}.
* <p>
* Implementations must provide a toString method which returns the serialized
* representation of the tree.
* 
* @constructor
* @param {TreePanel} tree
* @param {Object} config
*/
/*
Ext.tree.TreeSerializer = Ext.extend(Object, {    // Extjs 3.x version
    constructor: function(tree, config) {
        //if (typeof this.toString !== 'function') {    // toString confilcts with another JS method, using serialize instead
        if (typeof this.serialize !== 'function') {
            throw 'Ext.tree.TreeSerializer implementation does not implement serialize()';
        }
        this.tree = tree;
        if (this.attributeFilter) {
            this.attributeFilter = this.attributeFilter.createInterceptor(this.defaultAttributeFilter);
        } else {
            this.attributeFilter = this.defaultAttributeFilter;
        }
        if (this.nodeFilter) {
            this.nodeFilter = this.nodeFilter.createInterceptor(this.defaultNodeFilter);
        } else {
            this.nodeFilter = this.defaultNodeFilter;
        }
        Ext.apply(this, config);
    },

    /*
    * @cfg nodeFilter {Function} (optional) A function, which when passed the node, returns true or false to include
    * or exclude the node.
    */
    /*
    * @cfg attributeFilter {Function} (optional) A function, which when passed an attribute name, and an attribute value,
    * returns true or false to include or exclude the attribute.
    */
    /*
    * @cfg attributeMap {Array} (Optional) An object hash mapping Node attribute names to XML attribute names, or JSON property names.
    */

    /* @private
    * Array of node attributes to ignore.
    *//*
    standardAttributes: ["nodeType", "expanded", "allowDrag", "allowDrop", "disabled", "icon", "events", "children",
        "cls", "iconCls", "href", "hrefTarget", "qtip", "singleClickExpand", "uiProvider", "loader"],


    /** @private
    * Default attribute filter.
    * Rejects functions and standard attributes.
    *//*
    defaultAttributeFilter: function(attName, attValue) {
        return (typeof attValue != 'function') &&
               (this.standardAttributes.indexOf(attName) == -1);
    },

    /** @private
    * Default node filter.
    * Accepts all nodes.
    *//*
    defaultNodeFilter: function(node) {
        return true;
    }
});
*/
Ext.tree.TreeSerializer = function(tree, config) {   // Extjs 2.3 version
    //if (typeof this.serialize !== 'function') {    // toString confilcts with another JS method, using serialize instead
    if (typeof this.serialize !== 'function') {
        throw 'Ext.tree.TreeSerializer implementation does not implement serialize()';
    }
    this.tree = tree;
    if (this.attributeFilter) {
        this.attributeFilter = this.attributeFilter.createInterceptor(this.defaultAttributeFilter);
    } else {
        this.attributeFilter = this.defaultAttributeFilter;
    }
    if (this.nodeFilter) {
        this.nodeFilter = this.nodeFilter.createInterceptor(this.defaultNodeFilter);
    } else {
        this.nodeFilter = this.defaultNodeFilter;
    }
    Ext.apply(this, config);
};

Ext.tree.TreeSerializer.prototype = {   // Extjs 2.3 version
	/*
    * @cfg nodeFilter {Function} (optional) A function, which when passed the node, returns true or false to include
    * or exclude the node.
    */
    /*
    * @cfg attributeFilter {Function} (optional) A function, which when passed an attribute name, and an attribute value,
    * returns true or false to include or exclude the attribute.
    */
    /*
    * @cfg attributeMap {Array} (Optional) An object hash mapping Node attribute names to XML attribute names, or JSON property names.
    */

    /* @private
    * Array of node attributes to ignore.
    */
    standardAttributes: ["nodeType", "expanded", "allowDrag", "allowDrop", "disabled", "icon", "events", "children",
        "cls", "iconCls", "href", "hrefTarget", "qtip", "singleClickExpand", "uiProvider", "loader"],


    /** @private
    * Default attribute filter.
    * Rejects functions and standard attributes.
    */
    defaultAttributeFilter: function(attName, attValue) {
        return (typeof attValue != 'function') &&
               (this.standardAttributes.indexOf(attName) == -1);
    },

    /** @private
    * Default node filter.
    * Accepts all nodes.
    */
    defaultNodeFilter: function(node) {
        return true;
    }
};

/**
* @class Ext.tree.XmlTreeSerializer
* An implementation of Ext.tree.TreeSerializer which serializes an
* {@link Ext.tree.TreePanel} to an XML string.
*/
//Ext.tree.XmlTreeSerializer = Ext.extend(Ext.tree.TreeSerializer, {    // Extjs 3.x version
// begin Extjs 2.3 version
Ext.tree.XmlTreeSerializer = function(tree, config) {
    Ext.tree.XmlTreeSerializer.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.tree.XmlTreeSerializer, Ext.tree.TreeSerializer, {
// end Extjs 2.3 version     
    /**
    * Returns a string of XML that represents the tree
    * @return {String}
    */
//toString: function(nodeFilter, attributeFilter) { // toString confilcts with another JS method, using serialize instead
    serialize: function(nodeFilter, attributeFilter) {
        return '\u003C?xml version="1.0"?>\u003Ctree>' +
            this.nodeToString(this.tree.getRootNode()) + '\u003C/tree>';
    },

    /**
    * Returns a string of XML that represents the node
    * @param {Object} node The node to serialize
    * @return {String}
    */
    nodeToString: function(node) {
        if (!this.nodeFilter(node)) {
            return '';
        }
        var result = '\u003Cnode';
        if (this.attributeFilter("id", node.id)) {
            result += ' id="' + node.id + '"';
        }

        //      Add all user-added attributes unless rejected by the attributeFilter.
        for (var key in node.attributes) {
            if (this.attributeFilter(key, node.attributes[key])) {
                if (key != 'id') {
                    result += ' ' + (this.attributeMap ? (this.attributeMap[key] || key) : key) + '="' + node.attributes[key] + '"';
                }
            }
        }

        //      Add child nodes if any
        var children = node.childNodes;
        var clen = children.length;
        if (clen == 0) {
            result += '/>';
        } else {
            result += '>';
            for (var i = 0; i < clen; i++) {
                result += this.nodeToString(children[i]);
            }
            result += '\u003C/node>';
        }
        return result;
    }
});

/**
* @class Ext.tree.JsonTreeSerializer
* An implementation of Ext.tree.TreeSerializer which serializes an
* {@link Ext.tree.TreePanel} to a Json string.
*/
//Ext.tree.JsonTreeSerializer = Ext.extend(Ext.tree.TreeSerializer, {   // Extjs 3.x version
// begin Extjs 2.3 version
Ext.tree.JsonTreeSerializer = function(tree, config) {
    Ext.tree.JsonTreeSerializer.superclass.constructor.apply(this, arguments);
};

Ext.extend(Ext.tree.JsonTreeSerializer, Ext.tree.TreeSerializer, {
// end Extjs.2.3 version 
    /**
    * Returns a string of Json that represents the tree
    * @return {String}
    */
    //toString: function() {    // toString confilcts with another JS method, using serialize instead
    serialize: function() {
        return this.nodeToString(this.tree.getRootNode());
    },

    /**
    * Returns a string of Json that represents the node
    * @param {Object} node The node to serialize
    */
    nodeToString: function(node) {
        //      Exclude nodes based on caller-supplied filtering function
        if (!this.nodeFilter(node)) {
            return '';
        }
        var result = "{ ",
            key,
            children = node.childNodes,
            clen = children.length, i;

        if (this.attributeFilter("id", node.id)) {
            result += '"id":"' + node.id + '",';
        }

        //      Add all user-added attributes unless rejected by the attributeFilter.
        for (key in node.attributes) {
            if (this.attributeFilter(key, node.attributes[key])) {
                result += '"' + (this.attributeMap ? (this.attributeMap[key] || key) : key) + '":' + Ext.encode(node.attributes[key]) + ',';
            }
        }

        //      Add child nodes if any
        if (clen) {
            result += '"children":['
            for (i = 0; i < clen; i++) {
                result += this.nodeToString(children[i]) + ',';
            }
            result = result.substr(0, result.length - 1) + ']';
        } else {
            result = result.substr(0, result.length - 1);
        }
        return result + "}";
    }
});
