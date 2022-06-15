export const isLog = () => {
    if (localStorage.getItem("User")) {
        return (JSON.parse(localStorage.getItem("User")))
    } else {
        return false
    }
}
