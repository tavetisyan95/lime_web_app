import "./App.css";
import ExplanationUI from "./explanation_UI.js";
import QuickshiftUI from "./quickshift_UI.js"
import FelzenszwalbUI from "./felzenszwalb_UI.js"
import ModelUploadUI from "./model_upload_UI.js"
import ImageUploadUI from "./image_upload_UI.js"
import SlicUI from "./slic_UI.js"
import ResponseUI from "./response_UI.js"


function App() {
	return (
		<div className="App">
			<p className="title">MLflow TRAINER</p>
			<p className="subtitle">Select parameters for MLflow training.</p>
			{/*<img src="http://localhost:8080/test.jpg"></img>*/}
			
			
			
				
				
			<div id="training_ui">
				<br></br>
				<br></br>
				<br></br>
				<p className="subtitle">MLFLOW AND GRID SEARCH PARAMETERS</p>
				<p className="description">In this section, select your training data, the desired estimator, and tweak grid search parameters.</p>
				<ModelUploadUI/>
				<ImageUploadUI/>
				<ExplanationUI/>
				
				{/*<p className="subtitle">ESTIMATOR HYPERPARAMETERS</p>			
				<p className="description">In this section, tweak estimator hyperparameters.</p>*/}
				{<QuickshiftUI/>}
				{<FelzenszwalbUI/>}
				{<SlicUI/>}
				<ResponseUI/>
			</div>
												
			
		</div>
	);
}

export default App;