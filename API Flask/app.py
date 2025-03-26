from flask import Flask, request, jsonify
import pandas as pd
import joblib
import numpy as np
import re
from flask_cors import CORS  # Import CORS

# Load pre-trained LightGBM model and preprocessor
preprocessor = joblib.load("LightGBMpreprocessorFinal.pkl")
model = joblib.load("LightGBM_modelFianl.pkl")

# Function to convert dependents
def convert_dependents(value):
    if pd.isna(value) or value == '':
        return 0
    match = re.search(r'\d+', str(value))
    return int(match.group()) if match else 0

# Function to add feature-engineered columns
def add_feature_engineering(data):
    data['Dependents'] = data['Dependents'].apply(convert_dependents)
    data['TotalIncome'] = data['ApplicantIncome'] + data['CoapplicantIncome']
    data['LoanAmountToIncomeRatio'] = data['LoanAmount'] / data['TotalIncome']
    data['LoanAmountToTermRatio'] = data['LoanAmount'] / (data['Loan_Amount_Term'] + 1)
    data['EMI'] = data['LoanAmount'] / (data['Loan_Amount_Term'] + 1)
    data['IncomePerDependent'] = data['TotalIncome'] / (data['Dependents'] + 1)
    data.replace([np.inf, -np.inf], 0, inplace=True)
    data.fillna(0, inplace=True)
    return data

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Root endpoint
@app.route('/')
def home():
    return "Welcome to the Loan Eligibility Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    # Get input data
    input_data = request.json
    
    # Convert input data to DataFrame
    user_input_df = pd.DataFrame([input_data])
    
    # Add feature engineering
    user_input_df = add_feature_engineering(user_input_df)
    
    # Preprocess user data using the preprocessor
    processed_data = preprocessor.transform(user_input_df)
    
    # Get feature names from the preprocessor
    feature_names = preprocessor.get_feature_names_out()
    
    # Convert the preprocessed data back into a DataFrame with feature names
    processed_data = pd.DataFrame(processed_data, columns=feature_names)
    
    # Predict using the LightGBM model
    prediction = model.predict(processed_data)
    prediction_prob = model.predict_proba(processed_data)[:, 1] if hasattr(model, "predict_proba") else None
    
    # Prepare response
    result = "Eligible for Loan" if prediction[0] == 1 else "Not Eligible for Loan"
    response = {
        "prediction": result,
        "probability": float(prediction_prob[0]) if prediction_prob is not None else None
    }
    
    return jsonify(response)

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)