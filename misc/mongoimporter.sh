#!/bin/bash
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-1.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-2.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-3.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-4.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-5.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-6.csv
mongoimport --db infovis --collection rawdata --headerline --type csv --file ../../output/log-7.csv
