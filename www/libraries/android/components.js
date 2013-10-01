/********************************************************************************************/
/********************************************************************************************/
/*******************************            ANDROID             ******************************/
/********************************************************************************************/
/********************************************************************************************/


var _library = 'android';
var _path = '/android/';

/***** TOOLBAR COMPONENTS *****/
// TYPE: ACTION BAR 
prx.types.android_actionbar = {
	name: "android_actionbar"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		
		var borderStyle = '';
		switch(item.positioning) {
		case 'bottom':
			borderStyle = 'border-top: '+item.borderWidth+'px solid ' +getColor(item.borderColor)+ ';';
			break
		default: 
			borderStyle = 'border-bottom: '+item.borderWidth+'px solid '+getColor(item.borderColor) + ';';
			break
		}
		
		var cR = '<div id="' + _id + '" class="pos box type-android-actionbar" '+((item.overlay)? 'data-mpoverlay="1"': '')+'>'
		cR += '<div class="actionbar-inner'+((item.actionOverflow) ? ' showActionOverflow' : '') +' liveUpdate-backgroundColor liveUpdate-borderColor" style="background-color: '+getColor(item.backgroundColor)+'; '+borderStyle+'">'
		if(item.actionOverflow) {
			var _height = getRealDims(item, symbol).height;
			var _rectH = Math.floor(_height * 0.15);
			cR += '<div class="actionOverflow">'
			cR += '<div class="AO AO1 liveUpdate-actionOverflowColor" style="width: '+_rectH+'px; height: '+_rectH+'px; background-color: '+getColor(item.actionOverflowColor)+';"></div>'
			cR += '<div class="AO AO2 liveUpdate-actionOverflowColor" style="width: '+_rectH+'px; height: '+_rectH+'px; background-color: '+getColor(item.actionOverflowColor)+';"></div>'
			cR += '<div class="AO AO3 liveUpdate-actionOverflowColor" style="width: '+_rectH+'px; height: '+_rectH+'px; background-color: '+getColor(item.actionOverflowColor)+';"></div>'
			cR += '</div>'
		}
		if(item.upCaret) {
			cR += '<div class="left-icon" style="line-height: '+_height+'px;">'
			cR += '<img src="'+getAssetUrl(item.upCaretIcon)+'" style="height: '+(item.upCaretIconSize * 20)+'%;"/>'
			cR += '</div>'
		}
		if(typeof(item.selectionIcon)!= "undefined" && item.selectionIcon.url != "") {
			cR += '<div class="left-icon" style="line-height: '+_height+'px;">'
			cR += '<img src="'+getAssetUrl(item.selectionIcon)+'" style="height: '+(item.selectionIconSize * 20)+'%; border-right: 1px solid '+getColor(item.borderColor)+'; padding-left: 10px;"/>'
			cR += '</div>'
		}
		if(typeof(item.text)!= "undefined" && item.text != "") {
			var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
			_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
			_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
			
			cR += '<div class="caption liveUpdate-textColor" style="line-height: '+_height+'px; font-family: '+item.textFont+'; color: '+getColor(item.textColor)+'; font-size: '+item.textSize+'px; '+_props+'">'
			cR += '<span data-editableproperty="text">'+item.text+'</span>'; 
			cR += '</div>'
		}
		cR += '</div>'
		cR += '</div>'
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _height = getRealDims(item).height;
		var _rectH = Math.floor(_height * 0.15);
		$('#'+_id).find('.AO').width(_rectH).height(_rectH)
	}
	,interactions: [
		{ 
			caption: 'Action Overflow Interactions', 
			name: 'actionbarActionOverflowActions', 
			type: 'action', 
			value: function(item,name) {
				if(typeof(item.actionbarActionOverflowActions) == "undefined") {
					if (typeof(item.actions) == "undefined") { 
						item.actionbarActionOverflowActions = []; 
					} else {
						item.actionbarActionOverflowActions = item.actions;
					}
				}
				return item.actionbarActionOverflowActions.length; 
			} 
			,hiddenByDefault: function(item) {
				return (!item.actionOverflow);
			}
		}
		,{ 
			caption: 'Up Caret Interactions', 
			name: 'actionbarUpCaretActions', 
			type: 'action', 
			value: function(item,name) { 
				if (typeof(item.actionbarUpCaretActions) == "undefined") { 
					item.actionbarUpCaretActions = []; 
				} 
				return item.actionbarUpCaretActions.length; 
			} 
			,hiddenByDefault: function(item) {
				return (!item.upCaret);
			}
		}
	]
	,editableProperties: [
	                {
						caption: 'Text'
						,name: 'text'
						,type: 'input'
						,value: function(item,name) {
							if(typeof(item.text) == "undefined") {
								return "";
							}
							return item.text;
						}
					}
	]
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				],[
					{
						caption: 'Border'
						,name: 'positioning'
						,type: 'select'
						,value: function(item,name) {
							return item.positioning;
						}
						,values: [{ displayValue: 'Top', value: 'top'}, { displayValue: 'Bottom', value: 'bottom'}]
					},
					{
						caption: false,
						name: 'borderWidth',
						type: 'combo-select',
						value: function(item,name) { return item.borderWidth; },
						values: { min: 0, max: 10, step: 1 }
					},{
						caption: false
						,name: 'borderColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.borderColor;
						}
						,liveUpdate: 'border-color'
					}
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont,
					prx.commonproperties.textSize,
					prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		},{
			caption: 'Action Overflow',
			properties: [
				[
					{
						caption: 'Display action overflow'
						,name: 'actionOverflow'
						,type: 'onoff'
						,value: function(item,name) {
							return item.actionOverflow;
						}
						,onChange: function(item) {
							if(item.actionOverflow) {
								$('#property-actionOverflowColor, #property-actions').show();
							} else {
								$('#property-actionOverflowColor, #property-actions').hide();
							}
						}
					},{
						caption: 'Color'
						,name: 'actionOverflowColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.actionOverflowColor;
						}
						,hiddenByDefault: function(item) {
							return (!item.actionOverflow);
						}
						,liveUpdate: 'background-color'
					}
				]
			]
		},{
			caption: 'Up Caret',
			properties: [
				[
					{
						caption: 'Display Up Caret?'
						,name: 'upCaret'
						,type: 'onoff'
						,value: function(item,name) {
							return item.upCaret;
						}
						,onChange: function(item) {
							if(item.upCaret) {
								$('#property-upCaretIcon, #property-upCaretIconSize, #property-actionbarUpCaretActions').show();
							} else {
								$('#property-upCaretIcon, #property-upCaretIconSize, #property-actionbarUpCaretActions').hide();
							}
						}
					}
				],[
					{ 
						caption: false,
						name: 'upCaretIcon', 
						type: 'combo-asset', 
						displayValue: function(item,name) {
							if(typeof(item.upCaretIcon) == "undefined" || item.upCaretIcon.url == '') {
								return 'No icon selected';
							}
							return item.upCaretIcon.name;
						}
						,value: function(item,name) {
							if(typeof(item.upCaretIcon) == "undefined") {
								item.upCaretIcon = {
										fileId: '',
										folderId: '',
										url: '',
										assetType: 'icon',
										name: ''
									}
							}
							return $.toJSON({
								allow: 'image',
								asset: item.upCaretIcon
							});
						}
						,hiddenByDefault: function(item) {
							return (!item.upCaret);
						}
					}
				  ],[
					 {
						caption: 'Size'
						,name: 'upCaretIconSize'
						,type: 'select'
						,value: function(item,name) {
							return item.upCaretIconSize;
						}
						,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
						,hiddenByDefault: function(item,name){
							return (!item.upCaret);
						}
					}
				]
			]
		},{
			caption: 'Selection Icon',
			properties: [
				[
					{ 
						caption: false, 
						name: 'selectionIcon', 
						type: 'combo-asset', 
						displayValue: function(item,name) {
							if(typeof(item.selectionIcon) == "undefined" || item.selectionIcon.url == '') {
								return 'No icon selected';
							}
							return item.selectionIcon.name;
						}
						,value: function(item,name) {
							if(typeof(item.selectionIcon) == "undefined") {
								item.selectionIcon = {
										fileId: '',
										folderId: '',
										url: '',
										assetType: '',
										name: ''
									}
							}
							return $.toJSON({
								allow: 'image',
								asset: item.selectionIcon
							});
						}
					}
				],[
					{
						caption: 'Size'
						,name: 'selectionIconSize'
						,type: 'select'
						,value: function(item,name) {
							return item.selectionIconSize;
						}
						,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
					}
				]]
		}
		,{
			caption: 'Advanced',
			properties: [[
			        {
						caption: 'Position fixed on transitions'
						,name: 'overlay'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.overlay)=="undefined") {
								return false;
							}
							return item.overlay;
						}
					}		

				]
			]
		}
	]  
	
	
	
}

/* TYPE = CONTEXTUAL_ACTIONBAR */
prx.types.android_actionbar_contextual = cloneobject(prx.types.android_actionbar);
prx.types.android_actionbar_contextual.name = 'android_actionbar_contextual';
removeProperties(prx.types.android_actionbar_contextual.propertyGroups, ['upCaret', 'upCaretIcon', 'upCaretIconSize']);
removeProperties(prx.types.android_actionbar_contextual.interactions, ['actionbarUpCaretActions']);

/* TYPE = ACTIONBAR FINAL */
removeProperties(prx.types.android_actionbar.propertyGroups, ['text', 'textFont', 'textSize', 'textProperties', 'textColor', 'selectionIcon', 'selectionIconSize']);

// TYPE: FIXED TABBAR
prx.types.android_fixedtabbar = {
	name: "android_fixedtabbar"
	,onDisplay: function(item,containerid,pageid,symbol) {
	
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;

		if(typeof(item.overlay) == "undefined") { item.overlay = false; }
		
		var cR = "";
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var _dims = getRealDims(item, symbol);
		var _itemwidth = _dims.width;
		var _width = Math.floor(_itemwidth/item.tabs.length);
		var _height = _dims.height;
		
		cR = cR +  '<div id="' + _id + '" class="pos box type-android-fixed-tabbar" '+((item.overlay)? 'data-mpoverlay="1"': '')+'>';
		cR += '<style>';
		cR += '#'+_id+' input:checked + label { border-bottom: '+item.activeBorderWidth+'px solid '+getColor(item.activeTabColor)+ '; }';
		cR += '#'+_id+' label:after { background-color: '+getColor(item.separatorColor)+'; }';
		
		cR += '</style>';
		
		cR = cR +  '<ul class="liveUpdate-backgroundColor liveUpdate-textColor" style="background: '+getColor(item.backgroundColor)+';'+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; '+_props+' color: '+getColor(item.textColor)+'">';
		
		$.each(item.tabs, function(i,elm){
	
			var cChecked = '';
			if (i==item.selected) {
				cChecked = ' checked="checked"';
			}
			cR += '<li class="dynamic-property" data-dynamic-property-index="'+i+'" id="'+_id+'-tabs-'+i+'" style="width: '+_width+'px;">';
			cR += '<input type="radio" name="'+_id+'-radio" id="'+_id+'-radio-'+i+'"'+cChecked+' data-role="none" />';
			cR += '<label for="'+_id+'-radio-'+i+'" style="line-height: '+_height+'px;" '+((i==item.selected) ? 'class="liveUpdate-activeTabColor"' : '')+'><span data-editableproperty="caption" data-dynamic-property-index="'+i+'">'+elm.caption+'</span></label>';
			cR += '</li>'; 
		});
		cR = cR +  '</ul>';
		cR = cR + '</div>';
		
		return cR;
	}
	,onResize: function(item, containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _height = _dims.height;
		var _width = Math.floor(_dims.width/item.tabs.length);
		
		$('#'+_id+' li').width(_width);
		$('#'+_id+' label').css('line-height', _height + 'px');
	}
	,propertyGroups: [
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
					,{
						caption: 'Separator'
						,name: 'separatorColor'
						,type: 'colorpicker'
						,value: function(item,name) {
						  return item.separatorColor;
						}
					}
				]
				,
				[
					{
						caption: 'Active Tab Border',
						name: 'activeBorderWidth',
						type: 'combo-select',
						value: function(item,name) { return item.activeBorderWidth; },
						values: { min: 1, max: 15, step: 1 }
					},{
						caption: false
						,name: 'activeTabColor'
						,type: 'colorpicker'
						,value: function(item,name) {
						  return item.activeTabColor;
						}
						,liveUpdate: 'border-color'
					} 
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
				],
				[
					prx.commonproperties.textProperties
					,prx.commonproperties.textColor
				]
			]
		}
		,{
			caption: 'Advanced',
			properties: [
			    [
			     	{
					  caption: 'Active tab'
					  ,name: 'selected'
					  ,type: 'select'
					  ,value: function(item,name) {
						  return item.selected;
					  }
					  ,values: function(item,name) {
						  var _rA = [{value: '999',displayValue: 'None'}];
						  for (var n = 0; n < item.tabs.length; n++) {
							  _rA.push({value: n,displayValue: item.tabs[n].caption});
						  }	
						  return _rA;
					  } 
					}
			    ]
				,[
					{
						caption: 'Position fixed on transitions'
						,name: 'overlay'
						,type: 'onoff'
						,value: function(item,name) {
							if(typeof(item.overlay)=="undefined") {
								return false;
							}
							return item.overlay;
						}
					}
				]
			]
		}
	]
	
	,dynamicProperties: {
		data: 'tabs'
		,propertyCaption: 'Tabs'
  		,propertyName: 'Tab'
		,addCaption: 'Add tab'
		,deleteCaption: 'Delete'
		,blankItem: {
			caption: "TAB TITLE"
			,actions: []
		}
		,captionProperty: 'caption'
		,editableProperties: [
          	{
      			caption: 'Title'
      			,name: 'caption'
      			,type: 'input'
      			,value: function(item,name,index) {
          			return item.tabs[index].caption;
          		}
  			}
         ]
         ,interactions: [
          	{
      			caption: 'Interactions'
      			,name: 'actions'
      			,type: 'action'
      			,value: function(item,name,index) {
  					if (typeof(item.tabs[index].actions) == "undefined") {
  						item.tabs[index].actions = [];
  					}		
          		
          			return item.tabs[index].actions.length;
          		}
          	}
          ] 
	}
};

//TYPE: SCROLLABLE TABBAR
prx.types.android_scrollabletabbar = {
	name: "android_scrollabletabbar"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		var _dims = getRealDims(item,symbol);
		var _tabs = item.tabs.split("<br />");
		
		var cR = '<div id="'+_id+'" class="box pos type-android-scrollable-tabbar">';
		
		cR += '<style>'
		cR += '#'+_id+' .scrollable-tabbar-inner { background-color: '+getColor(item.backgroundColor)+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; color: '+getColor(item.textColor)+'; '+_props+' }'
		//cR += '#'+_id+' .scrollable-tabbar-inner:before { '+cssGradient([{ c: getColor(item.backgroundColor), p: 0}, { c: 'rgba(0,0,0,0)', p:100 }], 'to right center')+';}'
		//cR += '#'+_id+' .scrollable-tabbar-inner:after { '+cssGradient([{ c: 'rgba(0,0,0,0)', p:0 }, { c: + getColor(item.backgroundColor), p: 100}], 'to right center')+';}'
		cR += '#'+_id+' .scrollable-tabbar-container { width: '+parseInt(_dims.width*(_tabs.length)/2)+'px; padding-left: '+parseInt(_dims.width/2)+'px;}'
		cR += '#'+_id+' li { width: '+_dims.width+'px; margin-left: -'+parseInt(_dims.width/2)+'px; line-height: '+_dims.height+'px; }'
		cR += '</style>'
			
		cR += '<div class="scrollable-tabbar-inner liveUpdate-backgroundColor liveUpdate-textColor" id="' + _id + '-inner"><ul class="scrollable-tabbar-container">'
		for(var i = 0; i < _tabs.length; i++) {
			cR += '<li>'+_tabs[i]+'</li>'
		}
		cR += '</ul></div>'
		cR += '</div>'
		return cR;
	}
	,onResize:  function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _tabs = item.tabs.split("<br />");
		
		$('#'+_id+' .scrollable-tabbar-container').css({
			width: parseInt(_dims.width*(_tabs.length)/2) + 'px',
			'padding-left': parseInt(_dims.width/2)+'px'
		})
		$('#'+_id+' li').css({
			width: _dims.width + 'px',
			'margin-left': '-'+parseInt(_dims.width/2)+'px',
			'line-height': _dims.height+'px'
		})
	}
	,afterDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _origin = '-' + (_dims.width/2 * item.selected) + 'px';
		
		if(!prx.editor) {
			prx.scrollableTabbars.push({
				id: item.id,
				container: containerid,
				linked: item.linkedContainer,
				start: item.selected
			})
		} else {
			$('#'+_id+' .scrollable-tabbar-container').css('margin-left', _origin)
		}
	}
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
				   prx.commonproperties.backgroundColor
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		},{
			caption: 'Data',
			properties: [
				[
					{
						caption: 'Tabs (Separated by line breaks)'
						,name: 'tabs'
						,type: 'textarea'
						,value: function(item,name) {
							return item.tabs;
						}
						,onChange: function(item,name) {
							var _options = item.tabs.split("<br />");
							
							var cR = '';
							
							var _values = [{displayValue: 'None', value: -1}];
							for(var i = 0; i < _options.length; i++) {
								cR += '<option value="'+i+'" '+((item.selectedValue == i) ? 'selected' : '')+'>'+_options[i]+'</option>'
							}
							
							$('#property-selected select').html(cR);
						}
					}
				],[
					{
						caption: 'Linked container'
						,name: 'linkedContainer'
						,type: 'select'
						,value: function(item,name) {
							//debugger;
							return item.linkedContainer;
						}
						,values: function(){
							var _rA = [{value: -1, displayValue: 'Select a container'}];
							for(var i=0; i<prx.data.items.length; i++) {
								if(prx.data.items[i].type == "symbol") {
									_rA.push({value: prx.data.items[i].id,displayValue: prx.data.items[i].caption});
								}
							}
							
							return _rA;
						}
					}
				]
			]
		},{
			caption: 'Advanced',
			properties: [
			     [
					{
							caption: 'Active tab'
							,name: 'selected'
							,type: 'select'
							,value: function(item,name) {
								return item.selected;
							}
							,values: function(item,name) {
								var _values = [];
								var _options = item.tabs.split("<br />");
								for(var i = 0; i < _options.length; i++) {
									_values.push({
										displayValue: _options[i],
										value: i
									});
								}
								return _values;
							} 
					}
				],
				[
					{
							caption: 'Position fixed on transitions'
							,name: 'overlay'
							,type: 'onoff'
							,value: function(item,name) {
								if(typeof(item.overlay)=="undefined") {
									return false;
								}
								return item.overlay;
							}
					}
				]
			]
		}
	]
}

//TYPE: SPINNER
prx.types.android_spinner = {
	name: "android_spinner"
		,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = '<div id="'+_id+'" class="box pos type-android-spinner">';
		cR += '<div class="inner liveUpdate-textColor liveUpdate-togglerColor" style="font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' color: '+getColor(item.textColor)+'; '+_props+' '+((item.bottomBorder) ? 'padding: 0 10px; border-bottom: 1px solid ' +getColor(item.togglerColor)+ ';': '')+'">'
		cR += '<span data-editableproperty="text">'+item.text+'</span>';
		cR += '<div class="toggler liveUpdate-togglerColor" style="border-color: '+getColor(item.togglerColor)+';border-width: '+parseInt(item.togglerSize/2)+'px;"></div>'
		cR += '</div></div>';
		return cR;
	}
	,interactions:[
		prx.commonproperties.actions
	]
	,editableProperties: [
	    prx.commonproperties.text                 
	]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
				   { 
						caption: 'Toggler', 
						name: 'togglerSize', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.togglerSize; 
						}, 
						values: { min: 4, max: 20, step: 2 } 
					}
					,{ 
						caption: false, 
						name: 'togglerColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.togglerColor; 
						},
						liveUpdate: 'border-color'
					}
				],
				[
					{
						caption: 'Display bottom border'
						,name: 'bottomBorder'
						,type: 'onoff'
						,value: function(item,name) {
							return item.bottomBorder;
						}
					}
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		}
	]
}


//TYPE: DROPDOWN
prx.types.android_dropdown = {
	name: "android_dropdown"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var _dims = getRealDims(item,symbol);
		var _height = Math.round((_dims.height) / item.options.length);
		
		switch(item.iconpos) {
			case 'left':
			case 'right':
				var _iconSize = item.iconSize * 20;
				var _iconWidth = Math.ceil(_height * (_iconSize/100)) + 'px';
				break;
			case 'notext':
				var _iconSize = item.iconSize * 20;
				var _iconWidth = _dims.width - 20 + 'px';
				break;
		}
		
		var cR = '<div id="'+_id+'" class="box pos type-android-dropdown">';
		cR += '<ul class="liveUpdate-backgroundColor liveUpdate-textColor" style="color: '+getColor(item.textColor)+'; background: '+getColor(item.backgroundColor)+'; '+((item.enableShadow) ? 'box-shadow: 0 '+item.shadowSpread+'px '+item.shadowSpread+'px '+getColor(item.shadowColor)+ ';' : '')+'">'
		$.each(item.options, function(i,elm){
			cR += '<li class="dynamic-property liveUpdate-dividerColor" data-dynamic-property-index="'+i+'" id="'+_id+'-options-'+i+'" style="height: '+_height+'px; line-height: '+parseInt(_height - item.dividerThickness)+'px; border-bottom: ' + item.dividerThickness + 'px solid ' +getColor(item.dividerColor)+ '">';
			cR += '<input id="'+_id+'-input-'+i+'" type="radio" name="'+_id+'-input" data-role="none">'
			cR += '<label for="'+_id+'-input-'+i+'">'
			if(item.iconpos != '') {
				cR += '<div class="icon" style="background-image: url('+getAssetUrl(elm.icon)+'); background-size: auto '+_iconSize+'%; width: '+_iconWidth+'; '+((item.iconpos == 'notext')? '' : 'float: ' + item.iconpos + ';')+'"></div>'
			}
			if(item.iconpos != 'notext') {
				cR += '<div class="caption liveUpdate-activeTextColor" style="font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' '+_props+'"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+elm.text+'</span></div>'
			}
			cR += '</label></li>'
		});	
		cR += '</ul>'
		cR += '<style>#'+_id+' input:checked + label { background: '+getColor(item.activeBackgroundColor)+'; color: '+getColor(item.activeTextColor)+'; }</style>'
		cR += '</div>'
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _height = Math.round((_dims.height-1-item.options.length) / item.options.length);
		$('#'+ _id + ' li')
			.css('line-height', _height + 'px')
			.css('height', _height + 'px')
			
		switch(item.iconpos) {
			case 'left':
			case 'right':
				var _iconSize = item.iconSize * 20;
				var _iconWidth = Math.ceil(_height * (_iconSize/100));
				$('#'+ _id + ' .icon').width(_iconWidth)
				break;
		}
	}
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
					,{
						caption: 'Active',
						name: 'activeBackgroundColor',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeBackgroundColor			
						}
					}
				],[
					{ 
						caption: 'Border', 
						name: 'dividerThickness', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.dividerThickness; 
						}, 
						values: { min: 0, max: 10, step: 1 } 
					},{ 
						caption: false, 
						name: 'dividerColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.dividerColor; 
						} 
						,liveUpdate: 'border-color'
					}
				],[
					{
						caption: 'Shadow?',
						name: 'enableShadow',
						type: 'onoff',
						value: function(item,name) {
							return item.enableShadow
						},
						onChange: function(item){
							if(item.enableShadow) {
								$('#property-shadowColor, #property-shadowSpread').show();
							} else {
								$('#property-shadowColor, #property-shadowSpread').hide();
							}
						}
					},
					{ 
						caption: 'Spread', 
						name: 'shadowSpread', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.shadowSpread; 
						}, 
						values: { min: 1, max: 10, step: 1 }
						,hiddenByDefault: function(item) {
							return (!item.enableShadow);
						}
					},{ 
						caption: false, 
						name: 'shadowColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.shadowColor; 
						} 
						,hiddenByDefault: function(item) {
							return (!item.enableShadow);
						}
					}
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					{ 
						caption: false, 
						name: 'textFont', 
						type: 'select', 
						value: function(item,name) { return item.textFont; }, 
						values: function(){ return prx.comps.fonts }
						,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
					}
					,{ 
						caption: false, 
						name: 'textSize', 
						type: 'combo-select', 
						value: function(item,name) { return item.textSize; }, 
						values: prx.comps.textsize
						,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
					}
					,{ 
						caption: false, 
						name: 'textColor', 
						type: 'colorpicker', 
						value: function(item,name) { return item.textColor; },
						hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						},
						liveUpdate: 'color' 
					}
				],[
				   	{ 
				   		caption: false, 
				   		name: 'textProperties', 
				   		type: 'checkbox', 
				   		value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; }, 
				   		values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underine"></span>'}] 
				   		,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
				   	}
					,{
						caption: 'Active',
						name: 'activeTextColor',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeTextColor			
						},
						hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
					}
				]
			]
		}
		,{
			caption: 'Icon',
			properties: [
				[
					{
						caption: false
						,name: 'iconpos'
						,type: 'select'
						,value: function(item,name) {
							return item.iconpos;
							}
						,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
						,onChange: function(item){
							if(item.iconpos == '') {
								$('[id=property-icon], #property-iconSize').hide();
							} else {
								$('[id=property-icon], #property-iconSize').show();
							}
							if(item.iconpos == 'notext') {
								$('[id=property-text], #property-textSize, #property-textFont, #property-textColor, #property-textProperties, #property-activeTextColor').hide();
							} else {
								$('[id=property-text], #property-textSize, #property-textFont, #property-textColor, #property-textProperties, #property-activeTextColor').show();
							}
							return false;
						}
					},
					{
						caption: false
						,name: 'iconSize'
						,type: 'select'
						,value: function(item,name) {
							return item.iconSize;
						}
						,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
						,hiddenByDefault: function(item,name){
							return (item.iconpos == '');
						}
					}
				]
			]
		}
	]
	

  	,dynamicProperties: {
		data: 'options'
		,propertyCaption: 'Options'
  		,propertyName: 'Options'
		,addCaption: 'Add option'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,icon: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
			,actions: []
		}
		,captionProperty: 'text'
		,interactions: [
				{
					caption: 'Interactions'
					,name: 'actions'
					,type: 'action'
					,value: function(item,name,index) {
							if (typeof(item.options[index].actions) == "undefined") {
								item.options[index].actions = [];
							}		
					
						return item.options[index].actions.length;
					}
				}
		]
		,editableProperties: [
			{
				caption: 'Label'
				,name: 'text'
				,type: 'input'
				,value: function(item,name,index) {
					return item.options[index].text;
				}
			}
		                      ]
		,propertyGroups: [			
			{
				caption: 'Icon',
				properties: [
					[
						{
							caption: false
							,name: 'icon'
							,type: 'combo-asset'
							,displayValue: function(item,name,index) {
								if(item.options[index].icon.url == '') {
									return 'No icon selected';
								}
								return item.options[index].icon.name;
							}
							,value: function(item,name,index) {
								return $.toJSON({
									allow: 'image',
									asset: item.options[index].icon
								});
							}
							,hiddenByDefault: function(item,name,index){
								return (item.iconpos == '');
							}
						}
					]
				]
			}
		]
		
		
	}
}

/***** BUTTON COMPONENTS *****/

// TYPE: BUTTON
prx.types.android_button = {
	name: "android_button"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var _dims = getRealDims(item, symbol);
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = "";
		cR = cR + '<div id="' + _id + '" class="pos box type-android-button">';
		cR = cR + '<div class="button liveUpdate-backgroundColor liveUpdate-textColor" style="box-shadow: 0 1px 1px '+getColor(item.shadowColor)+'; background: '+getColor(item.backgroundColor)+'; height: 100%; line-height: '+_dims.height+'px; '+getFontCssFromFontFamily(item.textFont)+' '+_props+' color: '+getColor(item.textColor)+'; font-size: '+item.textSize+'px;">'
		
		if(item.buttonicon.url != '') {
			switch(item.iconpos) {
			case 'left': 
			case 'right':
				cR = cR + '<img src="'+getAssetUrl(item.buttonicon)+'" style="float: '+item.iconpos+'; padding-'+item.iconpos+': 7px;height: '+eval(_dims.height*0.2*item.iconSize)+'px; padding-top: '+eval(_dims.height*0.1*(5-item.iconSize))+'px; " />';
				break;
			case 'notext':
				cR = cR + '<img src="'+getAssetUrl(item.buttonicon)+'" style="height: '+eval(_dims.height*0.2*item.iconSize)+'px; padding-top: '+eval(_dims.height*0.1*(5-item.iconSize))+'px; " />';
				break;
			case '':
			default:
				break
			}
	
		}

		if(item.iconpos != "notext"){
			cR += '<span data-editableproperty="text">' + item.text + '</span>';
		}
		cR = cR + '</div>';
		cR = cR + '</div>';
		return cR;
	}
	,interactions:[
		prx.commonproperties.actions
	]
	,editableProperties: [
	    prx.commonproperties.text       
	]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				,
					{
	      				caption: 'Shadow'
	      				,name: 'shadowColor'
	      				,type: 'colorpicker'
	      				,value: function(item,name) {
	      					return item.shadowColor;
	      				}
	      			}
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					{ 
						caption: false, 
						name: 'textFont', 
						type: 'select', 
						value: function(item,name) { return item.textFont; }, 
						values: function(){ return prx.comps.fonts }
						,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
					}
					,{ 
						caption: false, 
						name: 'textSize', 
						type: 'combo-select', 
						value: function(item,name) { return item.textSize; }, 
						values: prx.comps.textsize
						,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
					}
					,{ 
						caption: false, 
						name: 'textColor', 
						type: 'colorpicker', 
						value: function(item,name) { return item.textColor; },
						hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						},
						liveUpdate: 'color' 
					}
				],[
				   	{ 
				   		caption: false, 
				   		name: 'textProperties', 
				   		type: 'checkbox', 
				   		value: function(item,name) { if(typeof(item.textProperties) == "undefined") {item.textProperties = [];} return item.textProperties; }, 
				   		values: [{ value: 'bold', displayValue: '<span class="property-icon property-text-bold" title="Bold"></span>'}, { value: 'italic', displayValue: '<span class="property-icon property-text-italic" title="Italic"></span>'}, { value: 'underline', displayValue: '<span class="property-icon property-text-underline" title="Underine"></span>'}] 
				   		,hiddenByDefault: function(item) {
							return (item.iconpos == 'notext')
						}
				   	}
				]
			]
		},{
			caption: 'Icon',
			properties: [
				[
					{
		      			caption: false
		      			,name: 'iconpos'
		      			,type: 'select'
		      			,value: function(item,name) {
	      					return item.iconpos;
	              		}
	      				,values: [{value: '',displayValue: 'No icon'},{value: 'left',displayValue: 'Left'},{value: 'right',displayValue: 'Right'},{value: 'notext',displayValue: 'Icon only (no text)'}]
	      				,onChange: function(item){
	      					if(item.iconpos == '') {
	      						$('#property-buttonicon, #property-iconSize').hide();
	      					} else {
	      						$('#property-buttonicon, #property-iconSize').show();
	      					}
	      					
	      					if(item.iconpos == "notext") {
	      						$('#property-textFont, #property-textSize, #property-textColor, #property-textProperties').hide();
	      					} else {
	      						$('#property-textFont, #property-textSize, #property-textColor, #property-textProperties').show();
	      					}
		      				return false;
	      				}
	      			}
					,
	      			{
	      				caption: false
	      				,name: 'iconSize'
	      				,type: 'select'
	      				,value: function(item,name) {
	      					return item.iconSize;
	      				}
	      				,values: [{ value: '1', displayValue: 'Very small'}, { value: '2', displayValue: 'Small'}, { value: '3', displayValue: 'Normal'}, { value: '4', displayValue: 'Large'}, { value: '5', displayValue: 'Full'}]
	      				,hiddenByDefault: function(item,name){
	      					return (item.iconpos == '');
	      				}  
	      			}
				],[
	      			{
	      				caption: false
	      				,name: 'buttonicon'
	      				,type: 'combo-asset'
	      				,displayValue: function(item,name) {
	      					if(item.buttonicon.url == '') {
      							return 'No icon selected';
      						}
      						return item.buttonicon.name;
	      				}
	      				,value: function(item,name) {
	      					return $.toJSON({
	      						allow: 'image',
	      						asset: item.buttonicon
	      					});
	      				}
	      				,hiddenByDefault: function(item,name){
	      					return (item.iconpos == '');
	      				}
	      			}
	      		]
			]
		}
	]
	
};


// TYPE: BORDERLESS BUTTON 
prx.types.android_borderlessbutton = cloneobject(prx.types.android_button);
prx.types.android_borderlessbutton.name = 'android_borderlessbutton';
removeProperties(prx.types.android_borderlessbutton.propertyGroups, ['backgroundColor', 'shadowColor'])


/***** FORM COMPONENTS *****/

// TYPE: LABEL
prx.types.android_label = {
	name: "android_label"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = '<div id="'+_id+'" class="pos box type-android-label">';
		cR += '<div class="inner liveUpdate-textColor liveUpdate-bottomBorderColor" style="font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' color: '+getColor(item.textColor)+'; '+_props+' '+((item.bottomBorder) ? 'padding: 0 10px; border-bottom: ' + item.bottomBorderWidth + 'px solid ' +getColor(item.bottomBorderColor)+ ';': '')+'">'
		cR += '<span data-editableproperty="text">'+item.text+'</span>'
		cR += '</div></div>';
		return cR;
	}
	,editableProperties: [
	                      prx.commonproperties.text
	                    ]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					{
						caption: 'Full line label'
						,name: 'bottomBorder'
						,type: 'onoff'
						,value: function(item,name) {
							return item.bottomBorder;
						}
						,onChange: function(item) {
							if(item.bottomBorder) {
								$('#property-bottomBorderWidth, #property-bottomBorderColor').show();
							} else {
								$('#property-bottomBorderWidth, #property-bottomBorderColor').hide();
							}
						}
					}
				],[
					{ 
						caption: 'Bottom border', 
						name: 'bottomBorderWidth', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.bottomBorderWidth; 
						}, 
						values: { min: 1, max: 10, step: 1 } 
						,hiddenByDefault: function(item) {
							return !item.bottomBorder;
						}
					}
					,{ 
						caption: false, 
						name: 'bottomBorderColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.bottomBorderColor; 
						}
						,hiddenByDefault: function(item) {
							return !item.bottomBorder;
						}
						,liveUpdate: 'border-color'
					}
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		}
	]
	
}

//TYPE: TEXTFIELD
prx.types.android_textfield = {
	name: 'android_textfield'
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		if(typeof(item.backgroundColor)=="undefined") { item.backgroundColor = 'none' }
		if(typeof(item.textAlign) == "undefined") { item.textAlign = 'left'; }
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		var cR = '';
		var _dims = getRealDims(item,symbol);

		cR += '<div id="' + _id + '" class="box pos type-android-textfield type-android-textfield-'+item.inputtype+'">';
		cR += '<style>';
		cR += '#'+_id+' input:-moz-placeholder { color: '+getColor(item.placeholderColor)+'!important; }';
		cR += '#'+_id+' input::-moz-placeholder { color: '+getColor(item.placeholderColor)+'!important; }';
		cR += '#'+_id+' input::-webkit-input-placeholder { color: '+getColor(item.placeholderColor)+'!important; }';
		cR += '#'+_id+' input:focus { border-bottom-color: '+getColor(item.focusedBorderColor)+'!important; }'
		cR += '#'+_id+' input:focus ~ .left-edge, #'+_id+' input:focus ~ .right-edge { background: '+getColor(item.focusedBorderColor)+'!important; }'
		cR += '#'+_id+' .faux-input { line-height: ' +(_dims.height - parseInt(item.borderWidth))+ 'px; }';
		cR += '</style>'
			
			
		if(prx.editor) {
			cR += '<div class="faux-input liveUpdate-textColor liveUpdate-backgroundColor liveUpdate-borderColor-border-color" data-editableproperty="value" style="color: '+getColor(item.textColor)+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' border-bottom: '+item.borderWidth+'px solid '+getColor(item.borderColor)+'; '+ _props + '; background-color: '+getColor(item.backgroundColor)+'; text-align: '+item.textAlign+';">'+item.value+'</div>';
			cR += '<div class="faux-input placeholder-input liveUpdate-placeholderColor liveUpdate-borderColor-border-color liveUpdate-backgroundColor" style="color: '+getColor(item.placeholderColor)+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' border-bottom: '+item.borderWidth+'px solid '+getColor(item.borderColor)+'; '+ _props + '; background-color: '+getColor(item.backgroundColor)+'; text-align: '+item.textAlign+';">'+item.placeholder+'</div>'
		} else {
			cR += '<input type="text" value="" style="display: none; width: 0px; height: 0px;" autofocus/>';
			cR += '<input type="'+item.inputtype+'" value="'+item.value+'" placeholder="'+item.placeholder+'" style="color: '+getColor(item.textColor)+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' border-bottom: '+item.borderWidth+'px solid '+getColor(item.borderColor)+'; '+ _props + '; background-color: '+getColor(item.backgroundColor)+'; text-align: '+item.textAlign+';" data-role="none" />';
		}
		cR += '<span class="left-edge liveUpdate-borderColor-background-color" style="width: '+item.borderWidth+'px; background-color: ' + getColor(item.borderColor) + '"></span><span class="right-edge liveUpdate-borderColor-background-color" style="width: '+item.borderWidth+'px; background-color: ' +getColor(item.borderColor)+ '"></span>'
		cR += '</div>';
		return cR;
	}
	,interactions:
		[
			prx.commonproperties.actions
		]
	,editableProperties: [
		{
			caption: 'Value'
			,name: 'value'
			,type: 'input'
			,value: function(item,name) {
				return item.value;
			}
		}
	                      ]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				],
				[
					{ 
						caption: 'Border', 
						name: 'borderWidth', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.borderWidth; 
						}, 
						values: { min: 1, max: 5, step: 1 } 
					}
					,{ 
						caption: false, 
						name: 'borderColor', 
						type: 'colorpicker', 
						value: function(item,name) { return item.borderColor; }, 
						liveUpdate: 'border-color,background-color' 
					}
					,{ 
			      		caption: 'Focused', 
			      		name: 'focusedBorderColor', 
			      		type: 'colorpicker', 
			      		value: function(item,name) { 
			      			return item.focusedBorderColor; 
			      		} 
			      	}
				]
			]
		},{
			caption: 'Text',
			properties: [				
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],	
				[
					prx.commonproperties.textProperties
					,prx.commonproperties.textAlign
				]
			]
		},{
			caption: 'Placeholder (If field is empty)',
	    	properties: [
				[
					{
						caption: false,
						name: 'placeholder',
						type: 'input',
						value: function(item,name) {
							return item.placeholder;
						}
					}
				],
				[
					{ 
					   caption: 'Placeholder Color', 
					   name: 'placeholderColor', 
					   type: 'colorpicker', 
					   value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; } 
					   ,liveUpdate:'color'
				   }
				]
			]
		}
	]
	/*,properties: [
	    {
	    	caption: 'Value'
	    	,name: 'value'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.value;
	    	}
	    }
      	,{
	    	caption: 'Placeholder (If "Value" is empty)'
	    	,name: 'placeholder'
	    	,type: 'input'
	    	,value: function(item,name) {
	    		return item.placeholder;
	    	}
	    }
      	,prx.commonproperties.textColor
      	,{ 
      		caption: 'Placeholder Color', 
      		name: 'placeholderColor', 
      		type: 'colorpicker', 
      		value: function(item,name) { if(typeof(item.placeholderColor)=='undefined') { return '999999'; } return item.placeholderColor; } 
      	}
      	,prx.commonproperties.textFont
      	,prx.commonproperties.textSize
  		,prx.commonproperties.textProperties
  		,prx.commonproperties.textAlign
  		,{ 
			caption: 'Border width', 
			name: 'borderWidth', 
			type: 'slider-select', 
			value: function(item,name) { 
				return item.borderWidth; 
			}, 
			values: { min: 1, max: 5, step: 1 } 
		}
      	,prx.commonproperties.borderColor
      	,{ 
      		caption: 'Focused border color', 
      		name: 'focusedBorderColor', 
      		type: 'colorpicker', 
      		value: function(item,name) { 
      			return item.focusedBorderColor; 
      		} 
      	}
      	,{ 
      		caption: 'Background color', 
      		name: 'backgroundColor', 
      		type: 'colorpicker', 
      		value: function(item,name) { 
      			if(typeof(item.backgroundColor) == "undefined") {
      				return 'none'
      			}
      			return item.backgroundColor; 
      		} 
      	}
      	,prx.commonproperties.actions
   ]*/
};


//TYPE: CHECKBOX
prx.types.android_checkbox = {
	name: "android_checkbox"
		,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		
		cR += '<style>'
		cR += '#'+_id+' label { background-color: '+getColor(item.backgroundColor)+'; border-color: '+getColor(item.borderColor)+'; }'
		cR += '#'+_id+' label span { font-size: '+(item.height*1.5)+'px; color: '+getColor(item.activeColor)+'; line-height: '+item.height+'px; }'
		cR += '</style>'
		
		var _check = '';
		var _active = "";
		
		if(item.active) {
			_active = 'checked="checked"';
		}
		cR += '<div id="' + _id + '" class="box pos type-android-checkbox">';
		cR += '<input type="checkbox" id="'+_id+'-checkbox" '+_active+' style="display: none;" data-role="none" />';
		cR += '<label for="'+_id+'-checkbox" class="liveUpdate-backgroundColor liveUpdate-borderColor"><span class="liveUpdate-activeColor">&#10004;</span></label>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#'+_id+' label span').css({
			'font-size': (item.height*1.5) + 'px',
			'line-height': item.height + 'px'
		})
	}
	,interactions: [
					{
						caption: 'Interactions on activation', 
						name: 'checkboxActionsOnActive', 
						type: 'action',
						value: function(item,name) {
							if(typeof(item.checkboxActionsOnActive) == "undefined") {
								item.checkboxActionsOnActive = [];
							}
							return item.checkboxActionsOnActive.length; 
						}
					},
					{
						caption: 'Interactions on deactivation', 
						name: 'checkboxActionsOnDeactive', 
						type: 'action', 
						value: function(item,name) {
							if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
								item.checkboxActionsOnDeactive = [];
							}
							return item.checkboxActionsOnDeactive.length; 
						}
					}
	]
	,propertyGroups: [			
		{
			caption: 'Style',
	    	properties: [
				[
					prx.commonproperties.backgroundColor
					,{ 
						caption: 'Border', 
						name: 'borderColor', 
						type: 'colorpicker', 
						value: function(item,name) { return item.borderColor; }, 
						liveUpdate: 'border-color' 
					}
				],
				[
					{
						caption: 'Checkmark'
						,name: 'activeColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeColor;
						}
						,liveUpdate: 'color'
					}
				 ]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
					}
				]
			]
		}
	]
	/*,properties: [
        	    prx.commonproperties.backgroundColor
        	    ,prx.commonproperties.borderColor
        	    ,{
        			caption: 'Active color'
                	,name: 'activeColor'
        			,type: 'colorpicker'
        			,value: function(item,name) {
        				return item.activeColor;
        			}
        		}
        	    ,{
        			caption: 'Active'
                	,name: 'active'
        			,type: 'onoff'
        			,value: function(item,name) {
        				return item.active;
        			}
        		}
        	    ,{ 
          			caption: 'Interactions on activation', 
          			name: 'checkboxActionsOnActive', 
          			type: 'action',
          			value: function(item,name) {
          				if(typeof(item.checkboxActionsOnActive) == "undefined") {
          					item.checkboxActionsOnActive = [];
          				}
          				return item.checkboxActionsOnActive.length; 
          			} 
          		}
          		,{ 
          			caption: 'Interactions on deactivation', 
          			name: 'checkboxActionsOnDeactive', 
          			type: 'action', 
          			value: function(item,name) {
	          			if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
	      					item.checkboxActionsOnDeactive = [];
	      				}
	      				return item.checkboxActionsOnDeactive.length; 
          			}  
          		}
        	]*/
}

//TYPE: RADIOBUTTON
prx.types.android_radiobutton = {
	name: "android_radiobutton"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		
		if(typeof(item.actAsCheckbox) == "undefined") { item.actAsCheckbox = false; }
		var _type = (item.actAsCheckbox) ? 'checkbox' : 'radio';
		
		cR += '<style>'
		cR += '#'+_id+' label { background-color: '+getColor(item.backgroundColor)+'; border-color: '+getColor(item.borderColor)+'; }'
		cR += '#'+_id+' label span { background-color: '+getColor(item.activeColor)+'; margin: '+Math.round(item.height*0.1)+'px 0 0 '+Math.round(item.height*0.1)+'px;}'
		cR += '</style>'
		
		var _check = '';
		var _active = "";
		
		if(item.active) {
			_active = 'checked="checked"';
		}
		cR += '<div id="' + _id + '" class="box pos type-android-radiobutton">';
		cR += '<input type="'+_type+'" id="'+_id+'-checkbox" '+_active+' style="display: none;" data-role="none" />';
		cR += '<label class="liveUpdate-backgroundColor liveUpdate-borderColor" for="'+_id+'-checkbox"><span class="liveUpdate-activeColor"></span></label>';
		cR += '</div>';
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		$('#'+_id+' label span').css('margin', Math.round(item.height*0.1)+'px 0 0 '+Math.round(item.height*0.1)+'px')
	}
	
	,interactions: [
		{ 
			caption: 'Interactions on activation', 
			name: 'checkboxActionsOnActive', 
			type: 'action',
			value: function(item,name) {
				if(typeof(item.checkboxActionsOnActive) == "undefined") {
					item.checkboxActionsOnActive = [];
				}
				return item.checkboxActionsOnActive.length; 
			}

		},
		{
			caption: 'Interactions on deactivation', 
			name: 'checkboxActionsOnDeactive', 
			type: 'action', 
			value: function(item,name) {
				if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
					item.checkboxActionsOnDeactive = [];
				}
				return item.checkboxActionsOnDeactive.length; 
			}  
		
		}
	]
	,propertyGroups: [			
		{
			caption: 'Style',
	    	properties: [
				[
					prx.commonproperties.backgroundColor
					,{ 
						caption: 'Border', 
						name: 'borderColor', 
						type: 'colorpicker', 
						value: function(item,name) { return item.borderColor; }, 
						liveUpdate: 'border-color' 
					}
				],
				[
					{
						caption: 'Active'
						,name: 'activeColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeColor;
						}
						,liveUpdate: 'background-color'
					}
				 ]
			]
		},{
			caption: 'Advanced',
			properties: [
				[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
					}
				],[
					{
						caption: 'Act as checkbox'
						,name: 'actAsCheckbox'
						,type: 'onoff'
						,value: function(item,name) {
							return item.actAsCheckbox;
						}
					}
				]
			]
		}
	]
	/*,properties: [
	    prx.commonproperties.backgroundColor
	    ,prx.commonproperties.borderColor
	    ,{
			caption: 'Active color'
        	,name: 'activeColor'
			,type: 'colorpicker'
			,value: function(item,name) {
				return item.activeColor;
			}
		}
	    ,{
			caption: 'Active'
        	,name: 'active'
			,type: 'onoff'
			,value: function(item,name) {
				return item.active;
			}
		}
	    ,{
			caption: 'Act as checkbox'
        	,name: 'actAsCheckbox'
			,type: 'onoff'
			,value: function(item,name) {
				return item.actAsCheckbox;
			}
		}
	    ,{ 
  			caption: 'Interactions on activation', 
  			name: 'checkboxActionsOnActive', 
  			type: 'action',
  			value: function(item,name) {
  				if(typeof(item.checkboxActionsOnActive) == "undefined") {
  					item.checkboxActionsOnActive = [];
  				}
  				return item.checkboxActionsOnActive.length; 
  			} 
  		}
  		,{ 
  			caption: 'Interactions on deactivation', 
  			name: 'checkboxActionsOnDeactive', 
  			type: 'action', 
  			value: function(item,name) {
      			if(typeof(item.checkboxActionsOnDeactive) == "undefined") {
  					item.checkboxActionsOnDeactive = [];
  				}
  				return item.checkboxActionsOnDeactive.length; 
  			}  
  		}
	]*/
}

//TYPE: ONOFF SWITCH
prx.types.android_onoffswitch = {
	name: "android_onoffswitch"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		
		var cR = '';
		var _active = '';
		
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		
		if(item.active) {
			_active = 'checked="checked"';
		}
		
		cR += '<div id="' + _id + '" class="box pos type-android-onoffswitch">';
		
		cR += '<style>'
		cR += '#'+_id+' label .onoffswitch-inner { background-color: '+getColor(item.backgroundColor)+'; height: '+(item.height-4)+'px; '+getFontCssFromFontFamily(item.textFont)+'; font-size: '+item.textSize+'px; '+_props+'}'
		cR += '#'+_id+' .activelabel { width: '+Math.ceil(item.width*0.4)+'px; line-height: '+(item.height-4)+'px; background-color: '+getColor(item.activeLabelColor)+'; color: '+getColor(item.activeLabelTextColor)+';}'
		cR += '#'+_id+' .inactivelabel { width: '+Math.ceil(item.width*0.4)+'px; line-height: '+(item.height-4)+'px; background-color: '+getColor(item.inactiveLabelColor)+'; color: '+getColor(item.inactiveLabelTextColor)+'; }'
		cR += '#'+_id+' .inactivelabel .label-edge { border-color: '+getColor(item.inactiveLabelColor)+'; border-width: '+Math.ceil(item.height/2)+'px '+Math.ceil(item.width*0.1)+'px; right: -'+Math.ceil(item.width*0.2)+'px; }';
		cR += '#'+_id+' .activelabel .label-edge { border-color: '+getColor(item.activeLabelColor)+'; border-width: '+Math.ceil(item.height/2)+'px '+Math.ceil(item.width*0.1)+'px; left: -'+Math.ceil(item.width*0.2)+'px; }';
		cR += '#'+_id+' .activelabel:before, #'+_id+' .inactivelabel:before { background-color: '+getColor(item.backgroundColor)+'; }'  
		cR += '</style>'
		
		// checkbox needs to stay "id-flipswitch" for player compatibility!
		cR += '<input type="checkbox" '+_active+ ' id="'+_id+'-flipswitch" data-role="none" />';
		cR += '<label for="'+_id+'-flipswitch">';
		cR += '<div class="onoffswitch-inner liveUpdate-backgroundColor">'
		cR += '<span class="inactivelabel liveUpdate-inactiveLabelColor-background-color liveUpdate-inactiveLabelTextColor"><span data-editableproperty="inactiveLabelText">'+item.inactiveLabelText+'</span><span class="label-edge liveUpdate-inactiveLabelColor-border-color"></span></span>';
		cR += '<span class="activelabel liveUpdate-activeLabelColor-background-color liveUpdate-activeLabelTextColor"><span data-editableproperty="activeLabelText">'+item.activeLabelText+'</span><span class="label-edge liveUpdate-activeLabelColor-border-color"></span></span>';
		cR += '</div>';
		cR += '</label>';
		cR += '</div>';
		
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _h = item.height-4;
		$('#'+_id+' label .onoffswitch-inner').height(_h)
		$('#'+_id+' label .activelabel, #'+_id+' label .inactivelabel').css({
			'width': Math.ceil(item.width*0.4) + 'px',
			'line-height': _h + 'px'
		})
		$('#'+_id+' label .activelabel span').css({
			'border-width':  Math.ceil(item.height/2)+'px '+Math.ceil(item.width*0.1)+'px',
			'left': '-'+Math.ceil(item.width*0.2)+'px'
		})
		$('#'+_id+' label .inactivelabel span').css({
			'border-width':  Math.ceil(item.height/2)+'px '+Math.ceil(item.width*0.1)+'px',
			'right': '-'+Math.ceil(item.width*0.2)+'px'
		})
	}
	,interactions: [
			{ 
				caption: 'Interactions on activation', 
				name: 'flipswitchActionsOnActive', 
				type: 'action',
				value: function(item,name) {
				if(typeof(item.flipswitchActionsOnActive) == "undefined") {
						if (typeof(item.actionsOnActive) == "undefined") { 
							item.flipswitchActionsOnActive = []; 
						} else {
							item.flipswitchActionsOnActive = item.actionsOnActive;
						}
					}
					return item.flipswitchActionsOnActive.length; 
				} 
			}
			,{ 
				caption: 'Interactions on deactivation', 
				name: 'flipswitchActionsOnDeactive', 
				type: 'action', 
				value: function(item,name) {
					if(typeof(item.flipswitchActionsOnDeactive) == "undefined") {
						if (typeof(item.actionsOnDeactive) == "undefined") { 
							item.flipswitchActionsOnDeactive = []; 
						} else {
							item.flipswitchActionsOnDeactive = item.actionsOnDeactive;
						}
					}
					return item.flipswitchActionsOnDeactive.length; 
				}  
			}
		]
	,editableProperties: [
		{
			caption: 'Active Label'
			,name: 'activeLabelText'
			,type: 'input'
			,value: function(item,name) {
				return item.activeLabelText;
			}
		}
		,{
			caption: 'Inactive Label'
			,name: 'inactiveLabelText'
			,type: 'input'
			,value: function(item,name) {
				return item.inactiveLabelText;
			}
		}
	]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
				]
				,[
					{
						caption: 'Active'
						,name: 'active'
						,type: 'onoff'
						,value: function(item,name) {
							return item.active;
						}
					} 
				 ]
				
			]
		}
		,{
			caption: 'Text',
			properties: [
			    [
					prx.commonproperties.textFont,
					prx.commonproperties.textSize
					,prx.commonproperties.textProperties
				]				
			]
		},{
			caption: 'Active State',
			properties: [
				[
					{
						caption: 'Background'
						,name: 'activeLabelColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeLabelColor;
						}
						,liveUpdate: 'background-color,border-color'
					}
					,
					{
						caption: 'Text'
						,name: 'activeLabelTextColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.activeLabelTextColor;
						}
						,liveUpdate: 'color'
					}
				]
			]
		},{
			caption: 'Inactive State',
			properties: [
				[				
					{
						caption: 'Background'
						,name: 'inactiveLabelColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.inactiveLabelColor;
						}
						,liveUpdate: 'background-color,border-color'
					}
					,
					{
						caption: 'Text'
						,name: 'inactiveLabelTextColor'
						,type: 'colorpicker'
						,value: function(item,name) {
							return item.inactiveLabelTextColor;
						}
						,liveUpdate: 'color'
					}
				]
			]
		}
	]
	
}

/***** LIST COMPONENTS *****/

// TYPE: LISTDIVIDER
prx.types.android_listdivider = {
	name: "android_listdivider"
	,onDisplay: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var cR = '<div id="'+_id+'" class="box pos type-android-listdivider">';
		cR += '<div class="inner liveUpdate-textColor liveUpdate-dividerColor" style="font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' color: '+getColor(item.textColor)+'; '+_props+' border-bottom: ' + item.dividerThickness + 'px solid '+getColor(item.dividerColor)+ '">'
		cR += '<span data-editableproperty="text">'+item.text+'</span>'
		cR += '</div></div>';
		return cR;
	}
	,editableProperties: [
	                    prx.commonproperties.text    
	                    ]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					{ 
						caption: 'Bottom border', 
						name: 'dividerThickness', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.dividerThickness; 
						}, 
						values: { min: 1, max: 10, step: 1 } 
					}
					,{ 
						caption: false, 
						name: 'dividerColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.dividerColor; 
						}
						,liveUpdate: 'border-color'
					}
				]
			]
		},
		{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		}
	]
}

//TYPE: LISTBASIC
prx.types.android_listbasic = {
	name: "android_listbasic"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var _dims = getRealDims(item, symbol);
		var _height = Math.round((_dims.height-1-item.listitems.length) / item.listitems.length);
		
		var cR = '<div id="'+_id+'" class="pos box type-android-listbasic">';
		cR += '<ul class="liveUpdate-backgroundColor liveUpdate-textColor" style="background: '+getColor(item.backgroundColor)+'; font-size: '+item.textSize+'px; '+getFontCssFromFontFamily(item.textFont)+' color: '+getColor(item.textColor)+'; '+_props+'">'
		$.each(item.listitems, function(i,elm){
			cR += '<li class="dynamic-property liveUpdate-dividerColor" data-dynamic-property-index="'+i+'" id="'+_id+'-listitems-'+i+'" style="height: '+_height+'px; line-height: '+_height+'px; border-bottom: ' + item.dividerThickness + 'px solid '+getColor(item.dividerColor)+ '">';
			cR += '<input id="'+_id+'-checkbox-'+i+'" type="radio" name="'+_id+'-checkbox" data-role="none">'
			cR += '<label for="'+_id+'-checkbox-'+i+'"><span data-editableproperty="text" data-dynamic-property-index="'+i+'">'+elm.text+ '</span></label></li>'
		});	
		cR += '</ul>'
		cR += '<style>#'+_id+' input:checked + label { background: '+getColor(item.activeBackgroundColor)+'; color: '+getColor(item.activeTextColor)+'; }</style>'
		cR += '</div>'
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		var _height = Math.round((_dims.height-1-item.listitems.length) / item.listitems.length);
		$('#'+ _id + ' li')
			.css('line-height', _height + 'px')
			.css('height', _height + 'px')
	}
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor
					,{
						caption: 'Active',
						name: 'activeBackgroundColor',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeBackgroundColor			
						}
					}
				]
				,[
					{ 
						caption: 'Border', 
						name: 'dividerThickness', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.dividerThickness; 
						}, 
						values: { min: 1, max: 10, step: 1 } 
					},{ 
						caption: false, 
						name: 'dividerColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.dividerColor; 
						} 
						,liveUpdate: 'border-color'
					}
				]
			]
		}
		,{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
					,{
						caption: 'Active',
						name: 'activeTextColor',
						type: 'colorpicker',
						value: function(item,name){
							return item.activeTextColor			
						}
					}
				]
			]
		}
	]
	
  	,dynamicProperties: {
		data: 'listitems'
		,propertyCaption: 'List items'
  		,propertyName: 'List item'
		,addCaption: 'Add list item'
		,deleteCaption: 'Delete'
		,blankItem: {
			text: 'Label'
			,actions: []
		}
		,captionProperty: 'text'
		,interactions:[
	  		{
				caption: 'Interactions'
	  			,name: 'actions'
	  			,type: 'action'
	  			,value: function(item,name,index) {
						if (typeof(item.listitems[index].actions) == "undefined") {
							item.listitems[index].actions = [];
						}		
	      		
	      			return item.listitems[index].actions.length;
	      		}
	      	}
		]
		,editableProperties: [			
			{
		    	caption: 'Label'
		    	,name: 'text'
		    	,type: 'input'
		    	,value: function(item,name,index) {
		    		return item.listitems[index].text;
		    	}
		    }
		]
		
	}
}

/***** OTHER COMPONENTS *****/

//TYPE: TOAST
prx.types.android_toast = {
	name: "android_toast"
	,onDisplay: function(item,containerid,pageid,symbol) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _props = (jQuery.inArray("bold",item.textProperties)>-1) ? " font-weight: bold;" : "";
		_props += (jQuery.inArray("italic",item.textProperties)>-1) ? " font-style: italic;" : "";
		_props += (jQuery.inArray("underline",item.textProperties)>-1) ? " text-decoration: underline;" : "";
		
		var _dims = getRealDims(item,symbol);
		
		var cR = '<div id="'+_id+'" class="box pos type-android-toast">'
		
		cR += '<style>'
		cR += '#'+_id+' .toast-inner { line-height: '+_dims.height+'px; background-color: '+getColor(item.backgroundColor)+'; '+getFontCssFromFontFamily(item.textFont)+' font-size: '+item.textSize+'px; color: '+getColor(item.textColor)+'; '+_props+' '+((item.enableShadow) ? 'box-shadow: 0 0 '+item.shadowSpread+'px ' +getColor(item.shadowColor)+ ';' : '')+'}'
		cR += '</style>'
				
		cR += '<div class="toast-inner liveUpdate-backgroundColor liveUpdate-textColor"><span data-editableproperty="text">' + item.text + '</span></div>'
		cR += '</div>'
		return cR;
	}
	,onResize: function(item,containerid) {
		var _id = (!containerid) ? item.id : containerid+'-'+item.id;
		var _dims = getRealDims(item);
		
		$('#'+_id+' .toast-inner').css('line-height', _dims.height + 'px')
	}
	,interactions:
		[
			prx.commonproperties.actions
		]
	,editableProperties: [
	                      prx.commonproperties.text
	                      ]
	,propertyGroups: [			
		{
			caption: 'Style',
			properties: [
				[
					prx.commonproperties.backgroundColor 
				],
				[
					{
						caption: 'Shadow',
						name: 'enableShadow',
						type: 'onoff',
						value: function(item,name) {
						return item.enableShadow
					},
						onChange: function(item){
						if(item.enableShadow) {
							$('#property-shadowColor, #property-shadowSpread').show();
						} else {
							$('#property-shadowColor, #property-shadowSpread').hide();
						}	
						}
					}
				,
					{ 
						caption: 'Color', 
						name: 'shadowColor', 
						type: 'colorpicker', 
						value: function(item,name) { 
							return item.shadowColor; 
						} 
						,hiddenByDefault: function(item) {
							return (!item.enableShadow);
						}
					},
					{ 
						caption: 'Spread', 
						name: 'shadowSpread', 
						type: 'combo-select', 
						value: function(item,name) { 
							return item.shadowSpread; 
						}, 
						values: { min: 1, max: 10, step: 1 }
						,hiddenByDefault: function(item) {
							return (!item.enableShadow);
						}
					}
				]
			]
		},{
			caption: 'Text',
			properties: [
				[
					prx.commonproperties.textFont
					,prx.commonproperties.textSize
					,prx.commonproperties.textColor
				],[
					prx.commonproperties.textProperties
				]
			]
		}
	]
	
}

/************************************* COMPONENTS (OBJECTS) *************************************/
/***** TOOLBAR COMPONENTS *****/
prx.components.android_actionbar = {
	name: 'android_actionbar'
	,type: 'android_actionbar'
	,lib: _library
	,caption: 'Actionbar'
	,icon: '-400px -400px'
	,helper: prx.url.devices+_path + 'actionbar/helper.png'
	,width:"full"
	,height:"48"
	,resizable : true
	,backgroundColor: 'dddddd'
	,borderColor: 'b1b1b1'
	,borderWidth: 2
	,actionOverflow: true
	,actionOverflowColor: '999999'
	,actionbarActionOverflowActions: []
	,upCaret: false
	,actionbarUpCaretActions: []
	,upCaretIcon: { fileId: '3503b8461203597c38b16ccb6c03e2c2.png', folderId: 'f1333968402101', url: 'f1333968402101/3503b8461203597c38b16ccb6c03e2c2.png', assetType: 'gallery', name: ' 1-navigation-previous-item.png' }
	,upCaretIconSize: 3
	,overlay: false
}

prx.components.android_actionbar_contextual = {
	name: 'android_actionbar_contextual'
	,type: 'android_actionbar_contextual'
	,lib: _library
	,caption: 'Contextual Actionbar'
	,icon: '-480px -400px'
	,helper: prx.url.devices+_path + 'contextual_actionbar/helper.png'
	,width:"full"
	,height:"48"
	,resizable : true
	,backgroundColor: 'ffffff'
	,borderColor: '33b5e5'
	,borderWidth: 2
	,actionOverflow: true
	,actionOverflowColor: 'adadad'
	,actionbarActionOverflowActions: []
	,text: 'Some items selected'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: 16
	,textProperties: [] 
	,textColor: '000000'
	,selectionIcon: { fileId: '9aeee79e2e0c84d4ed7afd5600c3f3d6.png', folderId: 'f1333968402101', url: 'f1333968402101/9aeee79e2e0c84d4ed7afd5600c3f3d6.png', assetType: 'gallery', name: ' 1-navigation-accept.png' }
	,selectionIconSize: 3
	,overlay: false
}

prx.components.android_fixedtabbar = {
	name: 'android_fixedtabbar'
	,type: 'android_fixedtabbar'
	,lib: _library
	,caption: 'Fixed tabbar'
	,icon: '-720px -400px'
	,helper: prx.url.devices+_path + 'fixedtabbar/helper.png'
	,width:"full"
	,height:"48"
	,resizable : true
	,backgroundColor: 'E0E0E0'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: 14
	,textColor: '3d3d3d'
	,textProperties: ['bold']
	,separatorColor: 'cbcbcb'
	,activeTabColor: '33b5e5'
	,activeBorderWidth: 4 
	,selected: 0
	,tabs: [
       {
    	   caption: "TAB ONE"
		   ,actions: []
    	}
       ,{
    	   caption: "TAB TWO"
		   ,actions: []
		}
       ]
   	,overlay: false
}

prx.components.android_scrollabletabbar = {
	name: 'android_scrollabletabbar'
	,type: 'android_scrollabletabbar'
	,lib: _library
	,caption: 'Scrollable tabbar'
	,icon: '-640px -400px'
	,helper: prx.url.devices+_path + 'scrollabletabbar/helper.png'
	,width:"full"
	,height:"48"
	,resizable : true
	,backgroundColor: 'E0E0E0'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: 18
	,textColor: '3d3d3d'
	,textProperties: ['']
	,tabs: "TAB ONE<br />TAB TWO<br />TAB THREE"
	,linkedContainer: -1
	,selected: 0
   	,overlay: false
}

prx.components.android_spinner = {
	name: 'android_spinner'
	,type: 'android_spinner'
	,lib: _library
	,caption: 'Spinner'
	,icon: '-560px -480px'
	,helper: prx.url.devices+ _path + 'spinner/helper.png'
	,width:"120"
	,height:"35"
	,resizable : true
	,text: 'Spinner'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "22"
	,textColor:  '666666'
	,textProperties: []
	,togglerSize: 14
	,togglerColor: '7f7f7f'
	,bottomBorder: true
	,actions: []
}	


prx.components.android_dropdown = {
	name: 'android_dropdown'
	,type: 'android_dropdown'
	,lib: _library
	,caption: 'Dropdown'
	,icon: '-640px -480px'
	,helper: prx.url.devices+ _path + 'dropdown/helper.png'
	,width:"120"
	,height:"96"
	,resizable : true
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "18"
	,textColor:  '666666'
	,textProperties: []
	,dividerThickness: 1
	,dividerColor: 'd9d9d9'
	,enableShadow: true
	,shadowColor: 'CCCCCC'
	,shadowSpread: 5
	,backgroundColor: 'f5f5f5'
	,activeTextColor: '222222'
	,activeBackgroundColor: '59c1e8'
	,iconSize: 3
	,iconpos: ''
	,options: [
       {
    	   text: "Label 1"
    	   ,icon: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
		   ,actions: []
    	}
       ,{
    	   text: "Label 2"
		   ,icon: { fileId: '', folderId: '', url: '', assetType: '', name: '' }
		   ,actions: []
		}
       ]
   ,dynamicSizeExpand: 'v'
}	
/***** BUTTON COMPONENTS *****/

prx.components.android_button = {
	name: 'android_button'
	,type: 'android_button'
	,lib: _library
	,caption: 'Basic Button'
	,icon: '0 -480px'
	,helper: prx.url.devices+ _path + 'basicbutton/helper.png'
	,width:"180"
	,height:"40"
	,resizable : true
	,backgroundColor: 'cecece'
	,text: 'Button'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "18"
	,textColor:  '333333'
	,textProperties: []
	,shadowColor: '999999'
	,iconpos: ''
	,buttonicon: {
		fileId: '',
		folderId: '',
		url: '',
		assetType: '',
		name: ''
	}
	,iconSize: 3
	,actions: []
}	

prx.components.android_borderlessbutton = {
	name: 'android_borderlessbutton'
	,type: 'android_borderlessbutton'
	,lib: _library
	,caption: 'Borderless Button'
	,icon: '-80px -480px'
	,helper: prx.url.devices+ _path + 'borderlessbutton/helper.png'
	,width:"180"
	,height:"40"
	,resizable : true
	,backgroundColor: 'transparent'
	,text: 'Button'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "18"
	,textColor:  '333333'
	,textProperties: []
	,shadowColor: 'transparent'
	,iconpos: ''
	,buttonicon: {
		fileId: '',
		folderId: '',
		url: '',
		assetType: '',
		name: ''
	}
	,iconSize: 3
	,actions: []
}


/***** FORM COMPONENTS *****/
prx.components.android_label = {
	name: 'android_label'
	,type: 'android_label'
	,lib: _library
	,caption: 'Label'
	,icon: '-160px -480px'
	,helper: prx.url.devices+ _path + 'label/helper.png'
	,width:"440"
	,height:"20"
	,resizable : true
	,text: 'LABEL'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "14"
	,textColor:  '999999'
	,textProperties: []
	,bottomBorder: false
	,bottomBorderWidth: 2
	,bottomBorderColor: 'bababa'
}	

prx.components.android_textfield = {
	name: 'android_textfield'
	,type: 'android_textfield'
	,lib: _library
	,caption: 'Text Field'
	,icon: '-240px -480px'
	,helper: prx.url.devices+ _path + 'textfield/helper.png'		
	,width:"440"
	,height:"30"
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'text'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "14"
	,textColor:  '7A7A7A'
	,placeholderColor: '999999'
	,borderWidth: 1
	,borderColor: 'a9a9a9'
	,focusedBorderColor: '0099cc'
	,backgroundColor: 'none'
	,textAlign: 'left'
}

prx.components.android_passwordfield = {
	name: 'android_passwordfield'
	,type: 'android_textfield'
	,lib: _library
	,caption: 'Password Field'
	,icon: '-320px -480px'
	,helper: prx.url.devices+ _path + 'passwordfield/helper.png'		
	,width:"440"
	,height:"30"
	,value: ''
	,placeholder: 'Placeholder'
	,inputtype: 'password'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "14"
	,textColor:  '7A7A7A'
	,placeholderColor: '999999'
	,borderWidth: 1
	,borderColor: 'a9a9a9'
	,focusedBorderColor: '0099cc'
	,backgroundColor: 'none'
	,textAlign: 'left'
}

prx.components.android_checkbox = {
	name: 'android_checkbox'
	,type: 'android_checkbox'
	,lib: _library
	,caption: 'Checkbox'
	,icon: '-480px -480px'
	,helper: prx.url.devices+ _path + 'checkbox/helper.png'
	,width:"16"
	,height:"16"
	,resizable : true
	,backgroundColor: 'none'
	,borderColor: '999999'
	,activeColor: '0099cc'
	,active: true
	,checkboxActionsOnActive: []
	,checkboxActionsOnDeactive: []                         
}

prx.components.android_radiobutton = {
	name: 'android_radiobutton'
	,type: 'android_radiobutton'
	,lib: _library
	,caption: 'Radio Button'
	,icon: '-400px -480px'
	,helper: prx.url.devices+ _path + 'radiobutton/helper.png'
	,width:"16"
	,height:"16"
	,resizable : true
	,backgroundColor: 'none'
	,borderColor: '999999'
	,activeColor: '0099cc'
	,active: true
	,actAsCheckbox: true
	,checkboxActionsOnActive: []
   	,checkboxActionsOnDeactive: []
}

prx.components.android_onoffswitch = {
	name: 'android_onoffswitch'
	,type: 'android_onoffswitch'
	,lib: _library
	,caption: 'On/Off switch'
	,icon: '-720px -480px'
	,helper: prx.url.devices+_path + 'onoffswitch/helper.png'
	,width:"180"
	,height:"44"
	,resizable : true
	,backgroundColor: 'C2C2C2'
	,textSize: 21
	,textProperties: []
    ,textFont: 'Roboto Regular, sans-serif' 
	,activeLabelText: 'ON'
	,activeLabelColor: '27A1CA'
	,activeLabelTextColor: 'FFFFFF'
	,inactiveLabelText: 'OFF'
	,inactiveLabelColor: 'A1A1A1'
	,inactiveLabelTextColor: 'FFFFFF'
	,active: true
	,flipswitchActionsOnActive: []
	,flipswitchActionsOnDeactive: []
}

/***** LIST COMPONENTS *****/
prx.components.android_listdivider = {
	name: 'android_listdivider'
	,type: 'android_listdivider'
	,lib: _library
	,caption: 'List divider'
	,icon: '0 -560px'
	,helper: prx.url.devices+ _path + 'listdivider/helper.png'
	,width:"440"
	,height:"20"
	,resizable : true
	,text: 'LIST DIVIDER'
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "14"
	,textColor:  '999999'
	,textProperties: ['bold']
	,dividerThickness: 1
	,dividerColor: 'bababa'

}	

prx.components.android_listbasic = {
	name: 'android_listbasic'
	,type: 'android_listbasic'
	,lib: _library
	,caption: 'Basic List'
	,icon: '-80px -560px'
	,helper: prx.url.devices+ _path + 'listbasic/helper.png'
	,width:"440"
	,height:"96"
	,resizable : true
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "18"
	,textColor:  '222222'
	,textProperties: []
	,dividerThickness: 1
	,dividerColor: 'd9d9d9'
	,backgroundColor: 'none'
	,activeTextColor: '222222'
	,activeBackgroundColor: '59c1e8'
	,listitems: [
       {
    	   text: "Label 1"
		   ,actions: []
    	}
       ,{
    	   text: "Label 2"
		   ,actions: []
		}
       ]
   ,dynamicSizeExpand: 'v'
}	


prx.components.android_toast = {
	name: 'android_toast'
	,type: 'android_toast'
	,lib: _library
	,caption: 'Toast'
	,icon: '-160px -560px'
	,helper: prx.url.devices+ _path + 'toast/helper.png'
	,width:"200"
	,height:"30"
	,resizable : true
	,textFont: 'Roboto Regular, sans-serif'
	,textSize: "12"
	,textColor:  'ffffff'
	,textProperties: ['bold']
	,text: 'This is a toast message'
	,backgroundColor: '222222'
	,enableShadow: true
	,shadowColor: '333333'
	,shadowSpread: 5
}	