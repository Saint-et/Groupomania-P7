export const isLog = () => {

    if (localStorage.getItem("User")) {
        return (JSON.parse(localStorage.getItem("User")))
    } else {
        //console.log('false');
        return false
    }
}
