import listeners from './listeners.js';
import code from './code.js';

const app = {
    currentLanguage: "",
    currentLoop: "",
    menu: {
        'php': ['for', 'while','foreach'],
        'js': ['for', 'while', 'do...while',  'for...of', 'for...in']
    },
    tippyInstances: [],
    init: function(){
        // Setup current language and load the default page
        app.getLanguageFromUrl();
        app.generateMenu();
        listeners.bindInitialListeners();

    }, 
    getLanguageFromUrl: function(){
        // Retrieve the requested language from the url
        const urlParams = new URLSearchParams(window.location.search);
        let language = urlParams.get('language');
        // PHP will be the default language if none is provided
        if(language === null) {
            const queryParams = new URLSearchParams(window.location.search);
            queryParams.set("language", 'php');
            history.pushState(null,null, `?${queryParams.toString()}`);
            language = 'php';
        }

        app.setupLanguage(language);
    },
    setupLanguage: function(language) {
        app.currentLanguage = language;
        const buttons = document.querySelectorAll('.switch-language > div');
        // Toggle the active class on each button
        for(let button of buttons) {
            if(button.classList.contains(app.currentLanguage)) {
                button.classList.add('active');
            } else 
            {
                button.classList.remove('active');
            }
        }
        app.generateMenu();
        // Refresh the page
        code.setupPage();
    },
    generateMenu: function() {
        const menu = document.querySelector('.loop-menu ul');
        menu.innerHTML = '';

        for(let loop of app.menu[app.currentLanguage]){
            let li = document.createElement('li');
            li.dataset.loop = loop;
            li.innerText = loop;
            menu.appendChild(li);
        }
        // Retrieve the requested loop from the url
        const urlParams = new URLSearchParams(window.location.search);
        let loop = urlParams.get('loop');
        app.currentLoop = (loop) ? loop : app.menu[app.currentLanguage][0];
        app.refreshMenu();
        listeners.bindMenu();
    },
    refreshMenu: function() {
        const loops = document.querySelectorAll('.loop-menu li');
        for (let loop of loops) {
            if(loop.dataset.loop == this.currentLoop){
                loop.classList.add('active');
            } else {
                loop.classList.remove('active');
            }
        }
    },
    setBasicTooltips: function(){
        tippy('[data-tippy-content]');
    },
    setDynamicTooltips: function(){
        // Remove the exisiting ones
        app.removeTooltips();
        let tempTippy;

        const numberTips = document.querySelectorAll('.tippy-number');

        for (let tipElement of numberTips ){
            tempTippy = tippy(tipElement, {
                'content': code.currentIterator,
                'theme': 'light',
            })
            app.tippyInstances.push(tempTippy);
        }

        const keyTips = document.querySelectorAll('.tippy-key');

        for (let tipElement of keyTips ){
            const key = (code.loopType === 'enumerable') ? code.enumerable[code.currentIterator].key : code.currentIterator;
            tempTippy = tippy(tipElement, {
                'content': key,
                'theme': 'light',

            })
            app.tippyInstances.push(tempTippy);
        }

        const valueTips = document.querySelectorAll('.tippy-value');

        for (let tipElement of valueTips ){
            const value = (code.loopType === 'enumerable') ? code.enumerable[code.currentIterator].value : code.iterable[code.currentIterator];
            tempTippy = tippy(tipElement, {
                'content': value,
                'theme': 'light',

            })
            app.tippyInstances.push(tempTippy);
        }


    },
    removeTooltips: function() {
        app.tippyInstances.forEach(instance => {
            if(typeof instance.destroy !== "undefined") {
                instance.destroy();
            }
        });
        app.tippyInstances = [];
    },
    // Gives an element a class, then removes it after a given time
    punctualClass: function(element, classname, time = 1000) {
        element.classList.add(classname);
        setTimeout(function() {
            element.classList.remove(classname);
        }, time);
    }
   
}

document.addEventListener('DOMContentLoaded', app.init);
export default app;
