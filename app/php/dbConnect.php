<?php
$host     = 'localhost:3306';
$database = 'shopping';
$user     = 'root';
$pswd     = '';
$con = mysqli_connect($host, $user, $pswd, $database) or die('Cannot connect to MySQL server on localhost');
?>