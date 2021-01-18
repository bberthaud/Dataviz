library(lubridate)
library(forecast)

sea=read.table('sea_level_data.txt',skip=48,col.names=c("altimeter","merged_file_cycle","year","nb_obs","nb_wgthed_obs","GMSL","std_GMSL","smoothed_GMSL","GMSL","std_GMSL2","smoothed_GMSL2","smoothed_GMSL3"))


attach(sea)


(f <- format(date_decimal(year), "%Y-%m-%d"))



GMSL_ts=ts(GMSL,start=f[1],frequency=36.525)

plot(f,GMSL_ts,type='l')
GMSL_fore=forecast(GMSL_ts,h=400,find.frequency = TRUE)


prev_low=as.matrix(GMSL_fore$lower)[,1]
prev_high=as.matrix(GMSL_fore$upper)[,1]

sea_alldata=ts(c(GMSL_ts,GMSL_fore$mean),start=start(GMSL_ts),frequency=frequency(GMSL_ts))
sea_lower=ts(c(GMSL_ts,prev_low),start=start(GMSL_ts),frequency=frequency(GMSL_ts))
sea_higher=ts(c(GMSL_ts,prev_high),start=start(GMSL_ts),frequency=frequency(GMSL_ts))

try=seq(from=as.Date("2020/08/15"),by=10,length=400)

date=append(f,try)



sea2=data.frame(as.matrix(sea_alldata),date2=date)
sea2_lower=data.frame(as.matrix(sea_lower,date2=date))
sea2_higher=data.frame(as.matrix(sea_higher,date2=date))

sea3=sea2
sea3_lower=sea2_lower
sea3_higher=sea2_higher
sea3[,1]=sea2[,1]-min(sea2[,1])
sea3[,1]=round(sea3[,1],digits=2)

sea3_lower[,1]=sea2_lower[,1]-min(sea2_lower[,1])
sea3_lower[,1]=round(sea3_lower[,1],digits=2)

sea3_higher[,1]=sea2_higher[,1]-min(sea2_higher)
sea3_higher[,1]=round(sea3_higher[,1],digits=2)


id=1:1416
sea4=cbind(sea3,id)


SEA_ALL=cbind(sea4,sea3_higher,sea3_lower)

as.matrix(GMSL_fore$lower)[,2]
GMSL_fore$lower
GMSL_fore$upper
write.csv(sea4,"C:/Users/edgar/Desktop/dataviz/sea_level_predict.csv", row.names = FALSE)
write.csv(SEA_ALL,"C:/Users/edgar/Desktop/dataviz/SEA_ALL.csv", row.names = FALSE)

co2_data=read.table('co2_mm_mlo_NoHeader.txt',,col.names=c("Year","month","date_co2","avg","de-season","days","stddev","unc.month"))
f2=co2_data[,3]
(f3 <- format(date_decimal(f2), "%Y-%m-%d"))

f3=as.Date(f3)
data=co2_data[,4]

ts=ts(data,start=f3[1],frequency=12)
fore=forecast(ts,h=130,find.frequency = TRUE)

all_data=ts(c(ts,fore$mean),start=start(ts),frequency=frequency(ts))

prev_low=as.matrix(fore$lower)[,1]
prev_high=as.matrix(fore$upper)[,1]

data_lower=ts(c(ts,prev_low),start=start(ts),frequency=frequency(ts))
data_higher=ts(c(ts,prev_high),start=start(ts),frequency=frequency(ts))
co2_lower=data.frame(as.matrix(data_lower),date2=date_fore_all)
co2_higher=data.frame(as.matrix(data_higher),date2=date_fore_all)


date_fore=seq(from=as.Date("2020/11/16"),by='month',length=130)
date_fore_all=append(f3,date_fore)
co2_fore=data.frame(as.matrix(all_data),date2=date_fore_all)


co2_fore[,1]=round(co2_fore[,1],digits=2)

id=1:882
co2_fore_id=cbind(co2_fore,id)

co2_lower=round(co2_lower[,1],digit=2)
co2_higher=round(co2_higher[,1],digit=2)


CO2_FINAL=cbind(co2_fore_id,co2_higher,co2_lower)

write.csv(co2_fore_id,"C:/Users/edgar/Desktop/dataviz/co2_forecast.csv", row.names = FALSE)
write.csv(CO2_FINAL,"C:/Users/edgar/Desktop/dataviz/C02_FINAL.csv", row.names = FALSE)
 plot(co2_fore)

 
 
banq=read.table('greenland_mass_200204_202009.txt',skip=31,col.names=c("333","Gigatonnes","uncertainty"))

plot(banq[,2]) 

time=format(date_decimal(banq[,1]), "%Y-%m-%d")

time=as.Date(time)
ts_banq=ts(banq[,2],start=time[1],freq=12)


fore_banq=forecast(ts_banq,h=130)

all_banq=ts(c(ts_banq,fore_banq$mean),start=start(ts_banq),frequency=frequency(ts_banq))


date_fore_banq=seq(from=as.Date("2020/10/16"),by='month',length=130)
date_fore_banq_all=append(time,date_fore_banq)
banq_fore=data.frame(as.matrix(all_banq),date2=date_fore_banq_all)



banq_fore[,1]=round(banq_fore[,1],digits=2)
write.csv(banq_fore,"C:/Users/edgar/Desktop/dataviz/Greenland_forecast.csv", row.names = FALSE)


sup_banq=read.csv('Arctic_sea_ice_min.csv',col.names=c("year","month","d-type","region","extent","area"))
sup_banq
sup_banq_out=sup_banq[,c(1,5)]
sup_banq_out
write.csv(sup_banq_out,"C:/Users/edgar/Desktop/dataviz/arctic_superficie.csv", row.names = FALSE)
