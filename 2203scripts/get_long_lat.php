<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);

	//$sql = "SELECT * FROM profile where username='zhiying'";
	$sql = "SELECT * FROM map";
	$result = $conn->query($sql);

	if ($result->num_rows >= 1) 
	{
		// output data of each row
		while($row = $result->fetch_assoc()) {
			$user_long_lat = $row["latitude"]. "," . $row["longitude"];
		}
		// Converting the message into JSON format.
		$json = json_encode($user_long_lat);
		// Echo the message on screen.
		// We would also show this message on our app.
		echo $json ;
		$sql2 = "DELETE from map";
		$result2 = $conn->query($sql2);
	}
	else {
		echo "Long lat not found!";
	}
	$conn->close();

?>