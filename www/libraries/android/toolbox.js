/********************************************************************************************/
/********************************************************************************************/
/*******************************       ANDROID       ******************************/
/********************************************************************************************/
/** ***************************************************************************************** */

var components = {
	items : {
		basic : {
			title :'Basic',
			items : [ prx.components.text, prx.components.richtext,
			          prx.components.rectangle, prx.components.circle, prx.components.horizontalline,
					prx.components.verticalline, prx.components.actionarea, prx.components.animationtarget,
					prx.components.image, prx.components.icon, prx.components.placeholder, prx.components.webview,
					prx.components.html, prx.components.audio, prx.components.video,
					prx.components.tooltip
			]
		}
		
		,
		toolbars : {
			title :'Toolbars',
			items : [ 
			         	//prx.components.android_toolbar,
			         	prx.components.android_actionbar,
			         	prx.components.android_actionbar_contextual,
			         	prx.components.basic_tabbar,
			         	prx.components.android_fixedtabbar,
			         	prx.components.android_scrollabletabbar
			]
		}
		,
		buttons : {
			title :'Buttons',
			items : [ 
			         prx.components.android_button
			         ,prx.components.android_borderlessbutton
			]
		}
		,
		forms : {
			title :'Forms',
			items : [ 
			         prx.components.android_label
			         ,prx.components.android_textfield
			         ,prx.components.android_passwordfield
			         ,prx.components.android_checkbox
			         ,prx.components.android_radiobutton
			         ,prx.components.android_spinner
			         ,prx.components.android_dropdown
			         ,prx.components.android_onoffswitch
			]
		}
		,
		lists : {
			title :'Lists',
			items : [ 
			         prx.components.android_listdivider
			         ,prx.components.android_listbasic
			]
		}
		,
		other : {
			title :'Other',
			items : [ 
			         prx.components.android_toast
			]
		}
		
	},
	otherProperties :'insert here'
};
