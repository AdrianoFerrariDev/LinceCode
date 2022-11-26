var valRunAnimation = '';
$(function(){
	$("#animation").on("change keyup", function() {
		var animDuration = $('#anim-duration').val(),
		animTFunc = $('input[name="anim-t-func"]:checked').val(),
		animIteCount = $('input[name="anim-ite-count"]:checked').val(),
		animDirection = $('input[name="anim-dir"]:checked').val(),
		animDelay = $('#anim-delay').val(),
		valAnimation = [],
		decAnimation ='',
		valueKeyFrame = '',
		cssDeclaration = '';
		
		if(validatePositive(animDuration)) {
			valueKeyFrame = "@keyframe anim {\n";
			valueKeyFrame += "	from:{width: 20%;}\n";
			valueKeyFrame += "	50%{width: 60%;}\n";
			valueKeyFrame += "	to:{width: 100%;}\n";
			valueKeyFrame += "}\n\n";
			
			valAnimation.push('	animation: anim');
			valAnimation.push(animDuration += 'ms');
			animTFunc ? valAnimation.push(animTFunc) : '';
			(validatePositive(animIteCount) || animIteCount == 'infinite') ? valAnimation.push(animIteCount) : '';
			animDirection ? valAnimation.push(animDirection) : '';
			validatePositive(animDelay) ? valAnimation.push(animDelay + 'ms') : '';
			decAnimation = valAnimation.join(' ') + ';';
			valRunAnimation = decAnimation;
		} else {
			valRunAnimation = '';
		}
		
		cssDeclaration = valueKeyFrame + "div {\n" + decAnimation + "\n}";
		
		if( cssDeclaration != '') {
			$('.css-animation').html(cssDeclaration);
			$("#animation .out-css div").removeAttr("style");
			setTimeout(function(){$("#animation .out-css div").attr("style", decAnimation)},100);
		} else {
			$(".css-animation").html("");
			$("#animation .out-css div").removeAttr("style");
		}
	});
});

$(function(){
	$(".run-animation").click(function() {
		if( valRunAnimation != '') {
			$("#animation .out-css div").removeAttr("style");
			setTimeout(function(){$("#animation .out-css div").attr("style", valRunAnimation)},10);
		}
	});
});

$(function(){
	$("#background").on("change keyup", function() {
		var backgroundColor = $("#bg-color").val(),
		backgroundImage = $('input[name="bcg-img"]:checked').val(),
		backgroundRepeat = $('input[name="bcg-repeat"]:checked').val(),
		backgroundAttachment = $('input[name="bcg-attachment"]:checked').val(),
		backgroundClip = $('input[name="bcg-clip"]:checked').val(),
		backgroundPosition = $('#background-position').val(),
		valueBackground = []
		valBack = '',
		cssDeclaration = '';

		console.log(backgroundPosition);

		$("#actv-bg-color").is(":checked") && validateColor(backgroundColor) ? valueBackground.push('background-color: ' + backgroundColor + ';') : '';
		if(backgroundImage != 'noimage' && backgroundImage != undefined) {
			var valBackPos = [];
			valueBackground.push('background-image: url(images/' + backgroundImage + ');');
			backgroundRepeat ? valueBackground.push('background-repeat: ' + backgroundRepeat + ';') : '';
			backgroundAttachment ? valueBackground.push('background-attachment: ' + backgroundAttachment + ';') : '';
			if(backgroundPosition != 'No Value') valueBackground.push('background-position: ' + backgroundPosition + ';');
		}
		
		backgroundClip ? valueBackground.push('background-clip: ' + backgroundClip + ';') : '';
		valBack = valueBackground.join('');
		cssDeclaration = valueBackground.join("\n");
		
		showResult(cssDeclaration, valBack, 'background');
	});
});

$(function(){
	$("#border").on("change keyup", function() {
		var borderWidth = $("#border-width-val").val(),
		borderColor = $("#bdcolor").val(),
		borderStyle = $("input[name='style']:checked").val(),
		borderValues = [],
		borderDec ='',
		cssDeclaration = '';

		if( validateInteger(borderWidth, false)  && borderStyle != '' && borderStyle != 'none') {
			borderValues.push('border:')
			borderValues.push(borderWidth + 'px');
			borderValues.push(borderStyle);
			validateColor(borderColor) ? borderValues.push(borderColor) : null;
			borderDec = borderValues.join(' ') + ';';
		}

		cssDeclaration = borderDec;
		
		showResult(cssDeclaration, borderDec, 'border');
	});
});

$(function(){
	$("#border-radius").on("change keyup", function() {
		var cornerRndTl = $("#crtl").val(),
		cornerRndTr = $("#crtr").val(),
		cornerRndBr = $("#crbr").val(),
		cornerRndBl = $("#crbl").val(),
		cornerElipTl = $("#cetl").val(),
		cornerElipTr = $("#cetr").val(),
		cornerElipBr = $("#cebr").val(),
		cornerElipBl = $("#cebl").val(),
		allRndCornerSame = $('input[name="rnd-corner-same"]:checked').val(),
		allElipCornerSame = $('input[name="elip-corner-same"]:checked').val(),
		valuesRndCorner = [],
		valuesElipCorner = [],
		valuesBorderRadius = [],
		borderRadiusDec = '',
		cssDeclaration = '';
		
		if(allRndCornerSame) {
			validatePositive(cornerRndTl) ? valuesBorderRadius.push('border-radius: ' + cornerRndTl + 'px') : '';
		} else if(validatePositive(cornerRndTl) || validatePositive(cornerRndTr) || validatePositive(cornerRndBr) || validatePositive(cornerRndBl)) {
			valuesRndCorner.push('border-radius:');
			validatePositive(cornerRndTl) ? valuesRndCorner.push(cornerRndTl + 'px') : valuesRndCorner.push('0');
			validatePositive(cornerRndTr) ? valuesRndCorner.push(cornerRndTr + 'px') : valuesRndCorner.push('0');
			validatePositive(cornerRndBr) ? valuesRndCorner.push(cornerRndBr + 'px') : valuesRndCorner.push('0');
			validatePositive(cornerRndBl) ? valuesRndCorner.push(cornerRndBl + 'px') : valuesRndCorner.push('0');
			valuesBorderRadius.push(valuesRndCorner.join(' '));
		}
		
		if(allElipCornerSame && valuesBorderRadius.length > 0) {
			validatePositive(cornerElipTl) ? valuesBorderRadius.push(cornerElipTl + 'px') : '';
		} else if(valuesBorderRadius.length > 0) {
			validatePositive(cornerElipTl) ? valuesElipCorner.push(cornerElipTl + 'px') : valuesElipCorner.push('0');
			validatePositive(cornerElipTr) ? valuesElipCorner.push(cornerElipTr + 'px') : valuesElipCorner.push('0');
			validatePositive(cornerElipBr) ? valuesElipCorner.push(cornerElipBr + 'px') : valuesElipCorner.push('0');
			validatePositive(cornerElipBl) ? valuesElipCorner.push(cornerElipBl + 'px') : valuesElipCorner.push('0');
			valuesBorderRadius.push(valuesElipCorner.join(' '));
		}
		
		if(valuesBorderRadius.length > 0 ) borderRadiusDec = valuesBorderRadius.join(' / ') + ';';

		cssDeclaration = borderRadiusDec;

		showResult(cssDeclaration, borderRadiusDec, 'border-radius');
	});
});

$(function(){
	$("#box-shadow").on("change keyup", function() {
		var bsInset = $("input[name='bscheck']").is(':checked') ? 'inset ' : '',
		bsHor = $("#bshor").val(),
		bsVer = $("#bsver").val(),
		bsBlur = $("#bsblur").val(),
		bsProp = $("#bsprop").val(),
		bsColor = $("#bscolor").val(),
		backgroundColor = $("#bsbackcolor").val(),
		valuesBoxShadow = [],
		backgroundColorDec = '',
		boxShadowDec = '',
		styleInline = '',
		cssDeclaration = '';

		if(validateInteger(bsHor, false) && validateInteger(bsVer, false) && validatePositive(bsBlur)){
			valuesBoxShadow.push("box-shadow:");
			bsInset ? valuesBoxShadow.push(bsInset) : '';
			valuesBoxShadow.push(bsHor + 'px');
			valuesBoxShadow.push(bsVer + 'px');
			valuesBoxShadow.push(bsBlur + 'px');
			validatePositive(bsProp) ? valuesBoxShadow.push(bsProp + 'px') : '';
			validateColor(bsColor) ? valuesBoxShadow.push(bsColor) : '';
			if(validateColor(backgroundColor)) backgroundColorDec = "background-color: " + backgroundColor + ';'
			boxShadowDec = valuesBoxShadow.join(' ') + ';';
		}
		
		styleInline = boxShadowDec + backgroundColorDec;
		cssDeclaration = boxShadowDec;
		
		showResult(cssDeclaration, styleInline,'box-shadow');
	});
});

$(function(){
	$("#font").on("change keyup", function(){
		var fontStyle = $('input[name="font-style"]:checked').val(),
		fontSize = $("#font-size").val(),
		fontWeight = $('input[name="font-weight"]:checked').val(),
		fontStretch = $('input[name="font-stretch"]:checked').val(),
		valFont=[],
		decInline = '',
		cssDeclaration = '';
		
		if(fontStyle) valFont.push('font-style: ' + fontStyle + ";");
		if(validatePositive(fontSize)) valFont.push('font-size: ' + fontSize + "px;");
		if(fontWeight) valFont.push('font-weight: ' + fontWeight + ";");
		
		decInline = valFont.join('');
		cssDeclaration = valFont.join("\n");

		showResult(cssDeclaration, decInline, 'font');
	});
});

$(function(){
	$("#text").on("change keyup", function(){
		var letterSpacing = $("#txt-letter-spacing").val(),
		wordSpacing = $("#txt-word-spacing").val(),
		lineHeight = $("#txt-line-height").val(),
		textAlign = $('input[name="text-align"]:checked').val(),
		textIndent = $('#txt-indent').val();
		textDecoration = $('input[name="text-decoration"]:checked').val(),
		textTransform = $('input[name="text-transform"]:checked').val(),
		valText=[],
		decInline = '',
		ruleCss = '';
		
		if(validatePositive(letterSpacing)) valText.push("letter-spacing: " + letterSpacing + "px;");
		if(validatePositive(wordSpacing)) valText.push("word-spacing: " + wordSpacing + "px;");
		if(validatePositive(lineHeight)) valText.push("line-height: " + lineHeight + "px;");
		if(textAlign) valText.push("text-align: " + textAlign + ";");
		if(validatePositive(textIndent)) valText.push("text-indent: " + textIndent + "px;");
		if(textDecoration) valText.push("text-decoration: " + textDecoration + ";");
		if(textTransform) valText.push("text-transform: " + textTransform + ";");
		
		
		decInline = valText.join('');
		cssDeclaration = valText.join("\n");

		showResult(cssDeclaration, decInline,'text');
	});
});

$(function(){
	$("#transition").on("change keyup", function(){
		var tProperty = $("#transition-property").val(),
		tDuration = $("#transition-duration").val(),
		tTimingFunc = $('input[name="transition-timing-function"]:checked').val(),
		tDelay = $("#transition-delay").val(),
		classCssTransition = '',
		valTransition = [],
		cssDeclaration = '';
		
		if(tProperty &&	validatePositive(tDuration) && tTimingFunc) {
			classCssTransition = 'transition-' + tProperty;
			valTransition.push('transition: ' + tProperty);
			valTransition.push(tDuration + 'ms');
			valTransition.push(tTimingFunc);
			if(validatePositive(tDelay)) valTransition.push(tDelay + 'ms');
			cssDeclaration = valTransition.join(" ") + ';';
		}

		if( cssDeclaration != '') {
			$('.css-transitions').html(cssDeclaration);
			$("#transition .out-transitions div").attr("style", cssDeclaration);
			$("#transition .out-transitions div").removeAttr("class");
			$("#transition .out-transitions div").addClass('transition-'+tProperty);
			
		} else {
			$(".css-transitions").html("");
			$("#transition .out-transitions div").removeAttr("style");
			$("#transition .out-transitions div").removeAttr("class");
		}
	});
});

$(function(){
	$(".copy-button").click( function(){
		var text = $(this).parent().siblings('textarea').val();
		if(text != '') {
			navigator.clipboard.writeText(text)
		}
	});
});

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
