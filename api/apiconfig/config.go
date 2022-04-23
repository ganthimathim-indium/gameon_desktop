package apiconfig

var apimain string

func API(apinew string) (val string) {

	//apimain = "http://35.83.46.51:3000/"
	apimain = "http://127.0.0.1:3000/"
<<<<<<< HEAD
	// apimain = "http://52.39.98.71:3000/"
=======
	//apimain = "http://52.39.98.71:3000/"
>>>>>>> e6b424662d78f2fe9fe106a7f60e8272c5e8b814

	return apimain + apinew
}
