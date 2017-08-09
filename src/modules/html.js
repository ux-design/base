const { use } = require( './_helpers' );

const createHTML = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        const { file , language , url , meta , title , style , body } = payload ;
        return `<!doctype html><html lang="${language}"><head><title>${title}</title>${createMETA({meta})}<link rel="stylesheet" type="text/css" href="${style}" media="all" /></head>${createBODY(body)}</html>`;
        // function end
	}} , test );
}

const createMETA = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        const { meta } = payload ;
        return meta.join('');
        // function end
	}} , test );
}

const createBODY = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        const { navigation , content } = payload ;
        return `<body>${createNAVIGATION(navigation)}${createCONTENT(payload)}</body>`;
        // function end
	}} , test );
}

const createNAVIGATION = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        var result = [];
        for( let x in payload ) {
                result.push( createNAVIGATIONlinks( payload[ x ] ) );
        }
        return `<div id="navigation">${result.join('')}</div>`;
        // function end
	}} , test );
}

const createNAVIGATIONlinks = ( payload , test ) => {
    return use( { payload , callback : ( payload ) => {
        // function start
        const { name , link } = payload ;
        return `<div id="${name}"><a href="${link}">${name}</a></div>`;
        // function end
	}} , test );
}

const createCONTENT = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        var result = [];
        const { content } = payload ; 
        for( let x in content ) {
            let el = content[ x ];
            let tag = el.tag 
            ,   classes = el.classes
            ,   id = el.id 
            ,   value = el.value ? el.value : '';
            result.push( `<${tag} id="${id}" class="${classes}">${value}</${tag}>` );
        }
        return `<div id="content">${result.join('')}</div>`;
        // function end
	}} , test );
}


module.exports = { createHTML , createMETA , createBODY , createNAVIGATION }