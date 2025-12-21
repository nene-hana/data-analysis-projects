# Titanic: Machine Learning from Disaster — Kaggle Tutorial ~70% Kaggle leaderboard accuracy

![TitanicGIF](https://github.com/user-attachments/assets/cbc3d5e3-8c5e-43c8-8f63-e70ee202a644)
---
A project  especially useful for beginners in data science, or anyone wanting to learn how to approach a Kaggle competition.

---
What we will do ? 🛳

We will predict the survival of passengers on the Titanic using machine learning. 
It is based on the Kaggle competition [Titanic: Machine Learning from Disaster](https://www.kaggle.com/competitions/titanic).

 <img width="719" height="200" alt="undefined - Imgur" src="https://github.com/user-attachments/assets/8c0031ba-8017-4940-a5f1-e1699fa81613" />


What we will be doing :

- To explore historical Titanic passenger data and understand patterns that influenced survival.
- To build a predictive model that can estimate survival based on features like age, gender, passenger class, and family aboard.
- To practice end-to-end data science workflow: data loading, exploration, feature engineering, modeling, and generating predictions.
- To create a portfolio-ready project demonstrating practical machine learning skills.

  **IN SHORT** 💡: The challenge is to predict whether a passenger survived the Titanic disaster based on personal and demographic data, including:

- Passenger class (`Pclass`)
- Gender (`Sex`)
- Age (`Age`)
- Number of siblings/spouses aboard (`SibSp`)
- Number of parents/children aboard (`Parch`)
- Fare (`Fare`)

---

##  Project Overview


The Titanic disaster dataset contains passenger information such as age, gender, class, number of family members aboard, and ticket fare. The goal is to predict whether a passenger survived (`Survived = 1`) or not (`Survived = 0`) based on these features.

Key steps in this project:

1. **Data Loading** – Import CSV files into pandas DataFrames.
2. **Exploratory Data Analysis (EDA)** – Analyze survival patterns with respect to gender, class, and family size.
3. **Feature Engineering** – Encode categorical variables, handle missing data.
4. **Model Training** – Train a **Random Forest Classifier** using selected features.
5. **Prediction** – Generate predictions on test data 

---
## 📁 Project Structure
```
├── titanic.zip
│ ├── train.csv # Training dataset with survival labels
│ ├── test.csv # Test dataset without labels
│ └── gender_submission.csv # Sample submission file
├── titanic.ipynb # Jupyter notebook with code and analysis
└── README.md # Project documentation

```


---

## 🛠 Technologies & Libraries

- Python 3.x  
- pandas, numpy  
- scikit-learn (RandomForestClassifier) - This is the model we use in this project

---

## 🚀 How to Run

1. Clone this repository.
2. Place the Kaggle Titanic dataset (`train.csv`, `test.csv`, `gender_submission.csv`) into the `data/` folder.
3. Open `titanic.ipynb` in Jupyter Notebook or Kaggle Notebook.
4. Run all code cells sequentially to reproduce the results.

---

## 📊 Exploratory Analysis Highlights

- **Gender Survival Rate**:  
  - Women survived ~74% of the time.  
  - Men survived ~19% of the time.
- **Passenger Class**: Higher class passengers had higher survival rates.  
- **Family Aboard**: Number of siblings/spouses (`SibSp`) and parents/children (`Parch`) affected survival chances.

These insights guided feature selection for the model.

---

## 🧩 Model Details

- **Model**: Random Forest Classifier  
- **Features Used**: `Pclass`, `Sex`, `SibSp`, `Parch`  
- **Hyperparameters**:  
  - `n_estimators=100`  
  - `max_depth=5`  
  - `random_state=1`  

The trained model predicts survival for the passengers in the test dataset.

---

## 📈 Submission

Predictions are saved in `submission.csv` with the following structure:

| PassengerId | Survived |
|-------------|----------|
| 892         | 0        |
| 893         | 1        |
| ...         | ...      |

This file can be uploaded to Kaggle for evaluation.

---

## 🔍 Next Steps

- Add more feature engineering, e.g., extracting titles from names.  
- Experiment with different classifiers (Logistic Regression, Gradient Boosting).  
- Visualize correlations and feature importance.  

---

## 📚 References

- [Kaggle Titanic Competition](https://www.kaggle.com/competitions/titanic)  
- [Python pandas Documentation](https://pandas.pydata.org/)  
- [scikit-learn Documentation](https://scikit-learn.org/stable/)


