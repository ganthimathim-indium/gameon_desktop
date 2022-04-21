package main

import (
	"bufio"
	_ "embed"
	"encoding/json"
	"flag"
	"fmt"
	apidata "gameongo/api"
	L "gameongo/lib"
	"math"
	"reflect"
	"regexp"
	"strconv"
	"time"

	"log"
	"strings"

	"github.com/wailsapp/wails"

	adb "github.com/zach-klippenstein/goadb"
)

var js string
var css string
var devicename string
var deviceserial string
var human2 []results

var leadingInt = regexp.MustCompile(`^[-+]?\d+`)
var ticker time.Ticker
var timedata string

var cpu_useage string
var cpu_deviations string
var cpu_time string

var Memory_useage string
var Memory_deviations string
var Memory_time string

var gpuMetric_useage string
var gpuMetric_deviations string
var gpuMetric_time string

var Uploaddata_useage string
var Uploaddata_deviations string
var Uploaddata_time string

var Downloadddata_useage string
var Downloadddata_deviations string
var Downloadddata_time string

var CPUCores_useage string
var CPUCores_deviations string
var CPUCores_time string

var power_useage string
var power_deviations string
var power_time string

var Apppower_useage string
var Apppower_deviations string
var Apppower_time string

var AvgMedianFPS_useage string
var AvgMedianFPS_deviations string
var AvgMedianFPS_time string

type Appinfo struct {
	Osname     string `json:"osname"`
	Devicename string `json:"devicename"`
	Applist    string `json:"applist"`
}
type Baseinfo struct {
	Start_time      string `json:"start_time"`
	Record_duration string `json:"total_duration"`
	Device_id       string `json:"device_id"`
	Device_name     string `json:"device_name"`
	Android_version string `json:"android_version"`
	Version_name    string `json:"version_name"`
	App_name        string `json:"app_name"`
}
type Responseinfo struct {
	Start_time      string `json:"start_time"`
	App_name        string `json:"app_name"`
	Device_name     string `json:"device_name"`
	Version_name    string `json:"version_name"`
	Total_duration  string `json:"total_duration"`
	Device_id       string `json:"device_id"`
	Android_version string `json:"android_version"`
	Dataval         string `json:"results"`
}

type Sartdata struct {
	Start_time      string `json:"start_time"`
	App_name        string `json:"app_name"`
	Device_name     string `json:"device_name"`
	Version_name    string `json:"version_name"`
	Device_id       string `json:"device_id"`
	Android_version string `json:"android_version"`
}

type Mystop struct {
	End_time      string    `json:"end_time"`
	Result        []results `json:"results"`
	SessionID     string    `json:"sessionID"`
	SessionUserID string    `json:"sessionUserID"`
	UserRole      string    `json:"userRole"`
	Device_id     string    `json:"device_id"`
}

type results struct {
	Cpu_app_usage string `json:"cpu_app_usage"`
	Cpu_time_val  string `json:"cpu_time"`
	Cpu_deviation string `json:"cpu_deviation"`

	Memory_app_useage    string `json:"memory_app_useage"`
	Memory_app_deviation string `json:"memory_app_deviation"`
	Memory_app_time      string `json:"memory_app_time"`

	Gpu_app_useage    string `json:"gpu_app_useage"`
	Gpu_app_deviation string `json:"gpu_app_deviation"`
	Gpu_app_time      string `json:"gpu_app_time"`

	Uploaddata_app_useage    string `json:"uploaddata_app_useage"`
	Uploaddata_app_deviation string `json:"uploaddata_app_deviation"`
	Uploaddata_app_time      string `json:"uploaddata_app_time"`

	Downloadddata_app_useage    string `json:"downloadddata_app_useage"`
	Downloadddata_app_deviation string `json:"downloadddata_app_deviation"`
	Downloadddata_app_time      string `json:"downloadddata_app_time"`

	CPUCores_app_useage    string `json:"cpucores_app_useage"`
	CPUCores_app_deviation string `json:"cpucores_app_deviation"`
	CPUCores_app_time      string `json:"cpucores_app_time"`

	Power_app_useage    string `json:"power_app_useage"`
	Power_app_deviation string `json:"power_app_deviation"`
	Power_time          string `json:"power_app_time"`

	Apppower_app_useage    string `json:"apppower_app_useage"`
	Apppower_app_deviation string `json:"apppower_app_deviation"`
	Apppower_time          string `json:"apppower_app_time"`

	Avgfps_app_useage    string `json:"avgfps_app_useage"`
	Avgfps_app_deviation string `json:"avgfps_app_deviation"`
	Avgfps_time          string `json:"avgfps_app_time"`
}

//3 basic info
func basic() string {

	css = "./frontend/build/static/css/main.css"

	js = "./frontend/build/static/js/main.js"

	var clients []Appinfo

	var info = append(clients, Appinfo{
		Osname:     "android",
		Devicename: deviceinfonew(),
		Applist:    getlogin(),
	})
	out, err := json.Marshal(info)
	if err != nil {
		panic(err)

	}
	fmt.Println(string(out))
	return string(out)
}

//1login api
func mylogin(req string) (val string) {
	sec := map[string]string{}
	if err := json.Unmarshal([]byte(req), &sec); err != nil {
		panic(err)
	}
	fmt.Println(apidata.Apihit(sec))
	//checkdevice()
	return (apidata.Apihit(sec))

}

//2check device
func checkdevice() (val string) {
	//fmt.Println(len(L.Appnamenew()))
	if len(strings.TrimSpace(L.Appnamenew())) == 0 {
		fmt.Println("No Device Attached")

		return "No Device Attached"
	} else {
		fmt.Println("Device Attached")

		return "Device Attached"

	}

}

//4 open app
func openapp(appnames string) (val string) {

	return L.Appopen(appnames)
}

//basic information
func basiconfo(appinfodata string) (val string) {
	//basic()
	//var clients1 string
	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appinfodata), &sec); err != nil {
		panic(err)
	}
	fmt.Println(appinfodata)

	//value := sec["id"]
	appname := sec["appname"]
	token := sec["token"]
	fmt.Println(token)

	//clients1 = "{" + "device_id:" + deviceserial + ",user_id:" + value + ",device_name:" + deviceinfonew() + ",android_version:" + L.Appversion() + ",start_time:" + "t" + ",end_time:" + "t" + ",version_name:" + L.Androidversionapp() + ",app_name:" + appname + ",record_duration:" + "t" + "}"

	// sec1 := map[string]string{}
	// if err := json.Unmarshal([]byte(clients1), &sec1); err != nil {
	// 	panic(err)
	// }
	fmt.Println("app:" + L.Appversion(appname))

	//var clientss []Baseinfo
	p := Baseinfo{
		Device_name:     devicename,
		Device_id:       deviceserial,
		Android_version: L.Appversion(appname),
		Start_time:      "15:25:34",
		Version_name:    L.Androidversionapp(),
		App_name:        appname,
		Record_duration: "06:00",
	}

	// var info1 = append(clientss, Baseinfo{
	// 	Device_id:       deviceserial,
	// 	User_id:         value,
	// 	Device_name:     deviceinfonew(),
	// 	Android_version: L.Appversion(),
	// 	Start_time:      "r",
	// 	End_time:        "r",
	// 	Version_name:    L.Androidversionapp(),
	// 	App_name:        appname,
	// 	Record_duration: "r",
	// })
	fmt.Println(p)
	modifiedBytes, _ := json.Marshal(p)
	fmt.Println(string(modifiedBytes))

	// Unmarshal or Decode the JSON to the interface.

	sec1 := map[string]string{}
	if err := json.Unmarshal([]byte(string(modifiedBytes)), &sec1); err != nil {
		panic(err)
	}
	fmt.Println(sec1)

	// //	fmt.Println(reflect.TypeOf(info1).Kind())
	apidata.Apihitinfo(sec1, token)
	return apidata.Apihitinfo(sec1, token)

}

// boolValue, err := strconv.ParseBool(valdata)
// if err != nil {
// 	log.Fatal(err)
// }

// if boolValue == true {
// 	gocron.Every(60).Second().Do(startscan(appnamee_test, valdata))
// 	<-gocron.Start()
// 	return "yes"

// } else {
// 	// gocron.Every(6).Second().Do(startscan(appnamee_test, valdata))
// 	// <-gocron.Stop()
// 	return "No"

// }
//return  startscan(appnamee_test, valdata)

// func heartBeat(appnamee_test string) {
// 	ticker := time.NewTicker(20 * time.Second)

// 	for range ticker.C {

// 	}
// }
//start scan
func startscan(appnamee_test string, valdata string) (val string) {
	//go heartBeat(appnamee_test)

	//fmt.Printf("%s: %t\n", v, boolValue)

	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appnamee_test), &sec); err != nil {
		panic(err)
	}
	fmt.Println(appnamee_test)

	//value := sec["id"]
	appname := sec["appname"]
	token := sec["token"]

	currentTime := time.Now()

	//do stuff

	fmt.Println(human2)
	out7, err := json.Marshal(human2)
	if err != nil {
		panic(err)

	}
	fmt.Println("myvvv" + string(out7))

	out5, err := json.Marshal(Sartdata{
		Start_time:      currentTime.Format("3:4:5 pm"),
		App_name:        appname,
		Version_name:    L.Androidversionapp(),
		Device_name:     devicename,
		Device_id:       deviceserial,
		Android_version: L.Appversion(appname),
	})

	if err != nil {
		panic(err)

	}

	//	modifiedBytes, _ := json.Marshal(human3)
	fmt.Println("mtval" + string(out5))

	// Unmarshal or Decode the JSON to the interface.

	sec5 := map[string]string{}
	if err := json.Unmarshal([]byte(string(out5)), &sec5); err != nil {
		panic(err)
	}
	fmt.Println(sec5)

	//human2 = nil
	human2 = nil

	return apidata.Apihitstart(sec5, token)

	//return string(out5)

}

//STOP SCAN
func stopscan(appinfodata string, valdata string) (val string) {
	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appinfodata), &sec); err != nil {
		panic(err)
	}
	fmt.Println(appinfodata)

	//value := sec["id"]
	//appname := sec["appname"]
	currentTime := time.Now()
	//currentTime.Format("3:4:5 pm")
	token := sec["token"]
	id := sec["id"]

	userRole := sec["userRole"]

	session_id := sec["session_id"]

	// out7, err := json.Marshal(human2)
	// if err != nil {
	// 	panic(err)
	// }

	out5, err := json.Marshal(Mystop{
		Result:        human2,
		End_time:      currentTime.Format("3:4:5 pm"),
		SessionID:     session_id,
		SessionUserID: id,
		UserRole:      userRole,
		Device_id:     deviceserial,
	})

	if err != nil {
		panic(err)

	}

	//currentTime := time.Now()
	// t1 := time.Date(1984, time.November, 3, 13, 0, 0, 0, time.UTC)

	// //do stuff

	// ticker.Stop()
	// t2 := time.Date(1984, time.November, 3, 10, 23, 34, 0, time.UTC)

	// hs := t1.Sub(t2).Hours()

	// hs, mf := math.Modf(hs)
	// ms := mf * 60

	// ms, sf := math.Modf(ms)
	// ss := sf * 60

	// fmt.Println(hs, "hours", ms, "minutes", ss, "seconds")
	// s := strconv.FormatFloat(hs, 'E', -1, 64)
	// s1 := strconv.FormatFloat(ms, 'E', -1, 64)
	// s2 := strconv.FormatFloat(ss, 'E', -1, 64)

	// timedata = s + "hours" + s1 + "minutes" + s2 + "seconds"

	//	human3 := &
	//	human3 := Responseinfo{start_time: "ff", app_name: "ff", device_name: "ff", version_name: "ff", total_duration: "fff", device_id: "ff", android_version: "ff"}

	//fmt.Println(human3) // {"Name":"Bob","Age":10,"Active":true}
	// resultt := results{Cpu_app_usage: "data", Time: currentTime.Format("3:4:5 pm"),
	// 	Cpu_deviation: "Mainactivity"}
	// human2 = append(human2, resultt)
	fmt.Println(out5)

	// out7, err := json.Marshal(human2)
	// if err != nil {
	// 	panic(err)

	// }
	fmt.Println("myvvv" + string(out5))

	//	modifiedBytes, _ := json.Marshal(human3)

	// Unmarshal or Decode the JSON to the interface.
	// bodyBytes, err := ioutil.ReadAll()
	// if err != nil {
	// 	fmt.Print(err.Error())
	// }

	//	sec5 := map[string]string{}
	// var decoded []interface{}
	// err = json.Unmarshal([]byte(string(out5)), &decoded)

	// // if err := json.Unmarshal([]byte(string(out5)), &sec5); err != nil {
	// // 	panic(err)
	// // }
	// fmt.Println(decoded...)
	fmt.Println(reflect.TypeOf(out5))
	var valsss string

	valsss = apidata.Apihitstop(out5, token)
	return valsss

}

//1.cpu metric
func cpumetric(appnamess string) (val string) {
	res2 := L.AndroidCPUUsage(appnamess)
	fmt.Println("tttt" + res2)
	var valsss string
	currentTime := time.Now()
	cpu_useage = ""
	cpu_deviations = ""
	cpu_time = ""
	cpu_useage = L.AndroidCPUUsage(appnamess)
	cpu_deviations = "Mainactivity"
	cpu_time = currentTime.Format("3:4:5 pm")

	valsss = "Total CPU Useage : " + res2 + " %"
	return valsss

}

//2.menory metric
func memmetric(appnamess string) (val string) {
	res2 := L.AndroidMemoryUsage(appnamess)

	var valsss string
	var valsss1 string

	var valss string
	valss = strings.TrimSpace(res2)
	intVar, err := strconv.Atoi(strings.TrimSpace(valss))
	if err != nil {
		fmt.Println(err)
	}

	fmt.Println(intVar)
	valsss = fmt.Sprintf("Total Memory Usage : %v MB", kBToMB(intVar))
	valsss1 = fmt.Sprintf("%v", kBToMB(intVar))

	Memory_useage = ""
	Memory_deviations = ""
	Memory_time = ""
	Memory_useage = valsss1
	Memory_deviations = "Mainactivity"
	currentTime := time.Now()

	Memory_time = currentTime.Format("3:4:5 pm")

	return valsss

}

// 3. gpuMetric
func gpuMetric(appnamess string) (val string) {
	L.Androidgpuuseage(appnamess)
	res2 := L.Androidgpuuseage(appnamess)
	res2 = strings.Split(res2, ",")[1]
	res2 = strings.TrimSpace(res2)

	gpuMetric_useage = ""
	gpuMetric_deviations = ""
	gpuMetric_time = ""
	gpuMetric_useage = res2
	gpuMetric_deviations = "Mainactivity"
	currentTime := time.Now()

	gpuMetric_time = currentTime.Format("3:4:5 pm")

	value := "Total Gpu Usage : " + res2
	return value

}

//4.upload data
func Uploaddata(appnames string) (val string) {
	res2 := L.AndroidUploadedData(appnames)
	fmt.Println("tttt" + res2)
	var valsss string

	intVar, _ := strconv.Atoi(res2)

	valsss = fmt.Sprintf("Total DataUploaded : %v MB", bytesToMB(intVar))

	var valsss1 string

	valsss1 = fmt.Sprintf("%v", bytesToMB(intVar))

	Uploaddata_useage = ""
	Uploaddata_deviations = ""
	Uploaddata_time = ""
	Uploaddata_useage = valsss1
	Uploaddata_deviations = "Mainactivity"
	currentTime := time.Now()

	Uploaddata_time = currentTime.Format("3:4:5 pm")

	return valsss

}

//5.download data
func AndroidDownloadedData1(appnames string) (val string) {
	res2 := L.AndroidDownloadedData(appnames)
	fmt.Println("tttt" + res2)
	var valsss string
	intVar, _ := strconv.Atoi(res2)

	valsss = fmt.Sprintf("Total Download data : %v MB", bytesToMB(intVar))

	var valsss1 string

	valsss1 = fmt.Sprintf("%v", bytesToMB(intVar))

	Downloadddata_useage = ""
	Downloadddata_deviations = ""
	Downloadddata_time = ""
	Downloadddata_useage = valsss1
	Downloadddata_deviations = "Mainactivity"
	currentTime := time.Now()

	Downloadddata_time = currentTime.Format("3:4:5 pm")

	return valsss

}

//6.cpu cores
func AndroidCPUCores1(appnamess string) (val string) {
	res2 := L.AndroidCPUCores(appnamess)
	fmt.Println("tttt" + res2)
	var valsss string
	valsss = "cpu Cores : " + res2

	CPUCores_useage = ""
	CPUCores_deviations = ""
	CPUCores_time = ""
	CPUCores_useage = res2
	CPUCores_deviations = "Mainactivity"
	currentTime := time.Now()

	CPUCores_time = currentTime.Format("3:4:5 pm")

	return valsss

}

//7.power useage
func powermetric(appnamess string) (val string) {
	res2 := L.Battery(appnamess)
	fmt.Println("tttt" + res2)
	var valsss string
	valsss = "Total Battery Useage : " + res2 + " %"

	power_useage = ""
	power_deviations = ""
	power_time = ""
	power_useage = res2
	power_deviations = "Mainactivity"
	currentTime := time.Now()

	power_time = currentTime.Format("3:4:5 pm")

	return valsss

}

//8 App power metric
func Apppowermetric(appnamess string) (val string) {
	L.AndroidAppPowerUsage(appnamess)
	res2 := L.AndroidAppPowerUsage(appnamess)
	fmt.Println("App usage" + res2)
	var valsss string
	valsss = "Total App Useage : " + res2 + " mAh"

	Apppower_useage = ""
	Apppower_deviations = ""
	Apppower_time = ""
	Apppower_useage = res2
	Apppower_deviations = "Mainactivity"
	currentTime := time.Now()

	Apppower_time = currentTime.Format("3:4:5 pm")

	return valsss

}

//9.CPU architecture
func cpuarch(appnamess string) (val string) {
	L.Androidcpuarch(appnamess)
	res := L.Androidcpuarch(appnamess)
	var valsss string
	valsss = "CPU architecture : " + res

	return valsss
}

// 10 Avg. Median FPS Usage

func AvgMedianFPS(appnames string) (val string) {

	res2 := L.AndroidMedianFPS(appnames)

	var valsss string

	AvgMedianFPS_useage = ""
	AvgMedianFPS_deviations = ""
	AvgMedianFPS_time = ""
	AvgMedianFPS_useage = res2
	AvgMedianFPS_deviations = "Mainactivity"
	currentTime := time.Now()

	AvgMedianFPS_time = currentTime.Format("3:4:5 pm")

	result := results{
		Cpu_app_usage: cpu_useage, Cpu_time_val: cpu_time, Cpu_deviation: cpu_deviations,
		Memory_app_useage: Memory_useage, Memory_app_deviation: Memory_deviations, Memory_app_time: Memory_time,
		Gpu_app_useage: gpuMetric_useage, Gpu_app_deviation: gpuMetric_deviations, Gpu_app_time: gpuMetric_time,
		Uploaddata_app_useage: Uploaddata_useage, Uploaddata_app_deviation: Uploaddata_deviations, Uploaddata_app_time: Uploaddata_time,
		Downloadddata_app_useage: Downloadddata_useage, Downloadddata_app_deviation: Downloadddata_deviations, Downloadddata_app_time: Downloadddata_time,
		CPUCores_app_useage: CPUCores_useage, CPUCores_app_deviation: CPUCores_deviations, CPUCores_app_time: CPUCores_time,
		Power_app_useage: power_useage, Power_app_deviation: power_deviations, Power_time: power_time,
		Apppower_app_useage: Apppower_useage, Apppower_app_deviation: Apppower_deviations, Apppower_time: Apppower_time,
		Avgfps_app_useage: AvgMedianFPS_useage, Avgfps_app_deviation: AvgMedianFPS_deviations, Avgfps_time: AvgMedianFPS_time}

	human2 = append(human2, result)
	fmt.Println("myyyyyyyyyyyyyyyyyyyyyyyy")
	fmt.Println(human2) // {"Name":"Bob","Age":10,"Active":true}

	valsss = "Avg. Median FPS Usage : " + res2

	return valsss

}
func ParseLeadingInt(s string) (int64, error) {
	s = leadingInt.FindString(s)
	if s == "" { // add this if you don't want error on "xx" etc
		return 0, nil
	}
	return strconv.ParseInt(s, 10, 64)
}

func deviceinfonew() (val string) {

	var (
		port = flag.Int("p", adb.AdbPort, "")

		client *adb.Adb
	)

	flag.Parse()
	var err error
	client, err = adb.NewWithConfig(adb.ServerConfig{
		Port: *port,
	})
	if err != nil {
		log.Fatal(err)
	}
	client.StartServer()

	// serverVersion, err := client.ServerVersion()
	// if err != nil {
	//     log.Fatal(err)
	// }
	devices, err := client.ListDevices()
	if err != nil {
		log.Fatal(err)
	}
	for _, device := range devices {
		// fmt.Printf("\t%+v\n", *device)
		devicename = device.Model
		deviceserial = device.Serial
	}

	return devicename

}

func getlogin() string {
	css = "./frontend/build/static/css/main.css"
	js = "./frontend/build/static/js/main.js"
	// fmt.Println(deviceinfonew())
	var appnamelist []string
	//fmt.Println(L.Appname())
	scanner := bufio.NewScanner(strings.NewReader(L.Appname()))
	for scanner.Scan() {
		res2 := strings.ReplaceAll(scanner.Text(), "package:", "")

		appnamelist = append(appnamelist, res2)
	}

	// fmt.Println(appnamelist)
	out, err := json.Marshal(appnamelist)
	if err != nil {
		panic(err)

	}

	return string(out)

}

func kBToMB(kB int) float64 {

	return toFixed(float64(kB)/1024, 2)
}

func bytesToMB(bytes int) float64 {

	return toFixed(float64(bytes)/(1024*1024), 2)
}

func round(num float64) int {
	return int(num + math.Copysign(0.5, num))
}

func toFixed(num float64, precision int) float64 {
	output := math.Pow(10, float64(precision))
	return float64(round(num*output)) / output
}

func main() {

	//values := map[string]string{"email": "gm@gmail.com", "password": "password"}

	//fmt.Println(apidata.Apihit(values))
	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "Gameon",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})

	app.Bind(basic)
	app.Bind(getlogin)
	app.Bind(mylogin)
	app.Bind(checkdevice)
	app.Bind(openapp)
	app.Bind(basiconfo)
	app.Bind(cpumetric)
	app.Bind(gpuMetric)
	app.Bind(memmetric)
	app.Bind(startscan)
	app.Bind(stopscan)
	app.Bind(Uploaddata)
	app.Bind(AndroidDownloadedData1)
	app.Bind(AndroidCPUCores1)
	app.Bind(powermetric)
	app.Bind(Apppowermetric)
	app.Bind(cpuarch)
	app.Bind(AvgMedianFPS)

	app.Run()

}
