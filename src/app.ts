import Router from "./scripts/core/Router.js";
import Store from "./scripts/core/Store.js";
import Home from "./scripts/views/Home.js";
import NewGame from "./scripts/views/NewGame.js";
import NewPlayer from "./scripts/views/NewPlayer.js";
import Players from "./scripts/views/Players.js";

Store.create('users', [])

Router.route('/', Home)
Router.route('/player/new', NewPlayer)
Router.route('/players', Players)
Router.route('/game/new', NewGame)

Router.boot()

window.addEventListener('popstate', function () {
    Router.boot()
} )