from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import time

url = "https://www.basketball-reference.com/friv/continuity.html"
html = urlopen(url)
soup = BeautifulSoup(html, features="html.parser")
data = soup.find_all('table', id="continuity")[0].findAll('tr')
continuity = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
head = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
print(head[1:])
continuity=continuity[1:]

continuity_stat = pd.DataFrame(continuity, columns = ['ATL', 'BOS', 'CHA', 'CHI', 'CLE', 'DAL', 'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA', 'MIL', 'MIN', 'NJN', 'NOH', 'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR', 'SAC', 'SAS', 'TOR', 'UTA', 'WAS'])
continuity_stat["Season"]= head[1:]
continuity_stat.to_csv("C:\Code\continuity.csv", index=False)