from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import time

years = [] 
for year in range(1980,2024):
    years.append(year)

for i in years:
    url = "https://www.basketball-reference.com/leagues/NBA_"+str(i)+"_per_game.html"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    data = soup.find_all('table', id="per_game_stats")[0].findAll('tr')
    pergame_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    head = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
    pergame_stats=pergame_stats[1:]
    header = head[1:]
    pergame_stat = pd.DataFrame(pergame_stats, columns = ['Player', 'Pos', 'Age', 'Tm', 'G', 'GS', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', '2P', '2PA', '2P%', 'eFG%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'])
    pergame_stat["Season"]= i 
    pergame_stat.dropna(inplace = True) 
    pergame_stat.to_csv("C:\Code\pergamebasics.csv", mode='a', index=False)
    print(str(i)," year done...")
    time.sleep(5)