# Importing dependencies
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from lime import lime_image
from skimage.segmentation import mark_boundaries
from lime.wrappers.scikit_image import SegmentationAlgorithm
from typing import List
import aiofiles

# Request body for explanation args
class Explanation(BaseModel):
    image_index: str
    top_labels: int
    num_samples: int
    top_predictions: int
    labels_to_explain: str       
    positive_only: bool
    negative_only: bool
    hide_rest: bool

# Request body for segmenter args
class Segmenter(BaseModel):    
    args: dict   

# Initializing the app
app = FastAPI()

# Setting allowed origin URLs for CORS
origins = ["http://localhost:3000",
           "http://localhost:5000"]

# Adding a list of CORS rules to our app
app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"])

# Endpoint for explanation generation
@app.post("/explain/")
def explain(explanation_params: Explanation,
              segmenter_params: Segmenter):  
    
    # Generating explanations with the passed arguments
    generate_explanations(segmenter_params, explanation_params)        
    
    # Checking if the user has provided specific labels to explain
    if explanation_params.labels_to_explain == "None":
        # If not, explain predictions with respect to top predictions            
        explain_images_with_respect_to_predictions(explanation_params)        
    elif explanation_params.labels_to_explain != "None":
        # If yes, explain prediction with respect to provided labels               
        explain_images_with_respect_to_labels(explanation_params)
    
    # Returning an OK code
    return 200

# Function for explanining images with respect to provided labels
def explain_images_with_respect_to_labels(explanation_params):
    # Getting explanations
    explanations = app.explanations

    # Breaking down the long string with labels into a list of string labels
    labels_to_explain = explanation_params.labels_to_explain.split(',')
    
    # Converting the string labels to integers
    for i in range(len(labels_to_explain)):
        labels_to_explain[i] = int(labels_to_explain[i])
    
    # Dynamically setting row and column count for the plot
    # The maximum number of columns in a row is intended to be 5    
    if len(labels_to_explain) <= 5:
        # If the number of provided labels is less than five, create one row
        # and as many columns as there are provided labels
        rows = 1
        cols = len(labels_to_explain)  
    else:
        # If the number of provided labels is more than five,
        # create the required number of rows and set
        # the number of rows to 5. This will result in more axes than we need,
        # which we will handle later
        rows = int(np.ceil(len(labels_to_explain) / 5))
        cols = 5
    
    # Creating a figure
    fig, axes = plt.subplots(rows, cols, squeeze=False)
    fig.set_size_inches(4 * cols, 3 * rows)
    
    # Getting the explanation that corresponds to the provided image index
    explanation = explanations[int(explanation_params.image_index)]
    
    # Setting a counter to keep track of provided labels
    counter = 0
    
    # Iterating over rows and columns
    for i in range(rows):
        for j in range(cols):        
            # Check if we have run out of labels to explain
            if counter < len(labels_to_explain):
                # Generating an explanation with respect to the current label
                temp, mask = explanation.get_image_and_mask(label=labels_to_explain[counter], 
                                                            positive_only=explanation_params.positive_only,
                                                            negative_only=explanation_params.negative_only,
                                                            hide_rest=explanation_params.hide_rest)


                # Showing the image with the superimposed mask
                axes[i, j].imshow(mark_boundaries(image=temp / 2 + 0.5, label_img=mask))

                # Showing the prediction corresponding to explanation
                axes[i, j].set_title(label=f"Prediction: {labels_to_explain[counter]}")                

                # Hiding x and y ticks
                axes[i, j].set_xticks(ticks=[])
                axes[i, j].set_yticks(ticks=[])

                # Incrementing the counter
                counter += 1

    # Iterating over the unfilled axes and turning off their lines and labels    
    for i in range(counter - (cols * (rows - 1)), cols):
        axes[rows - 1, i].axis('off')
    
    # Adjusting the padding between suplots to make better use of available space
    fig.tight_layout()

    # Saving the explanation
    fig.savefig(fname="../outputs/explanation.jpg")

def explain_images_with_respect_to_predictions(explanation_params):
    # Getting explanations
    explanations = app.explanations

    # Breaking down the long string with image indices into a list of string indices
    image_indices = explanation_params.image_index.split(',')    
    
    # Converting the string image indices to integers
    for i in range(len(image_indices)):
        image_indices[i] = int(image_indices[i])
    
    # Setting the number of rows equal to the number of image indices
    # and the number of columns equal to the number of 
    # the desired predictions that should be explained.
    # The +1 adds a spot for the original image
    rows = len(image_indices)
    cols = explanation_params.top_predictions + 1
    
    # Creating a figure
    fig, ax = plt.subplots(rows, cols, squeeze=False)
    fig.set_size_inches(4 * cols, 3 * rows)
    
    # Iterating over provided image indices
    for i in range(len(image_indices)):    
        # Getting the explanation object for the current image index
        explanation = explanations[image_indices[i]]
        
        # Showing the source image in the leftmost column
        ax[i, 0].imshow(app.original_images[image_indices[i]])
        
        # Hiding x and y ticks
        ax[i, 0].set_xticks(ticks=[])
        ax[i, 0].set_yticks(ticks=[])

        # Iterating over the number of the desired top predictions that should be explained
        # We start iterating from 1 to top_predictions + 1 because
        # we want the original image to be displayed to the left of the explanations
        for j in range(1, explanation_params.top_predictions + 1):            
            # Getting the image heatmap and the mask
            temp, mask = explanation.get_image_and_mask(label=explanation.top_labels[j - 1], 
                                                    positive_only=explanation_params.positive_only,
                                                    negative_only=explanation_params.negative_only,
                                                    hide_rest=explanation_params.hide_rest)
            
            # Showing the image with the superimposed mask
            ax[i, j].imshow(mark_boundaries(image=temp / 2 + 0.5, label_img=mask))

            # Showing the prediction corresponding to explanation
            ax[i, j].set_title(label=f"Prediction: {explanation.top_labels[j - 1]}")                

            # Hiding x and y ticks
            ax[i, j].set_xticks(ticks=[])
            ax[i, j].set_yticks(ticks=[])

    # Adjusting the padding between suplots to make better use of available space
    fig.tight_layout()

    # Saving the explanation
    fig.savefig(fname="../outputs/explanation.jpg")

# Function for creating the segmenter
def create_segmenter(segmenter_params):    
    # Returning a segmenter
    return SegmentationAlgorithm(**segmenter_params)   

# Endpoint for uploading model files
@app.post("/upload-model/")
async def load_model(weights: UploadFile = File(...), arch: UploadFile = File(...)):
    # Writing the received model file to server storage
    async with aiofiles.open('../outputs/received_model.h5', 'wb') as out_file:
        # Read the model weights in bytes
        content = await weights.read()

        # Write the weights to server storage
        await out_file.write(content)

    # Read the model architecture in bytes
    model_arch = await arch.read()
    
    # Load the model architecture from bytes
    app.model = tf.keras.models.model_from_json(model_arch)

    # Compile the model
    app.model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

    # Load the weights saved earlier
    app.model.load_weights('../outputs/received_model.h5')    
    
# Function for generating LIME explanations
def generate_explanations(segmenter_params,
                          explanation_params):
    
    # Creating a LIME explainer for images
    explainer = lime_image.LimeImageExplainer()
    
    # Checking which segmentation algorithm was requested 
    # and setting the keys of the arguments that need to be converted
    # from string to float       
    if segmenter_params.args["algo_type"] == "quickshift":        
        keys_to_float = ['ratio', 'max_dist', 'kernel_size', 'sigma']
        keys_to_int = []        
    elif segmenter_params.args["algo_type"] == "felzenszwalb":
        keys_to_float = ['scale', 'sigma']
        keys_to_int = ['min_size']
    elif segmenter_params.args["algo_type"] == "slic":
        keys_to_float = ['compactness', 'sigma', 'min_size_factor', 'max_size_factor']
        keys_to_int = ['n_segments', 'max_num_iter', 'start_label']
    
    # Converting float strings to float
    for key in keys_to_float:
        segmenter_params.args[key] = float(segmenter_params.args[key])

    # Converting int strings to int
    for key in keys_to_int:
        segmenter_params.args[key] = int(segmenter_params.args[key])
    
    # Creating a segmenter
    segmenter = create_segmenter(segmenter_params.args)        
    
    # Deleting explanations stored previously
    app.explanations = []

    # Iterating over provided images
    for image in app.original_images:
        # Generating and storing explanations for current image
        app.explanations.append(explainer.explain_instance(image=image,
                                                           classifier_fn=app.model.predict,
                                                           top_labels=explanation_params.top_labels,
                                                           num_samples=explanation_params.num_samples,                                         
                                                           segmentation_fn=segmenter,
                                                           random_seed=5,
                                                           progress_bar=False))
    
    
# Endpoint for uploading images
@app.post("/upload-images/")
async def upload_images(images: List[UploadFile] = File(...)):       
    # Deleting images stored previously
    app.original_images = []

    # Iterating over images
    for i in range(len(images)):
        # Reading the current image in bytes
        image = await images[i].read()
        
        # Converting the image bytes to numpy
        image = tf.io.decode_jpeg(image).numpy()        
        
        # Normalizing image
        image = image / 255.0                
        
        # Storing the image
        app.original_images.append(image)


import uvicorn

if __name__ == "__main__":
    uvicorn.run("lime-api:app", port=5000, reload=True)
