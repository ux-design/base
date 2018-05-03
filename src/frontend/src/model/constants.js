const protocol = window.location.protocol;
export const ip = protocol + '//' + window.location.hostname.replace(':3000','')

export const colors = {
    IMAGE_PRELOAD_BG_COLOR : 'yellow',
    IMAGE_PRELOAD_TEXT_COLOR : 'black'
}
export const urls =  {
    images: ip + '/images/',
    vectors: ip + '/svg/'
}
