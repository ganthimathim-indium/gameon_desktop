package lib

import (
	"fmt"
	"math"
	"os/exec"
	"runtime"
	"sort"
	"strconv"
	"strings"
)

// AppNameNew gets list of devices connected
func AppNameNew() (val string) {
	res2 := strings.ReplaceAll(string(run("devices")), "List of devices attached", "")

	final := strings.ReplaceAll(res2, "device", "")
	result1 := strings.ReplaceAll(final, " ", "")

	return result1
}

// AppName gets list of packages
func AppName() (val string) {
	run("shell", "cmd package list package -3")

	result1 := string(run("shell", "cmd package list package -3"))

	return result1
}

// AppOpen launches an app using its package name
func AppOpen(packageName string) (val string) {
	run("shell", "dumpsys gfxinfo "+packageName)

	result1 := string(run("shell", "monkey -p "+packageName+" -c android.intent.category.LAUNCHER 1"))

	return result1
}

// AppVersion returns the package version
func AppVersion(packageName string) (val string) {

	s := string(run("shell", "dumpsys package "+packageName+" | grep versionName"))
	if len(s) == 0 {
		return ""
	}

	i := strings.Split(s, "versionName=")[1]

	return i
}

// AndroidVersion returns the android version
func AndroidVersion() (val string) {

	res2 := strings.ReplaceAll(string(run("shell", "getprop ro.build.version.release")), "\r\n", "")

	return res2
}

// AppGPUUsage calculates GPU usage for given package
func AppGPUUsage(packageName string) (val string) {

	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AppGPUUsage error: %v\n", r)
			}
		}
	}()

	//sub := string(run("shell", "cat /proc/meminfo"))
	//ind := strings.Index(sub, "GPUTotalUsed:")
	//if ind == -1 {
	// return val
	//}
	//sub = sub[ind:]
	//sub = strings.Replace(sub, "GPUTotalUsed:", "", 1)
	//sub = strings.Replace(sub, "\t", "", -1)
	//sub = strings.TrimSpace(sub)
	//data := strings.Split(sub, " ")[0]
	//total, err := strconv.Atoi(data)
	//if err != nil {
	// return val
	//}
	sub := string(run("shell", "dumpsys meminfo"))
	ind := strings.Index(sub, "Tuning:")
	if ind == -1 {
		return val
	}
	sub = sub[ind:]
	//return sub
	//sub = strings.Replace(sub, "Tuning:", "", 1)
	//sub = strings.Replace(sub, "\t", "", -1)
	data := strings.Split(sub, " ")
	t := data[len(data)-2]
	t = strings.TrimSpace(t)
	//return t
	t = strings.Replace(t, "K", "", -1)
	t = strings.Replace(t, ",", "", -1)
	total, err := strconv.Atoi(t)
	if err != nil {
		return val
	}
	//return fmt.Sprintf("%d", total)
	s := string(run("shell", "dumpsys gfxinfo "+packageName))
	i := strings.Index(s, "Total GPU memory usage:")
	if i == -1 {
		return val
	}
	s = s[i:]
	s = strings.Replace(s, "Total GPU memory usage:", "", 1)
	e := strings.Index(s, "bytes")
	if e == -1 {
		return val
	}
	s = s[:e]
	ss := strings.Replace(s, "\n", "", -1)
	ss = strings.TrimSpace(ss)
	used, err := strconv.Atoi(ss)
	if err != nil {
		return val
	}
	val = fmt.Sprintf("%.2f", float64(used)/float64(total*10))
	return val
}

// AppMemoryUsage calculates memory usage for given package
func AppMemoryUsage(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AppMemoryUsage error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	s := string(run("shell", "dumpsys meminfo ", packageName))
	var result string
	v := strings.Index(s, "TOTAL")
	if v == -1 {
		return val
	}
	s = s[v:]
	s = strings.Replace(s, "TOTAL", "", -1)
	data := strings.Split(s, " ")
	for _, value := range data {

		if len(value) != 0 && value != " " {
			result = value
			break
		}
	}
	fmt.Println("Memory Usage: " + result)

	return result
}

// AppPowerUsage calculates power usage for given package
func AppPowerUsage(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AppPowerUsage error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	s := string(run("shell", "ps | grep ", packageName))
	if len(s) == 0 {
		return "0"
	}
	uid := strings.Split(s, " ")[0]
	if uid == "" {
		return "0"
	}
	uid = strings.Replace(uid, "_", "", -1)

	s = string(run("shell", "dumpsys batterystats ", packageName))

	uidIndex := strings.Index(s, fmt.Sprintf("UID %s: ", uid))
	if uidIndex == -1 {
		return "0"
	}
	s = s[uidIndex:]
	s = strings.Replace(s, fmt.Sprintf("UID %s: ", uid), "", 1)
	return strings.Split(s, " ")[0]
}

// AndroidCPUArch returns cpu architecture name
func AndroidCPUArch(packageName string) (val string) {

	s := string(run("shell", "getprop ro.product.cpu.abi"))

	return strings.Split(s, "-")[0]
}

// AndroidUploadedData calculates uploaded data for a package
func AndroidUploadedData(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidUploadedData error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	s1 := string(run("shell", "dumpsys package", packageName, " | grep userId="))
	userId := strings.Split(s1, "=")[1]
	userId = strings.Replace(userId, "\n", "", -1)
	s := string(run("shell", "dumpsys netstats detail ", userId))
	data := strings.Split(s, "uid=")
	result := 0
	for k, eachUID := range data {
		if k == 0 {
			continue // skip first
		}
		uid := eachUID[:strings.Index(eachUID, " ")]
		fmt.Println("UID: ", uid)

		if strings.Contains(eachUID, "tb=") {
			tbData := strings.Split(eachUID, "tb=")
			totalUploaded := 0
			for i, a := range tbData {
				if i == 0 {
					continue // skip first
				}
				uploaded := strings.Split(a, " ")[0]

				byt, _ := strconv.Atoi(uploaded)
				totalUploaded += byt
			}
			fmt.Println("Network: total uploaded-> ", totalUploaded)
			result += totalUploaded
		}
	}
	fmt.Println(result)

	return strconv.Itoa(result)
}

// AndroidDownloadedData calculates downloaded data for a package
func AndroidDownloadedData(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidDownloadedData error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)
	s1 := string(run("shell", "dumpsys package", packageName, " | grep userId="))
	userId := strings.Split(s1, "=")[1]
	userId = strings.Replace(userId, "\n", "", -1)

	s := string(run("shell", "dumpsys netstats detail ", userId))

	fmt.Println(s)
	//uidIndex := strings.Index(s, "uid=")
	//strings.Replace(s, "uid=", "", 1)
	data := strings.Split(s, "uid=")
	result := 0
	for k, eachUID := range data {
		if k == 0 {
			continue // skip first
		}
		uid := eachUID[:strings.Index(eachUID, " ")]
		fmt.Println("UID: ", uid)

		if strings.Contains(eachUID, "rb=") {
			tbData := strings.Split(eachUID, "rb=")
			totalDownloaded := 0
			for i, a := range tbData {
				if i == 0 {
					continue // skip first
				}
				downloaded := strings.Split(a, " ")[0]
				//fmt.Println("Network:stats downloaded->", downloaded)
				byt, _ := strconv.Atoi(downloaded)
				totalDownloaded += byt
			}
			fmt.Println("Network: total downloaded->", totalDownloaded)
			result += totalDownloaded
		}
	}

	return strconv.Itoa(result)

}

// AndroidCPUCores returns the number of CPU cores
func AndroidCPUCores(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidCPUCores error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	// shell command to get all processor information
	s := string(run("shell", "cat /proc/cpuinfo"))

	// this can also provide the count of cpu processors
	// but to be sure we need below calculation
	i := strings.Count(s, "processor")
	if i == -1 {
		return ""
	}
	s = strings.Replace(s, "processor", "", i-1)
	in := strings.Index(s, "processor")
	s = s[in:]
	s = strings.Replace(s, "processor", "", -1)
	s = strings.Replace(s, ":", "", -1)
	s = strings.TrimSpace(s)

	// last processor number gives the count
	data := strings.Split(s, "\n")[0]
	count, _ := strconv.Atoi(data)
	return strconv.Itoa(count + 1) // as processors use 0-based index +1 for total count
}

// Battery returns current battery percentage
func Battery(packageName string) (val string) {
	s := string(run("shell", "dumpsys battery "))
	i := strings.Index(s, "level: ")
	if i == -1 {
		return ""
	}
	s = s[i:]
	s = strings.Replace(s, "level: ", "", 1)
	return strings.Split(s, "\n")[0]

}

// AppCPUUsage returns CPU usage for a package
func AppCPUUsage(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AppCPUUsage error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	var result string
	s := string(run("shell", "ps | grep ", packageName))
	if len(s) == 0 {
		result = "0"
		s = string(run("shell", "dumpsys cpuinfo | grep ", packageName))
		data := strings.Split(s, " ")
		for _, value := range data {
			if strings.Contains(value, "%") {
				result = strings.Replace(value, "%", "", 1)
				result = strings.TrimSpace(result)
				break // we need only the first as other values are further distribution of this total value
			}
		}
		return result
	}
	// "grep" for linux and "findstr" for windows
	s = string(run("shell", "dumpsys cpuinfo | grep TOTAL"))
	//var result string
	data := strings.Split(s, " ")
	for _, value := range data {
		if strings.Contains(value, "%") {
			result = strings.Replace(value, "%", "", 1)
			result = strings.TrimSpace(result)
			break // we need only the first as other values are further distribution of this total value
		}
	}
	return result
}

// AndroidMedianFPS calcuates
func AndroidMedianFPS(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidMedianFPS error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)
	// var result string

	s := string(run("shell", "dumpsys display ", packageName, " | grep fps"))
	fs := s[strings.Index(s, "modeId"):]

	modeId := strings.Split(fs, " ")[1]

	modeId = strings.Replace(modeId, ",", "", -1)

	m := map[string]string{}

	for strings.Index(fs, "DisplayModeRecord") != -1 {

		mode := fs[strings.Index(fs, "DisplayModeRecord"):]
		fs = fs[strings.Index(fs, "DisplayModeRecord")+len("DisplayModeRecord"):]

		mode_id := mode[strings.Index(mode, "id="):]
		mode_id = strings.Replace(mode_id, "id=", "", -1)

		mode_id = strings.Split(mode_id, ",")[0]

		mode_fps := mode[strings.Index(mode, "fps="):]

		mode_fps = strings.Replace(mode_fps, "fps=", "", 1)

		val := strings.Split(mode_fps, ".")[0]

		m[mode_id] = val

	}
	var frames = "30"

	frames = m[modeId] // } else if fs == "2" {
	// 	frames = 60
	// }
	return frames

}

//fps stablity

func AndroidFPSStablity(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidFPSStablity error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)
	// var result string

	s := string(run("shell", "dumpsys display ", packageName, " | grep fps"))
	fs := s[strings.Index(s, "modeId"):]

	modeId := strings.Split(fs, " ")[1]

	modeId = strings.Replace(modeId, ",", "", -1)
	intVal, _ := strconv.Atoi(modeId)
	var frames = "0"

	if intVal == 2 {
		frames = "50"

	} else if intVal == 1 {
		frames = "100"
	}

	// m := map[string]string{}

	// for strings.Index(fs, "DisplayModeRecord") != -1 {

	// 	mode := fs[strings.Index(fs, "DisplayModeRecord"):]
	// 	fs = fs[strings.Index(fs, "DisplayModeRecord")+len("DisplayModeRecord"):]

	// 	mode_id := mode[strings.Index(mode, "id="):]
	// 	mode_id = strings.Replace(mode_id, "id=", "", -1)

	// 	mode_id = strings.Split(mode_id, ",")[0]

	// 	mode_fps := mode[strings.Index(mode, "fps="):]

	// 	mode_fps = strings.Replace(mode_fps, "fps=", "", 1)

	// 	val := strings.Split(mode_fps, ".")[0]

	// 	m[mode_id] = val

	// }

	//frames = m[modeId] // } else if fs == "2" {
	// 	frames = 60
	// }
	return frames

	// sec := s[strings.Index(s, "Stats since: "):]
	// sec = strings.Replace(sec, "Stats since: ", "", -1)
	// sec = sec[:strings.Index(sec, "ns")]
	// t, _ := strconv.Atoi(sec)
	// fmt.Println(t)

	// result = fmt.Sprintf("%.0f", (float64(frames)*1000000000/float64(t))*float64(100))

	// fmt.Println("Avg.  FPS Stablity   ", result)

	// return result

}

// AndroidDisplay returns the device display specification
func AndroidDisplay(packageName string) (val string) {
	return string(run("shell", "wm size | awk -e 'sub(/^.*: /, \"\")'"))
}

// AndroidNetwork returns the network info
func AndroidNetwork(packageName string) (val string) {
	var result string
	str := string(run("shell", "getprop gsm.network.type ", packageName))

	result = str
	fmt.Println(" Mobile network ", result)
	return result
}

// AndroidVariabilityIndex calculate Variability Index of frames generated in a second
func AndroidVariabilityIndex(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AndroidVariabilityIndex error: %v\n", r)
			}
		}
	}()
	fmt.Println(err)

	s := string(run("shell", "dumpsys gfxinfo ", packageName))

	sec := s[strings.Index(s, "Stats since: "):]
	sec = strings.Replace(sec, "Stats since: ", "", -1)
	sec = sec[:strings.Index(s, "ns")]
	//sec := ""
	//return sec
	//ns := strings.Replace(sec, "Stats since: ", "", -1)
	t, _ := strconv.Atoi(sec)
	//return strconv.Itoa(t)
	//index1 := strings.Index(s, "GPU HISTOGRAM: ")
	//index2 := strings.Index(s, "Pipeline=")
	//fpsData := s[index1:index2]
	//fpsData = strings.Replace(fpsData, "GPU HISTOGRAM: ", "", 1)
	//data := strings.Split(fpsData, " ")
	index1 := strings.Index(s, "HISTOGRAM: ")
	if index1 == -1 {
		return ""
	}
	index2 := strings.Index(s, "50th gpu percentile")
	if index2 == -1 {
		return ""
	}
	fpsData := s[index1:index2]
	fpsData = strings.Replace(fpsData, "HISTOGRAM: ", "", 1)
	data := strings.Split(fpsData, " ")

	var result int64
	var fps []int
	var ssss string
	//data := strings.Split(s, " ")
	for i, value := range data {
		//if strings.Contains(value, "%") {
		// result = strings.Replace(value, "%", "", 1)
		// result = strings.TrimSpace(result)
		// break // we need only the first as other values are further distribution of this total value
		//}
		d := strings.Split(value, "=")[1]
		di, _ := strconv.Atoi(d)
		if di != 0 {
			fps = append(fps, (di))
		}
		result += int64(di)
		data[i] = d
		ssss += d + " "
	}

	return fmt.Sprintf("%f", calculateVariance(fps, result, int64(t)))
}

func calculateVariance(data []int, sum, t int64) float64 {

	n := len(data)
	//n := 1000 * 1000
	//mean := float64(sum*1000000000) / float64(t*int64(n))
	sort.Ints(data)
	//summ := 0
	//for _, i := range data[:len(data)-2] {
	// summ += i
	//}
	mean := float64(sum) / float64(n)
	//s := (strconv.Itoa(int(mean)))
	//return s
	//return mean
	var result float64
	var val int
	small := float64(data[len(data)-1])
	for _, value := range data {
		//result += math.Pow(float64(int64(n)*value/t)-mean, 2)
		//if len(s) == len(strconv.Itoa(int(value))) {
		// result += math.Pow(float64(value)-mean, 2)
		//}
		//result += math.Pow(float64(value)-mean, 2)
		diff := math.Abs(float64(value) - mean)
		if small > diff {
			small = diff
			val = value
		}
	}
	result += math.Pow(float64(val)-mean, 2)

	return result / float64(n-1)
}

// AppPeakMemoryUsage calculates peak memory usage for given package
func AppPeakMemoryUsage(packageName string) (val string) {
	var err error
	val = "0"
	defer func() {
		if r := recover(); r != nil {
			var ok bool
			err, ok = r.(runtime.Error)
			if ok {
				fmt.Printf("AppMemoryUsage error: %v\n", r)
			}
		}
	}()

	s := string(run("shell", "top -n 1 | grep Mem"))
	s = strings.Split(s, "total")[0]
	s = strings.Replace(s, "Mem:", "", -1)
	s = strings.Replace(s, "K", "", -1)
	s = strings.Replace(s, "\t", "", -1)
	s = strings.TrimSpace(s) // in Kb
	total, err := strconv.Atoi(s)
	if err != nil {
		return val
	}

	var processId string
	s = string(run("shell", "ps | grep ", packageName))
	data := strings.Split(s, " ")
	for i, e := range data {
		if i == 0 {
			continue
		}
		if len(e) != 0 {
			processId = e
			break
		}
	}
	s = string(run("shell", "top -n 1 | grep ", processId))
	data = strings.Split(s, " ")
	counter := 0
	var usage string
	for _, e := range data {
		if len(e) != 0 {
			counter += 1
			if counter == 10 {
				usage = e
				break
			}
		}
	}

	u, err := strconv.ParseFloat(usage, 64)
	if err != nil {
		return val
	}
	return fmt.Sprintf("%.2f", (u*float64(total))/float64(100)) // this is in Kb
}

// run forms the shell command by joining passed arguments,
// executes it
// and returns the result
func run(args ...string) (array []byte) {

	cmd := exec.Command("adb", args...)
	stdout1, err := cmd.Output()

	if err != nil {
		fmt.Printf("FAILED: adb %s: %v", strings.Join(args, " "), err)
		return []byte(err.Error())
	} else {
		return stdout1
	}
}
