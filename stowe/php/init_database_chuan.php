<?php

// This file will initialize the mysql database and set up the necessary tables.

$conn;

function init() {
    	$servername = "localhost";
    	$username = "root";
    	$password = "root";
    	$dbname = "talentme_db";

    	// Create connection
    	$conn = mysqli_connect($servername, $username, $password);
    	// Check connection
    	if ($conn->connect_error) {
        	die("Connection failed: " . $conn->connect_error);
    	}

	// Select database
	$conn->select_db($dbname);

	/* return name of current default database */
	if ($result = $conn->query("SELECT DATABASE()")) {
    		$row = $result->fetch_row();
    		printf("Current database is %s.\n", $row[0]);
    		$result->close();
	}

	if ($row[0] != $dbname) {
		// Create database
    		$sql = "CREATE DATABASE " . $dbname;
    		if ($conn->query($sql) === TRUE) {
        		echo "Database created successfully";
    		} else {
        		echo "Error creating database: " . $conn->error;
    		}

    		// TODO create tables here ----
    		
	}

	$conn->close();
}

init();

?>
