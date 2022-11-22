from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd
import re 
import time

teams=["BOS","TOR","PHI","BRK","NYK","MIL","CLE","IND","CHI","DET","ATL","WAS","MIA","ORL","CHO","UTA","DEN","POR","MIN","OKC","PHO","SAC","LAC","GSW","LAL",
        "MEM","NOP","DAL","SAS","HOU"]


for team in teams:
    print(str(team)+" starting...")
    url = "https://www.basketball-reference.com/teams/"+str(team)+"/2023.html"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    data = soup.find_all('table', id="roster")[0].findAll("td")
    for player in data:
        for a in player.findAll("a",href=True):
            time.sleep(1)
            if "players" in a["href"]:
                url1="https://www.basketball-reference.com"+str(a["href"])
                html = urlopen(url1)
                soup = BeautifulSoup(html, features="html.parser")
                playername=soup.findAll('div',id="meta")[0].findAll("span")[0].text.strip()
                data1 = soup.find_all('div', id="bottom_nav_container")[0]
                print("Scraping "+str(playername)+" data")
                for data in data1.findAll("a"):
                    time.sleep(1)
                    if "gamelog-playoffs" in data.attrs["href"]:
                        continue
                    elif "gamelog" in data.attrs["href"]:
                        url2="https://www.basketball-reference.com"+str(data.attrs["href"])
                        html = urlopen(url2)
                        soup = BeautifulSoup(html, features="html.parser")
                        pergamestats = soup.find_all('table', id="pgl_basic")[0].findAll("tr")
                        pergamestatsdata = [[td.getText() for td in pergamestats[i].findAll('td')] for i in range(0,len(pergamestats))]
                        pergamestatsheader = [[th.getText() for th in pergamestats[i].findAll('th')] for i in range(0,len(pergamestats))]
                        pergamestatsdata = pergamestatsdata[1:]
                        pergamestat = pd.DataFrame(pergamestatsdata, columns = ['G', 'Date', 'Age', 'Tm', '\xa0', 'Opp', '\xa0', 'GS', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS', 'GmSc', '+/-'])
                        pergamestat["Player"]=playername
                        pergamestat.to_csv("C:\Code\cummalativePerGame.csv", mode='a', index=False)  
                    else:
                        continue
            else:
                continue
    print(str(team)," done...")   
