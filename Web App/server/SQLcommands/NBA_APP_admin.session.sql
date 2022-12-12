--@block Create playerStats_pergame_22_23 table
CREATE OR REPLACE TABLE NBA_APP.playerStats_perGame_22_23(
    Age int,
    GS INT,
    MP FLOAT,
    FG FLOAT,
    FGA FLOAT,
    FGcent DECIMAL(4, 3),
    ThreeP FLOAT,
    ThreePA FLOAT,
    ThreePcent DECIMAL(4, 3),
    TwoP FLOAT,
    TwoPA FLOAT,
    TwoPcent DECIMAL(4, 3),
    FT FLOAT,
    FTA FLOAT,
    FTcent DECIMAL(4, 3),
    ORB FLOAT,
    DRB FLOAT,
    TRB FLOAT,
    AST FLOAT,
    STL FLOAT,
    BLK FLOAT,
    TOV FLOAT,
    PF FLOAT,
    PTS FLOAT,
    GmSc FLOAT,
    PointDifference Float,
    PlayerName VARCHAR(100),
    stat VARCHAR(3)
  );
--@block Insert Player Stats data from csv
LOAD DATA LOCAL INFILE '/Users/gavinlau/Documents/MDSA/Sports-Analytics-NBA/Stats_Processing/player_stats_combined_22.csv' INTO TABLE NBA_APP.playerStats_perGame_22_23 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (
  Age,
  GS,
  MP,
  FG,
  FGA,
  FGcent,
  ThreeP,
  ThreePA,
  ThreePcent,
  TwoP,
  TwoPA,
  TwoPcent,
  FT,
  FTA,
  FTcent,
  ORB,
  DRB,
  TRB,
  AST,
  STL,
  BLK,
  TOV,
  PF,
  PTS,
  GmSC,
  PointDifference,
  PlayerName,
  stat
);
--@block Create contracts table
CREATE OR REPLACE TABLE NBA_APP.playerContracts_22_23(
    PlayerName VARCHAR(100) PRIMARY KEY,
    Tm VARCHAR(10),
    `2022-23` DECIMAL(12, 2),
    `2023-24` DECIMAL(12, 2),
    `2024-25` DECIMAL(12, 2),
    `2025-26` DECIMAL(12, 2),
    `2026-27` DECIMAL(12, 2),
    `2027-28` DECIMAL(12, 2),
    Guaranteed DECIMAL(12, 2)
  );
--@block Insert Contracts data from csv
LOAD DATA LOCAL INFILE '/Users/gavinlau/Documents/MDSA/DATA604/Sports-Analytics-NBA/Cleaned_Datasets/contracts_22.csv' INTO TABLE NBA_APP.playerContracts_22_23 FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 LINES (
  PlayerName,
  Tm,
  `2022-23`,
  `2023-24`,
  `2024-25`,
  `2025-26`,
  `2026-27`,
  `2027-28`,
  Guaranteed
);
--@block join player stats to player contracts as a VIEW for easy access 
CREATE OR REPLACE VIEW NBA_APP.playerStats_contracts_22_23 AS
SELECT A.*,
  B.`2022-23` as 'ContractPrice'
FROM NBA_APP.playerStats_perGame_22_23 A,
  NBA_APP.playerContracts_22_23 B
WHERE A.PlayerName = B.PlayerName;
--@block reset g and p
UPDATE NBA_APP.users
SET room_id = NULL
WHERE email = "g@datanerds"
  OR email = "p@datanerds";
--@block reset v
UPDATE NBA_APP.users
SET room_id = "DEMO"
WHERE email = "v@datanerds";
--@block add admin column
ALTER TABLE teams
ADD losses int default 0;
ALTER TABLE teams
ADD wins int default 0;
--@block
DELETE FROM teams
where owner = "Gavin" --@block
ALTER TABLE users
ADD role VARCHAR(10) default NULL;
--@block set G, M, P and V to admin
UPDATE users
SET role = "admin"
WHERE email in (
    "g@datanerds",
    "p@datanerds",
    "v@datanerds",
    "m@datanerds"
  );
--@block remove G's team
UPDATE users
set team_id = NULL
where email = "g@datanerds";
--@block remove team
DELETE FROM NBA_APP.teams
where owner = "Gavin" --@block remove team_id
UPDATE NBA_APP.users
set team_id = NULL
where email = "g@datanerds" --@block
UPDATE NBA_APP.teams
SET wins = wins + 1
where team_id = "Gifted Goats-Vardaan";
--@block
UPDATE NBA_APP.teams
SET winloss = CASE
    when (losses > 0) THEN wins / losses
    ELSE wins
  END;