import * as math from 'https://esm.run/mathjs';

// Get the canvas and its context
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set canvas size and initial properties
canvas.width = 450;
canvas.height = 450;
ctx.lineWidth = 35;
let bgcolor = "#000000";
let pencolor = "#FFFFFF";
ctx.fillStyle = bgcolor;
ctx.lineCap = "round";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = pencolor;
let isPainting = false;

// Path to JSON file containing neural network parameters
const filePath = "src/parametres.json";

// Buttons and icons
var brush_btn = document.querySelector("#brush");
var pen_btn = document.querySelector("#pen");
var eraser_btn = document.querySelector("#eraser");
var clear_btn = document.querySelector("#clear");
var icon_outline = document.querySelectorAll(".outline");
var icon_fill = document.querySelectorAll(".fill");
var pred = document.querySelector("#prediction");

// Add event listeners for drawing and touch events
canvas.addEventListener('mousedown', handleWritingStart);
canvas.addEventListener('mousemove', handleWritingInProgress);
canvas.addEventListener('mouseup', handleDrawingEnd);
canvas.addEventListener('mouseout', handleDrawingEnd);
canvas.addEventListener('touchstart', handleWritingStart);
canvas.addEventListener('touchmove', handleWritingInProgress);
canvas.addEventListener('touchend', handleDrawingEnd);


/**
* Handles the writing start event. This is called when the user starts writing a line to the canvas.
* 
* @param event - The event that triggered this call. Must be preventDefault ()
*/
function handleWritingStart(event) {
  event.preventDefault();

  const mousePos = getMosuePositionOnCanvas(event);
  
  ctx.beginPath();

  ctx.moveTo(mousePos.x, mousePos.y);
  ctx.fill();
  
  isPainting = true;
}

/**
* Handles writing in progress. Draws a line from the mouse position to the drawing point. This is a workaround for IE where we don't want to draw the line when the user clicks on the drawing button.
* 
* @param event - The mouse event that triggered this call. Ignored
*/
function handleWritingInProgress(event) {
  event.preventDefault();
  
  // Draws the mouse to the canvas.
  if (isPainting) {
    const mousePos = getMosuePositionOnCanvas(event);

    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
  }
}

/**
* Handles the end of drawing. Stops the canvas and loads the numbers from the JSON file. This is called by the draw () function when the drawing is finished
* 
* @param event - Event that triggered the
*/
function handleDrawingEnd(event) {
  event.preventDefault();
  
  // Draws the current stroke if painting is enabled.
  if (isPainting) {
    ctx.stroke();
  }
  /**
  * @param jsonData
  */
  loadJSON(filePath, function (jsonData) {
    
    
    const W1 = jsonData.W1;
    const b1 = jsonData.b1; 
    const W2 = jsonData.W2; 
    const b2 = jsonData.b2; 
    
    getNumbers(W1, b1, W2, b2);
    });
  isPainting = false;
}

/**
* Get the position of the touch event on the canvas. This is used to determine where the user clicked on the canvas in order to scroll the DOM.
* 
* @param event - The touch event to get the position of.
* 
* @return {{ x : number y : number }} The canvas position in pixels relative to the top left corner of the DOM
*/
function getMosuePositionOnCanvas(event) {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    const { offsetLeft, offsetTop } = event.target;
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const canvasX = clientX - offsetLeft + scrollX;
    const canvasY = clientY - offsetTop + scrollY;
  
    return { x: canvasX, y: canvasY };
  }

/**
* This function resizes the canvas to fit the screen. If the canvas is larger than the screen it will draw a border around
*/
function resizeCanvas() {
    const screenWidth = window.innerWidth; 
    console.log(screenWidth)
    let newCanvasWidth = 450;
    let lineWidth = 35;

    // Set the width of the canvas.
    if (screenWidth <= 360) {
        newCanvasWidth = 275;
        lineWidth = 25;
    }    
    // Set the width of the canvas to the new width.
    else if (screenWidth <= 475) {
        newCanvasWidth = 300;
        lineWidth = 30;
    }
    // Set the new canvas width to 400.
    else if (screenWidth <= 600) {
        newCanvasWidth = 400;
    }
  
    canvas.width = newCanvasWidth;
    canvas.height = newCanvasWidth; 
    console.log(canvas.width)
  
    ctx.lineWidth = lineWidth;
    let bgcolor = "#000000";
    let pencolor = "#FFFFFF";
    ctx.fillStyle = bgcolor;
    ctx.lineCap = "round";
    //console.log(ctx.lineCap);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = pencolor;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/**
* a / object / string / number. The same as the C ++ version but with a string
*/
brush_btn.addEventListener("click", function() {
    ctx.lineCap = "round";
    icon_outline[0].style.display = "none";
    icon_outline[1].style.display = "block";
    icon_outline[2].style.display = "block";
    icon_fill[0].style.display = "block";
    icon_fill[1].style.display = "none";
    icon_fill[2].style.display = "none";
    ctx.strokeStyle = pencolor;
});

/**
* / / object / list to be used in a template. This is a bit complex and the same as the
*/
pen_btn.addEventListener("click", function() {
    ctx.lineCap = 'butt';
    icon_outline[0].style.display = "block";
    icon_outline[1].style.display = "none";
    icon_outline[2].style.display = "block";
    icon_fill[0].style.display = "none";
    icon_fill[1].style.display = "block";
    icon_fill[2].style.display = "none";
    ctx.strokeStyle = pencolor;
})

/**
* / / object / list object is used to determine the type of object that is being
*/
eraser_btn.addEventListener("click", function() {
    icon_outline[0].style.display = "block";
    icon_outline[1].style.display = "block";
    icon_outline[2].style.display = "none";
    icon_fill[0].style.display = "none";
    icon_fill[1].style.display = "none";
    icon_fill[2].style.display = "block";
    ctx.strokeStyle = bgcolor;
});

clear_btn.addEventListener("click", () => {
    isPainting = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    pred.style.visibility = "hidden";
});

/**
* ReLU ( Z ) Computes the value of the element - wise LU decomposition of a real number.
* 
* @param Z - A real number. Must be greater than zero.
* 
* @return { number } The result of the LAPACK routine which is equivalent to the input Z except that it may be negative
*/
function ReLU(Z) {
    return math.max(Z, 0);
}

/**
* Calculate the softmax of a vector. This is used to calculate the log probability of each element in the vector
* 
* @param Z - vector of length n
* 
* @return { number } softmax of the vector ( s ) in the input vector ` Z ` as a number
*/
function softmax(Z) {
    const expZ = math.map(Z, math.exp);
    const sumExpZ = math.sum(expZ);
    return math.dotDivide(expZ, sumExpZ);
}

/**
* Calculates the dot product of two vectors. Used to calculate the length of a vector that is a product of two vectors.
* 
* @param A - The first vector to multiply. Must be non negative.
* @param B - The second vector to multiply. Must be non negative.
* 
* @return { number } The dot product of A and B. If A and B are zero this is the same
*/
function dot(A, B) {
    return math.multiply(A, B);
}

/**
* Forward propagation of the neural network. W1 and b1 are the parameters of the neural network.
* 
* @param W1 - The weight matrix W1.
* @param b1 - The bias vector b1. Shape : [ n_features ].
* @param W2 - The weight matrix W2. Shape : [ n_features ].
* @param b2 - The bias vector b2. Shape : [ n_features ].
* @param X - The input data to the neural network. Shape : [ n_samples n_features ].
* 
* @return { number } A2 The output activation matrix ( s ) of the neural network after the forward propagation
*/
function forward_prop(W1, b1, W2, b2, X) {
    //console.log(W1)
    const Z1 = dot(W1, math.transpose(X));
    math.add(Z1, b1, Z1); 
    const A1 = math.map(Z1, ReLU);
    const Z2 = dot(W2, A1);
    math.add(Z2, b2, Z2); 
    const A2 = softmax(Z2);
    return A2;
}

/**
* Get the index of the most frequent value in A2 and return it. This is used to determine the probability of a user's choice
* 
* @param A2 - Array of predictions for each user
* 
* @return { Number } Index of the most frequent value in A2 ( 0 - based index not 0
*/
function get_predictions(A2) {
    //console.log(A2);
    let max = A2[0];
    let index = 0;
    // Find the maximum value of the matrix
    for (let i = 1; i < A2.length; i++) {
        // Set the maximum value of the array
        if (parseFloat(A2[i]) > max) {
            max = A2[i]
            index = i;
        }
    }
    return index;
}

/**
* Resize and get pixel data from canvas. This is useful for debugging and to avoid loading images in browser when window resizes.
* 
* 
* @return { Uint8Array } image data as Uint8Array ( width height pixelData ) or null if image data couldn't be
*/
function resizeCanvasAndGetPixelData() {  
    
    let width_min = 28;
    let height_min = 28;
    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = width_min;
    resizedCanvas.height = height_min;
    const resizedCtx = resizedCanvas.getContext("2d");

    
    resizedCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width_min, height_min);

    
    const imageData = resizedCtx.getImageData(0, 0, width_min, height_min);
    return imageData;
}

/**
* Converts an image canvas to an array of pixel colors. This is used to convert the color image of the webgl canvas to an array of RGB triplets.
* 
* @param imageData - The canvas image to convert. Must be an image canvas.
* 
* @return { Array } The image canvas converted to an array of pixel colors. Note that the order of the colors is undefined
*/
function canvasToArray(imageData) {
    const pixelColors = [];
    // This method is used to fill the pixel colors.
    for (let i = 0; i < imageData.data.length; i += 4) {
        pixelColors.push(imageData.data[i]/255);
    }
    return [pixelColors];
}

/**
* Gets the numbers and displays them in the pred. html. This is called by forward_prop when the user clicks on the button
* 
* @param W1 - width of the first feature
* @param b1 - height of the first feature ( 0 - 255 )
* @param W2 - width of the second feature ( 0 - 255 )
* @param b2 - height of the second feature ( 0 - 255
*/
function getNumbers(W1, b1, W2, b2) {
    let X = canvasToArray(resizeCanvasAndGetPixelData());
    let numbers = forward_prop(W1, b1, W2, b2, X);
    pred.style.visibility = "visible";
    pred.innerHTML = get_predictions(numbers);
}

/**
* Loads a JSON file and calls callback with the result. This is a wrapper around load () to avoid loading the file multiple times in one request
* 
* @param filePath - Path to the JSON file
* @param callback - Callback to call with
*/
function loadJSON(filePath, callback) {
    const xhr = new XMLHttpRequest();
    /**
    * / / object / list to be used in a call to any of the methods of the object
    */
    xhr.onreadystatechange = function () {
    // Callback function to be called when the server is ready to be ready to be processed.
    if (xhr.readyState === 4 && xhr.status === 200) {
        const jsonData = JSON.parse(xhr.responseText);
        callback(jsonData);
    }
    };
    xhr.open("GET", filePath, true);
    xhr.send();
}