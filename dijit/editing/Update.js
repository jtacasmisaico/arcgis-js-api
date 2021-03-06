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

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../../kernel","../../geometry/jsonUtils","../../OperationBase"],function(t,e,s,r,p,i){var d=t(i,{declaredClass:"esri.dijit.editing.Update",type:"edit",label:"Update Features",constructor:function(t){var s;if(t=t||{},!t.featureLayer)return void console.error("In constructor of 'esri.dijit.editing.Update', featureLayer not provided");if(this._featureLayer=t.featureLayer,!t.preUpdatedGraphics)return void console.error("In constructor of 'esri.dijit.editing.Update', preUpdatedGraphics not provided");for(this._preUpdatedGraphicsGeometries=[],this._preUpdatedGraphicsAttributes=[],s=0;s<t.preUpdatedGraphics.length;s++)this._preUpdatedGraphicsGeometries.push(t.preUpdatedGraphics[s].geometry.toJson()),this._preUpdatedGraphicsAttributes.push(t.preUpdatedGraphics[s].attributes);if(!t.postUpdatedGraphics)return void console.error("In constructor of 'esri.dijit.editing.Update', postUpdatedGraphics not provided");for(this._postUpdatedGraphics=t.postUpdatedGraphics,this._postUpdatedGraphicsGeometries=[],this._postUpdatedGraphicsAttributes=[],s=0;s<t.postUpdatedGraphics.length;s++)this._postUpdatedGraphicsGeometries.push(t.postUpdatedGraphics[s].geometry.toJson()),this._postUpdatedGraphicsAttributes.push(e.clone(t.postUpdatedGraphics[s].attributes))},performUndo:function(){var t;for(t=0;t<this._postUpdatedGraphics.length;t++)this._postUpdatedGraphics[t].setGeometry(p.fromJson(this._preUpdatedGraphicsGeometries[t])),this._postUpdatedGraphics[t].setAttributes(this._preUpdatedGraphicsAttributes[t]);this._featureLayer.applyEdits(null,this._postUpdatedGraphics,null)},performRedo:function(){var t;for(t=0;t<this._postUpdatedGraphics.length;t++)this._postUpdatedGraphics[t].setGeometry(p.fromJson(this._postUpdatedGraphicsGeometries[t])),this._postUpdatedGraphics[t].setAttributes(this._postUpdatedGraphicsAttributes[t]);this._featureLayer.applyEdits(null,this._postUpdatedGraphics,null)}});return s("extend-esri")&&e.setObject("dijit.editing.Update",d,r),d});