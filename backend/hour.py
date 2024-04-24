import pandas as pd

df = pd.read_csv("/Users/sandundesilva/Documents/ishini/CardiacPatientData.csv")

df["Hour"] = df.groupby("ID").cumcount() + 1

df = df.dropna()

df.to_csv("updated_file.csv", index=False)

num_rows_excluding_title = len(df) - 1

print("Number of rows initially:", num_rows_excluding_title)

df = pd.read_csv("/Users/sandundesilva/Documents/ishini/updated_file.csv")

num_rows_excluding_title = len(df) - 1

print("Number of rows now:", num_rows_excluding_title)