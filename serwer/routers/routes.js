"use strict";

module.exports = function (app) {
    // mid
    const auth = require("../mid/auth")

    

    const contr_dania = require("../controllers/contr_dania.js");

    app.route('/')
        .get(contr_dania.get_info)

    app.route("/danie/:id")
        .get(contr_dania.get_danie)
        .put(auth.jwt_admin, contr_dania.put_danie)
        .delete(auth.jwt_admin, contr_dania.delete_danie)

    app.route("/danie")
        .post(auth.jwt_admin, contr_dania.post_danie)
        .get(contr_dania.get_dania)

    app.route("/ocena/:id")
        .put(auth.jwt_ogolny, contr_dania.put_ocena)

    const contr_komentarze = require("../controllers/contr_komentarze");

    app.route("/danie/:idd/komentarze/:id")
        .get(contr_komentarze.get_komentarz)
        .delete(auth.jwt_admin, contr_komentarze.delete_komentarz)

    app.route("/danie/:idd/komentarze")
        .get(contr_komentarze.get_komentarze)
        .post(auth.jwt_ogolny, contr_komentarze.post_komentarz)

    const contr_users = require("../controllers/contr_users");
    const contr_zam = require("../controllers/contr_zamowienie")

    app.route("/users/:id")
        .get(contr_users.get_user)
        .delete(auth.jwt_admin, contr_users.delete_user)

    app.route("/users")
        .post(contr_users.post_user)
        .get(auth.jwt_admin, contr_users.get_users)

    app.route("/users/:idu/zamowienia")
        .get( contr_zam.get_zamowienia)
        .post(auth.jwt_ogolny, contr_zam.post_zamowienie)

    const login = require("../controllers/contr_login")

    app.route('/login')
        .post(login.login)

    const refToken = require("../controllers/contr_refToken")

    app.route("/refreshToken")
        .post(refToken.post_refToken)
        .delete(refToken.delete_refToken)
}