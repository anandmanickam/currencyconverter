export const validateCurrency = (_input:any) => {
    
    let _strIn:string = <string>_input;

    console.log('_strIn->', _strIn, _strIn[_strIn.length - 1]);
    if(new RegExp(/^\$?[0-9][0-9,]*[0-9]\.?[0-9]{0,2}$/i).test(_strIn)){
        return _input;
    }

    /* double decimal check */
    while(_strIn.indexOf('.') !== _strIn.lastIndexOf('.')){
        _strIn = _strIn.slice(0, _strIn.lastIndexOf('.'))
            .concat( _strIn.slice(_strIn.lastIndexOf('.') + 1, _strIn.length));
    }
    
    /*check for other characters */
    let checklist:string[] = ['+','-','e','E'];
    for (let item of checklist){
        while(_strIn.indexOf(item) !== -1){
            _strIn = _strIn.slice(0, _strIn.lastIndexOf(item))
                .concat( _strIn.slice(_strIn.lastIndexOf(item) + 1, _strIn.length));
        }
    }
    console.log('post _strIn->', _strIn);
    return _strIn;
}