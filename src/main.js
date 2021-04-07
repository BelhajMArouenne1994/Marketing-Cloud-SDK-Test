require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');
require('readFiles.js');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy

var blockName;
var files;

function debounce (func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function paintSliderValues () {
    var e = document.getElementById("text-input-id-0");
	document.getElementById('myText').innerHTML = document.getElementById("text-input-id-0").options[e.selectedIndex].value;
}

function paintMap() {
    var e = document.getElementById("text-input-id-0");
    var files = e.options[e.selectedIndex].value;
    if (!files) {
        return;
    }
    var blockName = e.options[e.selectedIndex].value;
	if (!blockName) {
		return;
	}
	sdk.setContent('%%_messagecontext%% <table width="800" cellpadding="0" cellspacing="0" border="0" align="center" class="w100v"> <tr> <td align="left" valign="top" style="padding-left:50px;padding-right:50px;padding-bottom:50px;font-family:Arial,sans-serif;font-size:15px;color:#000000;" class="pad-lr fs3v"> IF YOU CAN"T READ THIS EMAIL, CLICK <a href="%%view_email_url%%" style="color:#000000;text-decoration:none;"> HERE</a>. </td> </tr> </table>');
	sdk.setData({
	    files: files,
		blockName: blockName
	});
	localStorage.setItem('files', files);
	localStorage.setItem('blockName', blockName);
}

sdk.getData(function (data) {
    files = data.files || '';
	blockName = data.blockName || '';
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("change", function () {
    var filesContents = _getAllFilesFromFolder("TEMPLATE_BLOCKS/BLOCKS");
    console.log(filesContents);
	paintSliderValues();
	debounce(paintMap, 500)();
	paintSliderValues();
});
