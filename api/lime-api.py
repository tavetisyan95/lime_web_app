from fastapi import FastAPI, Query, Body, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

from lime import lime_image
import sys
import traceback
from skimage.segmentation import mark_boundaries
from lime.wrappers.scikit_image import SegmentationAlgorithm
import json
from typing import Any, List
import aiofiles

class Images(BaseModel):
    imgs: str

class Explanation(BaseModel):
    image_index: str
    top_labels: int
    num_samples: int
    top_predictions: int
    labels_to_explain: str       
    positive_only: bool
    negative_only: bool
    hide_rest: bool

class Segmenter(BaseModel):    
    args: dict

class Model(BaseModel):
    model_arch: str
    model_weights: str
    
class ModelWeights(BaseModel):
    model_weights: str
    
class Item(BaseModel):
    string: UploadFile = File(...)   
    
app = FastAPI()

origins = ["http://localhost:3000",
           "http://localhost:5000"]

app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"])

@app.post("/explain/")
def explain(explanation_params: Explanation,
              segmenter_params: Segmenter):  
    
    """model = create_model()
    model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    
    model.set_weights(weights)"""
    
    generate_explanations(segmenter_params, explanation_params)
    explanations = app.explanations    
       
    if explanation_params.labels_to_explain == "None":            
        image_indices = explanation_params.image_index.split(',')
        
        print("wiht respect to predictions")
        
        for i in range(len(image_indices)):
            image_indices[i] = int(image_indices[i])
        
        rows = len(image_indices)
        cols = explanation_params.top_predictions + 1
        
        fig, ax = plt.subplots(rows, cols, squeeze=False)
        fig.set_size_inches(4 * cols, 3 * rows)
        
        for i in range(len(image_indices)):    
            explanation = explanations[image_indices[i]]
            
            # Showing the source image in the leftmost column
            ax[i, 0].imshow(app.original_images[image_indices[i]])
            
            # Hiding x and y ticks
            ax[i, 0].set_xticks(ticks=[])
            ax[i, 0].set_yticks(ticks=[])

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

        fig.tight_layout()

        fig.savefig(fname="../outputs/explanation.jpg")
        
    elif explanation_params.labels_to_explain != "None":
        labels_to_explain = explanation_params.labels_to_explain.split(',')
    
        for i in range(len(labels_to_explain)):
            labels_to_explain[i] = int(labels_to_explain[i])
            
        if len(labels_to_explain) <= 5:
            rows = 1
            cols = len(labels_to_explain)  
        else:
            rows = int(np.ceil(len(labels_to_explain) / 5))
            cols = 5
                        
        print(rows, cols)
        print("wiht respect to labels")
        
        fig, ax = plt.subplots(rows, cols, squeeze=False)
        fig.set_size_inches(4 * cols, 3 * rows)
        
        explanation = explanations[int(explanation_params.image_index)]
        
        counter = 0
        
        for i in range(rows):
            for j in range(cols):        
                # Getting the image heatmap and the mask
                if counter < len(labels_to_explain):
                    temp, mask = explanation.get_image_and_mask(label=labels_to_explain[counter], 
                                                                positive_only=False,
                                                                negative_only=False,
                                                                hide_rest=False)


                    # Showing the image with the superimposed mask
                    ax[i, j].imshow(mark_boundaries(image=temp / 2 + 0.5, label_img=mask))

                    # Showing the prediction corresponding to explanation
                    ax[i, j].set_title(label=f"Prediction: {labels_to_explain[counter]}")                

                    # Hiding x and y ticks
                    ax[i, j].set_xticks(ticks=[])
                    ax[i, j].set_yticks(ticks=[])
                    counter += 1
        
        print(counter)
        for i in range(counter - (cols * (rows - 1)), cols):
            print(i)
            ax[rows - 1, i].axis('off')
            
        fig.tight_layout()
        fig.savefig(fname="../outputs/explanation.jpg")
        
    
    return {"Hello": explanation_params.image_index}


def create_segmenter(segmenter_params):
    print(segmenter_params)
    
    return SegmentationAlgorithm(**segmenter_params)   

    
@app.post("/upload-model/")
async def load_model(weights: UploadFile = File(...), arch: UploadFile = File(...)):
    #weights = await item.read()
    async with aiofiles.open('../outputs/received_model.h5', 'wb') as out_file:
        content = await weights.read()
        await out_file.write(content)
        
    
    #model_arch = await weights.read()
    #model_arch = json.load(arch.file)
    
    #print(model_arch)
    
    model_arch = await arch.read()
    
    app.model = tf.keras.models.model_from_json(model_arch)
    #model = create_model()
    app.model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])
    app.model.load_weights('../outputs/received_model.h5')    
    #model.evaluate(test_images, test_labels)
    


def generate_explanations(segmenter_params,
                          explanation_params):
    
    explainer = lime_image.LimeImageExplainer()
    
    keys_to_float = ['ratio', 'max_dist', 'kernel_size', 'sigma']
    keys_to_int = ['channel_axis']
    
    if segmenter_params.args["algo_type"] == "quickshift":
        keys_to_float = ['ratio', 'max_dist', 'kernel_size', 'sigma']
        keys_to_int = ['channel_axis']
    elif segmenter_params.args["algo_type"] == "felzenszwalb":
        keys_to_float = ['scale', 'sigma']
        keys_to_int = ['min_size', 'channel_axis']
    elif segmenter_params.args["algo_type"] == "slic":
        keys_to_float = ['compactness', 'sigma', 'min_size_factor', 'max_size_factor']
        keys_to_int = ['n_segments', 'max_num_iter', 'start_label', 'channel_axis']
    
    for key in keys_to_float:
        segmenter_params.args[key] = float(segmenter_params.args[key])
        print(isinstance(segmenter_params.args[key], float))
        
    for key in keys_to_int:
        segmenter_params.args[key] = int(segmenter_params.args[key])
        print(isinstance(segmenter_params.args[key], int))
    
    segmenter = create_segmenter(segmenter_params.args)        
    
    
    app.explanations = []
    for image in app.original_images:
        
        
        app.explanations.append(explainer.explain_instance(image=image,
                                                           classifier_fn=app.model.predict,
                                                           top_labels=explanation_params.top_labels,
                                                           num_samples=explanation_params.num_samples,                                         
                                                           segmentation_fn=segmenter,
                                                           random_seed=5,
                                                           progress_bar=False))
    
    

@app.post("/upload-images/")
async def upload_images(images: List[UploadFile] = File(...)):       
    app.original_images = []
    for i in range(len(images)):
        image = await images[i].read()
        
        image = tf.io.decode_jpeg(image).numpy()        
        #tf.io.write_file(f'{i}.jpg', tf.image.encode_jpeg(image))        
        image = image / 255.0
        #image = np.frombuffer(image, dtype="int32")                
        
        
        app.original_images.append(image)


"""import uvicorn

if __name__ == "__main__":
    uvicorn.run("lime-api:app", port=5000, reload=True)"""
