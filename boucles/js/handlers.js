import app from './app.js';
import code from './code.js';

const handlers = {
    clickLoopMenu: function(event){
        const newLoop = event.target.dataset.loop;
        app.currentLoop = newLoop;
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("loop", newLoop);

        history.pushState(null,null, `?${queryParams.toString()}`);

        app.refreshMenu();
        code.setupPage()
    },
    changeLanguage: function(event) {
        let language = event.target.dataset.lang;

        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("language", language);
        queryParams.set("loop", app.menu[language][0]);
        history.pushState(null,null, `?${queryParams.toString()}`);
        
        app.currentLoop = app.menu[language][0];
        app.setupLanguage(language);
    },
    resetLoop: function(){
        code.setupLoopVars();
        code.resetResults();
        app.setDynamicTooltips();

    }, 
    playOneStepLoop: function() {
        code.displayStep();
    },
    playTotalLoop: function() {
        code.loopAll();
    }
}

export default handlers;
