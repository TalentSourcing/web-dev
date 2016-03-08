<?php

// This class will initialize the mysql database and set up the necessary tables.

class TalentMeDB {
    private $servername = "localhost";
    private $username = "root";
    private $password = "root";
    private $dbname = "talentme_db";
    private static $conn = null;

    /* Constructor */
    public function TalentMeDB () {
        if (TalentMeDB::$conn == null) {
            $this->init();
        }
    }


    /* Public methods */

    /**
     * @return MySqli
     */
    public static function getConnection() {
        if (TalentMeDB::$conn == null) {
            new TalentMeDB();
        }
        return TalentMeDB::$conn;
    }

    public static function query ($sql) {
        if (!($result = TalentMeDB::$conn->query($sql))) {
            throw new Exception("TalentMeDb::query exception: " . TalentMeDB::$conn->error);
        }
        return $result;
    }

    public static function close () {
        if (TalentMeDB::$conn != null) {
            TalentMeDB::$conn->close();
        }
    }

    public function delete () {
        if (TalentMeDB::$conn != null) {
            if (TalentMeDB::$conn->query("DROP DATABASE $this->dbname") === true) {
                $this->close();
                // // echo "Deleted database '$this->dbname' successfully!\n";
            }
            else {
                // echo "Could not delete database '$this->dbname'\n";
            }
        }
    }


    /* Private methods */

    private function init () {
        // Create connection
        TalentMeDB::$conn = mysqli_connect($this->servername, $this->username, $this->password);
        // Check connection
        if (TalentMeDB::$conn->connect_error) {
            die("Connection failed: " . TalentMeDB::$conn->connect_error);
        }

        /* Attempt to select 'talentme_db' as database.  If it does not exist, create it. */
        if (TalentMeDB::$conn->select_db($this->dbname)) { // select_db returns true if found, false if not found
            $result = TalentMeDB::$conn->query("SELECT DATABASE()");
            $row = $result->fetch_row();
            // echo "Current database is " . $row[0] . "\n";
            $result->close();
        }
        else { // database $dbname not found, create a new one
            // echo "No database by the name '$this->dbname' found.\n";
            // Create database
            $sql = "CREATE DATABASE " . $this->dbname;
            if (TalentMeDB::$conn->query($sql) === TRUE) {
                TalentMeDB::$conn->select_db($this->dbname);
                // echo "New database '$this->dbname' created successfully.\n";
                $this->createUserTable(TalentMeDB::$conn);
                $this->createGroupTable(TalentMeDB::$conn);
                $this->createUserGroupTable(TalentMeDB::$conn);
                $this->createChatLineTable(TalentMeDB::$conn);
            } else {
                // echo "Error creating database: " . TalentMeDB::$conn->error;
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
            // echo "UserTable created successfully\n";
        } else {
            // echo "Error creating table: " . $conn->error . "\n";
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
            // echo "GroupTable created successfully\n";
        } else {
            // echo "Error creating table: " . $conn->error . "\n";
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
            // echo "UserGroupTable created successfully\n";
        } else {
            // echo "Error creating table: " . $conn->error . "\n";
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
            // echo "ChatLineTable created successfully\n";
        } else {
            // echo "Error creating table: " . $conn->error . "\n";
        }
    }
}

new TalentMeDB();

?>
