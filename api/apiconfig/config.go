package apiconfig

var apimain string

func API(apinew string) (val string) {

	apimain = "http://localhost:3000/"
	return apimain + apinew
}
