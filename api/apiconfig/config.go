package apiconfig

var apimain string

func API(apinew string) (val string) {

	//apimain = "http://35.83.46.51:3000/"
	// apimain = "http://127.0.0.1:3000/"
	apimain = "http://52.39.98.71:3000/"

	return apimain + apinew
}
