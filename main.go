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

	"log"
	"strings"

	"github.com/wailsapp/wails"

	adb "github.com/zach-klippenstein/goadb"
)

var js string
var css string
var devicename string
var deviceserial string
var leadingInt = regexp.MustCompile(`^[-+]?\d+`)
var ticker time.Ticker
var timedata string

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
	if len(L.Appnamenew()) == 4 {
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

func basiconfo(appinfodata string) (val string) {
	basic()
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
	//fmt.Println(clients1)

	//var clientss []Baseinfo
	p := Baseinfo{
		Device_name:     devicename,
		Device_id:       deviceserial,
		Android_version: L.Appversion(),
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

type Responseinfo struct {
	start_time      string `json:"start_time"`
	app_name        string `json:"app_name"`
	device_name     string `json:"device_name"`
	version_name    string `json:"version_name"`
	total_duration  string `json:"total_duration"`
	device_id       string `json:"device_id"`
	android_version string `json:"android_version"`

	Data []results `json:"results"`
}

type results struct {
	cpu_app_usage    string `json:"cpu_app_usage"`
	avg_gpu_usage    string `json:"avg_gpu_usage"`
	memory_deviation string `json:"memory_deviation"`
	power_deviation  string `json:"power_deviation"`
	time             string `json:"time"`
	gpu_deviation    string `json:"gpu_deviation"`
	avg_memory_usage string `json:"avg_memory_usage"`
	avg_power_usage  string `json:"avg_power_usage"`
	cpu_deviation    string `json:"cpu_deviation"`
}

func startscan(appnamee_test string, valdata string) (val string) {
	boolValue, err := strconv.ParseBool(valdata)
	if err != nil {
		log.Fatal(err)
	}
	ticker := time.NewTicker(15 * time.Second)

	//fmt.Printf("%s: %t\n", v, boolValue)
	if boolValue == true {
		//quit := make(chan struct{})
		for {
			select {
			case <-ticker.C:
				currentTime := time.Now()
				t1 := time.Date(1984, time.November, 3, 13, 0, 0, 0, time.UTC)
				t2 := time.Date(1984, time.November, 3, 10, 23, 34, 0, time.UTC)

				hs := t1.Sub(t2).Hours()

				hs, mf := math.Modf(hs)
				ms := mf * 60

				ms, sf := math.Modf(ms)
				ss := sf * 60

				fmt.Println(hs, "hours", ms, "minutes", ss, "seconds")
				s := strconv.FormatFloat(hs, 'E', -1, 64)
				s1 := strconv.FormatFloat(ms, 'E', -1, 64)
				s2 := strconv.FormatFloat(ss, 'E', -1, 64)

				timedata = s + "hours" + s1 + "minutes" + s2 + "seconds"

				human2 := []results{results{cpu_app_usage: cpumetric(appnamee_test),
					avg_gpu_usage:    gpumetric(appnamee_test),
					memory_deviation: "Mainactivity",
					power_deviation:  "Mainactivity",
					gpu_deviation:    "Mainactivity",
					avg_memory_usage: memmetric(appnamee_test), avg_power_usage: memmetric(appnamee_test), cpu_deviation: "Mainactivity"}}

				human3 := Responseinfo{start_time: currentTime.Format("3:4:5 pm"), app_name: appnamee_test, device_name: devicename, version_name: L.Androidversionapp(), total_duration: timedata, device_id: deviceserial, android_version: L.Appversion(), Data: human2}
				fmt.Println(human3) // {"Name":"Bob","Age":10,"Active":true}

				// u, err := json.Marshal(human3)
				// if err != nil {
				// 	panic(err)
				// }
				//fmt.Println(string(u)) // {"Name":"Bob","Age":10,"Active":true}
				//fmt.Println()

				// do stuff
				// case <- quit:
				// 	ticker.Stop()
				//return string(human3.android_version)
				// }

			}
		}

	}

	return "Yes"

}

func stopscan(appnamee_test string, valdata string) (val string) {
	quit := make(chan struct{})

	//do stuff
	for {
		select {
		case <-quit:
			ticker.Stop()
			//return string(human3.android_version)
			return ""
		}
	}
}

func cpumetric(appnamess string) (val string) {
	L.Androidcpuuseage(appnamess)
	res2 := L.Androidcpuuseage(appnamess)
	lastByByte := res2[len(res2)-4:]
	var valsss string
	lastByByte1 := lastByByte[len(lastByByte)-1:]

	// intVar, err := strconv.ParseInt(lastByByte, 0, 8)
	// if err != nil {
	// 	fmt.Println(err)
	// }
	// value, err := strconv.ParseInt(lastByByte, 0, 64)
	// if err != nil {
	// 	panic(err)
	// }

	// u := (value / 100)
	// t := strconv.FormatInt(int64(u), 10)

	valsss = "Total Cpu Useage : " + lastByByte1 + " %"

	return valsss

}

func gpumetric(appnamess string) (val string) {
	L.Androidgpuuseage(appnamess)
	res2 := L.Androidgpuuseage(appnamess)
	lastByByte := res2[len(res2)-4:]
	var valsss string

	valsss = "Total Gpu Useage : " + lastByByte + " MB"

	return valsss

}

func memmetric(appnamess string) (val string) {
	L.Androidmemoryuseage(appnamess)
	res2 := L.Androidmemoryuseage(appnamess)
	lastByByte := res2[len(res2)-4:]
	var valsss string

	valsss = "Total Memory Useage : " + lastByByte + " MB"

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
	// 	log.Fatal(err)
	// }

	devices, err := client.ListDevices()
	if err != nil {
		log.Fatal(err)
	}
	for _, device := range devices {
		//	fmt.Printf("\t%+v\n", *device)
		devicename = device.Model
		deviceserial = device.Serial
	}

	return devicename

}

func getlogin() string {
	css = "./frontend/build/static/css/main.css"

	js = "./frontend/build/static/js/main.js"
	//	fmt.Println(deviceinfonew())
	var appnamelist []string
	//fmt.Println(L.Appname())
	scanner := bufio.NewScanner(strings.NewReader(L.Appname()))
	for scanner.Scan() {
		res2 := strings.ReplaceAll(scanner.Text(), "package:", "")

		appnamelist = append(appnamelist, res2)
	}

	//	fmt.Println(appnamelist)
	out, err := json.Marshal(appnamelist)
	if err != nil {
		panic(err)

	}

	return string(out)

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
	app.Bind(gpumetric)
	app.Bind(memmetric)
	app.Bind(startscan)
	app.Bind(stopscan)

	app.Run()

	//fmt.Println(values1)

	// fmt.Print(string(stdout1))
	//run("shell", "cmd package list package")
	//run("shell", "monkey -p com.google.android.play.games -c android.intent.category.LAUNCHER 1")
	//run("shell", "monkey -p com.google.android.play.games -c android.intent.category.LAUNCHER 1")
	//run("shell", "am force-stop com.google.android.play.games")
	//run("shell", "dumpsys gfxinfo com.google.android.play.games")

}
