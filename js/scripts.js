jQuery(document).ready(function() {
	$(".range-default").html(function() {
		var rangeValue = $(this).val();
		$(this).parent().siblings('.prop-num-val').children('span').html(rangeValue);
	});
});

var valRunAnimation = '';
$(function(){
	$("#animation").on("input", function() {
		var animDuration = $('#anim-duration').val(),
		animTFunc = $('input[name="anim-t-func"]:checked').val(),
		animIteCount = $('input[name="anim-ite-count"]:checked').val(),
		animDirection = $('input[name="anim-dir"]:checked').val(),
		animDelay = $('#anim-delay').val(),
		valAnimation = [],
		inlineAnimation = '',
		decAnimation ='',
		valueKeyFrame = '',
		cssDeclaration = '';

		if(validateDecimalPositive(animDuration)) {
			valueKeyFrame = "@keyframes anim {\n";
			valueKeyFrame += "	from {width: 20%;}\n";
			valueKeyFrame += "	50% {width: 60%;}\n";
			valueKeyFrame += "	to {width: 100%;}\n";
			valueKeyFrame += "}\n\n";
			
			valAnimation.push('	animation: anim');
			valAnimation.push(animDuration += 's');
			animTFunc ? valAnimation.push(animTFunc) : '';
			(validatePositive(animIteCount) || animIteCount == 'infinite') ? valAnimation.push(animIteCount) : '';
			animDirection ? valAnimation.push(animDirection) : '';
			validateDecimalPositive(animDelay) ? valAnimation.push(animDelay + 's') : '';
			inlineAnimation = valAnimation.join(' ') + ';';
			decAnimation = "div {\n" + valAnimation.join(' ') + ';\n}';
			valRunAnimation = inlineAnimation;
		} else {
			valRunAnimation = '';
		}
		
		cssDeclaration = valueKeyFrame + decAnimation;
		
		if( cssDeclaration != '') {
			$('.css-animation').html(cssDeclaration);
			$("#animation .out-css div").removeAttr("style");
			setTimeout(function(){$("#animation .out-css div").attr("style", inlineAnimation)},100);
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
	$("#background").on("input", function() {
		var backgroundColor = $("#bg-color").val(),
		backgroundImage = $('input[name="bcg-img"]:checked').val(),
		backgroundRepeat = $('input[name="bcg-repeat"]:checked').val(),
		backgroundAttachment = $('input[name="bcg-attachment"]:checked').val(),
		backgroundPosition = $('#background-position').val(),
		backgroundSize = $('input[name="bg-size"]:checked').val(),
		backgroundClip = $('input[name="bcg-clip"]:checked').val(),
		valueBackground = []
		valBack = '',
		cssDeclaration = '';

		$("#actv-bg-color").is(":checked") && validateColor(backgroundColor) ? valueBackground.push('background-color: ' + backgroundColor + ';') : '';
		if(backgroundImage != 'noimage' && backgroundImage != undefined) {
			var valBackPos = [];
			valueBackground.push('background-image: url(images/' + backgroundImage + ');');
			backgroundRepeat ? valueBackground.push('background-repeat: ' + backgroundRepeat + ';') : '';
			backgroundAttachment ? valueBackground.push('background-attachment: ' + backgroundAttachment + ';') : '';
			if(backgroundPosition != 'No Value') valueBackground.push('background-position: ' + backgroundPosition + ';');
			if(backgroundSize != 'none') valueBackground.push('background-size: ' + backgroundSize + ';');
		}
		
		backgroundClip ? valueBackground.push('background-clip: ' + backgroundClip + ';') : '';
		valBack = valueBackground.join('');
		cssDeclaration = valueBackground.join("\n");
		
		showResult(cssDeclaration, valBack, 'background');
	});
});

$(function(){
	$("#border").on("input", function() {
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
	$("#border-radius").on("input", function() {
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
	$("#box-shadow").on("input", function() {
		var bsInset = $("input[name='bscheck']").is(':checked') ? 'inset' : '',
		bsHor = $("#bshor").val(),
		bsVer = $("#bsver").val(),
		bsBlur = $("#bsblur").val(),
		bsProp = $("#bsprop").val(),
		bsColor = $("#bscolor").val(),
		backgroundColor = $("#bsbackcolor").val(),
		showBgColor = $("#actv-bg-color").is(":checked") ? true : false;
		valuesBoxShadow = [],
		backgroundColorDec = '',
		boxShadowDec = '',
		styleInline = '',
		cssDeclaration = '';

		if(validateInteger(bsHor, false) || validateInteger(bsVer, false) || validatePositive(bsBlur)){
			valuesBoxShadow.push("box-shadow:");
			bsInset ? valuesBoxShadow.push(bsInset) : '';
			bsHor != '0' ? valuesBoxShadow.push(bsHor + 'px') : valuesBoxShadow.push('0');
			bsVer != '0' ? valuesBoxShadow.push(bsVer + 'px') : valuesBoxShadow.push('0');
			bsBlur != '0' ?  valuesBoxShadow.push(bsBlur + 'px') : valuesBoxShadow.push('0');
			validateInteger(bsProp, false) ? valuesBoxShadow.push(bsProp + 'px') : '';
			validateColor(bsColor) ? valuesBoxShadow.push(bsColor) : '';
			if(validateColor(backgroundColor)) backgroundColorDec = "background-color: " + backgroundColor + ';'
			boxShadowDec = valuesBoxShadow.join(' ') + ';';
		}
		
		styleInline = boxShadowDec + backgroundColorDec;
		if(showBgColor) {
			cssDeclaration = boxShadowDec + "\n" + backgroundColorDec;
		} else {
			cssDeclaration = boxShadowDec;
		}
		
		showResult(cssDeclaration, styleInline,'box-shadow');
	});
});

$(function(){
	$("#font").on("input", function(){
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
	$("#outline").on("input", function() {
		var outlineWidth = $("#outline-width-val").val(),
		outlineColor = $("#outline-color").val(),
		outlineStyle = $("input[name='outline-style']:checked").val(),
		outlineOffset = $("#outline-offset-val").val(),
		outlineValues = [],
		offsetVal = '',
		outlineDec = [],
		decInline = '',
		cssDeclaration = '';

		if( validateInteger(outlineWidth, false)  && outlineStyle != '' && outlineStyle != 'none') {
			outlineValues.push('outline:')
			outlineValues.push(outlineWidth + 'px');
			outlineValues.push(outlineStyle);
			validateColor(outlineColor) ? outlineValues.push(outlineColor) : null;
			outlineDec.push(outlineValues.join(' ') + ';');
			if(validateInteger(outlineOffset, true)) {
				offsetVal = 'outline-offset: ' + outlineOffset + 'px';
				outlineDec.push(offsetVal);
			}
		}
		
		decInline = outlineDec.join('');
		cssDeclaration = outlineDec.join("\n");
		
		showResult(cssDeclaration, decInline, 'outline');
	});
});

$(function(){
	$("#text").on("input", function(){
		var letterSpacing = $("#txt-letter-spacing").val(),
		wordSpacing = $("#txt-word-spacing").val(),
		color = $("#txt-color").val();
		lineHeight = $("#txt-line-height").val(),
		textAlign = $('input[name="text-align"]:checked').val(),
		textIndent = $('#txt-indent').val();
		textDecorationLine = $('input[name="text-decoration-line"]:checked').val(),
		textDecorationColor = $("#tdcolor").val(),
		textDecorationStyle = $('input[name="text-decoration-style"]:checked').val(),
		textDecorationThickness = $("#txt-decoration-thickness").val(),
		textTransform = $('input[name="text-transform"]:checked').val(),
		valText = [],
		valTextDecoration = [],
		decInline = '',
		ruleCss = '';
		
		if(validatePositive(letterSpacing)) valText.push("letter-spacing: " + letterSpacing + "px;");
		if(validatePositive(wordSpacing)) valText.push("word-spacing: " + wordSpacing + "px;");
		if(color) valText.push("color: " + color + ";")
		if(validatePositive(lineHeight)) valText.push("line-height: " + lineHeight + "px;");
		if(textAlign) valText.push("text-align: " + textAlign + ";");
		if(validatePositive(textIndent)) valText.push("text-indent: " + textIndent + "px;");

		if(textDecorationLine != "none") {
			valTextDecoration.push("text-decoration:");
			valTextDecoration.push(textDecorationLine);
			valTextDecoration.push(textDecorationColor);
			if(textDecorationStyle != "none") valTextDecoration.push(textDecorationStyle);
			if(validatePositive(textDecorationThickness)) valTextDecoration.push(textDecorationThickness + "px");
			valText.push(valTextDecoration.join(' ') + ";");
		}

		if(textTransform) valText.push("text-transform: " + textTransform + ";");
		
		
		decInline = valText.join('');
		cssDeclaration = valText.join("\n");

		showResult(cssDeclaration, decInline,'text');
	});
});

$(function(){
	$("#text-shadow").on("input", function() {
		var tsHor = $("#tshor").val(),
		tsVer = $("#tsver").val(),
		tsBlur = $("#tsblur").val(),
		tsColor = $("#tscolor").val(),
		txtColor = $("#txtcolor").val(),
		tsBackgroundColor = $("#tsbackcolor").val(),
		showBgColor = $("#actv-bg-color").is(":checked") ? true : false;
		showTxtColor = $("#actv-txt-color").is(":checked") ? true : false;
		valuesTextShadow = [],
		textColorDec = '',
		backgroundColorDec = '',
		textShadowDec = '',
		generalDec = [],
		styleInline = '',
		cssDeclaration = '';
		
		if(validateInteger(tsHor, false) || validateInteger(tsVer, false) || validatePositive(tsBlur)){
			valuesTextShadow.push("text-shadow:");
			tsHor != '0' ? valuesTextShadow.push(tsHor + 'px') : valuesTextShadow.push('0');
			tsVer != '0' ? valuesTextShadow.push(tsVer + 'px') : valuesTextShadow.push('0');
			tsBlur != '0' ?  valuesTextShadow.push(tsBlur + 'px') : valuesTextShadow.push('0');
			validateColor(tsColor) ? valuesTextShadow.push(tsColor) : '';
			textShadowDec = valuesTextShadow.join(' ') + ';';
			generalDec.push(textShadowDec);
			
			if(validateColor(tsBackgroundColor)) backgroundColorDec = "background-color: " + tsBackgroundColor + ';';
			if(showBgColor) generalDec.push(backgroundColorDec);
			if(validateColor(txtColor)) textColorDec = "color: " + txtColor + ';';
			if(showTxtColor) generalDec.push(textColorDec);
		}
		
		styleInline = textShadowDec + backgroundColorDec + textColorDec;
		
		cssDeclaration = generalDec.join("\n");
		
		showResult(cssDeclaration, styleInline,'text-shadow');
	});
});

$(function(){
	$("#transform2d").on("input", function() {
		var transformRotate = $("#transform-rotate").val(),
		transformTranslateX = $("#transform-translate-x").val(),
		transformTranslateY = $("#transform-translate-y").val(),
		transformScaleX = $("#transform-scale-x").val(),
		transformScaleY = $("#transform-scale-y").val(),
		transformSkewX = $("#transform-skew-x").val(),
		transformSkewY = $("#transform-skew-y").val(),
		scaleSameVal = $("#enbl-scale-same-val").is(":checked") ? true : false;
		transformDec = [];
		decInline = '',
		cssDeclaration = '';
console.log(scaleSameVal);
		if(transformRotate != 0) transformDec.push("rotate(" + transformRotate + "deg)");
		
		if(transformTranslateX != 0 || transformTranslateY != 0) {
			transformDec.push("translate(" + transformTranslateX + "px, " + transformTranslateY + "px)");
		}
		
		if(scaleSameVal) {
			if(transformScaleX != 1){
				transformDec.push("scale(" + transformScaleX + ")");
			}
		}
		else if(transformScaleX != 1 || transformScaleY != 1) {
			transformDec.push("scale(" + transformScaleX + ", " + transformScaleY + ")");
		}

		if(transformSkewX != 0 || transformSkewY != 0) {
			transformDec.push("skew(" + transformSkewX + "deg, " + transformSkewY + "deg)");
		}

		if(transformDec.length > 0) {
			decInline = "transform: " + transformDec.join(' ') + ";";
			cssDeclaration = "transform: " + transformDec.join(" ") + ";";
		}
		
		showResult(cssDeclaration, decInline, 'transform2d');
	});
});

$(function(){
	$("#transition").on("input", function(){
		var tProperty = $("#transition-property").val(),
		tDuration = $("#transition-duration").val(),
		tTimingFunc = $('input[name="transition-timing-function"]:checked').val(),
		tDelay = $("#transition-delay").val(),
		classCssTransition = '',
		valTransition = [],
		cssDeclaration = '';
		
		if(tProperty &&	validateDecimalPositive(tDuration) && tTimingFunc) {
			classCssTransition = 'transition-' + tProperty;
			valTransition.push('transition: ' + tProperty);
			valTransition.push(tDuration + 's');
			valTransition.push(tTimingFunc);
			if(validateDecimalPositive(tDelay)) valTransition.push(tDelay + 's');
			cssDeclaration = valTransition.join(" ") + ';';
		}

		if( cssDeclaration != '') {
			$('.css-transition').html(cssDeclaration);
			$("#transition .out-transition div").attr("style", cssDeclaration);
			$("#transition .out-transition div").removeAttr("class");
			$("#transition .out-transition div").addClass('transition-'+tProperty);
			
		} else {
			$(".css-transition").html("");
			$("#transition .out-transition div").removeAttr("style");
			$("#transition .out-transition div").removeAttr("class");
		}
	});
});

$(function(){
	$(".copy-button").click( function(){
		var text = $(this).parent().siblings('textarea').val();
		if(text !== '') {
			navigator.clipboard.writeText(text);
			$('.copy-msg').fadeIn("slow").delay(1500).fadeOut("fast");
		}
	});
});

$(".range-default").on('input', function() {
	var rangeValue = $(this).val();
	$(this).parent().siblings('.prop-num-val').children('span').html(rangeValue);
});

$(".input-color").on('input', function() {
	var colorValue = $(this).val();
	$(this).parent().siblings('.box-code-color').children('.input-code-color').val(colorValue);
});

$(".input-code-color").on('input', function() {
	var colorValue = $(this).val();
	$(this).parent().siblings('.box-color').children('.input-color').val(colorValue);
});

$(".menu-icon-bars").click(function() {
	$(".menu-nav-bar").toggleClass('open-menu-clicked');
});

$(".menu-close").click(function() {
	if($(".menu-nav-bar").hasClass('open-menu-clicked')) {
		$(".menu-nav-bar").removeClass('open-menu-clicked')
	}
});
