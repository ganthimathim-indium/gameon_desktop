package apiconfig

var apimain string

func API(apinew string) (val string) {

	apimain = "http://35.83.46.51:3000/"
	return apimain + apinew
}
