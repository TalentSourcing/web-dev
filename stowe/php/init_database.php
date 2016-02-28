<?php

// This class will initialize the mysql database and set up the necessary tables.

class TalentMeDB {
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "talentme_db";
    private $conn = null;

    /* Constructor */
    public function TalentMeDB () {
        $this->init();
    }


    /* Public methods */

    public function close () {
        if ($this->conn != null) {
            $this->conn->close();
        }
    }

    public function delete () {
        if ($this->conn != null) {
            if ($this->conn->query("DROP DATABASE $this->dbname") === true) {
                $this->close();
                echo "Deleted database '$this->dbname' successfully!<br>";
            }
            else {
                echo "Could not delete database '$this-dbname'<br>";
            }
        }
    }


    /* Private methods */

    private function init () {
        // Create connection
        $this->conn = mysqli_connect($this->servername, $this->username, $this->password);
        // Check connection
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }

        /* Attempt to select 'talentme_db' as database.  If it does not exist, create it. */
        if ($this->conn->select_db($this->dbname)) { // select_db returns true if found, false if not found
            $result = $this->conn->query("SELECT DATABASE()");
            $row = $result->fetch_row();
            echo "Current database is " . $row[0] . "<br>";
            $result->close();
        }
        else { // database $dbname not found, create a new one
            echo "No database by the name '$this->dbname' found.<br>";
            // Create database
            $sql = "CREATE DATABASE " . $this->dbname;
            if ($this->conn->query($sql) === TRUE) {
                $this->conn->select_db($this->dbname);
                echo "New database '$this->dbname' created successfully.<br>";
                $this->createUserTable($this->conn);
                $this->createGroupTable($this->conn);
                $this->createUserGroupTable($this->conn);
                $this->createChatLineTable($this->conn);
            } else {
                echo "Error creating database: " . $this->conn->error;
            }
        }
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

    private function createUserGroupTable (&$conn) {
        $strlen = 255;

        $sql = "CREATE TABLE UserGroupTable (".
            "user_group_id INT NOT NULL AUTO_INCREMENT, ".
            "user_email VARCHAR($strlen) NOT NULL, ".
            "group_id INT NOT NULL, ".
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
        $strlen = 255;

        $sql = "CREATE TABLE ChatLineTable (".
            "id INT NOT NULL AUTO_INCREMENT, ".
            "chat_id INT NOT NULL, ".
            "user_email VARCHAR($strlen) NOT NULL, ".
            "text_line VARCHAR($strlen), ".
            "time_stamp TIMESTAMP, ".
            "group_id INT, ".
            "PRIMARY KEY (id), ".
            "FOREIGN KEY (user_email) REFERENCES UserTable(user_email), ".
            "FOREIGN KEY (group_id) REFERENCES GroupTable(group_id))";

        if ($conn->query($sql) === TRUE) {
            echo "ChatLineTable created successfully<br>";
        } else {
            echo "Error creating table: " . $conn->error . "<br>";
        }
    }
}

// test creation
$database = new TalentMeDB();


?>
