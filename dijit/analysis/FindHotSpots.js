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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/_base/json","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ToggleButton","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/Dialog","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../toolbars/draw","../PopupTemplate","../../layers/FeatureLayer","../../graphic","./utils","./CreditEstimator","dojo/i18n!../../nls/jsapi","dojo/text!./templates/FindHotSpots.html"],function(e,t,i,s,a,n,l,o,r,h,d,y,u,c,g,_,p,m,b,L,f,v,S,F,w,A,P,C,D,j,I,O,x,B,N,E,T,k,G,R,q,M,U,H,J){var z=t([_,p,m,b,L,N,B],{declaredClass:"esri.dijit.analysis.FindHotSpots",templateString:J,widgetsInTemplate:!0,analysisLayer:null,analysisField:null,aggregationPolygonLayer:null,boundingPolygonLayer:null,outputLayerName:null,returnProcessInfo:!0,i18n:null,map:null,toolName:"FindHotSpots",helpFileName:"FindHotSpots",resultParameter:"HotSpotsResultLayer",constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),i.mixin(this.i18n,H.findHotSpotsTool),this.set("drawLayerName",this.i18n.blayerName)},postCreate:function(){this.inherited(arguments),g.add(this._form.domNode,"esriSimpleForm"),this._outputLayerInput.set("validator",i.hitch(this,this.validateServiceName)),this._buildUI()},startup:function(){},_onClose:function(e){e&&this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(e,t){return e===this._featureLayer?(this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)):void 0},this)),this._handleBoundingBtnClick(!1),this.emit("close",{save:!e})},clear:function(){this._featureLayer&&(this.map.removeLayer(this._featureLayer),s.forEach(this.boundingPolygonLayers,function(e,t){return e===this._featureLayer?(this._boundingAreaSelect.removeOption({value:t+1,label:this._featureLayer.name}),void this.boundingPolygonLayers.splice(t,1)):void 0},this),this._featureLayer=null),this._boundingDrawBtn.reset(),this._handleBoundingBtnClick(!1)},_handleShowCreditsClick:function(e){e.preventDefault();var t,s,a={};this._form.validate()&&(a.analysisLayer=l.toJson(M.constructAnalysisInputLyrObj(this.analysisLayer)),"0"!==this._analysFieldSelect.get("value")&&(a.analysisField=this._analysFieldSelect.get("value")),this._isPoint&&"0"===this._analysFieldSelect.get("value")&&("-1"!==this._boundingAreaSelect.get("value")&&(t=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1],a.boundingPolygonLayer=l.toJson(M.constructAnalysisInputLyrObj(t))),"-1"!==this._aggAreaSelect.get("value")&&(s=this.aggregationPolygonLayers[this._aggAreaSelect.get("value")-1],a.aggregationPolygonLayer=l.toJson(M.constructAnalysisInputLyrObj(s)))),this.returnFeatureCollection||(a.OutputName=l.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(a.context=l.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,a).then(i.hitch(this,function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_handleSaveBtnClick:function(){if(this._form.validate()){this._saveBtn.set("disabled",!0);var e,t,i,s={},a={};s.analysisLayer=l.toJson(M.constructAnalysisInputLyrObj(this.analysisLayer)),"0"!==this.get("analysisField")&&(s.analysisField=this.get("analysisField")),this._isPoint&&"0"===this._analysFieldSelect.get("value")&&("-1"!==this._boundingAreaSelect.get("value")&&(e=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1],s.boundingPolygonLayer=l.toJson(M.constructAnalysisInputLyrObj(e))),"-1"!==this._aggAreaSelect.get("value")&&(t=this.aggregationPolygonLayers[this._aggAreaSelect.get("value")-1],s.aggregationPolygonLayer=l.toJson(M.constructAnalysisInputLyrObj(t)))),"0"!==this.get("dividedByField")&&(s.dividedByField=this.get("dividedByField")),this.returnFeatureCollection||(s.OutputName=l.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&!this.get("DisableExtent")&&this._useExtentCheck.get("checked")&&(s.context=l.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(i={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.extent=this.map.extent._normalize(!0)),s.context=l.toJson(i)),s.returnProcessInfo=this.returnProcessInfo,a.jobParams=s,a.itemParams={description:this.i18n.itemDescription,tags:h.substitute(this.i18n.itemTags,{layername:this.analysisLayer.name,fieldname:s.analysisField?s.analysisField:""}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(a.itemParams.folder=this.get("folderId")),this.execute(a)}},_save:function(){},_buildUI:function(){var e=!0;this._loadConnections(),this.signInPromise.then(i.hitch(this,M.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.get("allowChooseLabel")||this.get("analysisLayer")||!this.get("analysisLayers")||this.set("analysisLayer",this.analysisLayers[0]),M.populateAnalysisLayers(this,"analysisLayer","analysisLayers",{chooseLabel:this.get("allowChooseLabel")})),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._boundingAreaSelect.addOption({value:"-1",label:this.i18n.defaultBoundingOption,selected:!0}),this.boundingPolygonLayers&&s.forEach(this.boundingPolygonLayers,function(e,t){"esriGeometryPolygon"===e.geometryType&&this._boundingAreaSelect.addOption({value:t+1,label:e.name,selected:!1})},this),this._aggAreaSelect.addOption({value:"-1",label:this.i18n.defaultAggregationOption,selected:!0}),this.aggregationPolygonLayers&&s.forEach(this.aggregationPolygonLayers,function(e,t){"esriGeometryPolygon"===e.geometryType&&this._aggAreaSelect.addOption({value:t+1,label:e.name,selected:!1})},this),M.addReadyToUseLayerOption(this,[this._analysisSelect]),this._updateAnalysisLayerUI(e),d.set(this._chooseFolderRow,"display",this.showSelectFolder===!0?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(i.hitch(this,function(e){this.folderStore=e,M.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})),d.set(this._chooseExtentDiv,"display",this.showChooseExtent===!0?"inline-block":"none"),d.set(this._showCreditsLink,"display",this.showCredits===!0?"block":"none")},_updateAnalysisLayerUI:function(e){this.analysisLayer?"esriGeometryPolygon"===this.analysisLayer.geometryType?(this._isPoint=!1,y.set(this._hotspotsToolDescription,"innerHTML",h.substitute(this.i18n.hotspotsPolyDefine,{layername:this.analysisLayer.name})),d.set(this._optionsRow,"display","none")):("esriGeometryPoint"===this.analysisLayer.geometryType||"esriGeometryMultipoint"===this.analysisLayer.geometryType)&&(this._isPoint=!0,y.set(this._hotspotsToolDescription,"innerHTML",h.substitute(this.i18n.hotspotsPointDefine,{layername:this.analysisLayer.name})),g.add(this._analysFieldSelect.domNode,"esriLeadingMargin1"),d.set(this._optionsRow,"display",""),e&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{layername:this.analysisLayer.name}))):(d.set(this._optionsRow,"display","none"),d.set(this._optionsRow,"display","none"),e&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{layername:""})),this._isPoint=!1),this.set("analysisFields",this.analysisLayer),this._isPoint?this._aggAreaSelect.set("value","-1"):this.set("dividedByFields",this.analysisLayer),this.analysisLayer&&"esriGeometryPolygon"===this.analysisLayer.geometryType&&e&&(this.outputLayerName=h.substitute(this.i18n.outputLayerName,{layername:x.isDefined(this._analysFieldSelect.getOptions(0))?this._analysFieldSelect.getOptions(0).label:""})),this._outputLayerInput.set("value",this.outputLayerName)},_handleAnalysisLayerChange:function(e){"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND (tags:"point" OR tags:"polygon") '),this._selectedwidget=0,this._browsedlg.show()):(-1!==e?(this.get("allowChooseLabel")&&(e-=1),this.analysisLayer=this.analysisLayers[e]):this.analysisLayer=null,this._updateAnalysisLayerUI(!0))},_handleFieldChange:function(e){"0"===this._analysFieldSelect.get("value")?(this._outputLayerInput.set("value",h.substitute(this.i18n.outputLayerName,{layername:this.analysisLayer.name})),this._isPoint&&(d.set(this._optionsRow,"display",""),g.remove(this._optionsDiv,"disabled"),g.remove(this._optionsDiv,"optionsClose"),g.add(this._optionsDiv,"optionsOpen"))):(this._outputLayerInput.set("value",h.substitute(this.i18n.outputLayerName,{layername:this._analysFieldSelect.getOptions(e).label})),this._isPoint&&(g.add(this._optionsDiv,"disabled"),d.set(this._optionsRow,"display","none"),this._boundingAreaSelect.set("value","-1"),this.clear(),g.contains(this._optionsDiv,"optionsOpen")&&(g.remove(this._optionsDiv,"optionsOpen"),g.add(this._optionsDiv,"optionsClose")))),this.set("analysisField",this._analysFieldSelect.get("value"));var t="-1"!==this._aggAreaSelect.get("value"),i=null;"0"!==this._analysFieldSelect.get("value")?i=this.analysisLayer:t&&this._isPoint&&this._aggAreaSelect.set("value","-1"),this.set("dividedByFields",i)},_handleDividedByFieldChange:function(){},_handleBoundingSelectChange:function(e){var t;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._selectedwidget=2,this._browsedlg.show()):"-1"!==e?(t=this.boundingPolygonLayers[this._boundingAreaSelect.get("value")-1],t.id!==this.drawLayerName&&this.clear()):this.clear(),this._boundingDrawBtn.reset()},_handleAggAreaSelectChange:function(e){var t;"browse"===e?(this._analysisquery||(this._analysisquery=this._browsedlg.browseItems.get("query")),this._browsedlg.browseItems.set("query",this._analysisquery+' AND tags:"polygon"'),this._selectedwidget=1,this._browsedlg.show()):(t="-1"!==this._aggAreaSelect.get("value"),this._boundingAreaSelect.set("disabled",t),g.toggle(this._boundingAreaSelect.domNode,"esriAnalysisTextDisabled",t),this._boundingDrawBtn.set("disabled",t),t?(this.clear(),d.set(this._boundingAreaLabelRow,"display","none"),d.set(this._boundingAreaSelectRow,"display","none"),this._boundingAreaSelect.set("value","-1")):(d.set(this._boundingAreaLabelRow,"display",""),d.set(this._boundingAreaSelectRow,"display","")),g.toggle(this._boundingDrawBtn.domNode,"esriAnalysisTextDisabled",t),this.set("dividedByFields",t?this.aggregationPolygonLayers[this._aggAreaSelect.get("value")-1]:null))},_handleBoundingBtnClick:function(e){e?(this.emit("drawtool-activate",{}),this._featureLayer||this._createBoundingPolyFeatColl(),this._toolbar.activate(k.POLYGON)):(this._toolbar.deactivate(),this.emit("drawtool-deactivate",{}))},_handleBrowseItemsSelect:function(e){var t={};e&&e.selection&&x.isDefined(this._selectedwidget)&&(0===this._selectedwidget?(t.layers=this.analysisLayers,t.layersSelect=this._analysisSelect):1===this._selectedwidget?(t.layers=this.aggregationPolygonLayers,t.layersSelect=this._aggAreaSelect,t.posIncrement=1):2===this._selectedwidget&&(t.layers=this.boundingPolygonLayers,t.layersSelect=this._boundingAreaSelect),t.item=e.selection,t.browseDialog=this._browsedlg,t.widget=this,M.addAnalysisReadyLayer(t).always(i.hitch(this,this._updateAnalysisLayerUI,!0)))},_loadConnections:function(){this.on("start",i.hitch(this,"_onClose",!1)),this._connect(this._closeBtn,"onclick",i.hitch(this,"_onClose",!0))},_createBoundingPolyFeatColl:function(){var e=M.createPolygonFeatureCollection(this.drawLayerName);this._featureLayer=new R(e,{id:this.drawLayerName}),this.map.addLayer(this._featureLayer),a.connect(this._featureLayer,"onClick",i.hitch(this,function(e){this.map.infoWindow.setFeatures([e.graphic])}))},_addFeatures:function(e){var t=[],i={},a=new E(E.STYLE_NULL,new T(T.STYLE_SOLID,new n([0,0,0]),4)),l=new q(e,a);if(this.map.graphics.add(l),i.description="blayer desc",i.title="blayer",l.setAttributes(i),t.push(l),this._featureLayer.applyEdits(t,null,null),0===this.boundingPolygonLayers.length||this.boundingPolygonLayers[this.boundingPolygonLayers.length-1]!==this._featureLayer){var o=this.boundingPolygonLayers.push(this._featureLayer),r=this._boundingAreaSelect.getOptions();this._boundingAreaSelect.removeOption(r),r=s.map(r,function(e){return e.selected=!1,e}),r.push({value:o,label:this._featureLayer.name,selected:!0}),this._boundingAreaSelect.addOption(r),this._handleBoundingSelectChange(o)}},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setAnalysisLayerAttr:function(e){this.analysisLayer=e},_getAnalysisLayerAttr:function(){return this.analysisLayer},_getAnalysisFieldAttr:function(){return this._analysFieldSelect&&(this.analysisField=this._analysFieldSelect.get("value")),this.analysisField},_setAnalysisFieldAttr:function(e){this.analysisField=e},_setDividedByFieldAttr:function(e){this.dividedByField=e},_getDividedByFieldAttr:function(){return this._divideFieldSelect&&(this.dividedByField=this._divideFieldSelect.get("value")),this.dividedByField},_setAnalysisFieldsAttr:function(e){var t,i,a=x.isDefined(e)&&x.isDefined(e.fields)?e.fields:[];this._analysFieldSelect&&(this._analysFieldSelect.removeOption(this._analysFieldSelect.getOptions()),this._isPoint?this._analysFieldSelect.addOption({value:"0",label:this.i18n.pointCounts}):!this._isPoint&&this.get("allowChooseLabel")&&this._analysFieldSelect.addOption({value:"0",label:this.i18n.chooseLabel}),s.forEach(a,function(a){-1===s.indexOf(["GiZScore","GiPValue","Gi_Bin",e.objectIdField],a.name)&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],a.type)&&(t={value:a.name,label:x.isDefined(a.alias)&&""!==a.alias?a.alias:a.name},this.analysisField&&t.label===this.analysisField&&(t.selected="selected",i=a.name),this._analysFieldSelect.addOption(t))},this),i?this._analysFieldSelect.set("value",i):this.set("analysisField",this._analysFieldSelect.get("value")))},_setAnalysisLayersAttr:function(e){this.analysisLayers=e},_setDividedByFieldsAttr:function(e){var t,i,a=x.isDefined(e)&&x.isDefined(e.fields)?e.fields:[];this._divideFieldSelect&&(this._divideFieldSelect.removeOption(this._divideFieldSelect.getOptions()),this._divideFieldSelect.addOption({value:"0",label:this.i18n.noneLabel}),this._isPoint&&(!this._isPoint||x.isDefined(this.analysisField)&&"0"!==this.analysisField)||this._divideFieldSelect.addOption({value:"esriPopulation",label:this.i18n.enrichLabel,disabled:!this.get("enableEnrichmentFields")}),s.forEach(a,function(a){-1===s.indexOf(["GiZScore","GiPValue","Gi_Bin",e.objectIdField,x.isDefined(this.analysisField)&&this.analysisField],a.name)&&-1!==s.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble"],a.type)&&(t={value:a.name,label:x.isDefined(a.alias)&&""!==a.alias?a.alias:a.name},this.dividedByField&&t.label===this.dividedByField&&(t.selected="selected",i=a.name),this._divideFieldSelect.addOption(t))},this),i&&this._divideFieldSelect.set("value",i))},_setEnableEnrichmentFieldsAttr:function(e){this.enableEnrichmentFields=e},_getEnableEnrichmentFieldsAttr:function(){return this.enableEnrichmentFields},_setMapAttr:function(e){this.map=e,this._toolbar=new k(this.map),a.connect(this._toolbar,"onDrawEnd",i.hitch(this,this._addFeatures))},_getMapAttr:function(){return this.map},_setDrawLayerNameAttr:function(e){this.drawLayerName=e},_getDrawLayerNameAttr:function(){return this._featureLayer.name},_getDrawLayerAttr:function(){return this._featureLayer},_getDrawToolbarAttr:function(){return this._toolbar},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},validateServiceName:function(e){return M.validateServiceName(e,{textInput:this._outputLayerInput})},_setDisableExtentAttr:function(e){this._useExtentCheck.set("checked",!e),this._useExtentCheck.set("disabled",e)},_getDisableExtentAttr:function(){this._useExtentCheck.get("disabled")},_connect:function(e,t,i){this._pbConnects.push(a.connect(e,t,i))}});return o("extend-esri")&&i.setObject("dijit.analysis.FindHotSpots",z,O),z});