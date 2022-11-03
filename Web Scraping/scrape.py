from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import time
teams = ['NJN','CLE','CHI','IND','DET','WAS','MIA','CHA','ORL','POR','UTA','OKC','DEN','MIN','PHO','LAC','GSW','SAC','LAL','MEM','SAS','NOH','DAL','HOU','MIL','BOS','TOR','ATL','PHI','NYK']

for team in teams:
    url= "https://www.basketball-reference.com/teams/"+team+"/"
    print(url)
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    data= soup.find_all('table',id=team)[0].findAll('tr')

    year_data = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
    stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    stats=stats[1:]
    year_data = year_data[1:]
    year = pd.DataFrame(year_data, columns=['Season'])
    stat = pd.DataFrame(stats,columns = ['Lg', 'Team', 'W', 'L', 'W/L%', 'Finish', 'SRS', '\xa0', 'Pace', 'Rel Pace', 'ORtg', 'Rel ORtg', 'DRtg', 'Rel DRtg', '\xa0', 'Playoffs', 'Coaches', 'Top WS'])
    team_stats=year.join(stat)
    team_stats.to_csv("C:\Code\stats.csv", mode='a', index=False)
    time.sleep(2)
    print(team+" parsed in loop")
