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
			<p className="title">MLflow TRAINER</p>
			<p className="subtitle">Select parameters for MLflow training.</p>										
				
			<div id="training_ui">
				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">MLFLOW AND GRID SEARCH PARAMETERS</p>
				<p className="description">In this section, select your training data, the desired estimator, and tweak grid search parameters.</p>
				<ModelUploadUI/>
				<p className="subtitle">IMAGES</p>
				<p className="description">In this section, select images that LIME should base explanations on.</p>
				<ImageUploadUI/>
				<p className="subtitle">SEGMENTER</p>
				<p className="description">In this section, select the desired segmenter algorithm and its parameters.</p>
				<SegmenterSelectorUI/>
				{<QuickshiftUI/>}
				{<FelzenszwalbUI/>}
				{<SlicUI/>}
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