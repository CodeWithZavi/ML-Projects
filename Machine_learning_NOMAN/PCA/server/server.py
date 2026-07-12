from flask import Flask, request, jsonify
from flask_cors import CORS
import traceback
import utill

app = Flask(__name__)
CORS(app)

@app.route("/get_prediction_of_heart", methods=['POST'])
def predictionOfHeart():
    try:
        data = request.get_json()

        age = data['age']
        RestingBP = data['RestingBP']
        Cholesterol = data['Cholesterol']
        FastingBS = data['FastingBS']
        RestingECG = data['RestingECG']
        MaxHR = data['MaxHR']
        ExerciseAngina = data['ExerciseAngina']
        Oldpeak = data['Oldpeak']
        ST_Slope = data['ST_Slope']
        Sex_M = data['Sex_M']
        ChestPainType_ATA = data['ChestPainType_ATA']
        ChestPainType_NAP = data['ChestPainType_NAP']
        ChestPainType_TA = data['ChestPainType_TA']

        prediction, confidence = utill.get_prediction_of_heart(
            age, RestingBP, Cholesterol, FastingBS, RestingECG,
            MaxHR, ExerciseAngina, Oldpeak, ST_Slope, Sex_M,
            ChestPainType_ATA, ChestPainType_NAP, ChestPainType_TA
        )

        response = {'prediction': prediction}
        if confidence is not None:
            response['confidence'] = confidence

        return jsonify(response)

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


@app.route("/asim", methods=['GET'])
def get_features_names():
    try:
        return jsonify({'features': utill.get_data_columns()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/model_info", methods=['GET'])
def get_model_info():
    try:
        info = utill.get_model_info()
        if info:
            return jsonify(info)
        return jsonify({'error': 'Model info not available'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route("/batch_predict", methods=['POST'])
def batch_predict():
    try:
        data = request.get_json()
        records = data['records']
        results = []
        for rec in records:
            pred, conf = utill.get_prediction_of_heart(
                rec['Age'], rec['RestingBP'], rec['Cholesterol'], rec['FastingBS'],
                rec['RestingECG'], rec['MaxHR'], rec['ExerciseAngina'], rec['Oldpeak'],
                rec['ST_Slope'], rec['Sex_M'], rec['ChestPainType_ATA'],
                rec['ChestPainType_NAP'], rec['ChestPainType_TA']
            )
            row = {**rec, 'Prediction': pred}
            if conf is not None:
                row['Confidence'] = conf
            results.append(row)
        return jsonify({'results': results})
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    utill.load_saved_artifacts()
    app.run(debug=True)
