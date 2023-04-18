import pandas as pd
from openpyxl import Workbook
from sqlalchemy import create_engine

# Connect to the SQLite database
DATABASE_URL = "C:\\Users\\RahulKamireddi\\hr-data-app\\backend\\instance\\employees.db"


engine = create_engine('sqlite:///employees.db')

# Retrieve employee and skill data from the database
employees = pd.read_sql('SELECT * FROM employee', engine)
skills = pd.read_sql('SELECT * FROM skill', engine)

# Create an empty DataFrame with employee names as the index
employee_skill_matrix = pd.DataFrame(index=employees['name'])

# Iterate through the unique skills and add them as columns to the DataFrame
for skill in skills['skill'].unique():
    employee_skill_matrix[skill] = None

# Fill in the DataFrame with skill levels
for _, row in skills.iterrows():
    employee_name = employees.loc[employees['id'] == row['employee_id'], 'name'].values[0]
    employee_skill_matrix.loc[employee_name, row['skill']] = row['level']

# Save the DataFrame to an Excel file
employee_skill_matrix.to_excel('employee_skills.xlsx')
