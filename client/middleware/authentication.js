export default function(context) {
    if (context.store.getters["userAuth/isLoggedIn"]) {
        console.log("authenticated user");
    } else {
        context.redirect("/login");
    }
}