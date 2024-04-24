import pandas as pd

data = pd.read_csv('/Users/sandundesilva/Documents/ishini/backend/dataset/ExperimentNo4Data.csv')

paragraphs = []
for index, row in data.iterrows():

    patient_id = row['ID']
    sbp = row['SBP']
    dbp = row['DBP']
    hr = row['HR']
    rr = row['RR']
    bt = row['BT']
    spo2 = row['SpO2']
    age = row['Age']
    gender = 'male' if row['Gender'] == 1 else 'female'
    na = row['Na']
    k = row['K']
    cl = row['Cl']
    urea = row['Urea']
    creatinine = row['Ceratinine']
    alcoholic = row['Alcoholic']
    smoke = row['Smoke']
    fhcd = row['FHCD']
    outcome = row['Outcome']
    hour = row['Hour']

    sentence = f"Patient of Patient ID {patient_id} is {'not ' if smoke == 0 else ''}a smoker and {'not ' if alcoholic == 0 else ''}an alcoholic {gender} with {'no ' if fhcd == 0 else ''}Family History of Ischemic Heart Diseases at age {age} has {sbp} mmHg Systolic Blood Pressure, {dbp} mmHg Diastolic Blood Pressure, {hr} beats per minute Heart Rate, {rr} breaths per minute Respiratory Rate, {bt} fahrenheit Body temperature , {spo2} mEq/L SpO2, {na} mEq/L Sodium Level, {k} mEq/L Potassium Level , {cl} mEq/L Chloride Level, {urea} mg/dL Urea, {creatinine} mg/dL Creatinine at hour {hour} is {'at critical risk of death.' if outcome == 0 else 'on the path of recovery with continued treatment.'}"

    paragraphs.append(sentence)

output_df = pd.DataFrame({'Paragraph': paragraphs})

output_df.to_csv('FinalExperimentNo4ata.csv', index=False)
