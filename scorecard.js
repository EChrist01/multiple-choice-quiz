let scoresBtn = document.querySelector( 
    "#view-high-scores"
); 
// Function to print high scores
function printHighscores() { 
    let highscores = 
        JSON.parse( 
            window.localStorage.getItem( 
                "highscores"
            ) 
        ) || []; 
    highscores.sort(function (a, b) { 
        return b.score - a.score; 
    }); 

    // Iterate through high scores and display them
    highscores.forEach(function ( 
        score 
    ) { 
        let liTag = 
            document.createElement( 
                "li"
            ); 
        liTag.textContent = 
            score.name + 
            " - " + 
            score.score; 
        let olEl = 
            document.getElementById( 
                "highscores"
            ); 
        olEl.appendChild(liTag); 
    }); 
} 

function clearHighscores() { 
    window.localStorage.removeItem( 
        "highscores"
    ); 
    window.location.reload(); 
} 
// Attach event listener to the clear button to trigger the clearHighscores function
document.getElementById( 
    "clear"
).onclick = clearHighscores; 

printHighscores();