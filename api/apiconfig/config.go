package apiconfig

var apimain string

func API(apinew string) (val string) {

	apimain = "http://127.0.0.1:3000/"
	return apimain + apinew
}
