from urllib.request import urlopen
from bs4 import BeautifulSoup
import pandas as pd

awards = ['mvp','roy','dpoy','smoy','mip']
executive_awards=['coy','eoy']

for award in awards:
    url = "https://www.basketball-reference.com/awards/"+str(award)+".html"
    html = urlopen(url)
    soup = BeautifulSoup(html, features="html.parser")
    id = str(award)+"_NBA"
    data = soup.find_all('table', id=id)[0].findAll('tr')
    award_stats = [[td.getText() for td in data[i].findAll('td')] for i in range(0,len(data))]
    head = [[th.getText() for th in data[i].findAll('th')] for i in range(0,len(data))]
    award_stats=award_stats[2:]
    h = head[1]
    header = h[1:]
    award_stats = pd.DataFrame(award_stats, columns = header)
    award_stats['Award'] = award
    award_stats.to_csv("C:\Code\statsaward.csv", mode='a', index=False)
    print(str(award)," award done...")
