# belly-button-challenge

In this assignment, I built an interactive dashboard to explore the Belly Button Biodiversity dataset (https://robdunnlab.com/projects/belly-button-biodiversity/), which catalogues the microbes that colonise human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Th dashboard consists of:
1. ID Selector 
2. Demographic Information Display 
3. Bar Plot of Top 10 OTUs
4. Bubble Chart of OTUs 
5. Gauge Chart (in development)

The original HTML code remained unchanged. 

The code is written in <app.js>. The code consists of mainly functions:
1. initialization
2. displayDemoInfo
3. drawBarPlot
4. drawBubbleChart
5. optionChanged

Th dashboard is initialized with dataset for first ID in dataset, ID 940. The corresponding demographic information, bar plot and bubble chart is displayed.

When a different ID is selected, or when there is a change, the optionChanged function is triggered. The dashboard will be updated with the corresponding ID's demographic information, bar plot and bubble chart. 

Lastly, the app is deployed in github pages and available to the public for perusal. 