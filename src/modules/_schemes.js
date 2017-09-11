const schemes = {
	method : {
		ax : '[object Number]',
		ay : '[object Number]',
		bx : '[object Number]',
		by : '[object Number]'
	},
	// html
	createHTML : {
		file: '[object String]',
		language : '[object String]',
		url: '[object String]',
		meta : '[object Array]',
		title : '[object String]',
		style: '[object String]',
		body: '[object Object]'
	},
	// meta
	createMETA : {
		meta: '[object Array]'
	},
	// body
	createBODY : {
		navigation: '[object Object]',
		content: '[object Array]'
	},
	// navigation
	createNAVIGATION : {
		navigation: '[object Object]'
	},
	// navigation links
	createNAVIGATIONlinks : {
		name: '[object String]',
		link: '[object String]'
	},
	// content
	createCONTENT : {
		content: '[object Array]'
	},
	// content
	createIMG : {
		src: '[object String]',
		id: '[object String]',
		classes: '[object String]'
	}
}

module.exports = schemes