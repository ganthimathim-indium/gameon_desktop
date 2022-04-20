package lib

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"
)

func Appnamenew() (val string) {
	//run("devices")
	res2 := strings.ReplaceAll(string(run("devices")), "List of devices attached", "")

	final := strings.ReplaceAll(res2, "device", "")
	result1 := strings.ReplaceAll(final, " ", "")

	return result1

}

func Appname() (val string) {
	run("shell", "cmd package list package -3")

	result1 := string(run("shell", "cmd package list package -3"))

	return result1

}

func Appopen(appnames string) (val string) {
	run("shell", "dumpsys gfxinfo "+appnames)

	result1 := string(run("shell", "monkey -p "+appnames+" -c android.intent.category.LAUNCHER 1"))

	return result1

}

func Appversion(pack string) (val string) {

	s := string(run("shell", "dumpsys package "+pack+" | grep versionName"))

	i := strings.Split(s, "versionName=")[1]
	// if i == -1 {
	// 	return ""
	// }
	// s = s[i:]
	// s = strings.Replace(s, "level: ", "", 1)
	// return strings.Split(s, "\n")[0]
	return i
	//result1 := string(run("shell", "getprop ro.build.version.sdk"))
	// res2 := strings.ReplaceAll(string(run("shell", "dumpsys package "+pack+" | findstr versionName")), "\r\n", "")

	// return res2

}

func Androidversionapp() (val string) {
	run("shell", "getprop ro.build.version.release")

	res2 := strings.ReplaceAll(string(run("shell", "getprop ro.build.version.release")), "\r\n", "")

	return res2

}
func Androidgpuuseage(names string) (val string) {
	s := strings.Index(string(run("shell", "dumpsys gfxinfo "+names)), "Total GPU memory usage:")
	if s == -1 {
		return
	}
	s += len("Total GPU memory usage:")
	e := strings.Index(string(run("shell", "dumpsys gfxinfo "+names))[s:], "bytes")
	if e == -1 {
		return
	}
	e += s + e - 1
	return string(run("shell", "dumpsys gfxinfo "+names))[s:e]

	//	return string(run("shell", "dumpsys gfxinfo "+names))

}
func AndroidMemoryUsage(names string) (val string) {
	s := string(run("shell", "dumpsys meminfo ", names))
	var result string
	v := strings.Index(s, "TOTAL")
	s = s[v:]
	s = strings.Replace(s, "TOTAL", "", -1)
	data := strings.Split(s, " ")
	for _, value := range data {

		if len(value) != 0 && value != " " {
			result = value
			break
		}
	}
	fmt.Println("mydata" + result)

	return result

}
func AndroidAppPowerUsage(names string) (val string) {

	s := string(run("shell", "ps | findstr ", names))

	if len(s) == 0 {
		return "0"
	}
	uid := strings.Split(s, " ")[0]
	if uid == "" {
		return "0"
	}
	uid = strings.Replace(uid, "_", "", -1)

	s = string(run("shell", "dumpsys batterystats ", names))

	uidIndex := strings.Index(s, fmt.Sprintf("UID %s: ", uid))
	if uidIndex == -1 {
		return "0"
	}
	s = s[uidIndex:]
	s = strings.Replace(s, fmt.Sprintf("UID %s: ", uid), "", 1)
	return strings.Split(s, " ")[0]

	//uidIndex := strings.Index(s, fmt.Sprintf("Computed drain: "))
	//s = s[uidIndex:]
	//s = strings.Replace(s, fmt.Sprintf("Computed drain: "), "", 1)
	//return strings.Split(s, ", ")[0]
}
func Androidcpuarch(names string) (val string) {

	return string(run("shell", "getprop ro.product.cpu.abi"))

}
func AndroidUploadedData(names string) (val string) {
	//uuid := Appnamenew()

	s := string(run("shell", "dumpsys netstats detail ", names))
	//data := strings.Split(s, "\n")
	//s = `ident=[{type=17, subType=0, metered=true, defaultNetwork=true, oemManaged=0}] uid=10329 set=DEFAULT tag=0xffffff82
	//  NetworkStatsHistory: bucketDuration=7200
	//    st=1649080800 rb=127 rp=1 tb=63 tp=1 op=0
	//    st=1649174400 rb=704 rp=5 tb=334 tp=5 op=0
	//ident=[{type=17, subType=0, metered=true, defaultNetwork=true, oemManaged=0}] uid=10330 set=DEFAULT tag=0xffffff82
	//  NetworkStatsHistory: bucketDuration=7200
	//    st=1648915200 rb=141 rp=1 tb=61 tp=1 op=0
	//ident=[{type=17, subType=0, metered=true, defaultNetwork=true, oemManaged=0}] uid=10331 set=DEFAULT tag=0xffffff82
	//  NetworkStatsHistory: bucketDuration=7200
	//    st=1648836000 rb=169 rp=1 tb=65 tp=1 op=0
	//ident=[{type=17, subType=0, metered=true, defaultNetwork=true, oemManaged=0}] uid=10334 set=DEFAULT tag=0xffffff82
	//  NetworkStatsHistory: bucketDuration=7200
	//    st=1649080800 rb=89 rp=1 tb=73 tp=1 op=0`

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

		if strings.Contains(eachUID, "tb=") {
			tbData := strings.Split(eachUID, "tb=")
			totalUploaded := 0
			for i, a := range tbData {
				if i == 0 {
					continue // skip first
				}
				uploaded := strings.Split(a, " ")[0]
				//fmt.Println("Network:stats uploaded->", uploaded)
				byt, _ := strconv.Atoi(uploaded)
				totalUploaded += byt
			}
			fmt.Println("Network: total uploaded->", totalUploaded)
			result += totalUploaded
		}
	}

	return strconv.Itoa(result)

}

func AndroidDownloadedData(names string) (val string) {

	s := string(run("shell", "dumpsys netstats detail ", names))

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

func AndroidCPUCores(names string) (val string) {

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

func Battery(names string) (val string) {
	s := string(run("shell", "dumpsys battery "))
	i := strings.Index(s, "level: ")
	if i == -1 {
		return ""
	}
	s = s[i:]
	s = strings.Replace(s, "level: ", "", 1)
	return strings.Split(s, "\n")[0]

}

func AndroidCPUUsage(names string) (val string) {

	// "grep" for linux and "findstr" for windows
	s := string(run("shell", "dumpsys cpuinfo | grep ", names))
	var result string
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

// Avg. Median FPS Usage

func AndroidMedianFPS(names string) (val string) {

	var result string
	var result1 string

	s := string(run("shell", "dumpsys display ", names))

	i := strings.Index(s, "fps=")

	a := s[i:]

	data := strings.Split(a, " ")[0]

	s1 := strings.Replace(data, "fps=", "", 1)

	result1 = strings.Replace(s1, "}]", "", -1)
	result = strings.Replace(result1, ",", "", -1)

	fmt.Println("Avg. Median FPS Usage Data ", result)

	return result

}

// func Androidcpuuseage(names string) (val string) {
// 	//run("shell", "getprop ro.build.version.release")
// 	//run("shell", "dumpsys gfxinfo "+names)

// 	//	res2 :=run("shell", "dumpsys gfxinfo " +val)

// 	s := strings.Index(string(run("shell", "top -n 1")), "Mem:")
// 	if s == -1 {
// 		return
// 	}
// 	s += len("Mem:")
// 	e := strings.Index(string(run("shell", "top -n 1"))[s:], "total")
// 	if e == -1 {
// 		return
// 	}
// 	e += s + e - 1
// 	return string(run("shell", "top -n 1"))[s:e]

// 	//	return string(run("shell", "dumpsys gfxinfo "+names))

// }

// adb shell dumpsys netstats detail

func run(args ...string) (array []byte) {

	cmd := exec.Command("adb", args...)
	stdout1, err := cmd.Output()

	if err != nil {
		fmt.Printf("FAILED: adb %s: %v", strings.Join(args, " "), err)
		return ([]byte(err.Error()))

	} else {
		fmt.Print(string(stdout1))
		return (stdout1)

	}
}
