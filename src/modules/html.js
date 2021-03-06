const { use } = require( './_helpers' );
const headAllLinks = require('../templates/links');

const createHTML = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        const { file , language , url , meta , title , style , body, link } = payload ;
        var stylesheet = '';
        if ( style !== '' ) stylesheet = `<link rel="stylesheet" type="text/css" href="${style}" media="all" />`;
        return `<!doctype html><html lang="${language}"><head><title>${title}</title>${createMETA({meta})}${createLINK({link})}${stylesheet}</head>${createBODY(body)}</html>`;
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

const createLINK = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
        // function start
        const { link } = payload ;
        return Array.isArray(link) ? link.join('') : headAllLinks.join('');
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
            ,   container = el.container
            ,   id = el.id 
            ,   value = el.value ? el.value : ''
            ,   attrId = ''
            ,   attrClass = '';
            if ( tag == 'img' ) {
                result.push( createIMG( el ) );
            } else if ( container ) {
                result.push( createContainer(el) )
            } else {
                if ( id ) attrId = `id="${id}"`;
                if ( classes ) attrClass = `class="${classes}"`;
                result.push( `<${tag} ${attrId} ${attrClass}>${value}</${tag}>` );
            }
        }
        return `<div id="content">${result.join('')}</div>`;
        // function end
    }} , test );
}

const createContainer = ( payload, test ) => {
    return use( { payload, callback: payload => {
        // function start
        var result = [];
        const { content } = payload ; 
        for( let x in content ) {
            let el = content[ x ];
            let tag = el.tag 
            ,   classes = el.classes
            ,   id = el.id 
            ,   value = el.value ? el.value : ''
            ,   attrId = ''
            ,   attrClass = '';
            if ( tag == 'img' ) {
                result.push( createIMG( el ) );
            } else {
                if ( id ) attrId = `id="${id}"`;
                if ( classes ) attrClass = `class="${classes}"`;
                result.push( `<${tag} ${attrId} ${attrClass}>${value}</${tag}>` );
            }
        }
        return result.join('');
        // function end
    }}, test )
}

const createIMG = ( payload , test ) => {
    return use( { payload , callback : ( payload ) => {
        // function start
        const { src , classes , id } = payload ; 
        var result = [], attrId ='', attrAlt = `alt="${src}"`;
        if ( id ) {
            attrId = `id="${id}"`;
            attrAlt = `alt="${id}"`;
        }
        return `<img ${attrId} src="/images/${src}/small" ${attrAlt}/>`;
        // function end
    }} , test );
}


module.exports = { createHTML , createMETA, createLINK , createBODY , createNAVIGATION , createIMG }