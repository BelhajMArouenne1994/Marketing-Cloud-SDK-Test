require('../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css');

var SDK = require('blocksdk');
var sdk = new SDK(null, null, true); // 3rd argument true bypassing https requirement: not prod worthy
var fs = require('fs');
var blockName;
var fileContent;

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
    var url = document.getElementById("text-input-id-0").options[e.selectedIndex].value;;
    fetch(url)
        .then( r => r.text() )
        .then( t => {console.log(t); fileContent = t;} );

}

function paintMap() {
    var e = document.getElementById("text-input-id-0");

    var blockName = e.options[e.selectedIndex].value;
	if (!blockName) {
		return;
	}
	sdk.setData({
		blockName: blockName
	});
	sdk.setContent(fileContent);
	localStorage.setItem('blockName', blockName);
}

sdk.getData(function (data) {
	blockName = data.blockName || '';
	paintSliderValues();
	paintMap();
});

document.getElementById('workspace').addEventListener("change", function () {
	paintSliderValues();
	debounce(paintMap, 500)();
	paintSliderValues();
});
