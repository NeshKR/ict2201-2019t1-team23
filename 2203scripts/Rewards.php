<?php
	include 'DBConfig.php';
	$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT * FROM reward";
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		while($row[] = $result->fetch_assoc()) {
			$tem = $row;
			$output = json_encode($tem);
		}
	}
	echo $output;
	
	$conn->close();
?>
