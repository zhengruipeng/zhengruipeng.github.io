import {GameCat} from "./game-cat.js";

document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.querySelector("#game-container");

    let gameCat = new GameCat();
    gameCat.init(gameContainer);

    const gameScore = document.querySelector("#game-score");
    gameScore.innerHTML = localStorage.getItem("score") ?? 0;


});