<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	$conn = new mysqli($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	// Getting the received JSON into $json variable.
	$json = file_get_contents('php://input');
	 
	// decoding the received JSON and store into $obj variable.
	$obj = json_decode($json,true);
	$challenge_num = $obj['username'];

	$sql = "SELECT * FROM challenge where num='$challenge_num'";
	//$sql = "SELECT * FROM challenge where num='3'";
	$result = $conn->query($sql);

	if ($result->num_rows >= 1) 
	{
		while($row = $result->fetch_array())
		{	
			$challenge = $row["challenge_description"];
			//array_push($challenge,$challenge_item);
			$json = json_encode($challenge);
			echo $json;
			
		}
	}
	else {
		echo "Error!";
	}
	$conn->close();

?>