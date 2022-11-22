from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import time

years = []

for year in range(1980,2024):
     years.append(year)

for season in years:
    time.sleep(2)
    url = "https://www.basketball-reference.com/leagues/NBA_"+str(season)+"_advanced.html#advanced_stats::per"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    data = soup.find_all('table', id="advanced_stats")[0].findAll('tr')

    player_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    player_header = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
    player_stats = player_stats[1:]
    player_stat = pd.DataFrame(player_stats,columns = ['Player', 'Pos', 'Age', 'Tm', 'G', 'MP', 'PER', 'TS%', '3PAr', 'FTr', 'ORB%', 'DRB%', 'TRB%', 'AST%', 
                                                        'STL%', 'BLK%', 'TOV%', 'USG%', '\xa0', 'OWS', 'DWS', 'WS', 'WS/48', '\xa0', 'OBPM', 'DBPM', 'BPM', 'VORP'])
    player_stat.dropna(inplace = True)
    player_stat['Season'] = season
    player_stat.to_csv("C:\Code\playerstat.csv", mode='a', index=False)
    print(str(season)," season done...")
