from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

url="https://www.basketball-reference.com/leagues/NBA_1950.html"
years = []

for year in range(1950,2023):
    years.append(year)

for season in years:
    url = "https://www.basketball-reference.com/leagues/NBA_"+str(season)+".html"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    data = soup.find_all('table', id="totals-team")[0].findAll('tr')
    pergame= soup.find_all('table', id="per_game-team")[0].findAll('tr')
    total_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    pergame_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    pergame_header = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
    total_stats = total_stats[1:]
    pergame_stats = pergame_stats[1:]
    pergame_stat = pd.DataFrame(total_stats,columns = ['Team', 'G', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', '2P', '2PA', '2P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'])
    pergame_stat.to_csv("C:\Code\stat_pergame.csv", mode='a', index=False)
    total_stat = pd.DataFrame(total_stats,columns = ['Team', 'G', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', '2P', '2PA', '2P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'])
    total_stat.to_csv("C:\Code\stat_totals.csv", mode='a', index=False)
    print(str(season)," season done...")
