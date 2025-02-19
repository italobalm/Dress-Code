// Adicionando lógica de cor e sugestões
document.getElementById('colorInput').addEventListener('click', () => document.getElementById('colorPicker').click());

document.getElementById('colorPicker').addEventListener('input', function() {
    let color = this.value;
    let suggestions = getMatchingColors(color);
    displaySuggestions(suggestions);

    // Alterando a cor da barra de pesquisa e da lupa
    changeSearchBarColor(color);
});

function getMatchingColors(hex) {
    let r = parseInt(hex.substr(1,2), 16);
    let g = parseInt(hex.substr(3,2), 16);
    let b = parseInt(hex.substr(5,2), 16);
    let hsl = rgbToHsl(r, g, b);

    // Criando variações baseadas na cor escolhida
    let analogous1 = hslToRgb((hsl[0] + 30) % 360, hsl[1], hsl[2]);
    let analogous2 = hslToRgb((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]);
    let balancedComplementary = hslToRgb((hsl[0] + 150) % 360, hsl[1] * 0.8, hsl[2] * 1.1); // Complementar ajustado

    // Definindo uma cor neutra baseada na luminosidade
    let neutral = (hsl[2] > 0.5) ? "#333333" : "#F0F0F0"; // Preto ou Branco/Cinza claro

    return [
        rgbToHex(analogous1),
        rgbToHex(analogous2),
        rgbToHex(balancedComplementary),
        neutral
    ];
}

function displaySuggestions(colors) {
    let container = document.getElementById("suggestions");
    let colorBoxes = container.getElementsByClassName("color-box");

    // Preencher os círculos com as cores
    for (let i = 0; i < colorBoxes.length; i++) {
        if (colors[i]) {
            colorBoxes[i].style.backgroundColor = colors[i];
        }
    }
}

// Função para mudar a cor da barra de pesquisa e da lupa
function changeSearchBarColor(color) {
    const searchButton = document.getElementById('search-button');
    const colorInput = document.getElementById('colorInput');

    // Alterando a cor da barra de pesquisa e da lupa
    colorInput.style.backgroundColor = color;
    searchButton.style.backgroundColor = color;

    // Mudando a cor do texto para um contraste adequado
    if (getContrast(color) < 128) {
        colorInput.style.color = "#fff"; // Cor clara para o texto
        searchButton.style.color = "#fff"; // Cor clara para o texto da lupa
    } else {
        colorInput.style.color = "#000"; // Cor escura para o texto
        searchButton.style.color = "#000"; // Cor escura para o texto da lupa
    }
}

// Função para calcular o contraste de uma cor
function getContrast(hex) {
    // Calcula o contraste de uma cor para decidir se o texto ficará claro ou escuro
    let r = parseInt(hex.substr(1, 2), 16);
    let g = parseInt(hex.substr(3, 2), 16);
    let b = parseInt(hex.substr(5, 2), 16);

    // Usando a fórmula de luminância para calcular o contraste
    return (r * 0.299 + g * 0.587 + b * 0.114);
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        function hueToRgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hueToRgb(p, q, h / 360 + 1/3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(rgb) {
    return "#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}
// Adicionando lógica de cor e sugestões
document.getElementById('colorInput').addEventListener('click', () => document.getElementById('colorPicker').click());

document.getElementById('colorPicker').addEventListener('input', function() {
    let color = this.value;
    let suggestions = getMatchingColors(color);
    displaySuggestions(suggestions);
});

function getMatchingColors(hex) {
    let r = parseInt(hex.substr(1,2), 16);
    let g = parseInt(hex.substr(3,2), 16);
    let b = parseInt(hex.substr(5,2), 16);
    let hsl = rgbToHsl(r, g, b);

    // Criando variações baseadas na cor escolhida
    let analogous1 = hslToRgb((hsl[0] + 30) % 360, hsl[1], hsl[2]);
    let analogous2 = hslToRgb((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]);
    let balancedComplementary = hslToRgb((hsl[0] + 150) % 360, hsl[1] * 0.8, hsl[2] * 1.1); // Complementar ajustado

    // Definindo uma cor neutra baseada na luminosidade
    let neutral = (hsl[2] > 0.5) ? "#333333" : "#F0F0F0"; // Preto ou Branco/Cinza claro

    return [
        rgbToHex(analogous1),
        rgbToHex(analogous2),
        rgbToHex(balancedComplementary),
        neutral
    ];
}

function displaySuggestions(colors) {
    let container = document.getElementById("suggestions");
    let colorBoxes = container.getElementsByClassName("color-box");

    // Preencher os círculos com as cores
    for (let i = 0; i < colorBoxes.length; i++) {
        if (colors[i]) {
            colorBoxes[i].style.backgroundColor = colors[i];
        }
    }
}

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h *= 60;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l;
    } else {
        function hueToRgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hueToRgb(p, q, h / 360 + 1/3);
        g = hueToRgb(p, q, h / 360);
        b = hueToRgb(p, q, h / 360 - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(rgb) {
    return "#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}
