function animate () {
	//inspiration for effect found at https://codepen.io/rebswu/full/jKeKZP
	//inspiration and proper regex for tokenization found at http://jsfiddle.net/raisch/pHaeR/
	
	var style_params = [];
	var spans = [...document.body.querySelectorAll('.terminalScreen span')];
	spans.forEach((element,i)=>{
		var total = [];
		element.innerText.split(new RegExp('\\s*(\\.{3}|\\w+\\-\\w+|\\w+\'(?:\\w+)?|\\w+|[\\[\\!\\"\\#\\$\\%\\&\\\'\\(\\)\\*\\+\\,\\\\\\-\\.\\/\\:\\;\\<\\=\\>\\?\\@\\[\\]\\^\\_\\`\\{\\|\\}\\~\\]])')).filter(x=>!!x).forEach((token,ti)=>{
			var color = "pink";
			if ("(){}[];:'\".,><\\/?+-=_|!@#$%^&*`~".includes(token)) color="white";
			else if (["html", "js", "javascript", "css", "cascading", "style", "sheets", "sheet", "styles", "hypertext", "markup", "language"].includes(token.toLowerCase())) color="orange";
			
			total[ti] = [];
			token.split("").forEach(l=>{
				total[ti].push("<span class='"+color+"'>"+l+"</span>");
				element.innerText = element.innerText.slice(1);
			});
			if (element.innerText[0]==" ") {
				total[ti].push("<span>&nbsp;</span><wbr>");
				element.innerText = element.innerText.slice(1);
			}
			total[ti] = total[ti].join("");
		});
		total = total.join("");
		i++;
		document.getElementById("terminalOL").innerHTML += '<li class="number'+i+'"><div class="line line'+i+'">'+total+'<span class="cursor'+i+'">_</span></p></li>';
		element.parentNode.removeChild(element);
		style_params.push([i, i*0.5, (i*0.5)+0.25, (i*0.5)+0.5]);
	});
	
	var code_styles = document.getElementById("codestyles");
	code_styles.innerHTML = "";
	
	style_params.forEach(([i,x,y,z], index)=>{
		code_styles.innerText += '.number'+i+'{-webkit-animation: type '+x+'s '+z+'s steps(50, end) forwards;-moz-animation: type '+x+'s '+z+'s steps(50, end) forwards;-o-animation: type '+x+'s '+z+'s steps(50, end) forwards;animation: type '+x+'s '+z+'s steps(50, end) forwards;}.line'+i+'{-webkit-animation: type '+y+'s '+z+'s steps(50, end) forwards;-moz-animation: type '+y+'s '+z+'s steps(50, end) forwards;-o-animation: type '+y+'s '+z+'s steps(50, end) forwards;animation: type '+y+'s '+z+'s steps(50, end) forwards;}.cursor'+i+'{-webkit-animation: blink '+y+'s 1s '+((index==style_params.length-1)?2:1)+' forwards;-moz-animation: blink '+y+'s 1s '+((index==style_params.length-1)?2:1)+' forwards;-o-animation: blink '+y+'s 1s '+((index==style_params.length-1)?2:1)+' forwards;animation: blink '+y+'s 1s '+((index==style_params.length-1)?"infinite":1)+' forwards;}';
	});
}
animate();