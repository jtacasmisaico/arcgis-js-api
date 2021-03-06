// COPYRIGHT © 2016 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.16/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/dom-class","dojo/dom-construct","dojo/has","./Templated","dojo/text!./templates/MultiplicityTabs.html","./TabButton","../../../kernel"],function(t,e,i,n,o,a,d,r,u,l){var s=t([d],{multiplicityHeader:null,templateString:r,postCreate:function(){this.inherited(arguments)},activateTab:function(t){if(t){this.highlightTab(t);var e=t.tabIndex;this._setCurrentIndex(e);var n=this.getElements();i.forEach(n,function(t,i){t.domNode.style.display=i===e?"block":"none"}),this._updateTools(n)}},addTabButton:function(){var t=this.getCurrentIndex(),i=this.getChildren().length,a=""+(i+1),d=new u({label:a,tabIndex:i,onClick:e.hitch(this,function(t){this.activateTab(t)})});return o.place(d.domNode,this.containerNode,"last"),-1===t&&(this._setCurrentIndex(0),n.add(d.domNode,"current")),this.updateUI(),d},ensureTabButton:function(){0===this.getChildren().length&&this.addTabButton()},getCurrentIndex:function(){return this.multiplicityHeader._currentIndex},_setCurrentIndex:function(t){this.multiplicityHeader._currentIndex=t},getElements:function(){return this.multiplicityHeader.getElements()},getMultiplicityInfo:function(){return this.multiplicityHeader.getMultiplicityInfo(null)},getTabButton:function(t){return this.getChildren()[t]},highlightTab:function(t){i.forEach(this.getChildren(),function(t){n.remove(t.domNode,"current")}),n.add(t.domNode,"current")},initialize:function(t){this.multiplicityHeader=t,this.updateUI()},sync:function(){var t=this.getCurrentIndex(),e=this.getChildren();i.forEach(e,function(e,i){e.tabIndex=i,e.setLabel(""+(i+1)),i===t?n.add(e.domNode,"current"):n.remove(e.domNode,"current")}),t<e.length&&this.activateTab(this.getTabButton(t)),this.updateUI()},_updateTools:function(t){this.multiplicityHeader.tools.updateUI(t)},updateUI:function(){var t=this.getMultiplicityInfo();this.domNode.style.display=t.numElements>1?"inline-block":"none"}});return a("extend-esri")&&e.setObject("dijit.metadata.base.MultiplicityTabs",s,l),s});