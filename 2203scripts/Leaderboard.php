<?php
	include 'DBConfig.php';
	$conn = new mysqli($HostName, $HostUser, $HostPass, $DatabaseName);
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT username, total_points, avatar, FIND_IN_SET(total_points, (SELECT GROUP_CONCAT(total_points ORDER BY total_points DESC) FROM profile)) AS rank FROM profile ORDER BY total_points DESC";
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
