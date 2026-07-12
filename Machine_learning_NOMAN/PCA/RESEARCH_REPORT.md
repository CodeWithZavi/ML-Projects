# Heart Disease Prediction using PCA and Machine Learning

## Title & Authors
**Project Title:** CardioPredict — Heart Disease Prediction using PCA and Ensemble Learning

**Course:** Machine Learning  
**Semester:** —  
**Submission Date:** —

## Abstract
This project presents an end-to-end machine learning pipeline for predicting heart disease using the UCI Heart Disease dataset (variant). The pipeline includes data preprocessing (outlier removal, encoding, scaling), dimensionality reduction via Principal Component Analysis (PCA), and hyperparameter-tuned classification using five algorithms: Logistic Regression, Random Forest, Support Vector Machine (SVM), K-Nearest Neighbors (KNN), and Decision Tree. Models were evaluated on accuracy, precision, recall, and F1-score. Logistic Regression achieved the best performance with 85.3% accuracy and 0.887 confidence on sample predictions. The best model is deployed behind a Flask REST API with a modern web dashboard.

## Introduction
Cardiovascular diseases are the leading cause of death globally. Early detection of heart disease risk enables timely intervention. Machine learning models trained on clinical data can assist in risk assessment. This project applies PCA to reduce feature dimensionality from 13 to 7 components while retaining ~85% variance, then compares five classifiers to identify the most effective model.

## Problem Statement
Given 13 clinical features (age, sex, chest pain type, resting blood pressure, cholesterol, fasting blood sugar, resting ECG, max heart rate, exercise angina, oldpeak, ST slope), predict whether a patient has heart disease (binary classification: 0 = no disease, 1 = disease).

## Dataset Description
- **Source:** UCI Heart Disease dataset (variant — 918 records)
- **Rows:** 918 (reduced to 902 after outlier removal)
- **Columns:** 12 (11 features + 1 target)
- **Input Features:** Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope
- **Target Variable:** HeartDisease (0 = No, 1 = Yes)
- **Class Balance:** ~55% positive, ~45% negative

## Data Preprocessing
1. **Missing Value Check:** No missing values found in the dataset
2. **Duplicate Removal:** No duplicate rows found
3. **Outlier Removal (3-sigma):** Removed outliers in Cholesterol (3 rows), Oldpeak (6 rows), RestingBP (7 rows) — final shape: 902 x 12
4. **Label Encoding:** ExerciseAngina (N/Y → 0/1), ST_Slope (Down/Flat/Up → 1/2/3), RestingECG (Normal/ST/LVH → 1/2/3)
5. **One-Hot Encoding:** Sex → Sex_M (drop_first), ChestPainType → ATA, NAP, TA (drop_first)
6. **Feature Scaling:** StandardScaler applied
7. **PCA:** 7 components (explained variance ratio: ~85%)
8. **Train/Test Split:** 80/20 (721 train, 181 test)

## Machine Learning Models
Five models were trained using GridSearchCV on PCA-transformed data:

| Model | Best Parameters | Accuracy | Precision | Recall | F1-Score |
|-------|----------------|----------|-----------|--------|----------|
| Logistic Regression | C=1, solver=lbfgs | 0.8453 | 0.8453 | 0.8453 | 0.8452 |
| K-Nearest Neighbors | n_neighbors=9 | 0.8453 | 0.8462 | 0.8453 | 0.8448 |
| Random Forest | max_depth=10, min_samples_split=2 | 0.8398 | 0.8403 | 0.8398 | 0.8394 |
| SVM | C=1, kernel=rbf | 0.8398 | 0.8403 | 0.8398 | 0.8394 |
| Decision Tree | max_depth=5, min_samples_split=5 | 0.8232 | 0.8239 | 0.8232 | 0.8226 |

## Model Evaluation
Models were evaluated using accuracy, precision, recall, and F1-score with weighted averaging. Logistic Regression and KNN tied for highest accuracy. Logistic Regression was selected as the final model due to its interpretability, fast inference, and probabilistic outputs.

### Confusion Matrix (Logistic Regression)
- True Negatives: 70
- False Positives: 15
- False Negatives: 13
- True Positives: 83

## Results & Discussion
- Logistic Regression and KNN achieved the highest accuracy (84.5%)
- Logistic Regression was deployed for its interpretability and probability outputs
- PCA reduced feature dimensions from 13 to 7 with minimal accuracy loss (86.2% raw RF → 84.5% PCA + LR)
- The deployed model achieves ~88% confidence on average predictions

## Limitations
- Dataset size (902 samples) limits generalization
- PCA reduces interpretability of individual feature contributions
- The model was not validated on external datasets
- No handling of temporal or longitudinal patient data

## Future Improvements
- Incorporate deep learning (e.g., small neural network)
- Add more features (e.g., BMI, family history, lifestyle factors)
- Deploy with Docker for scalability
- Add SHAP/LIME explanations for individual predictions
- Collect real-world validation data

## References
1. UCI Heart Disease Dataset — https://archive.ics.uci.edu/ml/datasets/Heart+Disease
2. Scikit-learn: Machine Learning in Python — Pedregosa et al., JMLR 2011
3. PCA: A review of the literature — Jolliffe & Cadima, Phil. Trans. R. Soc. A 2016
