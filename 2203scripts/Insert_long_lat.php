<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	 
	$longitude = $obj['longitude'];
	$latitude = $obj['latitude'];
	$name = $obj['name'];

	 // Creating SQL query and insert the record into MySQL database table.
	//$Sql_Query = "INSERT INTO map (latitude,longitude) VALUES ('$latitude','$longitude')";
	$Sql_Query = "INSERT INTO map (name,latitude,longitude) SELECT * FROM (SELECT '$name','$latitude','$longitude') AS tmp 
	WHERE NOT EXISTS (SELECT latitude,longitude FROM map WHERE latitude='$latitude' AND longitude='$longitude')";
	//$Sql_Query = "insert into map (longitude,latitude) values ('231231.3123','31231')";
	 
	if(mysqli_query($con,$Sql_Query)){
		// If the record inserted successfully then show the message as response. 
		$MSG = 'Your destination location has been saved. Thank you!';

		// Converting the message into JSON format.
		$json = json_encode($MSG);

		// Echo the message on screen.
		// We would also show this message on our app.
		echo $json;
	 }
	else{
		echo 'Something Went Wrong';
	}
	mysqli_close($con);
?>