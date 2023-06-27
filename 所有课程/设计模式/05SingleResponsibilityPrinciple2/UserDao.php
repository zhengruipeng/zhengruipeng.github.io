<?php
include_once "DBUtil.php";

class UserDao
{
    public DBUtil $util;
    public DBUtil $connection;
    public array $userList;

    public function __construct()
    {
        $this->util = new DBUtil();
        $this->connection = $this->util->getConnection();
        $this->userList = $this->connection->selectUsers();
    }

    public function findUser($username, $password): bool
    {
        for ($i = 0; $i < count($this->userList); $i++) {
            $name = $this->userList[$i]['username'];
            $pwd = $this->userList[$i]['password'];
            if ($username === $name and $password === $pwd) {
                return true;
            }
        }
        return false;
    }
}

$username = $_POST['username'];
$password = $_POST['password'];

$user = new UserDao();
echo $user->findUser($username, $password) ? "OK" : "NO";
