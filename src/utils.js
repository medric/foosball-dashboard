export function commonElements(array1, array2) {
    return array2.filter((obj) => array1.indexOf(obj) !== -1 );
}