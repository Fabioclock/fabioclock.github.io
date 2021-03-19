import app from './app.js';

const code = {
    enumerable: [
        {
            key: 'prenom',
            value: 'Alphonse'
        },
        {
            key: 'nom',
            value: 'Robichu'
        },
        {
            key: 'poste',
            value: 'Directeur'
        },
    ],
    iterable: [
        'pommes',
        'poires',
        'scoubidousbidous'
    ],
    for: {
        endCondition: 5
    },
    while: {
        endCondition: 5
    },
    foreach: {
       endCondition: 'enumerable',
    },
    'for...in': {
        endCondition: 'enumerable',
    },
    'for...of': {
        endCondition: 'iterable'
    },
    initialIterator: 0,
    currentIterator: 0,
    endCondition: 5,
    setupPage: function(){
        // Set the loop settings (vars for initial and current iterator and end condition of the loop)
        code.setupLoopVars();

        // Set up the template
        const page = document.querySelector('.explanations');
        page.innerHTML = '';

        const template = document.querySelector(`[data-element="${app.currentLanguage}-${app.currentLoop}"]`);
        const clone = document.importNode(template.content, true);

        code.fillTemplate(clone);

        page.appendChild(clone);
        code.resetResults();
        app.setBasicTooltips();
        app.setDynamicTooltips();
    },
    resetResults: function() {
        const result = document.querySelector('.result-board ul');
        result.innerHTML = '<li>Utilisez les boutons ci-dessous pour lancer la boucle !</li>';
    },
    setupLoopVars: function() {
        const currentLoopSettings = code[app.currentLoop];
        code.loopType = (typeof currentLoopSettings.endCondition === 'number') ? 'number' : currentLoopSettings.endCondition;
        code.endCondition =  (code.loopType === 'number') ? currentLoopSettings.endCondition : code[code.loopType].length;
        
        code.initialIterator = 0,
        code.currentIterator = 0;
    },
 
    displayStep: function() {
        let step = document.createElement('li');
        // Is loop over ?
        if(code.currentIterator >= code.endCondition) {
            step = document.createElement('li');
            step.classList.add('error');
            step.innerText = "La boucle est terminée !"
        } else {
            if(code.loopType === 'number') {
                step.innerText = code.currentIterator;
            } else if(code.loopType === 'enumerable') {
                step.innerText = code[code.loopType][code.currentIterator].value;
            } else if(code.loopType === 'iterable') {
                step.innerText = code[code.loopType][code.currentIterator];
            }
            app.setDynamicTooltips();
            code.currentIterator++
        }

        const board = document.querySelector('.result-board ul');
        board.appendChild(step);
        code.highlightChangedVars();

    },
    loopAll: function(){
        for (let index = code.currentIterator; index < code.endCondition; index++) {
            code.displayStep();            
        }
    },
    fillTemplate: function(template) {
        if(code.loopType !== "number") {

            const lineTemplate = document.querySelector(`[data-element="${app.currentLanguage}-${code.loopType}"]`);
            const fillable = template.querySelector('.fill');

            for(let key in code[code.loopType]) {
                const clone = document.importNode(lineTemplate.content, true);
                let element = code[code.loopType][key];

                const value = (code.loopType === 'enumerable') ? element.value : element;

                if(code.loopType === 'enumerable') {
                    const key = (app.currentLanguage === 'php') ?  `'${element.key}'` : element.key;
                    clone.querySelector('.key').innerText = key;
                }

                clone.querySelector('.value').innerText = `'${value}'`;

                fillable.appendChild(clone);
            }
        }
    },
    highlightChangedVars: function(){
        const vars = document.querySelectorAll('[class^=tippy-]');
        for (const variable of vars) {
            app.punctualClass(variable, 'highlight', 1500);
        }
    }
}

export default code;