<?php

// This file will initialize the mysql database and set up the necessary tables.

class TalentMeDB {
    private $conn = null;

    public function TalentMeDB () {
        $this->conn = $this->init();
    }

    public function close () {
        if ($this->conn != null) {
            $this->conn->close();
        }
    }

    private function init () {
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
            printf("Current database is %s.\n", $row[0] . "<br>");
            $result->close();
        }
        else { // database $dbname not found, create a new one
            echo "No database by the name '$dbname' found.<br>";
            // Create database
            $sql = "CREATE DATABASE " . $dbname;
            if ($conn->query($sql) === TRUE) {
                $conn->select_db($dbname);
                echo "New database '$dbname' created successfully.<br>";
            } else {
                echo "Error creating database: " . $conn->error;
            }
        }

        // TODO create tables here ----
        $this->createUserTable($conn);
        $this->createGroupTable($conn);
        $this->createUserGroupTable($conn);
        $this->createChatLineTable($conn);

        return $conn;
    }

    private function createUserTable (&$conn) {
        $strlen = 255;

        $sql = "CREATE TABLE UserTable (".
            "user_email VARCHAR($strlen) NOT NULL, ".
            "first_name VARCHAR($strlen) NOT NULL, ".
            "last_name VARCHAR($strlen) NOT NULL, ".
            "password VARCHAR($strlen) NOT NULL, ".
            "linkedin_url VARCHAR($strlen), ".
            "skills VARCHAR($strlen), ".
            "occupation VARCHAR($strlen), ".
            "gender VARCHAR($strlen), ".
            "profile_img VARCHAR($strlen), ".
            "objective VARCHAR($strlen), ".
            "PRIMARY KEY (user_email))";

        if ($conn->query($sql) === TRUE) {
            echo "UserTable created successfully<br>";
        } else {
            echo "Error creating table: " . $conn->error . "<br>";
        }
    }

    private function createGroupTable (&$conn) {
        $strlen = 255;

        $sql = "CREATE TABLE GroupTable (".
            "group_id INT NOT NULL AUTO_INCREMENT, ".
            "group_name VARCHAR($strlen) NOT NULL, ".
            "group_img VARCHAR($strlen), ".
            "about VARCHAR($strlen), ".
            "desired_skills VARCHAR($strlen), ".
            "PRIMARY KEY (group_id))";

        if ($conn->query($sql) === TRUE) {
            echo "GroupTable created successfully<br>";
        } else {
            echo "Error creating table: " . $conn->error . "<br>";
        }
    }

    // TODO foreign key assignment is throwing errorno 150
    private function createUserGroupTable (&$conn) {
        $strlen = 255;

        $sql = "CREATE TABLE UserGroupTable (".
            "user_group_id INT NOT NULL AUTO_INCREMENT, ".
            "user_email VARCHAR($strlen) NOT NULL, ".
            "group_id VARCHAR($strlen) NOT NULL, ".
            "user_role VARCHAR($strlen) NOT NULL, ".
            "PRIMARY KEY (user_group_id), ".
            "FOREIGN KEY (user_email) REFERENCES UserTable(user_email), ".
            "FOREIGN KEY (group_id) REFERENCES GroupTable(group_id))";

        if ($conn->query($sql) === TRUE) {
            echo "UserGroupTable created successfully<br>";
        } else {
            echo "Error creating table: " . $conn->error . "<br>";
        }
    }

    private function createChatLineTable (&$conn) {

    }
}


$database = new TalentMeDB();


?>
