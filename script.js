
        const btnCopy = document.querySelector('#btnCopy');
        const generate = document.querySelector('.generate');
        const classificationBars = [...document.querySelectorAll('.container-classification div span')];
        let input = document.querySelector(".generator__passText input");

        let characters = ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz", "0123456789", "!@#$%¨&*()+_"]
        let classificationPass = '';

        generate.addEventListener('click', generatePassword);

        function copyPass() {
            btnCopy.textContent === 'Copy'
            input.select();
            document.execCommand('copy');
            applyCopyButtonText('Copied!');
        }

        function applyCopyButtonText(text) {
            btnCopy.textContent = text;
        }


        function generatePassword() {
            let pass = ''
            let inputLength = document.querySelector('#range').value;
            let config = [
                document.querySelector("#uppercase").checked,
                document.querySelector("#lowercase").checked,
                document.querySelector("#numbers").checked,
                document.querySelector("#symbols").checked
            ]

            if (config.every(el => el !== true)) return;

            while (pass.length <= inputLength) {
                let x = Math.floor(Math.random() * 4)

                if (config[x]) {
                    let indexItem = Math.floor(Math.random() * characters[x].length)

                    let letter = characters[x].slice(indexItem, indexItem + 1);
                    pass += letter;
                }
            }

            applyCopyButtonText('Copy');
            applyPass(pass);
            applyClassification();
        }

        function applyPass(pass) {
            input.value = pass;
        }


        function applyClassification() {
            let levelPass = document.querySelector('.container-classification div h3');
            let lengthPass = input.value.length;

            if (lengthPass > 0) classificationPass = 'easy';
            if (lengthPass > 8) classificationPass = 'medium';
            if (lengthPass > 14) classificationPass = 'hard';
            if (lengthPass > 20) classificationPass = 'expert';

            levelPass.textContent = classificationPass;
            applyClassification_bars();
        }

        function applyClassification_bars() {
            function cleanBarsColor() {
                classificationBars.forEach(bar => bar.style.backgroundColor = 'transparent')
            }
            switch (classificationPass) {
                case 'easy':
                    cleanBarsColor();
                    classificationBars.slice(0, 1).forEach(bar => bar.style.backgroundColor = 'red');
                    break;
                case 'medium':
                    cleanBarsColor();
                    classificationBars.slice(0, 2).forEach(bar => bar.style.backgroundColor = 'orange');
                    break;
                case 'hard':
                    cleanBarsColor();
                    classificationBars.slice(0, 3).forEach(bar => bar.style.backgroundColor = 'yellow');
                    break;
                case 'expert':
                    cleanBarsColor();
                    classificationBars.slice(0, 4).forEach(bar => bar.style.backgroundColor = 'greenyellow');
                    break;
            }
        }

        function applyMaxlength() {
            let maxPasslength = document.querySelector('.rangeValue');
            let rangeValue = event.target.value;
            maxPasslength.textContent = rangeValue
            input.maxLength = rangeValue;
        }
