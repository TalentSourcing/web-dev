<?php

require 'init_database.php';

class UserProfile {
    private $conn = null;

    public function UserProfile () {
        $this->conn = TalentMeDB::getConnection();
    }

    function createUser ($user_email, $first_name, $last_name, $password, $linkedin_url, $skills, $occupation, $gender,
                         $profile_img, $objective) {
        // check if email exists
        $result = $this->conn->query("SELECT * FROM UserTable WHERE user_email='$user_email'");
        if ($result->num_rows != 0) {
            echo "New user insert failure: user_email already exists in table\n";
            return null;
        }

        // if email was not found, insert
        $sql = "INSERT INTO UserTable ".
            "(user_email, first_name, last_name, password, linkedin_url, skills, occupation, gender, profile_img, objective) ".
            "VALUES ('$user_email', '$first_name', '$last_name', '$password', '$linkedin_url', '$skills', '$occupation',
            '$gender', '$profile_img', '$objective')";

        if ($this->conn->query($sql)) {
            echo "New user insert success!\n";
        }
        else {
            echo "New user insert Failure: $this->conn->error \n";
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
            echo "User profile update success!\n";
        }
        else {
            echo "User profile update Failure: $this->conn->error \n";
        }
    }

    public function deleteUser ($user_email) {
        if ($this->conn->query("DELETE FROM UserTable WHERE user_email='$user_email'")) {
            echo "Deleted user '$user_email'\n";
        }
        else {
            echo "Delete user failure: $this->conn->error \n";
        }
    }
}

// do this when invoked by javascript
// types of requests: create_user, update_user, delete_user
const CREATE_USER = "create_user";
const UPDATE_USER = "update_user";
const DELETE_USER = "delete_user";
$html_data = null;

if (array_key_exists(CREATE_USER, $_GET)) {
    $html_data = json_decode($_GET[CREATE_USER]);
    if ($html_data != null) {
        $user_profile = new UserProfile();
        $user_profile->createUser($html_data->user_email,
            $html_data->first_name,
            $html_data->last_name,
            $html_data->password,
            $html_data->linkedin_url,
            $html_data->skills,
            $html_data->occupation,
            $html_data->gender,
            $html_data->profile_img,
            $html_data->objective);
    }
}
else if (array_key_exists(UPDATE_USER, $_GET)) {
    $html_data = json_decode($_GET[UPDATE_USER]);
    if ($html_data != null) {
        $user_profile = new UserProfile();
        $user_profile->updateUser($html_data->user_email,
            $html_data->first_name,
            $html_data->last_name,
            $html_data->password,
            $html_data->linkedin_url,
            $html_data->skills,
            $html_data->occupation,
            $html_data->gender,
            $html_data->profile_img,
            $html_data->objective);
    }
}
else if (array_key_exists(DELETE_USER, $_GET)) {
    $html_data = json_decode($_GET[DELETE_USER]);
    if ($html_data != null) {
        $user_profile = new UserProfile();
        $user_profile->deleteUser($html_data->user_email);
    }
}

