<?php
/**
 * Created by PhpStorm.
 * User: davidlindskog
 * Date: 2/26/16
 * Time: 3:54 PM
 */

// This file will initialize the mysql database and set up the necessary tables.

function createDb() {
    $servername = "localhost:8889";
    $username = "root";
    $password = "root";
    $dbname = "talentme_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Create database
    $sql = "CREATE DATABASE " . $dbname;
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
    }

    // TODO create tables here ----



    $conn->close();
}


createDb();


