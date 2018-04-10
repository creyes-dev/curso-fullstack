<?php
 
// DATABASE connection script  
 
// database Connection variables
define('HOST', 'localhost'); // Database host name ex. localhost
define('USER', 'phpmyadmin'); // Database user. ex. root ( if your on local server)
define('PASSWORD', 'myadmin123'); // Database user password  (if password is not set for user then keep it empty )
define('DATABASE', 'users'); // Database name
define('CHARSET', 'utf8');
 
function DB()
{
    static $instance;
    if ($instance === null) {
        $opt = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => FALSE,
        );
        //$dsn = 'mysql:host=' . HOST . ';dbname=' . DATABASE . ';charset=' . CHARSET;
        //$instance = new PDO($dsn, USER, PASSWORD, $opt);
        $dsn = 'mysql:host=localhost;dbname=users;charset=utf8';
        $instance = new PDO($dsn, 'phpmyadmin', 'myadmin123', $opt);
    }
    return $instance;
}
 
?>