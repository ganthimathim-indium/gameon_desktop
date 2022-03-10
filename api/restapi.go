package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	apiconfig "gameongo/api/apiconfig"
	"io/ioutil"
	"net/http"
)

type Response struct {
	Id           int    `json:"id"`
	Name         string `json:"name"`
	Password     string `json:"password"`
	Email        string `json:"email"`
	Phone_number int    `json:"phone_number"`
	Token        string `json:"token"`
	Created_at   string `json:"created_at"`
}

type Responseinfo struct {
	Message string `json:"message"`
	Status  string `json:"status"`
	Data    []data `json:"data"`
}

type data struct {
	Id              int    `json:"id"`
	Device_id       string `json:"device_id"`
	User_id         string `json:"user_id"`
	Device_name     string `json:"device_name"`
	Android_version string `json:"android_version"`
	Start_time      string `json:"start_time"`
	End_time        string `json:"end_time"`
	Version_name    string `json:"version_name"`
	App_name        string `json:"app_name"`
	Record_duration string `json:"record_duration"`
	Created_at      string `json:"created_at"`
}

func Apihit(val map[string]string) string {
	//(response Response)
	fmt.Println("Calling API...")
	client := &http.Client{}
	//values := map[string]string{"username": "vv", "password": "v"}

	jsonValue, _ := json.Marshal(val)

	req, err := http.NewRequest("POST", apiconfig.API("login"), bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Print(err.Error())
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		fmt.Print(err.Error())
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Print(err.Error())
	}

	//	var responseObject Response

	//	json.Unmarshal(bodyBytes, &responseObject)

	var responseObject Response

	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", responseObject.Name)
	out, err := json.Marshal(responseObject)
	if err != nil {
		panic(err)

	}

	fmt.Println(string(out))

	return string(string(out))

	// //return responseObject
	// if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
	// 	panic(err)

	// } else {
	// 	fmt.Printf("API Response as struct %+v\n", string(bodyBytes))

	// }

}

func Apihitinfo(val map[string]string) string {
	//(response Response)
	fmt.Println("Calling API...")
	client := &http.Client{}
	//values := map[string]string{"username": "vv", "password": "v"}

	jsonValue, _ := json.Marshal(val)

	req, err := http.NewRequest("POST", apiconfig.API("report/basic_info"), bytes.NewBuffer(jsonValue))
	if err != nil {
		fmt.Print(err.Error())
	}
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE2NDY0OTUzMDl9.JEeIos5hUv4e11hwEy8qVlw0pfi9gw3r5WnAKOq8BEw")
	resp, err := client.Do(req)
	if err != nil {
		fmt.Print(err.Error())
	}
	defer resp.Body.Close()
	bodyBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Print(err.Error())
	}

	fmt.Println(resp.StatusCode)
	//	var ddd string
	//	json.Unmarshal(bodyBytes, &ddd)
	// if err := json.Unmarshal(bodyBytes, &ddd); err != nil {
	// 	panic(err)
	// }
	// fmt.Printf("%+v\n", ddd) // fmt.Printf("%+v\n", responseObject.Status)

	var responseObject Responseinfo

	if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
		panic(err)
	}
	fmt.Printf("%+v\n", responseObject.Status)

	fmt.Println(responseObject.Status)
	out, err := json.Marshal(responseObject)
	if err != nil {
		panic(err)

	}

	return string(out)

	// //return responseObject
	// if err := json.Unmarshal(bodyBytes, &responseObject); err != nil {
	// 	panic(err)

	// } else {
	// 	fmt.Printf("API Response as struct %+v\n", string(bodyBytes))

	// }

}
