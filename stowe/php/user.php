<?php

require 'init_database.php';

const APPLY_FOR_GROUP = "apply_for_group";
const CANCEL_GROUP_APPLICATION = "cancel_group_application";
const GET_APPLIED_GROUPS = "get_applied_groups";
const GET_JOINED_GROUPS = "get_joined_groups";
const LEAVE_GROUP = "leave_group";
const GET_USER_PROFILE = "get_user_profile";

class User {
    private $conn = null;

    private $FOUNDER = "founder";
    private $MEMBER = "member";
    private $INVITED = "invited";
    private $APPLIED = "applied";

    public function User () {
        $this->conn = TalentMeDB::getConnection();
    }

    public function applyForGroup($user_email, $group_id) {
        // check for existence of user
        $result = $this->conn->query("SELECT * FROM UserTable WHERE user_email='$user_email'");
        if ($result->num_rows < 1) {
            echo "UserGroupTable insert failure: user with email '$user_email' does not exist in UserTable\n";
            return null;
        }

        // check for existence of group
        $result = $this->conn->query("SELECT * FROM GroupTable WHERE group_id='$group_id'");
        if ($result->num_rows < 1) {
            echo "UserGroupTable insert failure: Group with id '$group_id' does not exist in GroupTable\n";
            return null;
        }

        // check for existence of UserGroupTable row already
        $result = $this->conn->query("SELECT * FROM UserGroupTable WHERE user_email='$user_email' AND group_id=$group_id");
        if ($result->num_rows != 0) {
            echo "UserGroupTable insert failure: user_email/group_id row already exists in table\n";
            return null;
        }

        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) ".
            "VALUES ('$user_email', $group_id, '$this->APPLIED')";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!\n";
        }
        else {
            echo "UserGroupTable insert Failure:";
        }
    }

    public function cancelGroupApplication($user_email, $group_id) {
        $sql = "DELETE FROM UserGroupTable WHERE user_email='$user_email' AND group_id='$group_id'".
            "AND user_role='$this->APPLIED'";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable delete success!\n";
        }
        else {
            echo "UserGroupTable delete Failure:";
        }
    }

    public function getAppliedGroups($user_email) {
        $sql = "SELECT * FROM UserGroupTable ".
                "WHERE user_email='$user_email' AND user_role='$this->APPLIED'";
        if ($result = $this->conn->query($sql)) {
            echo "GetAppliedGroups success!\n";
            // turn each row into an assoc array, then convert each element into a json string
            $json_objs = array();
            for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                $json_objs[$i] = json_encode($row);
            }
            return $json_objs;
        }
        else {
            echo "GetAppliedGroups Failure:";
            return null;
        }

    }

    public function getJoinedGroups($user_email) {
        $sql = "SELECT * FROM UserGroupTable ".
            "WHERE user_email='$user_email' AND user_role='$this->MEMBER'";
        if ($result = $this->conn->query($sql)) {
            if ($result->num_rows > 0) {
                $json_objs = array();
                for ($i = 0; $row = $result->fetch_assoc(); $i++) {
                    $json_objs[$i] = $this->getGroup($row['group_id']);
                }
                echo json_encode($json_objs);
                return json_encode($json_objs);
            }
            else {
                echo '{"error" : "No joined groups for user: '.$user_email.'"}';
                return null;
            }
        }
        else {
            echo '{"error" : "getJoinedGroups sql failure"}';
            return null;
        }
    }

    public function leaveGroup($user_email, $group_id) {
        $sql = "DELETE FROM UserGroupTable WHERE user_email='$user_email' AND group_id='$group_id'".
            "AND user_role='$this->MEMBER'";
        if ($this->conn->query($sql)) {
            echo '{"success" : "LeaveGroup success"}';
        }
        else {
            echo '{"error" : "LeaveGroup failure"}';
        }
    }

    public function getUserProfile($user_email) {
        $sql = "SELECT * FROM UserTable WHERE user_email='$user_email'";
        if ($result = $this->conn->query($sql)) {
            echo json_encode($result->fetch_assoc());
            return json_encode($result->fetch_assoc());
        }
        else {
            echo '{"error" : "getUserProfile sql failure"}';
        }
    }

    public function getGroup($group_id) {
        $sql = "SELECT * FROM GroupTable WHERE group_id='$group_id'";
        if ($result = $this->conn->query($sql)) {
            return $result->fetch_assoc();
        }
    }

    public function generateTestData() {
        // create some groups
        $sql = "INSERT INTO GroupTable " .
            "( group_name, group_img , about, desired_skills) " .
            "VALUES ( 'group1', '', '', '') ";
        if ($this->conn->query($sql)) {
            echo "group1 created";
        }
        else {
            echo "group1 creation error\n";
        }

        $sql = "INSERT INTO GroupTable " .
            "( group_name, group_img , about, desired_skills) " .
            "VALUES ( 'group2', '', '', '') ";
        if ($this->conn->query($sql)) {
            echo "group2 created\n";
        }
        else {
            echo "group2 creation error\n";
        }

        // associate user with groups as member
        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) " .
            "VALUES ('d.lindskog1@gmail.com', '1', '$this->MEMBER')";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!\n";
        } else {
            echo "UserGroupTable insert Failure\n";
        }

        $sql = "INSERT INTO UserGroupTable (user_email, group_id, user_role) " .
            "VALUES ('d.lindskog1@gmail.com', '2', '$this->MEMBER')";
        if ($this->conn->query($sql)) {
            echo "UserGroupTable insert success!\n";
        } else {
            echo "UserGroupTable insert Failure\n";
        }


    }
}

$user = new User();
// generate some fake data:
//$user->generateTestData();

// check for which kind of request
if (array_key_exists(APPLY_FOR_GROUP, $_GET)) {
//    $data = json_decode($_GET[APPLY_FOR_GROUP]);
//    $user->applyForGroup($data->user_email, $data->group_id);
}
else if (array_key_exists(CANCEL_GROUP_APPLICATION, $_GET)) {

}
else if (array_key_exists(GET_APPLIED_GROUPS, $_GET)) {

}
else if (array_key_exists(GET_JOINED_GROUPS, $_GET)) {
    $user->getJoinedGroups($_GET[GET_JOINED_GROUPS]);
}
else if (array_key_exists(LEAVE_GROUP, $_GET)) {
    $request = json_decode($_GET[LEAVE_GROUP]);
    $user->leaveGroup($request->user_email, $request->group_id);
}
else if (array_key_exists(GET_USER_PROFILE, $_GET)) {
    $user->getUserProfile($_GET[GET_USER_PROFILE]);
}