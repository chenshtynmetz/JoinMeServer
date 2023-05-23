import numpy as np
import pandas as pd
from apyori import apriori

def hot_encode(x):
    if(x<= 0):
        return 0
    if(x>= 1):
        return 1

# Loading the Data
data = pd.read_csv('model.csv')
data.head()

users = data.uid.unique()
categories = data.category.unique()
baskets = []

for user in users:
    filtered_df = data[data['uid'] == user]
    # # print(filtered_df.columns)
    #
    # Access the "category" column of the filtered dataframe
    category = filtered_df['category']
    category_list = category.tolist()
    category_set = set(category_list)
    # print(category_list)
    basket = [0]*len(categories)
    for cat in category_set:
        index = categories.tolist().index(cat)
        basket[index] = 1
    baskets.append(basket)


# for basket in baskets:
    # Encoding the datasets
    # basket_encoded = basket.applymap(hot_encode)
    # basket = basket_encoded
    # print("hi")

association_rules = apriori(baskets, min_support=0.05)
association_results = list(association_rules)
print(association_results)
    # # Collecting the inferred rules in a dataframe
    # rules = association_rules(frq_items, metric="lift", min_threshold=1)
    # rules = rules.sort_values(['confidence', 'lift'], ascending=[False, False])
    # print(rules.head())