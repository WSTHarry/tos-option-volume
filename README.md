# tos-option-volume
Thinkscript indictor that graphs the volume of SPX options. I've found this usefull to track intraday SPY movements. Large SPX options volume seems to be much more correlated with SPY then SPY option volume.

- This is forked from an original repo from JeanTann3n.

![Options Volume](/new_screenshot.PNG)

Another example (excuse the terrible use of Paint)

![SPX Volume](/screenshot_2.png)


# Notes
 - The options will turn red/blue if the volume is > 1000.
 - The "hours to graph" input is assuming 1 min aggregation
 - There is a lot of data being processed, I would recommend using a longer aggregation period or a shorter time interval if you're seeing performance issues. This will still work on 1 min interval I prefer 2min.
 - I would suggest upping your RAM to as high as possible.
 - Currently strikes are pulled in dollar increments.
 - It might take a while to load everything, be patient.
 - This is **ONLY** for SPX
 - Strike ranges and expirations need to be set manually but they can be pretty large. On the plus side this allows for effective filtering to a specific delta range if you look up what the strike range is for the equivalent delta range.
 - The volume data is not raw order data, so specific sale prices, order sizes, etc. cannot be inferred.

# How to Install
Clone the repo or download the files. Click studies --> import then browse to the .ts files.


Feel free to ping me @harrib or @jeantann3n with questions or add issues/bugs in github! 
