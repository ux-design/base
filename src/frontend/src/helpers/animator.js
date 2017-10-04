const Animator = ( element ) => {
    if ( typeof element === 'object' ) {
        return {
            use : ( animation ) => {
                if ( !element.className.match( animation ) ){
                    element.className += ` ${animation}`;
                };
                return {
                    removeAfter : ( seconds ) => {
                        setTimeout( () => {
                            element.className = element.className
                                .replace( ` ${animation}` , '' )
                                .replace('  ' , ' ' );
                        } , seconds * 1000 );
                    }
                }
            }
        };
    }
    
}

export default Animator;