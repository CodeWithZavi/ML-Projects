# 🚀 Machine Learning Projects Portfolio

<div align="center">

![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Portfolio-blue?style=for-the-badge&logo=python)
![Flask](https://img.shields.io/badge/Flask-Backend-green?style=for-the-badge&logo=flask)
![OpenCV](https://img.shields.io/badge/OpenCV-Image%20Processing-red?style=for-the-badge&logo=opencv)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

### **Author:** Noman Shakir  
### **GitHub:** [@CodeWithZavii](https://github.com/CodeWithZavii)

</div>

---

## 📖 About This Repository

Welcome to my **Machine Learning Projects** collection! This repository showcases **4 complete end-to-end ML applications** with:
- ✅ **Flask Backend APIs** for seamless predictions
- ✅ **Interactive Web Interfaces** (HTML/CSS/JavaScript)
- ✅ **Production-Ready Models** trained on real-world datasets
- ✅ **Clean Code Architecture** with proper separation of concerns
- ✅ **One-Click Startup Scripts** for easy deployment

---

## 🎯 Projects Overview

### 🏠 1. Bangalore House Price Prediction
**Type:** Regression Model | **Port:** 5000

📌 **Description:**  
Predicts house prices in Bangalore based on location, square footage, number of bedrooms (BHK), and bathrooms using **Linear Regression**.

🔍 **Key Features:**
- Data cleaning with outlier detection (mean ± 3σ)
- Feature engineering (price per sqft, location grouping)
- Handles 242 unique locations in Bangalore
- Removes properties with less than 300 sqft/bedroom

⚡ **Tech Stack:**  
`Python` `Flask` `Scikit-learn` `Pandas` `NumPy` `Matplotlib` `HTML` `CSS` `JavaScript`

🎯 **Model:** Linear Regression  
📊 **Dataset:** 13,000+ Bangalore property records

**🚀 Quick Start:**
```bash
# Double-click: BanglorHousePrizePredictionRegressionModelProject\START.bat
```

---

### 👤 2. Sports Celebrity Face Recognition
**Type:** Image Classification | **Port:** 5000

📌 **Description:**  
Recognizes **5 famous sports celebrities** from uploaded images using **SVM with Wavelet Transform**:
- ⚽ Lionel Messi
- 🎾 Maria Sharapova
- 🎾 Roger Federer
- 🎾 Serena Williams
- 🏏 Virat Kohli

🔍 **Key Features:**
- **Haar Cascade** face & eye detection (OpenCV)
- **Wavelet Transform** (db1 level 5) for feature extraction
- Combines raw image + wavelet features (4096 features total)
- Only processes images with 2 eyes detected
- Drag-and-drop image upload interface

⚡ **Tech Stack:**  
`Python` `OpenCV` `PyWavelets` `Scikit-learn` `SVM` `Flask` `Joblib` `HTML` `CSS` `JavaScript`

🎯 **Model:** Support Vector Machine (SVM) with RBF kernel  
📊 **Accuracy:** Optimized using GridSearchCV

**🚀 Quick Start:**
```bash
# Double-click: CelebrityFaceRecongization\START.bat
```

---

### 🇵🇰 3. Pakistan Celebrity Recognition
**Type:** Image Classification | **Port:** 5000

📌 **Description:**  
Recognizes **Pakistani celebrities** from photos using the same SVM + Wavelet approach:
- 🧑‍🔬 Abdul Qadeer Khan
- 🏏 Babar Azam
- 🏛️ Imran Khan
- 🇵🇰 Quaid-e-Azam Muhammad Ali Jinnah

🔍 **Key Features:**
- Same architecture as Sports Celebrity Recognition
- Custom dataset with Pakistani public figures
- Face detection + wavelet feature extraction
- Real-time predictions with confidence scores

⚡ **Tech Stack:**  
`Python` `OpenCV` `PyWavelets` `SVM` `Flask` `HTML` `CSS` `JavaScript`

🎯 **Model:** Support Vector Machine (SVM)  
📊 **Pre-processing:** Haar Cascade + Wavelet Transform

**🚀 Quick Start:**
```bash
# Double-click: PakClebrityRecognization\START.bat
```

---

### ❤️ 4. Heart Disease Prediction (PCA)
**Type:** Binary Classification | **Port:** 5000

📌 **Description:**  
Predicts the probability of **heart disease** based on 13 medical parameters using **Random Forest Classifier** with **PCA dimensionality reduction**.

🔍 **Input Features (13):**
- 🧑 Age, Sex, Chest Pain Type
- 🩺 Resting Blood Pressure, Cholesterol
- 🍬 Fasting Blood Sugar
- 📈 Resting ECG, Max Heart Rate
- 💔 Exercise-Induced Angina
- 📉 Oldpeak (ST Depression)
- 📊 ST Slope

🔬 **Data Processing:**
- Outlier removal using 3σ rule
- Label encoding for binary features
- One-hot encoding for categorical features
- StandardScaler normalization
- **PCA:** Reduces 13 features → 7 principal components

⚡ **Tech Stack:**  
`Python` `Flask` `Scikit-learn` `Pandas` `Random Forest` `PCA` `HTML` `CSS` `JavaScript`

🎯 **Model:** Random Forest Classifier  
📊 **Output:** Binary (0 = No Disease, 1 = Heart Disease)

**🚀 Quick Start:**
```bash
# Double-click: PCA\START.bat
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- pip package manager

### Dependencies (Auto-installed)
All required packages are pre-installed in the virtual environment:
- `Flask` & `Flask-CORS` - Web framework
- `NumPy` & `Pandas` - Data processing
- `Scikit-learn` - Machine learning
- `OpenCV` - Computer vision
- `PyWavelets` - Wavelet transforms
- `Matplotlib` & `Seaborn` - Visualization
- `Joblib` - Model serialization

---

## 🚀 Quick Start Guide

### Method 1: One-Click Startup (Recommended)

**To RUN any project:**
1. Navigate to the project folder
2. **Double-click** the `START.bat` file
3. Browser will open automatically!

**To STOP all servers:**
- **Double-click:** `STOP_ALL_SERVERS.bat` (in Machine_learning_NOMAN folder)

### Method 2: Manual Commands

**Stop all servers:**
```powershell
taskkill /F /IM python.exe
```

**Run specific project:**
```powershell
# Example: Bangalore House Price Prediction
cd Machine_learning_NOMAN\BanglorHousePrizePredictionRegressionModelProject\server
D:\ML-Project-main\.venv\Scripts\python.exe server.py

# Then open: clint\app.html in browser
```

---

## 📁 Project Structure

```
Machine_learning_NOMAN/
│
├── BanglorHousePrizePredictionRegressionModelProject/
│   ├── Model/                      # Jupyter notebook & dataset
│   ├── server/                     # Flask backend
│   │   ├── server.py              # API endpoints
│   │   ├── util.py                # Utility functions
│   │   └── artifacts/             # Trained model & columns
│   ├── clint/                      # Frontend
│   │   ├── app.html               # Web interface
│   │   ├── app.js                 # JavaScript logic
│   │   └── app.css                # Styling
│   └── START.bat                   # One-click launcher
│
├── CelebrityFaceRecongization/
│   ├── model/                      # Training notebook & dataset
│   ├── server/                     # Flask backend
│   │   ├── server.py
│   │   ├── util.py
│   │   ├── wavelet.py             # Wavelet transformation
│   │   └── artifacts/             # Saved model
│   ├── clint/                      # Frontend with dropzone
│   └── START.bat
│
├── PakClebrityRecognization/
│   ├── model/                      # Training notebook
│   ├── server/                     # Flask backend
│   └── clint/                      # Frontend
│
├── PCA/
│   ├── Model/                      # Heart disease notebook
│   ├── server/                     # Flask backend
│   ├── clint/                      # Frontend
│   └── START.bat
│
└── STOP_ALL_SERVERS.bat            # Stop all projects
```

---

## 🎓 Machine Learning Concepts Used

### Data Preprocessing
- **Data Cleaning:** Handling missing values, duplicates, and inconsistencies
- **Outlier Detection:** Statistical methods (mean ± 3σ) and domain knowledge
- **Feature Engineering:** Creating new features (BHK, price per sqft)
- **Data Normalization:** StandardScaler for feature scaling

### Feature Extraction & Selection
- **Wavelet Transform:** db1 Haar wavelet for image feature extraction
- **PCA (Principal Component Analysis):** Dimensionality reduction (13→7 features)
- **One-Hot Encoding:** Converting categorical variables to numerical
- **Label Encoding:** Binary and ordinal feature transformation

### Computer Vision
- **Haar Cascade:** Face and eye detection (OpenCV)
- **Image Preprocessing:** Grayscale conversion, resizing
- **Feature Combination:** Raw + wavelet transformed images

### Machine Learning Algorithms
- **Linear Regression:** House price prediction
- **Support Vector Machine (SVM):** Image classification with RBF kernel
- **Random Forest:** Ensemble learning for heart disease prediction
- **GridSearchCV:** Hyperparameter tuning for model optimization

---

## 🌟 Key Highlights

✨ **Full-Stack ML Applications** - Complete end-to-end projects  
🎯 **Real-World Datasets** - Trained on actual data (13K+ records)  
🚀 **Production Ready** - Flask APIs with proper error handling  
🎨 **User-Friendly UI** - Interactive web interfaces with validation  
📦 **Easy Deployment** - One-click startup scripts included  
🧪 **Model Optimization** - GridSearchCV and cross-validation  
📊 **Data Visualization** - Matplotlib & Seaborn for EDA  

---

## 📈 Model Performance

| Project | Algorithm | Accuracy/Metric | Features |
|---------|-----------|----------------|----------|
| **Bangalore Houses** | Linear Regression | R² Score | 4 (location, sqft, bhk, bath) |
| **Celebrity Recognition** | SVM (RBF) | ~95%+ | 4096 (image + wavelet) |
| **Pakistan Celebrity** | SVM (RBF) | High Accuracy | 4096 (image + wavelet) |
| **Heart Disease** | Random Forest | ~85%+ | 13 medical parameters |

---

## 🔧 Technologies & Libraries

<div align="center">

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white)
![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

</div>

---

## 📊 Repository Stats

- **Total Projects:** 4
- **Lines of Code:** 10,000+
- **Machine Learning Models:** 4 trained models
- **Datasets:** 4 real-world datasets
- **Technologies:** 15+ libraries and frameworks

---

## 🔥 Future Enhancements

- [ ] Add Docker containerization for easy deployment
- [ ] Implement REST API documentation (Swagger/OpenAPI)
- [ ] Add user authentication and session management
- [ ] Deploy on cloud platforms (AWS, Azure, Heroku)
- [ ] Create mobile-responsive designs
- [ ] Add model versioning and A/B testing
- [ ] Implement real-time monitoring and logging
- [ ] Expand datasets for better accuracy
- [ ] Add more ML algorithms for comparison
- [ ] Create comprehensive unit tests

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  

**Steps to contribute:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

## 👨‍💻 About the Author

**Noman Shakir** - Full Stack Developer & Machine Learning Enthusiast

- 💻 Passionate about AI/ML and Web Development
- 🎓 Building real-world ML applications
- 🚀 Always learning and exploring new technologies

### Connect with me:

[![GitHub](https://img.shields.io/badge/GitHub-CodeWithZavii-black?style=for-the-badge&logo=github)](https://github.com/CodeWithZavii)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nomanshakir)
[![Twitter](https://img.shields.io/badge/Twitter-@CodeWithZavii-blue?style=for-the-badge&logo=twitter)](https://twitter.com/CodeWithZavii)

---

## 📞 Support

If you found this project helpful, please give it a ⭐ on GitHub!

For any questions, suggestions, or bug reports:
- **Open an Issue** on GitHub
- **GitHub:** [@CodeWithZavii](https://github.com/CodeWithZavii)

---

<div align="center">

### ⭐ Star this repo if you found it useful! ⭐

**Made with ❤️ by Noman Shakir**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=CodeWithZavii.ML-Projects)
![GitHub last commit](https://img.shields.io/github/last-commit/CodeWithZavii/ML-Projects)
![GitHub repo size](https://img.shields.io/github/repo-size/CodeWithZavii/ML-Projects)

</div>

---

*Last Updated: January 2026*
