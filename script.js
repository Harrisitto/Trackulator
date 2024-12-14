/*
VARIABLE DECLARATION
*/
const startBtn = document.getElementById("start-button");
const VelCadBtn = document.getElementById("velcad-btn");
const CadVelBtn = document.getElementById("cadvel-btn");

document.getElementById('language-change').addEventListener('click', function(event) { 
    event.preventDefault(); // Prevent the default link behavior 
    openLink(this.href); // Call your function 
}); 
function openLink(url) { 
    window.location.href = url; // Navigate to the URL 
}

startBtn.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById('mySoundClick').play();

    const navbar = document.getElementById("navbar");
    const startScreen = document.getElementById("start-screen");
    startScreen.remove();
    navbar.style.display = "flex";
    startBtn.remove();

    displayCadVel();
    VelCadBtn.addEventListener("click", displayVelCad);
    CadVelBtn.addEventListener("click", displayCadVel);
});

function displayCadVel(event) {
    if(event) { event.preventDefault(); }
    document.getElementById('mySoundClick').play();
    VelCadBtn.style.background = "var(--color3)";
    CadVelBtn.style.background = "var(--color0)";

    const screenShow = document.getElementById("CadVel-div");
    const screenHide = document.getElementById("VelCad-div");
    const form = document.getElementById("CadVel-form");
    screenShow.style.display = "block";
    screenHide.style.display = "none";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        cadData = {
            plato: parseInt(document.getElementById("plato").value, 10),
            piñon: parseInt(document.getElementById("piñon").value, 10),
            cadencia: parseInt(document.getElementById("cadencia").value, 10),
            perimetro: parseInt(document.getElementById("perimetro").value, 10),
            primeraVuelta: parseFloat(document.getElementById("primera-vuelta").value, 10),
        }

        displayVelResults(calculateVel(cadData));
        document.getElementById('mySoundRing').play();
    }); 
}

function calculateVel(cadData) {
    const rel = cadData.plato / cadData.piñon;
    const velLineal = cadData.cadencia * cadData.perimetro * 0.00006 * rel;
    const velVuelta = 900 / velLineal;
    let primeraVuelta = 0;
    console.log(cadData.primeraVuelta);
    if(cadData.primeraVuelta) {
        primeraVuelta = cadData.primeraVuelta;
    } else {
        primeraVuelta = velVuelta;
    }
    const velData = {
        "Velocidad:  ": [`${velLineal.toFixed(2)} km/h`, velLineal.toFixed(2)],   // Velocidad lineal
        "Tiempo por vuelta:  ": [`${velVuelta.toFixed(2)} sec`, velVuelta],                  //Velocidad vuelta
        "500m:  ": [`${timeConversor(velVuelta + primeraVuelta)[0]}min ${timeConversor(velVuelta + primeraVuelta)[1].toFixed(2)}sec`, velVuelta + primeraVuelta], //500m
        "1km:  ": [`${timeConversor(velVuelta * 3 + primeraVuelta)[0]}min ${timeConversor(velVuelta * 3 + primeraVuelta)[1].toFixed(2)}sec`, velVuelta * 3 + primeraVuelta],
        "2km:  ": [`${timeConversor(velVuelta * 7 + primeraVuelta)[0]}min ${timeConversor(velVuelta * 7 + primeraVuelta)[1].toFixed(2)}sec`, velVuelta * 7 + primeraVuelta], // 2km
        "3km:  ": [`${timeConversor(velVuelta * 11 + primeraVuelta)[0]}min ${timeConversor(velVuelta * 11 + primeraVuelta)[1].toFixed(2)}sec`, velVuelta * 11 + primeraVuelta],
        "4km:  ": [`${timeConversor(velVuelta * 15 + primeraVuelta)[0]}min ${timeConversor(velVuelta * 15 + primeraVuelta)[1].toFixed(2)}sec`, velVuelta * 15 + primeraVuelta], // 4km
    }
    return velData;
}

function displayVelResults (velData) {
    const divElement = document.getElementById("CadVel-results");

    while(divElement.firstChild) {
        divElement.removeChild(divElement.firstChild);
    }

    Object.entries(velData).forEach( ([key, speed]) => { 
        const h1 = document.createElement("p");
        h1.classList.add("results");
        h1.innerText = key + speed[0];
        divElement.appendChild(h1);
    });      
}

function displayVelCad(event) {
    event.preventDefault();
    document.getElementById('mySoundClick').play();
    VelCadBtn.style.background = "var(--color0)";
    CadVelBtn.style.background = "var(--color3)";

    const screenShow = document.getElementById("VelCad-div");
    const screenHide = document.getElementById("CadVel-div");
    const form = document.getElementById("VelCad-form");
    screenShow.style.display = "block";
    screenHide.style.display = "none";

    const velocidadTipo = document.getElementById("input-velocidad-tipo");
    const inputDiv = document.getElementById("input-velocidad-valor");
    velocidadTipo.addEventListener("change", ()=>{
        while(inputDiv.firstChild) {
            inputDiv.removeChild(inputDiv.firstChild);
        }
        let input = [];
        switch(velocidadTipo.value) {
            case "velocidad":  
                input.push({
                    label_text: "Velocidad (km/h): ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "40",
                    input_min: "20",
                    input_max: "100",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-min",
                    input_required: true,
                });
                break;
            case "tiempo-sec":
                input.push({
                    label_text: "Segundos por vuelta: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "15",
                    input_min: "5",
                    input_max: "60",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-min",
                    input_required: true,
                });
                break;
            case "tiempo-km":
                input.push({
                    label_text: "Minutos*: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "1",
                    input_min: "0",
                    input_max: "7",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-min",
                    input_required: true,
                });
                input.push({
                    label_text: "Segundos*: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "30",
                    input_min: "0",
                    input_max: "59",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-sec",
                    input_required: true,
                });
                input.push({
                    label_text: "Segundos primera vuelta: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "30",
                    input_min: "0",
                    input_max: "59",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-primera",
                    input_required: false,
                });
                break;
    
            case "tiempo-4km":
                input.push({
                    label_text: "Minutos*: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "5",
                    input_min: "2",
                    input_max: "30",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-min",
                    input_required: true,
                });
                input.push({
                    label_text: "Segundos*: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "30",
                    input_min: "0",
                    input_max: "59",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-sec",
                    input_required: true,
                });
                input.push({
                    label_text: "Segundos primera vuelta: ",
                    label_class: ["form-label", "secondary-label"],
                    input_placeholder: "30",
                    input_min: "0",
                    input_max: "59",
                    input_type: "number",
                    input_class: ["form-input"],
                    input_id: "velocidad-primera",
                    input_required: false,
                });
                break;
    
            default:
                break;
        }
        input.forEach((element) => {
            const label = document.createElement("label")
            label.innerText = element.label_text;
            element.label_class.forEach((className) => { 
                label.classList.add(className);
            });
            inputDiv.appendChild(label);

            const input = document.createElement("input");
            input.placeholder = element.input_placeholder;
            input.min = element.input_min;
            input.max = element.input_max;
            input.type = element.input_type;
            element.input_class.forEach((className) => {
                input.classList.add(className);
            });
            input.id= element.input_id;
            input.required = element.input_required;
            inputDiv.appendChild(input);
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        velData = {
            secLap: secLapValue(velocidadTipo.value),
            cadencia: document.getElementById("cadencia-des").value,
            perimetro: document.getElementById("perimetro-des").value,
        };

        displayCadResults(calculateDes(velData));
        document.getElementById('mySoundRing').play();
    });    
    
}

function calculateDes(desData) {
    let rel = (desData.secLap * desData.cadencia * desData.perimetro);
    rel = (15000000 / rel).toFixed(3);
    return rel;
}

function displayCadResults(rel) {
    const divElement = document.getElementById("VelCad-results");
    console.log(rel);
    while(divElement.firstChild) {
        divElement.removeChild(divElement.firstChild);
    }

    if(rel < 0){
        const h1 = document.createElement("p");
        h1.classList.add("results");
        h1.innerText = `Tienes que introducir una medida para la velocidad!`;
        divElement.appendChild(h1);
    } else {
        let find = 0;
        let error = 0;
        const h1 = document.createElement("p");
        h1.classList.add("results");
        h1.innerText = `El numero --X-- indica la diferencia entre la relacion optima y la calculada. Cuanto mas cercano a 0, mejor se adaptara a los datos introducidos.`;
        divElement.appendChild(h1);
        while(find < 5 && error < 2) {
            console.log([find, error]);
            [find, error] = searchGear(find, error, rel, divElement);
        }
        if(error > 1.98) {
            const h1 = document.createElement("p");
            h1.classList.add("results");
            h1.innerText = `No se encontraron resultados`;
            divElement.appendChild(h1);
        }
    }
}

/*MISCELANEOUS FUNCTIONS*/
function searchGear(find, error, rel, divElement) {
    let relij = 0;
    for(let i = 65; i > 38; i--){
        for(let j = 10; j < 35; j++){
            relij = Math.abs(i/j - rel).toFixed(3);
            if(relij < error){
                const h1 = document.createElement("p");
                h1.classList.add("results");
                h1.innerText = `Necesitas un plato de: ${i} y un piñon de ${j} dientes.\n--${relij}--`;
                divElement.appendChild(h1);
                find++;
            }
        }
    }
    error += 0.01;
    return [find, error];
}
function secLapValue(velocidadTipo) {
    let secLap = 0;
    const velocidad1 = parseFloat(document.getElementById("velocidad-min").value);

    switch(velocidadTipo) {
        case "velocidad":
            secLap = 900 / velocidad1;
            break;
        case "tiempo-sec":
            secLap = velocidad1;
            break;
        case "tiempo-km":
            const velocidad2 = parseInt(document.getElementById("velocidad-sec").value);
            const primeraVuelta1 = parseFloat(document.getElementById("velocidad-primera").value);
            if(primeraVuelta1) {
                secLap = ((velocidad1 * 60 + velocidad2) - primeraVuelta1) / 3;  
            } else {
                secLap = (velocidad1 * 60 + velocidad2) / 4;
            }
            break;
        case "tiempo-4km":
            const velocidad3 = document.getElementById("velocidad-sec").value;
            const primeraVuelta2 = parseFloat(document.getElementById("velocidad-primera").value);
            if(primeraVuelta2) {
                secLap = (((velocidad1 * 60) + velocidad3) - primeraVuelta2) / 15;
            } else {
                secLap = ((velocidad1 * 60) + velocidad3) / 16;
            }
            break;
        case "none":
            secLap = -1;
            break;
        default:
            secLap = -1;
            break;
    }
    console.log(secLap);
    return secLap;
}

function timeConversor(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return [min, sec];
}