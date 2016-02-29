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
            "(user_email, first_name, last_name, password, linkedin_url, skills, occupation, gender, profile_img, objective) ".
            "VALUES ('$user_email', '$first_name', '$last_name', '$password', '$linkedin_url', '$skills', '$occupation',
            '$gender', '$profile_img', '$objective')";

        if ($this->conn->query($sql)) {
            echo "New user insert success!";
        }
        else {
            echo "New user insert Failure: " . $this->conn->error . "<br>";
        }
    }

    public function updateUser ($user_email, $first_name, $last_name, $password, $linkedin_url, $skills, $occupation, $gender,
                            $profile_img, $objective) {
        $sql = "UPDATE UserTable SET ".
            "first_name='$first_name', ".
            "last_name='$last_name', ".
            "password='$password', ".
            "linkedin_url='$linkedin_url', ".
            "skills='$skills', ".
            "occupation='$occupation', ".
            "gender='$gender', ".
            "profile_img='$profile_img', ".
            "objective='$objective' ".
            "WHERE user_email='$user_email'";

        if ($this->conn->query($sql)) {
            echo "User profile update success!";
        }
        else {
            echo "User profile update Failure: " . $this->conn->error . "<br>";
        }
    }
}

$dbi = new DatabaseInterface();
$dbi->createUser("d.lindskog1@gmail.com", "David", "Lindskog", "password", "", "", "", "", "", "");
$dbi->updateUser("d.lindskog1@gmail.com", "Bob", "Nelson", "password", "", "", "", "", "", "");
