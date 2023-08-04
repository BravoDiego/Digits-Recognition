<div>
  <img src="src\banner.png" alt="Digits Recognation image banner" width="720"/>
</div>

# Digits Recognition

For my CS50x final project [Final Project](https://cs50.harvard.edu/x/2023/project/), I decided to create a website on which I implanted an artificial intelligence that recognizes a hand-drawn digit.
<div align="center">
  <h3>
    <a href="https://youtu.be/V5ufoeHwun0">
      Video Demo
    </a>
    <span> | </span>
    <a href="https://bravodiego-digits-recognition.netlify.app/">
      Website
    </a>
</div>

## Installation and Run (neurons)

Use [pip](https://pip.pypa.io/en/stable/) to iKnstall all packages/requirements.

```
$ pip install -r requirements.txt
```

Open the file, run the desired part to cell number 10 to export the neural network parameters in json format, under the name parametres.json in the "src" folder.

## Description
### neurons.ipynb

neurons.ipynb is a python notebook that lets you control the tasks and outputs of your code and break them down into several parts.

__The file contains 3 main instructions:__

- The part for creating the neural network and training it

- The part that exports the parameters of the network in a format.


- The part that exports images for the website design (such as the banner).

### style/app.js

app.js is the website's main file, and it's this file that will take care of the drawing and prediction of the drawn figure, as well as making the brudh system, with the buttons.

__The file contains 2 main instructions:__

To perform any action, you need to write the number next to the desired action (to register, write 1...).

- The part for drawing on the canvas, it will also manage the buttons for changing brushes or deleting drawings on the canvas.

- The part for which it will convert the canva, and give it to the prediction model. 
    * It will resize the canva to 28 by 28 pixels and then convert this new drawing to a monochrome pixel list.

    * With the mathjs module, app.js will apply the forward propagation of the artificial neural model to the pixel list, in parallel app.js will have retrieved the parameters of this model stored in the parametres.json file. Once forward propagation has been performed, app.js displays the result of the model prediction.


## Files

All files stored in the **/src** directory are either image/icon files that will be displayed on the website, or files used for the learning model, such as **parametres.json**.

In the **/style** folder you'll find **app.js** and **styles.css**, the latter useful for the aesthetic aspect of the site and for responsive design.

The **.html** files contain the tags for the website elements. They are the foundation of the website, they determine what is in the website (eg a canva to draw a header with a title etc. ..). 

The **information.html** file contains more information on the libraries used and the training of the neural network.

## License
[MIT](https://choosealicense.com/licenses/mit/)