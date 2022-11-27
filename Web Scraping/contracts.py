from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import csv

url = "https://www.basketball-reference.com/contracts/players.html"

html = urlopen(url)
soup = BeautifulSoup(html, features="html.parser")
urls = soup.find_all('table', id='player-contracts')[0].findAll('tr')
rows_data = [[td.getText() for td in urls[i].findAll('td')]
             for i in range(len(urls))]

fix = rows_data[1:]
contracts = pd.DataFrame(fix, columns=[
                         'PlayerName', 'Tm', '2022-23', '2023-24', '2024-25', '2025-26', '2026-27', '2027-28', 'Guaranteed'])

contracts.dropna(inplace=True)
colNames = ['2022-23', '2023-24', '2024-25',
            '2025-26', '2026-27', '2027-28', 'Guaranteed']
for colName in colNames:
    contracts[colName] = contracts[colName].str.replace('$', '')
    contracts[colName] = contracts[colName].str.replace(',', '')
    contracts[colName] = pd.to_numeric(contracts[colName], errors='coerce')
contracts.head(5)

#contracts.to_csv("C:\Code\contracts.csv", index=False)
