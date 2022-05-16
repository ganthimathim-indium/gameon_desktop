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
	"regexp"
	"strconv"
	"time"

	"strings"

	"github.com/wailsapp/wails"

	adb "github.com/zach-klippenstein/goadb"
)

var js string
var css string
var deviceName string
var deviceSerial string
var human2 []results

var leadingInt = regexp.MustCompile(`^[-+]?\d+`)
var ticker time.Ticker
var timeData string

var cpuUsage string
var cpuDeviations string
var cpuTime string

var memoryUsage string
var memoryDeviations string
var memoryTime string

var gpuMetricUsage string
var gpuMetricDeviations string
var gpuMetricTime string

var uploadDataUsage string
var uploadDataDeviations string
var uploadDataTime string

var downloadDataUsage string
var downloadDataDeviations string
var downloadDataTime string

var CPUCoresUsage string
var CPUCoresDeviations string
var CPUCoresTime string

var powerUsage string
var powerDeviations string
var powerTime string

var appPowerUsage string
var appPowerDeviations string
var appPowerTime string

var avgMedianFPSUsage string
var avgMedianFPSDeviations string
var avgMedianFPSTime string

var StablityFpsAppUsage1 string
var StablityFpsAppDeviation1 string
var StablityFpsTime1 string

var PeakMemoryAppUsage1 string
var PeakMemoryAppDeviation1 string
var PeakMemoryAppTime1 string

var deviceInfo string

type AppInfo struct {
	OSName     string `json:"osname"`
	DeviceName string `json:"deviceName"`
	AppList    string `json:"applist"`
}

type FpsInfo struct {
	Median_fps   string `json:"median_fps"`
	Fps_stablity string `json:"fps_stablity"`
}

type BaseInfo struct {
	StartTime      string `json:"start_time"`
	RecordDuration string `json:"total_duration"`
	DeviceId       string `json:"device_id"`
	DeviceName     string `json:"device_name"`
	AndroidVersion string `json:"android_version"`
	VersionName    string `json:"version_name"`
	AppName        string `json:"app_name"`
}

type ResponseInfo struct {
	StartTime      string `json:"start_time"`
	AppName        string `json:"app_name"`
	DeviceName     string `json:"device_name"`
	VersionName    string `json:"version_name"`
	TotalDuration  string `json:"total_duration"`
	DeviceId       string `json:"device_id"`
	AndroidVersion string `json:"android_version"`
	Dataval        string `json:"results"`
}

type StartData struct {
	StartTime      string `json:"start_time"`
	AppName        string `json:"app_name"`
	DeviceName     string `json:"device_name"`
	VersionName    string `json:"version_name"`
	DeviceId       string `json:"device_id"`
	AndroidVersion string `json:"android_version"`
}

type MyStop struct {
	EndTime       string    `json:"end_time"`
	Result        []results `json:"results"`
	SessionID     string    `json:"sessionID"`
	SessionUserID string    `json:"sessionUserID"`
	UserRole      string    `json:"userRole"`
	DeviceId      string    `json:"device_id"`
	Sessionname   string    `json:"sessionname"`
	Totaltime     string    `json:"totaltime"`
}

type results struct {
	CpuAppUsage  string `json:"cpu_app_usage"`
	CpuTimeVal   string `json:"cpuTime"`
	CpuDeviation string `json:"cpu_deviation"`

	MemoryAppUsage     string `json:"memory_app_useage"`
	MemoryAppDeviation string `json:"memory_app_deviation"`
	MemoryAppTime      string `json:"memory_app_time"`

	GpuAppUsage     string `json:"gpu_app_useage"`
	GpuAppDeviation string `json:"gpu_app_deviation"`
	GpuAppTime      string `json:"gpu_app_time"`

	UploadDataAppUsage     string `json:"uploaddata_app_useage"`
	UploadDataAppDeviation string `json:"uploaddata_app_deviation"`
	UploadDataAppTime      string `json:"uploaddata_app_time"`

	DownloadDataAppUsage     string `json:"downloadddata_app_useage"`
	DownloadDataAppDeviation string `json:"downloadddata_app_deviation"`
	DownloadDataAppTime      string `json:"downloadddata_app_time"`

	CpuCoresAppUsage     string `json:"cpucores_app_useage"`
	CpuCoresAppDeviation string `json:"cpucores_app_deviation"`
	CpuCoresAppTime      string `json:"cpucores_app_time"`

	PowerAppUsage     string `json:"power_app_useage"`
	PowerAppDeviation string `json:"power_app_deviation"`
	PowerTime         string `json:"power_app_time"`

	AppPowerAppUsage     string `json:"apppower_app_useage"`
	AppPowerAppDeviation string `json:"apppower_app_deviation"`
	AppPowerTime         string `json:"apppower_app_time"`

	AvgFpsAppUsage     string `json:"avgfps_app_useage"`
	AvgFpsAppDeviation string `json:"avgfps_app_deviation"`
	AvgFpsTime         string `json:"avgfps_app_time"`

	StablityFpsAppUsage     string `json:"stablityfps_app_useage"`
	StablityFpsAppDeviation string `json:"stablityfps_app_deviation"`
	StablityFpsTime         string `json:"stablityfps_app_time"`

	PeakMemoryAppUsage     string `json:"peakmemory_app_useage"`
	PeakMemoryAppDeviation string `json:"peakmemory_app_deviation"`
	PeakMemoryAppTime      string `json:"peakmemory_app_time"`
}

// 1
// login api
func myLogin(req string) (val string) {
	sec := map[string]string{}
	if err := json.Unmarshal([]byte(req), &sec); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}

	return apidata.ApiHit(sec)
}

// 2
// check device
func checkDevice() (val string) {

	if len(strings.TrimSpace(L.AppNameNew())) == 0 {
		fmt.Println("No Device Attached")

		return "No Device Attached"
	} else {
		fmt.Println("Device Attached")

		return "Device Attached"
	}
}

//3 basic info
func basic() string {

	css = "./frontend/build/static/css/main.css"

	js = "./frontend/build/static/js/main.js"

	var clients []AppInfo
	fmt.Println("deviceInfo:   ", deviceInfo)
	if len(deviceInfo) == 0 {
		deviceInfo = deviceInfoNew()
	}

	var info = append(clients, AppInfo{
		OSName:     "android",
		DeviceName: deviceInfo,
		AppList:    getLogin(),
	})

	out, err := json.Marshal(info)
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}
	fmt.Println(string(out))
	return string(out)
}

// 4 open app
func openApp(appName string) (val string) {

	return L.AppOpen(appName)
}

// basic information
func basicInfo(appInfoData string) (val string) {

	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appInfoData), &sec); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}
	fmt.Println(appInfoData)

	//value := sec["id"]
	appname := sec["appname"]
	token := sec["token"]
	fmt.Println(token)

	fmt.Println("app:" + L.AppVersion(appname))

	//var clientss []BaseInfo
	p := BaseInfo{
		DeviceName:     deviceName,
		DeviceId:       deviceSerial,
		AndroidVersion: L.AppVersion(appname),
		StartTime:      "15:25:34",
		VersionName:    L.AndroidVersion(),
		AppName:        appname,
		RecordDuration: "06:00",
	}

	modifiedBytes, _ := json.Marshal(p)
	fmt.Println(string(modifiedBytes))

	// Unmarshal or Decode the JSON to the interface.

	sec1 := map[string]string{}
	if err := json.Unmarshal([]byte(string(modifiedBytes)), &sec1); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}
	fmt.Println(sec1)

	apidata.ApiHitInfo(sec1, token)
	return apidata.ApiHitInfo(sec1, token)

}

// start scan
func startScan(appNameTest string, valData string) (val string) {
	//go heartBeat(appNameTest)

	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appNameTest), &sec); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}
	fmt.Println(appNameTest)

	//value := sec["id"]
	appName := sec["appname"]
	token := sec["token"]

	currentTime := time.Now()

	//do stuff

	fmt.Println(human2)
	out7, err := json.Marshal(human2)
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}
	fmt.Println("myvvv" + string(out7))

	out5, err := json.Marshal(StartData{
		StartTime:      currentTime.Format("3:4:5 pm"),
		AppName:        appName,
		VersionName:    L.AndroidVersion(),
		DeviceName:     deviceName,
		DeviceId:       deviceSerial,
		AndroidVersion: L.AppVersion(appName),
	})
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}

	// Unmarshal or Decode the JSON to the interface.
	sec5 := map[string]string{}
	if err := json.Unmarshal([]byte(string(out5)), &sec5); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}

	human2 = nil

	return apidata.ApiHitStart(sec5, token)
}

// stop scan
func stopScan(appInfoData string, valData string) (val string) {
	sec := map[string]string{}
	if err := json.Unmarshal([]byte(appInfoData), &sec); err != nil {
		return fmt.Sprintf("error while unmarshalling data: %v", err)
	}
	fmt.Println(appInfoData)

	currentTime := time.Now()

	token := sec["token"]
	id := sec["id"]
	avgtime := sec["Avg_time"]
	sessiondata := sec["sessionname"]

	userRole := sec["userRole"]

	sessionId := sec["session_id"]

	out5, err := json.Marshal(MyStop{
		Result:        human2,
		EndTime:       currentTime.Format("3:4:5 pm"),
		SessionID:     sessionId,
		SessionUserID: id,
		UserRole:      userRole,
		DeviceId:      deviceSerial,
		Sessionname:   sessiondata,
		Totaltime:     avgtime,
	})
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}

	var valsss string

	valsss = apidata.ApiHitStop(out5, token)
	return valsss

}

// 1. cpu metric
func cpuMetric(appNames string) (val string) {
	res2 := L.AppCPUUsage(appNames)

	var valsss string
	currentTime := time.Now()
	cpuUsage = ""
	cpuDeviations = ""
	cpuTime = ""
	cpuUsage = L.AppCPUUsage(appNames)
	cpuDeviations = "Mainactivity"
	cpuTime = currentTime.Format("3:4:5 pm")

	valsss = "Total CPU Useage : " + res2
	return valsss

}

// 2. memory metric
func memoryMetric(appNames string) (val string) {
	res2 := L.AppMemoryUsage(appNames)

	var valsss string
	var valsss1 string

	var valss string
	valss = strings.TrimSpace(res2)
	intVar, err := strconv.Atoi(strings.TrimSpace(valss))
	if err != nil {
		return fmt.Sprintf("error in data conversion: %v", err)
	}

	fmt.Println(intVar)
	valsss = fmt.Sprintf("Total Memory Usage : %v ", kBToMB(intVar))
	valsss1 = fmt.Sprintf("%v", kBToMB(intVar))

	memoryUsage = ""
	memoryDeviations = ""
	memoryTime = ""
	memoryUsage = valsss1
	memoryDeviations = "Mainactivity"
	currentTime := time.Now()

	memoryTime = currentTime.Format("3:4:5 pm")

	return valsss
}

// 3. gpuMetric
// func gpuMetric(appNames string) (val string) {
// 	L.AppGPUUsage(appNames)
// 	res2 := L.AppGPUUsage(appNames)
// 	res2 = strings.Split(res2, ",")[1]
// 	res2 = strings.TrimSpace(res2)

// 	gpuMetricUsage = ""
// 	gpuMetricDeviations = ""
// 	gpuMetricTime = ""
// 	gpuMetricUsage = res2
// 	gpuMetricDeviations = "Mainactivity"
// 	currentTime := time.Now()

// 	gpuMetricTime = currentTime.Format("3:4:5 pm")

// 	value := "Total Gpu Usage : " + res2
// 	return value

// }

// 3. gpuMetric
func gpuMetric(appNames string) (val string) {
	//L.AppGPUUsage(appNames)
	res2 := L.AppGPUUsage(appNames)

	gpuMetricUsage = ""
	gpuMetricDeviations = ""
	gpuMetricTime = ""
	gpuMetricUsage = res2
	gpuMetricDeviations = "Mainactivity"
	currentTime := time.Now()

	gpuMetricTime = currentTime.Format("3:4:5 pm")

	value := "Total Gpu Usage : " + res2
	return value
}

// 4. upload data
func uploadData(appName string) (val string) {
	res2 := L.AndroidUploadedData(appName)

	var valsss string

	intVar, _ := strconv.Atoi(res2)

	valsss = fmt.Sprintf("Total Data Uploaded : %.2f", bytesToMB(intVar))

	var valsss1 string

	valsss1 = fmt.Sprintf("%.2f", bytesToMB(intVar))

	uploadDataUsage = ""
	uploadDataDeviations = ""
	uploadDataTime = ""
	uploadDataUsage = valsss1
	uploadDataDeviations = "Mainactivity"
	currentTime := time.Now()

	uploadDataTime = currentTime.Format("3:4:5 pm")

	return valsss

}

// 5. download data
func downloadedData(appName string) (val string) {
	res2 := L.AndroidDownloadedData(appName)

	var valsss string
	intVar, _ := strconv.Atoi(res2)

	valsss = fmt.Sprintf("Total Download data : %.2f", bytesToMB(intVar))

	var valsss1 string

	valsss1 = fmt.Sprintf("%.2f", bytesToMB(intVar))

	downloadDataUsage = ""
	downloadDataDeviations = ""
	downloadDataTime = ""
	downloadDataUsage = valsss1
	downloadDataDeviations = "Mainactivity"
	currentTime := time.Now()

	downloadDataTime = currentTime.Format("3:4:5 pm")

	return valsss
}

// 6. cpu cores
func cpuCores(appNames string) (val string) {
	res2 := L.AndroidCPUCores(appNames)

	var valsss string
	valsss = "cpu Cores : " + res2

	CPUCoresUsage = ""
	CPUCoresDeviations = ""
	CPUCoresTime = ""
	CPUCoresUsage = res2
	CPUCoresDeviations = "Mainactivity"
	currentTime := time.Now()

	CPUCoresTime = currentTime.Format("3:4:5 pm")

	return valsss
}

// 7. power usage
func powerMetric(appNames string) (val string) {
	res2 := L.Battery(appNames)

	var valsss string
	valsss = "Total Battery Useage : " + res2

	powerUsage = ""
	powerDeviations = ""
	powerTime = ""
	powerUsage = res2
	powerDeviations = "Mainactivity"
	currentTime := time.Now()

	powerTime = currentTime.Format("3:4:5 pm")

	return valsss

}

// 8 App power metric
func appPowerMetric(appNames string) (val string) {
	L.AppPowerUsage(appNames)
	res2 := L.AppPowerUsage(appNames)
	fmt.Println("App usage" + res2)
	var valsss string
	valsss = "Total App Useage : " + res2

	appPowerUsage = ""
	appPowerDeviations = ""
	appPowerTime = ""
	appPowerUsage = res2
	appPowerDeviations = "Mainactivity"
	currentTime := time.Now()

	appPowerTime = currentTime.Format("3:4:5 pm")

	return valsss

}

// 9. CPU architecture
func cpuArch(appNames string) (val string) {
	L.AndroidCPUArch(appNames)
	res := L.AndroidCPUArch(appNames)
	var valsss string
	valsss = "CPU architecture : " + res

	return valsss
}

// 10 Avg. Median FPS Usage

func AvgFPSStablity(appName string) (val string) {
	// res2 := L.AndroidFPSStablity(appName)
	res2 := L.AndroidMedianFPS(appName)
	var valsss string

	intVal, _ := strconv.Atoi(res2)
	// var frames = "0"

	if intVal >= 70 {
		res2 = "100"

	} else if intVal < 60 {
		if intVal == 0 {
			res2 = "0"
		} else {
			res2 = "50"
		}

	}

	valsss = "Avg. FPS Stablity : " + res2

	StablityFpsAppUsage1 = ""
	StablityFpsAppDeviation1 = ""
	StablityFpsTime1 = ""
	StablityFpsAppUsage1 = res2
	StablityFpsAppDeviation1 = "Mainactivity"
	currentTime := time.Now()

	StablityFpsTime1 = currentTime.Format("3:4:5 pm")

	return valsss

}

func Peakmomery(appName string) (val string) {
	res2 := L.AppPeakMemoryUsage(appName)
	var valsss string

	var valsss1 string
	b2, _ := strconv.ParseFloat(res2, 64)
	fmt.Println(b2)
	var intVar int = int(b2)
	fmt.Println(intVar)

	fmt.Println(intVar)

	valsss = fmt.Sprintf("Avg. Peak Memory Useage Value : %v ", kBToMB(intVar))

	valsss1 = fmt.Sprintf("%v", kBToMB(intVar))

	PeakMemoryAppUsage1 = ""
	PeakMemoryAppDeviation1 = ""
	PeakMemoryAppTime1 = ""
	PeakMemoryAppUsage1 = valsss1
	PeakMemoryAppDeviation1 = "Mainactivity"
	currentTime := time.Now()

	PeakMemoryAppTime1 = currentTime.Format("3:4:5 pm")

	return valsss

}

func AvgMedianFPS(appName string) (val string) {

	res21 := L.AndroidMedianFPS(appName)

	var valsss11 string

	intVal1, _ := strconv.Atoi(res21)
	valsss11 = "0"

	if intVal1 >= 70 {
		valsss11 = "100"

	} else if intVal1 <= 60 {
		if intVal1 == 0 {
			valsss11 = "0"
		} else {
			valsss11 = "50"
		}

	}

	//valsss11 = "Avg. FPS Stablity : " + res21

	StablityFpsAppUsage1 = ""
	StablityFpsAppDeviation1 = ""
	StablityFpsTime1 = ""
	StablityFpsAppUsage1 = valsss11
	StablityFpsAppDeviation1 = "Mainactivity"
	currentTime1 := time.Now()

	StablityFpsTime1 = currentTime1.Format("3:4:5 pm")

	//return valsss11

	//	res2 := L.AndroidMedianFPS(appName)

	avgMedianFPSUsage = ""
	avgMedianFPSDeviations = ""
	avgMedianFPSTime = ""
	avgMedianFPSUsage = res21
	avgMedianFPSDeviations = "Mainactivity"
	currentTime := time.Now()

	avgMedianFPSTime = currentTime.Format("3:4:5 pm")

	result := results{
		CpuAppUsage: cpuUsage, CpuTimeVal: cpuTime, CpuDeviation: cpuDeviations,
		MemoryAppUsage: memoryUsage, MemoryAppDeviation: memoryDeviations, MemoryAppTime: memoryTime,
		GpuAppUsage: gpuMetricUsage, GpuAppDeviation: gpuMetricDeviations, GpuAppTime: gpuMetricTime,
		UploadDataAppUsage: uploadDataUsage, UploadDataAppDeviation: uploadDataDeviations, UploadDataAppTime: uploadDataTime,
		DownloadDataAppUsage: downloadDataUsage, DownloadDataAppDeviation: downloadDataDeviations, DownloadDataAppTime: downloadDataTime,
		CpuCoresAppUsage: CPUCoresUsage, CpuCoresAppDeviation: CPUCoresDeviations, CpuCoresAppTime: CPUCoresTime,
		PowerAppUsage: powerUsage, PowerAppDeviation: powerDeviations, PowerTime: powerTime,
		AppPowerAppUsage: appPowerUsage, AppPowerAppDeviation: appPowerDeviations, AppPowerTime: appPowerTime,
		AvgFpsAppUsage: avgMedianFPSUsage, AvgFpsAppDeviation: avgMedianFPSDeviations, AvgFpsTime: avgMedianFPSTime, StablityFpsAppUsage: StablityFpsAppUsage1, StablityFpsAppDeviation: StablityFpsAppDeviation1, StablityFpsTime: StablityFpsTime1,
		PeakMemoryAppUsage: PeakMemoryAppUsage1, PeakMemoryAppDeviation: PeakMemoryAppDeviation1, PeakMemoryAppTime: PeakMemoryAppTime1}

	human2 = append(human2, result)
	fmt.Println("myyyyyyyyyyyyyyyyyyyyyyyy")
	fmt.Println(human2) // {"Name":"Bob","Age":10,"Active":true}

	//valsss = "Avg. Median FPS Usage : " + res21

	var info = FpsInfo{
		Median_fps:   res21,
		Fps_stablity: valsss11,
	}

	out, err := json.Marshal(info)
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}

	fmt.Println(string(out))
	return string(out)

	//return valsss

}

// 11 display dimension
func display(appNames string) (val string) {
	L.AndroidDisplay(appNames)
	res := L.AndroidDisplay(appNames)

	var value string
	value = "display : " + res

	return value
}

// 12 Mobile Network
func mobileNetwork(appNames string) (val string) {
	L.AndroidNetwork(appNames)
	res := L.AndroidNetwork(appNames)
	var valsss string

	valsss = "Mobile Network : " + res
	return valsss
}

func ParseLeadingInt(s string) (int64, error) {
	s = leadingInt.FindString(s)
	if s == "" { // add this if you don't want error on "xx" etc
		return 0, nil
	}
	return strconv.ParseInt(s, 10, 64)
}

func deviceInfoNew() (val string) {

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
		//log.Fatal(err)
		return fmt.Sprintf("error while creating new adb client with config: %v", err)
	}
	client.StartServer()

	devices, err := client.ListDevices()
	if err != nil {
		return fmt.Sprintf("error in listing devices attached: %v", err)
	}
	for _, device := range devices {
		// fmt.Printf("\t%+v\n", *device)
		deviceName = device.Product
		deviceSerial = device.Serial
	}

	return deviceName

}

func getLogin() string {
	css = "./frontend/build/static/css/main.css"
	js = "./frontend/build/static/js/main.js"
	// fmt.Println(deviceInfoNew())
	var appnamelist []string
	//fmt.Println(L.AppName())
	scanner := bufio.NewScanner(strings.NewReader(L.AppName()))
	for scanner.Scan() {
		res2 := strings.ReplaceAll(scanner.Text(), "package:", "")

		appnamelist = append(appnamelist, res2)
	}

	// fmt.Println(appnamelist)
	out, err := json.Marshal(appnamelist)
	if err != nil {
		return fmt.Sprintf("error while marshalling data: %v", err)
	}

	return string(out)
}

func kBToMB(kB int) float64 {

	return toFixed(float64(kB)/1024, 2)
}

func bytesToMB(bytes int) float64 {

	return toFixed(float64(bytes)/(1024*1024), 2)
}

func kBToMiB(kB int) float64 {

	return toFixed(float64(kB)/(1024*1.024), 2)
}

func bytesToMiB(bytes int) float64 {

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
	css = "./frontend/build/static/css/main.css"

	js = "./frontend/build/static/js/main.js"

	//values := map[string]string{"email": "gm@gmail.com", "password": "password"}

	//fmt.Println(apidata.ApiHit(values))
	app := wails.CreateApp(&wails.AppConfig{
		Width:  1024,
		Height: 768,
		Title:  "Gameon",
		JS:     js,
		CSS:    css,
		Colour: "#131313",
	})

	app.Bind(basic)
	app.Bind(getLogin)
	app.Bind(myLogin)
	app.Bind(checkDevice)
	app.Bind(openApp)
	app.Bind(basicInfo)
	app.Bind(cpuMetric)
	app.Bind(gpuMetric)
	app.Bind(memoryMetric)
	app.Bind(startScan)
	app.Bind(stopScan)
	app.Bind(uploadData)
	app.Bind(downloadedData)
	app.Bind(cpuCores)
	app.Bind(powerMetric)
	app.Bind(appPowerMetric)
	app.Bind(cpuArch)
	app.Bind(AvgMedianFPS)
	app.Bind(AvgFPSStablity)
	app.Bind(Peakmomery)

	app.Run()

}
