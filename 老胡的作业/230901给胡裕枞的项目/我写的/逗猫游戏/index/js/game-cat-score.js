import {Config} from "../../common-plugins/config.js";
import {App} from "./App.js";

let GameCatScore = {
    score: (function () {
        if (App.offline)
            return localStorage.getItem("score") - 0 ?? 0;

        fetch(Config.service.GET_SCORE.path)
            .then(response => response.json())
            .then(json => {
                if (json.data)
                    GameCatScore.score = json.data;
                else
                    GameCatScore.score = localStorage.getItem("score") - 0 ?? 0;
            });

    })(),
    add(score = 10) {
        this.score += score;
    },
    minus(score = 10) {
        this.score -= score;
    }
};
export {GameCatScore}