from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.basketball-reference.com/leagues/NBA_stats_per_game.html"
html = urlopen(url)
soup = BeautifulSoup(html, features="html.parser")
data = soup.find_all('table', id="stats")[0].findAll('tr')
overall= soup.find_all('table', id="stats")[0].findAll('tr')
overall_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
overall_stats = overall_stats[2:]

overall_header = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
overall_stat = pd.DataFrame(overall_stats,columns = ['Season', 'Lg', 'Age', 'Ht', 'Wt', 'G', 'MP', 'FG', 'FGA', '3P', '3PA', 'FT', 'FTA', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS', 'FG%', '3P%', 'FT%', 'Pace', 'eFG%', 'TOV%', 'ORB%', 'FT/FGA', 'ORtg'])
overall_stat.dropna(inplace = True) 
overall_stat.to_csv("C:\Code\stat_overall.csv", index=False)