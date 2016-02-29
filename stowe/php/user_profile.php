<?php
/**
 * Created by PhpStorm.
 * User: davidlindskog
 * Date: 2/29/16
 * Time: 10:41 AM
 */

require 'init_database.php';

class DatabaseInterface {
    private $conn = null;

    public function DatabaseInterface () {
        $this->conn = TalentMeDB::getConnection();
    }

    function createUser ($user_email, $first_name, $last_name, $password, $linkedin_url, $skills, $occupation, $gender,
                         $profile_img, $objective) {
        $sql = "INSERT INTO UserTable ".
            " (user_email, first_name, last_name, password, linkedin_url, skills, occupation, gender, profile_img, objective) ".
            "VALUES ('$user_email', '$first_name', '$last_name', '$password', '$linkedin_url', '$skills', '$occupation',
            '$gender', '$profile_img', '$objective')";

        if ($this->conn->query($sql)) {
            echo "Insert success!";
        }
        else {
            echo "Insert Failure: " . $this->conn->error . "<br>";
        }
    }
}

$dbi = new DatabaseInterface();
$dbi->createUser("d.lindskog1@gmail.com", "David", "Lindskog", "password", "", "", "", "", "", "");
