<?php

// This file will initialize the mysql database and set up the necessary tables.

function init () {
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

    /* Attempt to select 'talentme_db' as database.  If it does not exist, create it. */
    if ($conn->select_db($dbname)) { // select_db returns true if found, false if not found
        $result = $conn->query("SELECT DATABASE()");
        $row = $result->fetch_row();
        printf("Current database is %s.\n", $row[0]);
        $result->close();
    }
    else { // database $dbname not found, create a new one
        echo "No database by the name '$dbname' found. ";
        // Create database
        $sql = "CREATE DATABASE " . $dbname;
        if ($conn->query($sql) === TRUE) {
            echo "New database '$dbname' created successfully. ";
        } else {
            echo "Error creating database: " . $conn->error;
        }
    }

    // TODO create tables here ----

    $conn->close();
}

init();

?>
