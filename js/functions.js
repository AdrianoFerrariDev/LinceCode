function validatePositive(value) {
	if(value % 1 === 0) {
		if(value != 0) return true;
	} else {
		return false;
	}
}

function validateInteger(value, zero) {
	if(value % 1 === 0 && zero === true) {
		return true;
	} else if(value % 1 === 0 && value != 0 && zero === false) {
		return true;
	} else {
		return false;
	}
}

function validateDecimalPositive(value) {
    if(value > 0) {
        return true;
    } else {
        return false;
    }
}

function validateColor(color) {
	var exp = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;	
	return exp.test(color);
}

function showResult(cssDec, cssInline, sectionId) {
	if( cssDec != '') {
		$(".css-" + sectionId).html(cssDec);
		$("#" + sectionId + " .style-" + sectionId).attr("style", cssInline);
	} else {
		$(".css-" + sectionId).html("");
		$("#" + sectionId + " .style-" + sectionId).removeAttr("style");
	}
		
}
