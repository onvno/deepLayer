/**
 * @authors     Li Weidong (https://github.com/onvno)
 * @email       leewei2020@gmail.com
 * @contributer
 * @company     Deep (www.deeping.cn) 
 * @date        2016-05
 * @version     0.1
 * @commit      This is first time to build some components , just want to get a more easy way for working . Before do this, most time work with jQuery, so i'm a worse JSer , please give us more confidence , more time & suggestions , thx !
 * Released under the MIT license.
 */

function deepLayer( options) {
	var defaults = {
		openBtn:'',
		className: 'fade-and-drop',
		closeBtn: true,
		content: "",
		/*maxWidth: 600,
		minWidth: 280,*/
		width: 500,
		bgLayer: true
	};

	var options,openBtn,closeBtn,layer,bgLayer;

	// change default
	if(arguments[0] && typeof arguments[0] === 'object') {
		options = inputArguments(defaults,arguments[0]);
	}else if(!arguments[0]){
		options = defaults;
	}

	// change default config
	function inputArguments(source,attribute) {
		var attr;
		for (attr in attribute) {
			if (attribute.hasOwnProperty(attr)) {
				source[attr] = attribute[attr];
			}
		}
		return source;
	}


	// init
	openBtn = options.openBtn;
	openBtn.addEventListener('click' , open);



	// build alert layer
	function buildLayer() {
		var content, contentHolder, docFrag ;

		// create DocFragment
		docFrag = document.createDocumentFragment();

		// create Layer
		layer = document.createElement('div');
		layer.className = "DP-layer " + options.className
		/*this.layer.style.minWidth = this.options.minxWidth + 'px'
		this.layer.style.maxWidth = this.options.maxWidth + 'px'*/
		layer.style.width = options.width +'px'			


		// bglayer is true or not
		if(options.bgLayer === true) {
			bgLayer = document.createElement('div');
			bgLayer.className = "DP-bglayer " + options.className;
			docFrag.appendChild(bgLayer);
		}

		// close btn is true or not
		if(options.closeBtn === true) {
			closeBtn = document.createElement('button')
			closeBtn.className = "DP-close"
			closeBtn.innerHTML = "&times;"
			layer.appendChild(closeBtn);
		}

		// judge content type
		if(typeof options.content === "string") {
			content = options.content;
		} else {
			content = options.content.innerHTML;
		}

		// layer add content
		contentHolder = document.createElement('div');
		contentHolder.className = "DP-content";
		contentHolder.innerHTML = content;
		layer.appendChild(contentHolder);

		// layer add to docFrag, add to body
		docFrag.appendChild(layer);
		document.body.appendChild(docFrag);
	}

	// btn or bglayer close
	function layerClose() {
		if(options.closeBtn) {
			closeBtn.addEventListener('click',close);
		}			

		if(options.bgLayer) {
			bgLayer.addEventListener('click',close);
		}
	}

	function open() {
		buildLayer();
		layerClose();
		getComputedStyle(layer).getPropertyValue('height');
		bgLayer.className = bgLayer.className + ' layer-open';


		var browser=navigator.appName
		var b_version=navigator.appVersion 
		var version=b_version.split(";"); 
		if(version[1]){
			var trim_Version=version[1].replace(/[ ]/g,""); 
		}
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0"){
			var a = document.querySelectorAll('.DP-layer');
			var wid = parseInt(a[0].style.width) / 2
			var hei = parseInt(a[0].style.height) / 2
			a[0].style.marginLeft = "-" + wid +'px'
			a[0].style.marginTop = "-" + hei + 'px'	
		}

		deepEase(layer, {opacity:1} , 500, 'easeInOutCubic')
		// Velocity(this.layer, { opacity: 1 }, 1500);		
	}

	function close() {
		layer.className = layer.className.replace(' layer-open','')
		bgLayer.className = bgLayer.className.replace(' layer-open','')
		layer.parentNode.removeChild(layer)
		bgLayer.parentNode.removeChild(bgLayer)		
	}

}


