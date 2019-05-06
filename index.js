const express = require('express')
const app = express()

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080

app.get('/', (req, res) => {
	var html = `
		
<!DOCTYPE html>
<html>
<head>
<title>Min sida!</title>
</head>
<script>


function calculate() {
	var first = document.getElementById(\'first\').value
	var second = document.getElementById(\'second\').value
	var answer = document.getElementById(\'answer\')

	answer.innerHTML = +first + +second + 1 // :)
}


</script>
<body>


	<input type="number" id="first"> + 
	<input type="number" id="second"> = 
	<label id="answer"  onclick="window.location=\'https://people.kth.se/~phistr/alltAnnat/PM.html\'"></label><br>
	
	
	<button onClick="calculate()">Calculate</button>

</body>
</html>

	`;
  res.send(html)})

app.listen(port)
console.log('Listening on port ' + port)
