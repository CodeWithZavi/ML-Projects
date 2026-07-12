import pickle
import json
import numpy as np
import pandas as pd
import os

__data_columns = None
__model = None
__scaler = None
__pca = None
__model_info = None
__pca_used = True

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), 'artifacts')

def get_prediction_of_heart(age, RestingBP, Cholesterol, FastingBS, RestingECG,
                            MaxHR, ExerciseAngina, Oldpeak, ST_Slope, Sex_M,
                            ChestPainType_ATA, ChestPainType_NAP, ChestPainType_TA):
    input_data = [[age, RestingBP, Cholesterol, FastingBS, RestingECG,
                   MaxHR, ExerciseAngina, Oldpeak, ST_Slope, Sex_M,
                   ChestPainType_ATA, ChestPainType_NAP, ChestPainType_TA]]

    feature_names = ['Age', 'RestingBP', 'Cholesterol', 'FastingBS', 'RestingECG',
                     'MaxHR', 'ExerciseAngina', 'Oldpeak', 'ST_Slope', 'Sex_M',
                     'ChestPainType_ATA', 'ChestPainType_NAP', 'ChestPainType_TA']

    df_input = pd.DataFrame(input_data, columns=feature_names)

    df_input = df_input.astype({
        'Age': int, 'RestingBP': int, 'Cholesterol': int, 'FastingBS': int,
        'RestingECG': int, 'MaxHR': int, 'ExerciseAngina': int,
        'Oldpeak': float, 'ST_Slope': int, 'Sex_M': int,
        'ChestPainType_ATA': int, 'ChestPainType_NAP': int, 'ChestPainType_TA': int
    })

    if __pca_used:
        scaled = __scaler.transform(df_input)
        final_input = __pca.transform(scaled)
    else:
        final_input = df_input.values

    prediction = int(__model.predict(final_input)[0])

    if hasattr(__model, 'predict_proba'):
        proba = __model.predict_proba(final_input)[0]
        confidence = round(float(max(proba)), 4)
    else:
        confidence = None

    return prediction, confidence


def load_saved_artifacts():
    print("artifacts are loading")
    global __data_columns, __model, __scaler, __pca, __model_info, __pca_used

    with open(os.path.join(ARTIFACTS_DIR, "columns.json"), "r") as f:
        __data_columns = json.load(f)['data_columns']

    if __model is None:
        with open(os.path.join(ARTIFACTS_DIR, 'Heart_model'), 'rb') as f:
            __model = pickle.load(f)

    if __scaler is None:
        with open(os.path.join(ARTIFACTS_DIR, 'scaler.pkl'), 'rb') as f:
            __scaler = pickle.load(f)

    if __pca is None:
        with open(os.path.join(ARTIFACTS_DIR, 'pca_model.pkl'), 'rb') as f:
            __pca = pickle.load(f)

    info_path = os.path.join(ARTIFACTS_DIR, 'model_info.json')
    if os.path.exists(info_path):
        with open(info_path, 'r') as f:
            __model_info = json.load(f)
        __pca_used = __model_info.get('pca_used', True)

    print(f"pca_used: {__pca_used}")
    print("loading saved artifacts...done")


def get_data_columns():
    return __data_columns


def get_model_info():
    return __model_info


if __name__ == '__main__':
    load_saved_artifacts()
    print(__data_columns)
    prediction, confidence = get_prediction_of_heart(49, 160, 180, 0, 1, 156, 0, 1.0, 2, 0, 0, 1, 0)
    print("Prediction:", prediction)
    print("Confidence:", confidence)
