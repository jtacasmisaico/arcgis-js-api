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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/topic","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/has","../base/Templated","dojo/text!./templates/Tabs.html","../base/TabButton","../base/TabRadio","../../../kernel"],function(t,e,a,o,s,i,n,d,l,b,r,h,u){var c=t([l],{_activeTabButton:null,_isGxeTabs:!0,_tabButtons:null,templateString:b,useRadios:!1,showPromptIfRadios:!0,promptLabel:null,postCreate:function(){this.inherited(arguments),this._tabButtons=[]},startup:function(){this._started||(this.noIndent&&s.remove(this.domNode,"gxeIndent"),this.inherited(arguments),this._buildTabs())},_activateTab:function(t){var e=this.useRadios;a.forEach(this._tabButtons,function(a){a===t?(s.add(a.domNode,"current"),n.set(a.tabWgt.domNode,"display","block"),e&&(a.tabWgt._isOptionallyOff=!1)):(s.remove(a.domNode,"current"),n.set(a.tabWgt.domNode,"display","none"),e&&(a.tabWgt._isOptionallyOff=!0))});try{o.publish("gxe/tab-activated",{tabs:this,button:t})}catch(i){console.error(i)}},_addTab:function(t){var a=this._getLabel(t);n.set(t.domNode,"display","none");var o=null,s=this.id+"_radios";return o=this.useRadios?new h({label:a,tabWgt:t,radioName:s,onClick:e.hitch(this,function(t){this._activateTab(t)})}):new r({label:a,tabWgt:t,onClick:e.hitch(this,function(t){this._activateTab(t)})}),t.tabButton=o,(t.hide||t.notApplicable)&&n.set(o.domNode,"display","none"),i.place(o.domNode,this.tabsNode,"last"),this._tabButtons.push(o),o},_addPrompt:function(){var t=this.promptLabel;null===t&&(t=this.i18nBase.general.choose);var e=i.create("span",{"class":"gxeEditOnly gxeTabsPrompt"},this.tabsNode,"last");this.setNodeText(e,t)},_buildTabs:function(){var t=null;this.useRadios&&this.showPromptIfRadios&&this._addPrompt(),a.forEach(this.getChildren(),function(t){this._addTab(t)},this),a.some(this._tabButtons,function(e){return e.tabWgt&&!e.tabWgt.notApplicable?(t=e,!0):void 0}),t&&(t.radioName&&t.setChecked(!0),this._activateTab(t),n.set(this.domNode,"display","block"))},ensureActiveTab:function(t){a.some(this._tabButtons,function(e){return e.tabWgt===t?(this._activateTab(e),this.useRadios&&e.setChecked&&e.setChecked(!0),!0):void 0},this)},_getLabel:function(t){return"function"==typeof t.getLabelString?t.getLabelString():"string"==typeof t.label?t.label:"Untitled"}});return d("extend-esri")&&e.setObject("dijit.metadata.form.Tabs",c,u),c});