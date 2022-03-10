package lib

import (
	"fmt"
	"os/exec"
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
	run("shell", "cmd package list package")

	result1 := string(run("shell", "cmd package list package"))

	return result1

}

func Appopen(appnames string) (val string) {
	run("shell", "dumpsys gfxinfo "+appnames)

	result1 := string(run("shell", "monkey -p "+appnames+" -c android.intent.category.LAUNCHER 1"))

	return result1

}

func Appversion() (val string) {
	run("shell", "getprop ro.build.version.sdk")

	//result1 := string(run("shell", "getprop ro.build.version.sdk"))
	res2 := strings.ReplaceAll(string(run("shell", "getprop ro.build.version.sdk")), "\r\n", "")

	return res2

}

func Androidversionapp() (val string) {
	run("shell", "getprop ro.build.version.release")

	res2 := strings.ReplaceAll(string(run("shell", "getprop ro.build.version.release")), "\r\n", "")

	return res2

}
func Androidgpuuseage(names string) (val string) {
	//run("shell", "getprop ro.build.version.release")
	run("shell", "dumpsys gfxinfo "+names)

	//	res2 :=run("shell", "dumpsys gfxinfo " +val)

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

func Androidcpuuseage(names string) (val string) {
	//run("shell", "getprop ro.build.version.release")
	//run("shell", "dumpsys gfxinfo "+names)

	//	res2 :=run("shell", "dumpsys gfxinfo " +val)

	s := strings.Index(string(run("shell", "top -n 1")), "Mem:")
	if s == -1 {
		return
	}
	s += len("Mem:")
	e := strings.Index(string(run("shell", "top -n 1"))[s:], "total")
	if e == -1 {
		return
	}
	e += s + e - 1
	return string(run("shell", "top -n 1"))[s:e]

	//	return string(run("shell", "dumpsys gfxinfo "+names))

}

func Androidmemoryuseage(names string) (val string) {
	//run("shell", "getprop ro.build.version.release")
	//run("shell", "dumpsys gfxinfo "+names)

	//	res2 :=run("shell", "dumpsys gfxinfo " +val)

	s := strings.Index(string(run("shell", "top -O PR -bn1")), "Mem:")
	if s == -1 {
		return
	}
	s += len("Mem:")
	e := strings.Index(string(run("shell", "top -O PR -bn1"))[s:], "total")
	if e == -1 {
		return
	}
	e += s + e - 1
	return string(run("shell", "top -O PR -bn1"))[s:e]

	//	return string(run("shell", "dumpsys gfxinfo "+names))

}

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
