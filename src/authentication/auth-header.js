export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
        console.log(localStorage.getItem(user))
    } else {
        return {};
    }
}