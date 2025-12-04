# Mini Titanic Data Analysis 🚢🧊

This is a small analysis of a subset of the Titanic dataset (50 passengers).  
We explore passenger ages, survival rates, and survival percentages by passenger class using **NumPy**.

## Dataset

The dataset contains 50 passengers with the following columns:

1. **Passenger ID**: 1–50  
2. **Survived**: 0 = No, 1 = Yes  
3. **Passenger Class**: 1 = Upper, 2 = Middle, 3 = Lower  
4. **Age**: 0–74  

## Analysis Goals

- Find the shape of the dataset  
- Calculate the average age of passengers  
- Identify the oldest and youngest passengers  
- Compute the overall survival percentage  
- Compute survival percentages by passenger class  

## Code

```python
import numpy as np

passengers = np.array([
   [1, 0, 3, 22],
   [2, 1, 1, 38],
   [3, 1, 3, 26],
   [4, 1, 1, 35],
   [5, 0, 3, 35],
   [6, 0, 3, 18],
   [7, 0, 1, 54],
   [8, 0, 3, 2],
   [9, 1, 3, 27],
   [10, 1, 2, 14],
   [11, 1, 3, 4],
   [12, 1, 1, 58],
   [13, 0, 3, 20],
   [14, 0, 3, 39],
   [15, 0, 3, 14],
   [16, 1, 2, 55],
   [17, 0, 3, 2],
   [18, 1, 2, 12],
   [19, 0, 3, 31],
   [20, 1, 3, 8],
   [21, 0, 2, 35],
   [22, 1, 2, 34],
   [23, 1, 3, 15],
   [24, 1, 1, 28],
   [25, 0, 3, 8],
   [26, 1, 3, 38],
   [27, 0, 3, 2],
   [28, 0, 1, 1],
   [29, 1, 3, 5],
   [30, 0, 3, 18],
   [31, 0, 1, 40],
   [32, 1, 1, 70],
   [33, 1, 3, 33],
   [34, 0, 2, 66],
   [35, 0, 1, 28],
   [36, 0, 1, 42],
   [37, 1, 3, 5],
   [38, 0, 3, 18],
   [39, 0, 3, 18],
   [40, 1, 3, 14],
   [41, 0, 3, 40],
   [42, 0, 2, 27],
   [43, 0, 3, 29],
   [44, 1, 2, 0],
   [45, 1, 3, 19],
   [46, 0, 3, 33],
   [47, 0, 3, 14],
   [48, 1, 3, 22],
   [49, 0, 3, 41],
   [50, 0, 3, 18]
])

# Dataset shape
print("Dataset shape:", passengers.shape)

# Average age
average_age = passengers[:, 3].mean()
print("Average age:", average_age)

# Oldest and youngest passengers
oldest_idx = passengers[:, 3].argmax()
youngest_idx = passengers[:, 3].argmin()
print("Oldest passenger number:", passengers[oldest_idx, 0])
print("Youngest passenger number:", passengers[youngest_idx, 0])

# Overall survival percentage
survival_percentage = passengers[:, 1].mean() * 100
print("Overall survival percentage:", survival_percentage, "%")

# Survival percentage by passenger class
for cls in [1, 2, 3]:
    cls_passengers = passengers[passengers[:, 2] == cls]
    cls_survival_percentage = cls_passengers[:, 1].mean() * 100
    print(f"Class {cls} survival percentage: {cls_survival_percentage}%")
```
---
**CREDITS**
This is a subset of the full Titanic dataset for learning purposes.It is a mini Titanic analysis is adapted from a Codedex Python learning exercise.
Dataset subset and exercise are for educational purposes only. I dont own this dataset
