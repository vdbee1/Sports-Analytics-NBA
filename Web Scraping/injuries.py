KiBee — Today at 2:39 PM
from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

url = "https://www.basketball-reference.com/friv/injuries.fcgi"

html = urlopen(url)
soup = BeautifulSoup(html, features="html.parser")
urls = soup.find_all('table',id='injuries')[0].findAll('tr')
player_data = [[th.getText() for th in urls[i].findAll('th')] for i in range(0,len(urls))]
rows_data = [[td.getText() for td in urls[i].findAll('td')] for i in range(0,len(urls))]
player_data = player_data[1:]
rows_data = rows_data[1:]

player = pd.DataFrame(player_data, columns = ['Player'])
injury= pd.DataFrame(rows_data, columns = ['Team', 'Update', 'Description'])
player_injuries = player.join(injury)

player_injuries.to_csv("C:\Code\injuries.csv", index=False)