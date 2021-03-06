function openPopUpWin(url, windowName, w, h) {
	const y = window.top.outerHeight / 2 + window.top.screenY - ( h / 2);
	const x = window.top.outerWidth / 2 + window.top.screenX - ( w / 2);
	return (window.open(url, windowName, "location=no,menubar=no,status=no,toolbar=no,directories=no,scrollbars=no,width="+w+",height="+h+",top="+y+",left="+x));
}

function getParameterByName(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
	const results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}