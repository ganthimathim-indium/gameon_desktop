package apiconfig

var apiMain string

func API(apiNew string) (val string) {

	//apiMain = "http://35.83.46.51:3000/"
	// apiMain = "http://127.0.0.1:3000/"
	apiMain = "http://52.39.98.71:3000/"

	return apiMain + apiNew
}
