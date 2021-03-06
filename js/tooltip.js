// functionto add default enabled message to the top of a tooltip
function addTooltipDefMessage(evTarget, tooltip) {
	const defaultEnabledMsg = document.createElement("small");
	defaultEnabledMsg.className = "prog-tooltip-msg";
	if (evTarget.className.indexOf("default-disabled") > -1) {
		tooltip.style.background = "cyan";
		defaultEnabledMsg.innerHTML = "<b>Only the following</b> (no default programme on this day):";
	}
	else if (evTarget.id == "default-link") {
		defaultEnabledMsg.innerHTML = "The default programme:";
	}
	else {
		defaultEnabledMsg.innerHTML = "Default programme enabled on this day";
	}
	tooltip.appendChild(defaultEnabledMsg);
}

// function used to show a tooltip displaying the media of a programme when hovering over a day
function showProgTooltip(ev) {
	if (ev.currentTarget.className.indexOf("day") == -1) {
		return false;
	}

	// check if the element that caused to run this function from an event listener
	// has a data-media attribute, if not, stop immediately - then this function is not supposed to run
	const mediaAttr = ev.currentTarget.getAttribute("data-media");
	if (!mediaAttr) {
		return false;
	}

	// get the boundaries of the target element (hovered over day)
	const rect = ev.currentTarget.getBoundingClientRect();

	// get the media for this day from the media attribute of the day
	const media = JSON.parse(mediaAttr);
	if (media.length == 0) {
		return false;
	}

	// create a tooltip element and add positioning
	const tooltip = document.createElement("div");
	tooltip.className = "prog-tooltip";
	if (rect.top > 82) {
		tooltip.style.top = (rect.top - 82) + "px";
		tooltip.className += " arr-bottom";
	}
	else {
		tooltip.style.top = (rect.top + 48) + "px";
		tooltip.className += " arr-top";
	}
	if (rect.left > window.innerWidth - media.length * 136) {
		tooltip.style.right = (window.innerWidth - rect.right - 24) + "px";
		tooltip.className += " arr-left";
	}
	else {
		tooltip.style.left = (rect.left - 16) + "px";
		tooltip.className += " arr-right";
	}

	// add a message to the tooltip, letting the user know whether the default programme is enabled or not
	addTooltipDefMessage(ev.currentTarget, tooltip);

	// add default programme media if enabled
	if (ev.currentTarget.id != "default-link" && ev.currentTarget.className.indexOf("default-disabled") == -1) {
		for (let i = 0; i < defaultMedia.length; i++) {
			media.unshift(defaultMedia[i]);
		}
		console.log(media);
	}

	// populate the tooltip: add all media to the tooltip
	for (let i = 0; i < media.length; i++) {
		let mediaItem = document.createElement("img");
		mediaItem.className = "prog-tooltip-media";
		mediaItem.setAttribute("src", "media/" + media[i]["file"]);
		tooltip.appendChild(mediaItem);
	}

	// add the tooltip to the webpage
	document.documentElement.appendChild(tooltip);
}

function hideProgTooltip(ev) {
	// if not hovered over a day, refuse to run the function
	if (ev.currentTarget.className.indexOf("day") == -1) {
		return false;
	}

	// remove all tooltips from the webpage (could be more on slow computers, thus removing in a for loop)
	const tooltips = document.getElementsByClassName("prog-tooltip");
	for (let i = 0; i < tooltips.length; i++) {
		tooltips[i].remove();
	}
}