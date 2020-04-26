# Options Put Volume 
# Initial script by JeanTann3en
# Refactored and optimized by Wahakalaka
# This thinkscript will pull option call volume for the underlying symbol 
# and then overlay it on a histogram, for the configured dates. 



#input exp = "200417";
#input start_price = 2600;
#input end_price = 2700;
#input type = "C";
#def agg_put_vol = fold strike = start_price to end_price with v do v + 
#if IsNaN(volume(Concat(".", Concat("SPX", Concat(exp, Concat(type, AsPrice(strike))))))) then 0 
#else volume(Concat(".", Concat("SPX", Concat(exp, Concat(type, AsPrice(strike))))));


declare lower;
declare once_per_bar;


input strike_start = 2300;
input strike_end = 2800;
input date01 = "200422";
input date02 = "200424";
input date03 = "200427";
input type= "P";
input hours_to_graph=5;


def barNum = if IsNaN( close ) then Double.NaN else barNumber();
def lastBar = HighestAll( barNum );

def call_vol_agg_01;
def call_vol_agg_02;
def call_vol_agg_03;
AddLabel(yes,Concat(".", Concat("SPXW", Concat(date01, Concat(type, AsPrice(2300))))));
if BarNumber() > lastBar-(hours_to_graph*60) then{
 call_vol_agg_01 = fold strike = strike_start to strike_end with v do v + 
if IsNaN(volume(Concat(".", Concat("SPXW", Concat(date01, Concat(type, AsPrice(strike))))))) then 0 
else if 49 > volume(Concat(".", Concat("SPXW", Concat(date01, Concat(type, AsPrice(strike)))))) then 0 else 
 volume(Concat(".", Concat("SPXW", Concat(date01, Concat(type, AsPrice(strike))))));

call_vol_agg_02 = fold strike2 = strike_start to strike_end with v1 do v1 + 
if IsNaN(volume(Concat(".", Concat("SPXW", Concat(date02, Concat(type, AsPrice(strike2))))))) then 0 
else if 49 > volume(Concat(".", Concat("SPXW", Concat(date02, Concat(type, AsPrice(strike2)))))) then 0 else 
 volume(Concat(".", Concat("SPXW", Concat(date02, Concat(type, AsPrice(strike2))))));
call_vol_agg_03 = fold strike3 = strike_start to strike_end with v2 do v2 + 
if IsNaN(volume(Concat(".", Concat("SPXW", Concat(date03, Concat(type, AsPrice(strike3))))))) then 0 
else if 49 > volume(Concat(".", Concat("SPXW", Concat(date03, Concat(type, AsPrice(strike3)))))) then 0 else 
 volume(Concat(".", Concat("SPXW", Concat(date03, Concat(type, AsPrice(strike3))))));




} else {
call_vol_agg_01 =0;
call_vol_agg_02 =0;
call_vol_agg_03 =0;
}

def total_call_agg = call_vol_agg_01 + call_vol_agg_02 + call_vol_agg_03;

plot CallVolAgg =  total_call_agg;




# Data is visualized with an overlayed histogram. 
# Because alpha values cannot be passed to CreateColor, please remember to set white to 99 alpha under RGB. 

CallVolAgg.SetPaintingStrategy(PaintingStrategy.SQUARED_HISTOGRAM);

def a = type == "P";


CallVolAgg.AssignValueColor(if CallVolAgg >= 1000 then CreateColor(255, 0, 0) else Color.DARK_GRAY);



AddLabel(1, "SPX Puts", CreateColor(255, 0,0));