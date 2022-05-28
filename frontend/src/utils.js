export const isLog = () => {
    if (localStorage.getItem("token")) {
        return(JSON.parse(localStorage.getItem("token")))
    } else {
        console.log('false');
        return false
    }
}

