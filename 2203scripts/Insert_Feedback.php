<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	 
	$title = $obj['title'];
	$username = $obj['username'];
	$description = $obj['description'];
	 
	 // Creating SQL query and insert the record into MySQL database table.
	$Sql_Query = "insert into feedback (title,username,description) values ('$title','$username','$description')";
	 
 
	if(mysqli_query($con,$Sql_Query)){
		// If the record inserted successfully then show the message as response. 
		$MSG = 'Your feedback has been sent. Thank you for your time!' ;

		// Converting the message into JSON format.
		$json = json_encode($MSG);

		// Echo the message on screen.
		// We would also show this message on our app.
		echo $json ;
	 }
	else{
		echo 'Something Went Wrong';
	}
	mysqli_close($con);
?>