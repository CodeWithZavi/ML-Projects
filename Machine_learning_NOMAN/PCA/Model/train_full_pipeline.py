import pandas as pd
import numpy as np
import pickle
import json
import os
import warnings
warnings.filterwarnings('ignore')

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    classification_report, confusion_matrix, ConfusionMatrixDisplay
)

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'server', 'artifacts')
VIZ_DIR = os.path.join(os.path.dirname(__file__), '..', 'clint', 'visualizations')
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(VIZ_DIR, exist_ok=True)

df = pd.read_csv(os.path.join(os.path.dirname(__file__), 'heart.csv'))
print(f"Original shape: {df.shape}")

print(f"Missing values:\n{df.isnull().sum()}")
print(f"Duplicate rows: {df.duplicated().sum()}")
df = df.drop_duplicates()

fig, axes = plt.subplots(1, 2, figsize=(10, 4))
colors = ['#10b981', '#f43f5e']
target_counts = df['HeartDisease'].value_counts()
axes[0].bar(['No Disease (0)', 'Disease (1)'], target_counts.values,
            color=colors, edgecolor='white', linewidth=1.2)
axes[0].set_title('Target Distribution (Bar)', fontsize=13, fontweight='bold')
axes[0].set_ylabel('Count')
for i, v in enumerate(target_counts.values):
    axes[0].text(i, v + 5, str(v), ha='center', fontweight='bold')
axes[1].pie(target_counts.values, labels=['No Disease', 'Disease'],
            autopct='%1.1f%%', colors=colors, startangle=90,
            wedgeprops={'edgecolor': 'white', 'linewidth': 1.5})
axes[1].set_title('Target Distribution (Pie)', fontsize=13, fontweight='bold')
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'target_distribution.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: target_distribution.png")

num_cols = ['Age', 'RestingBP', 'Cholesterol', 'MaxHR', 'Oldpeak']
fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes = axes.flatten()
for i, col in enumerate(num_cols):
    axes[i].hist(df[col], bins=30, color='#06b6d4', edgecolor='white', linewidth=0.8)
    axes[i].set_title(f'{col} Distribution', fontsize=11, fontweight='bold')
    axes[i].set_xlabel(col)
    axes[i].set_ylabel('Frequency')
axes[-1].set_visible(False)
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'feature_distributions.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: feature_distributions.png")

fig, axes = plt.subplots(2, 3, figsize=(14, 8))
axes = axes.flatten()
for i, col in enumerate(num_cols):
    axes[i].boxplot(df[col], vert=True, patch_artist=True,
                    boxprops=dict(facecolor='#8b5cf6', alpha=0.6))
    axes[i].set_title(f'{col} Box Plot', fontsize=11, fontweight='bold')
    axes[i].set_ylabel(col)
axes[-1].set_visible(False)
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'feature_boxplots.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: feature_boxplots.png")

cat_cols = ['Sex', 'ChestPainType', 'FastingBS', 'RestingECG', 'ExerciseAngina', 'ST_Slope']
fig, axes = plt.subplots(2, 3, figsize=(14, 9))
axes = axes.flatten()
for i, col in enumerate(cat_cols):
    counts = df[col].value_counts()
    axes[i].bar(counts.index.astype(str), counts.values, color='#06b6d4', edgecolor='white')
    axes[i].set_title(f'{col}', fontsize=11, fontweight='bold')
    axes[i].tick_params(axis='x', rotation=30)
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'categorical_distributions.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: categorical_distributions.png")

encoded_df = df.copy()
encoded_df['ExerciseAngina'] = encoded_df['ExerciseAngina'].map({'N': 0, 'Y': 1})
encoded_df['ST_Slope'] = encoded_df['ST_Slope'].map({'Down': 1, 'Flat': 2, 'Up': 3})
encoded_df['RestingECG'] = encoded_df['RestingECG'].map({'Normal': 1, 'ST': 2, 'LVH': 3})
corr_matrix = encoded_df.select_dtypes(include=[np.number]).corr()
plt.figure(figsize=(10, 8))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', fmt='.2f', linewidths=0.5,
            square=True, cbar_kws={'shrink': 0.8})
plt.title('Correlation Heatmap', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'correlation_heatmap.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: correlation_heatmap.png")

print("\nOutlier removal (3-sigma)...")
print(f"Before: {df.shape}")
for col in ['Cholesterol', 'Oldpeak', 'RestingBP']:
    mean, std = df[col].mean(), df[col].std()
    df = df[df[col] <= (mean + 3 * std)]
    print(f"  After {col}: {df.shape}")

df = df.reset_index(drop=True)
print(f"After outlier removal: {df.shape}")

df['ExerciseAngina'] = df['ExerciseAngina'].map({'N': 0, 'Y': 1})
df['ST_Slope'] = df['ST_Slope'].map({'Down': 1, 'Flat': 2, 'Up': 3})
df['RestingECG'] = df['RestingECG'].map({'Normal': 1, 'ST': 2, 'LVH': 3})
df_encoded = pd.get_dummies(df, columns=['Sex', 'ChestPainType'], drop_first=True)
df_encoded = df_encoded.astype({col: int for col in df_encoded.select_dtypes('bool').columns})

print(f"Encoded shape: {df_encoded.shape}")
print(f"Columns: {list(df_encoded.columns)}")

X = df_encoded.drop('HeartDisease', axis=1)
y = df_encoded['HeartDisease']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)
print(f"Train: {X_train.shape}, Test: {X_test.shape}")

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

pca = PCA(n_components=7)
X_train_pca = pca.fit_transform(X_train_scaled)
X_test_pca = pca.transform(X_test_scaled)
print(f"PCA explained variance ratio: {pca.explained_variance_ratio_.sum():.3f}")

models = {
    "Logistic Regression": (
        LogisticRegression(max_iter=5000),
        {"C": [0.01, 0.1, 1, 10], "solver": ["lbfgs"]}
    ),
    "Random Forest": (
        RandomForestClassifier(random_state=42),
        {"n_estimators": [100, 200], "max_depth": [None, 10, 20], "min_samples_split": [2, 5]}
    ),
    "Support Vector Machine": (
        SVC(probability=True),
        {"C": [0.1, 1, 10], "kernel": ["linear", "rbf"]}
    ),
    "K-Nearest Neighbors": (
        KNeighborsClassifier(),
        {"n_neighbors": [3, 5, 7, 9]}
    ),
    "Decision Tree": (
        DecisionTreeClassifier(random_state=42),
        {"max_depth": [None, 5, 10, 20], "min_samples_split": [2, 5, 10]}
    )
}

results = []
best_models = {}

for name, (model, params) in models.items():
    print(f"\nTraining {name}...")
    grid = GridSearchCV(estimator=model, param_grid=params, cv=5,
                        scoring='accuracy', n_jobs=-1, verbose=0)
    grid.fit(X_train_pca, y_train)
    best_model = grid.best_estimator_
    best_models[name] = best_model

    y_pred = best_model.predict(X_test_pca)
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, average='weighted')
    recall = recall_score(y_test, y_pred, average='weighted')
    f1 = f1_score(y_test, y_pred, average='weighted')

    results.append({
        "Model": name,
        "Best Parameters": grid.best_params_,
        "Accuracy": round(accuracy, 4),
        "Precision": round(precision, 4),
        "Recall": round(recall, 4),
        "F1 Score": round(f1, 4)
    })
    print(f"  Accuracy: {accuracy:.4f}, F1: {f1:.4f}")

results_df = pd.DataFrame(results).sort_values('Accuracy', ascending=False)
print(f"\n{'='*60}")
print("FINAL RESULTS")
print(f"{'='*60}")
print(results_df.to_string(index=False))

results_df.to_csv(os.path.join(VIZ_DIR, 'model_comparison.csv'), index=False)

colors_bar = ['#10b981' if v == results_df['Accuracy'].max() else '#06b6d4'
              for v in results_df['Accuracy']]
plt.figure(figsize=(10, 5))
bars = plt.bar(results_df['Model'], results_df['Accuracy'], color=colors_bar, edgecolor='white')
plt.title('Model Accuracy Comparison', fontsize=14, fontweight='bold')
plt.ylabel('Accuracy')
plt.xticks(rotation=20, ha='right')
plt.ylim(0, 1)
for bar, val in zip(bars, results_df['Accuracy']):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01,
             f'{val:.2f}', ha='center', fontweight='bold', fontsize=10)
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'accuracy_comparison.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: accuracy_comparison.png")

fig, ax = plt.subplots(figsize=(10, 5))
x = np.arange(len(results_df))
width = 0.25
ax.bar(x - width, results_df['Precision'], width, label='Precision', color='#06b6d4')
ax.bar(x, results_df['Recall'], width, label='Recall', color='#8b5cf6')
ax.bar(x + width, results_df['F1 Score'], width, label='F1-Score', color='#10b981')
ax.set_xticks(x)
ax.set_xticklabels(results_df['Model'], rotation=20, ha='right')
ax.set_title('Precision, Recall & F1-Score Comparison', fontsize=14, fontweight='bold')
ax.legend()
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'prf_comparison.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: prf_comparison.png")

best_model_name = results_df.iloc[0]['Model']
best_model_obj = best_models[best_model_name]
y_pred_best = best_model_obj.predict(X_test_pca)

cm = confusion_matrix(y_test, y_pred_best)
disp = ConfusionMatrixDisplay(confusion_matrix=cm,
                              display_labels=['No Disease', 'Disease'])
disp.plot(cmap='Blues', values_format='d')
plt.title(f'Confusion Matrix - {best_model_name}', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig(os.path.join(VIZ_DIR, 'confusion_matrix.png'), dpi=150, bbox_inches='tight')
plt.close()
print("Saved: confusion_matrix.png")

tn, fp, fn, tp = cm.ravel()
print(f"\nConfusion Matrix Breakdown:")
print(f"  True Negatives: {tn}")
print(f"  False Positives: {fp}")
print(f"  False Negatives: {fn}")
print(f"  True Positives: {tp}")

with open(os.path.join(OUTPUT_DIR, 'scaler.pkl'), 'wb') as f:
    pickle.dump(scaler, f)
with open(os.path.join(OUTPUT_DIR, 'pca_model.pkl'), 'wb') as f:
    pickle.dump(pca, f)
with open(os.path.join(OUTPUT_DIR, 'Heart_model'), 'wb') as f:
    pickle.dump(best_model_obj, f)
with open(os.path.join(OUTPUT_DIR, 'columns.json'), 'w') as f:
    json.dump({'data_columns': [col.lower() for col in X.columns]}, f)

model_info = {
    'model_name': best_model_name,
    'best_params': str(results_df.iloc[0]['Best Parameters']),
    'accuracy': results_df.iloc[0]['Accuracy'],
    'precision': results_df.iloc[0]['Precision'],
    'recall': results_df.iloc[0]['Recall'],
    'f1_score': results_df.iloc[0]['F1 Score']
}
with open(os.path.join(OUTPUT_DIR, 'model_info.json'), 'w') as f:
    json.dump(model_info, f, indent=2)

print(f"\n{'='*60}")
print(f"Best model: {best_model_name}")
print(f"Accuracy: {results_df.iloc[0]['Accuracy']}")
print(f"Artifacts saved to: {OUTPUT_DIR}")
print(f"Visualizations saved to: {VIZ_DIR}")
print(f"{'='*60}")
