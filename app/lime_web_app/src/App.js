import "./App.css";
import ExplanationUI from "./explanation_UI.js";
import QuickshiftUI from "./quickshift_UI.js"
import FelzenszwalbUI from "./felzenszwalb_UI.js"
import ModelUploadUI from "./model_upload_UI.js"
import ImageUploadUI from "./image_upload_UI.js"
import SlicUI from "./slic_UI.js"
import ResponseUI from "./response_UI.js"
import SegmenterSelectorUI from "./segmenter_selector_UI.js"


function App() {
	return (
		<div className="App">
			<p className="title">LIME EXPLANATION GENERATOR</p>
			<p className="subtitle">Select parameters to generate image classification explanations with LIME.</p>										
				
			<div id="training_ui">
				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">TENSORFLOW MODEL FILES</p>
				<p className="description">In this section, upload your TF Keras model weights and architecture.</p>
				<ModelUploadUI/>


				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">IMAGES</p>
				<p className="description">In this section, select images that LIME should base explanations on.</p>
				<ImageUploadUI/>

				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">SEGMENTER</p>
				<p className="description">In this section, select the desired segmenter algorithm and its parameters.</p>
				<SegmenterSelectorUI/>
				{<QuickshiftUI/>}
				{<FelzenszwalbUI/>}
				{<SlicUI/>}

				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">EXPLAINER</p>
				<p className="description">In this section, select the desired parameters for explanation plotting.</p>
				<ExplanationUI/>
				
				{/*<p className="subtitle">ESTIMATOR HYPERPARAMETERS</p>			
				<p className="description">In this section, tweak estimator hyperparameters.</p>*/}				
				<ResponseUI/>
			</div>															
		</div>
	);
}

export default App;