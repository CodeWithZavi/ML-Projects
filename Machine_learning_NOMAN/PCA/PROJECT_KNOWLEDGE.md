# PCA Heart Disease Prediction — Project Knowledge

## Overview
End-to-end ML pipeline: Principal Component Analysis (PCA) + 5 classifiers for heart disease prediction. Includes a training script, Flask API server, HTML/JS frontend with visualizations, and a research report.

## Architecture
- **Training Script** (`Model/train_full_pipeline.py`): Full pipeline — EDA, outlier removal, encoding, scaling, PCA, GridSearchCV model comparison, visualizations, artifact export
- **Notebook** (`Model/pca.ipynb`): Original Colab notebook (kept for reference)
- **Server** (`server/server.py`): Flask REST API with endpoints `/get_prediction_of_heart`, `/asim`, `/model_info`
- **Server util** (`server/utill.py`): Loads scaler, PCA, model; preprocesses input; returns prediction + confidence
- **Frontend** (`clint/app.html`): Dark-theme UI with input form, result panel, model info badge, and visualization gallery
- **Research Report** (`RESEARCH_REPORT.md`): Formal report with all required sections

## Dataset (`Model/heart.csv`)
- 918 rows, 12 columns: Age, Sex, ChestPainType, RestingBP, Cholesterol, FastingBS, RestingECG, MaxHR, ExerciseAngina, Oldpeak, ST_Slope, HeartDisease (target)
- Source: UCI Heart Disease dataset variant

## Pipeline (`Model/train_full_pipeline.py`)
1. Load CSV, check missing values (none found), check duplicates (none found)
2. EDA: target distribution, feature distributions, correlation heatmap, box plots
3. Outlier removal (3s): Cholesterol (3 rows), Oldpeak (6 rows), RestingBP (7 rows) -> 902 rows
4. Label encode: ExerciseAngina (N/Y), ST_Slope (Down/Flat/Up), RestingECG (Normal/ST/LVH)
5. One-hot encode: Sex (Sex_M), ChestPainType (ATA, NAP, TA) - drop_first
6. Final shape: 902 rows x 14 columns (13 features + target)
7. Train/test split: 80/20 (721/181)
8. StandardScaler + PCA (7 components, ~85% variance)
9. GridSearchCV on 5 models with PCA data
10. Best model saved: Heart_model, scaler.pkl, pca_model.pkl, columns.json, model_info.json

## Model Performance (PCA + GridSearchCV)
| Model | Accuracy | F1-Score |
|-------|----------|----------|
| Logistic Regression | 84.53% | 84.52% |
| KNN (k=9) | 84.53% | 84.48% |
| Random Forest | 83.98% | 83.94% |
| SVM (C=1, rbf) | 83.98% | 83.94% |
| Decision Tree | 82.32% | 82.26% |

**Deployed model**: Logistic Regression (interpretable, fast, probabilistic)

## Artifacts Saved
| File | Description |
|------|-------------|
| `server/artifacts/Heart_model` | Best trained model (pickle) |
| `server/artifacts/scaler.pkl` | StandardScaler (pickle) |
| `server/artifacts/pca_model.pkl` | PCA transformer (7 components) |
| `server/artifacts/columns.json` | Feature names (lowercase) |
| `server/artifacts/model_info.json` | Model name, params, metrics |
| `clint/visualizations/*.png` | 8 visualization charts |

## API
- `POST /get_prediction_of_heart` — returns `{"prediction": 0|1, "confidence": 0.8877}`
- `GET /asim` — returns feature column names
- `GET /model_info` — returns model name, accuracy, precision, recall, F1-score

## Tech Stack
- Python 3.x, scikit-learn, pandas, numpy, matplotlib, seaborn, Flask, pickle
- HTML + vanilla JS + jQuery frontend
