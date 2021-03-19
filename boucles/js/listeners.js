import app from './app.js';
import handlers from './handlers.js';

const listeners = {
    bindInitialListeners: function() {
        this.listenLanguagueSwitcher();
        this.bindLoopButtons();
    },
    listenLanguagueSwitcher: function(){
        const buttons =  document.querySelectorAll('.switch-language > div');

        for(let button of buttons) {
            button.addEventListener('click', handlers.changeLanguage);
        }
    },
    bindLoopButtons: function() {
        const resetBtn = document.querySelector('.result .reset');
        resetBtn.addEventListener('click', handlers.resetLoop);

        const playBtn = document.querySelector('.result .play');
        playBtn.addEventListener('click', handlers.playOneStepLoop);

        const loopBtn = document.querySelector('.result .total-loop');
        loopBtn.addEventListener('click', handlers.playTotalLoop);
    },
    bindMenu: function() {
        const loops = document.querySelectorAll('.loop-menu li');
        for (let loop of loops) {
            loop.addEventListener('click', handlers.clickLoopMenu);
        }
    }
}

export default listeners;
