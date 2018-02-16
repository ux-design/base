Image.prototype.load = function(url){
    var thisImg = this;
    const xmlHTTP = new XMLHttpRequest();
    const reader = new FileReader();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'arraybuffer';
    xmlHTTP.onload = function(e) {
        var blob = new Blob([this.response]);
        reader.readAsDataURL(blob);
        //thisImg.src = window.URL.createObjectURL(blob);
    };
    reader.addEventListener('load', () => {
        thisImg.src = reader.result
    })
    xmlHTTP.onprogress = function(e) {
        thisImg.completedPercentage = parseInt((e.loaded / e.total) * 100, 10);
    };
    xmlHTTP.onloadstart = function() {
        thisImg.completedPercentage = 0;
    };
    xmlHTTP.send();
};
Image.prototype.completedPercentage = 0;

const ImagePreloader = {
    images : {},
    load : ( url ) => {
        if ( !ImagePreloader.images[ url ] ) {
            var tempImg = new Image();
            tempImg.load( url );
            ImagePreloader.images[ url ] = tempImg;
        }
    }    
}


export default ImagePreloader;