
let cols; // colonne
let rows; // righe
let titoloHeight; // Altezza dell'area del titolo

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop(); 
  adjustGrid(); 
  
  // altezza dell'area del titolo che proporziono allo schermo di modo che sia adatti 
  // a tutte le sue possibili dimensioni 
  titoloHeight = windowHeight * 0.08;
}

function draw() {
  background("rgb(217,209,209)");

  //dichiaro le variabili legate alla dimensione delle celle 
  let celleWidth = windowWidth / cols;
  //sottraggo lo spazio dedicato al titolo nel calcolo dell'altezza delle celle
  let celleHeight = (windowHeight - titoloHeight) / rows; 
  
  // titolo in alto
  drawTitle();

  // Faccio partire la griglia sotto l'area del titolo
  for (let i = 0; i < cols; i++) {
    for (let r = 0; r < rows; r++) {
      push();
      // sposto il centro al centro delle celle
      translate(i * celleWidth + celleWidth / 2, r * celleHeight + celleHeight / 2 + titoloHeight);
      
      // Disegno una macchia simmetrica
      drawMacchie(celleWidth / 2, celleHeight / 2);
      
      pop();
    }
  }
}

function drawTitle() {
  fill("black"); // Colore del testo
  textAlign(windowWidth/2, CENTER);
  textSize(titoloHeight * 0.4); 
   textFont("Courier New");
// Disegno il titolo nell'area definita in alto
  text(" - Che cosa vede?", 10, titoloHeight/2);
}

//funzione per disegnare le macchie 
function drawMacchie(celleWidth, celleHeight) {
  //imposto un limite al numero di macchie da disegnare 
  for (let n = 0; n < 15; n++) {
    //disegno le macchie in maniera random all'interno di metà cella e successivamente 
    //replico il disegno specularmente 
    let x = random(-celleWidth / 2, 0);
    let y = random(-celleHeight / 2, celleHeight / 2);
    let size = random(8, 30);
    
    fill("black");
    noStroke();
    //il primo ellipse disegna le macchie nela metà sinistra, l'altro le riproduce specularmente a destra 
    ellipse(x, y, size, size);
    ellipse(-x, y, size, size); // Riflesso speculare
  } 
}

function adjustGrid(){
  // Uso la larghezza della finestra per regolare la griglia 
  if (windowWidth > 1200) {
    cols = 8;
    rows = 5;
  } else if (windowWidth > 800) {
    cols = 6;
    rows = 4;
  } else {
    cols = 4;
    rows = 3;
  }
}

// con windowResized la griglia e il titolo si ridisegnano quando la finestra viene ridimensionata
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  titoloHeight = windowHeight * 0.1; // area del titolo
  adjustGrid(); // numero di colonne e righe
  draw(); // Ridisegna la griglia
}