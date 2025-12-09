# Auto ML Pipeline Generator  
### Automated Machine Learning Pipeline Builder 
---
## Hackathon  Recognition
**This project was submitted to the **Vibe Coding with Gemini 3 Pro Hackathon** (Dec 5–12, 2025), hosted by Google AI Studio**. 
<img width="1916" height="977" alt="AUTOMLPIPELINEHGEN" src="https://github.com/user-attachments/assets/4865a1c2-a6aa-4aaf-9e6f-1244c217f9b3" />


---
It demonstrates automated ML pipeline generation using Gemini 3 Pro’s reasoning and multimodality capabilities. Auto ML Pipeline Generator is a lightweight, end-to-end system that automatically builds machine learning pipelines using minimal user input. The tool simplifies data preprocessing, model selection, hyperparameter tuning, and evaluation into a single automated workflow.  
It is designed for students, analysts, and beginners who want quick, reliable ML results without manually writing pipelines.

The system includes:
- A web-based user interface created using Google AppSheet / AppStudio.
- Backend logic that generates preprocessing pipelines.
- Automated model selection and evaluation using Python.
- A demo of working predictions using the Titanic dataset.

---

## Features  
### 1. Automated Data Processing  
- Missing value handling  
- Categorical encoding  
- Numerical scaling  
- Duplicate removal  
- Train-test splitting  

### 2. Auto Model Selection  
The system tests multiple algorithms and picks the best performer:
- Logistic Regression  
- Random Forest  
- Decision Tree  
- XGBoost (if available)  
- SVC  

### 3. Evaluation Metrics  
- Accuracy  
- Precision  
- Recall  
- F1 Score  
- Confusion Matrix  

### 4. Web App Interface  
Users can:
- Upload dataset  
- Generate ML pipeline  
- View recommended model  
- Download processed dataset  
- Review evaluation results  

### 5. Export Options  
- Processed dataset  
- Trained pipeline  
- Model summary  
- Demo video  

---

## Dataset  
The project uses the Titanic dataset to demonstrate:
- Data preprocessing  
- Automated pipeline generation  
- Model evaluation  

---

## How It Works  
### Step 1: Upload CSV  
User uploads any tabular dataset.

### Step 2: Automated Preprocessing  
System handles:
- Missing values  
- Encoding  
- Scaling  
- Outlier reduction  

### Step 3: Auto Model Testing  
Multiple models are trained and scored.

### Step 4: Best Model Selected  
The system automatically selects and returns the top model.

### Step 5: Results Displayed

After running the pipeline, the UI displays the following:

- **Recommended Model:** `RandomForestClassifier` – automatically suggested based on dataset type and features.  
- **Dataset Summary:** Reports dataset size (~891 rows) and key features, highlighting missing values in `Age`, `Cabin`, and `Embarked`.  
- **Pipeline Steps Applied:**  
  - Dropped irrelevant columns (`PassengerId`, `Name`, `Ticket`, `Cabin`).  
  - Imputed missing numerical values (`Age`) and scaled all numerical features.  
  - Imputed missing categorical values (`Embarked`) and applied OneHotEncoding.  
- **Model Training & Prediction:** Displays the trained RandomForestClassifier and predictions on test data.  
- **Evaluation Metrics:**  
  - Classification Report showing precision, recall, and F1-score.  
  - Confusion Matrix to visualize correct vs. incorrect predictions.  
- **New Sample Prediction:** Demonstrates survival prediction for a new passenger sample.  
- **Interactive Outputs:** Users can explore predicted results and download predictions for further analysis.

---

## Use Cases  

- Machine learning beginners exploring automated pipelines

- Rapid preprocessing and feature engineering for tabular datasets

- Classroom teaching and demonstration of ML concepts

- Fast ML prototyping for analysts and data scientists

- Automated analysis for small and medium datasets

- Proof-of-concept development for startups or research projects

- Data-driven decision support for business workflows

- Quick benchmarking of multiple ML models on a dataset

- Enhancing productivity by reducing repetitive ML workflow tasks

- Integration with AI Studio for AI-powered application development

---

## License

 ![License](https://img.shields.io/badge/license-MIT-green)


